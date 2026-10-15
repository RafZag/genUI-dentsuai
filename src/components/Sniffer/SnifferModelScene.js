'use client';

import ModelScene, { preloadModel } from '@/components/ModelScene';

const snifferModel = '/gltf/SN.glb';
preloadModel(snifferModel);

export default function SnifferModelScene() {
  return (
    <ModelScene
      modelPath={snifferModel}
      camera={{ position: [0, 5, 2], fov: 40 }}
      ambientLight={{ intensity: 0.18 }}
      directionalLight={{ position: [0, 2, 3], intensity: 1.2 }}
      contactShadows={{
        position: [0, -2, 0],
        opacity: 0.2,
        scale: 10,
        blur: 1,
        far: 6,
        resolution: 512,
        color: '#000000',
      }}
      bounds={{ margin: 1.1, fit: true, clip: true, observe: true }}
      environment={{ preset: 'studio', environmentIntensity: 0.25 }}
      motion={{
        pointerPosX: 0.08,
        pointerPosY: 0.05,
        pointerRotX: 0.09,
        pointerRotY: 0.18,
        floatSpeed: 1.15,
        floatAmount: 0.2,
        baseRotX: 0.08,
        damping: 4.5,
      }}
      centerModel
    />
  );
}
