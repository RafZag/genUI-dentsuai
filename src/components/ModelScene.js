'use client';

import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Bounds, Center, ContactShadows, Environment, useBounds, useGLTF } from '@react-three/drei';
import { MathUtils } from 'three';

function InteractiveModel({ modelPath, motion, center, onFit }) {
  const { scene } = useGLTF(modelPath);
  const bounds = useBounds();
  const groupRef = useRef(null);

  useEffect(() => {
    scene.traverse((obj) => {
      if (!obj.isMesh) return;
      obj.castShadow = true;
    });
  }, [scene]);

  useLayoutEffect(() => {
    if (!groupRef.current) return;

    let cancelled = false;
    const frameId = requestAnimationFrame(() => {
      if (cancelled || !groupRef.current) return;
      bounds.refresh(groupRef.current).clip().fit();
      onFit?.();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frameId);
    };
  }, [bounds, onFit, scene]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const t = state.clock.getElapsedTime();
    const pointerX = state.pointer.x;
    const pointerY = state.pointer.y;

    const targetPosX = pointerX * motion.pointerPosX;
    const targetPosY = Math.sin(t * motion.floatSpeed) * motion.floatAmount + pointerY * motion.pointerPosY;
    const targetRotX = motion.baseRotX + pointerY * motion.pointerRotX;
    const targetRotY = pointerX * motion.pointerRotY;

    groupRef.current.position.x = MathUtils.damp(groupRef.current.position.x, targetPosX, motion.damping, delta);
    groupRef.current.position.y = MathUtils.damp(groupRef.current.position.y, targetPosY, motion.damping, delta);
    groupRef.current.rotation.x = MathUtils.damp(groupRef.current.rotation.x, targetRotX, motion.damping, delta);
    groupRef.current.rotation.y = MathUtils.damp(groupRef.current.rotation.y, targetRotY, motion.damping, delta);
  });

  const model = <primitive object={scene} />;

  return <group ref={groupRef}>{center ? <Center>{model}</Center> : model}</group>;
}

export function preloadModel(modelPath) {
  if (typeof modelPath === 'string' && modelPath.length > 0) {
    useGLTF.preload(modelPath);
  }
}

export default function ModelScene({
  modelPath,
  camera = { position: [0, 5, 2], fov: 40 },
  ambientLight = { intensity: 0.18 },
  directionalLight = { position: [0, 2, 3], intensity: 1.2 },
  contactShadows = {
    position: [0, -2, 0],
    opacity: 0.2,
    scale: 10,
    blur: 1,
    far: 6,
    resolution: 512,
    color: '#000000',
  },
  bounds = { margin: 1, fit: true, clip: true, observe: true },
  environment = { preset: 'studio', environmentIntensity: 0.25 },
  motion = {
    pointerPosX: 0.08,
    pointerPosY: 0.05,
    pointerRotX: 0.09,
    pointerRotY: 0.18,
    floatSpeed: 1.15,
    floatAmount: 0.06,
    baseRotX: 0.08,
    damping: 4.5,
  },
  centerModel = true,
  className,
  style,
}) {
  const [fittedModelPath, setFittedModelPath] = useState(null);
  const isFitted = fittedModelPath === modelPath;

  const canvasStyle = useMemo(
    () => ({
      background: 'transparent',
      width: '100%',
      height: '100%',
      opacity: isFitted ? 1 : 0,
      ...style,
    }),
    [isFitted, style],
  );

  return (
    <div className={className} style={{ width: '100%', height: '100%' }}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={camera}
        gl={{ alpha: true, antialias: true }}
        style={canvasStyle}
        onWheel={(e) => {
          if (e.ctrlKey || e.metaKey) e.preventDefault();
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}>
        <ambientLight intensity={ambientLight.intensity} />
        <directionalLight position={directionalLight.position} intensity={directionalLight.intensity} />
        <Suspense fallback={null}>
          <ContactShadows {...contactShadows} />
          <Bounds fit={bounds.fit} clip={bounds.clip} observe={bounds.observe} margin={bounds.margin}>
            <InteractiveModel
              modelPath={modelPath}
              motion={motion}
              center={centerModel}
              onFit={() => setFittedModelPath(modelPath)}
            />
          </Bounds>
          <Environment preset={environment.preset} environmentIntensity={environment.environmentIntensity} />
        </Suspense>
      </Canvas>
    </div>
  );
}
