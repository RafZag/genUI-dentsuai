import HomepageHero from '@/components/HomepageHero';
import ProductCarousel from '@/components/ProductCarousel';
import PhilosophySlider from '@/components/PhilosophySlider';
import PodcastSection from '@/components/PodcastSection';
import LabSection from '@/components/LabSection';
import TeamSection from '@/components/TeamSection';
import FaqComponent from '@/components/FaqComponent';
import ClientsLogosSection from '@/components/ClientsLogosSection';

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center pt-44 text-center gap-8 bg-top bg-[url('../assets/homepage_bg.jpg')] unoptimized bg-no-repeat">
      <HomepageHero />
      <ProductCarousel />
      <PhilosophySlider />
      <PodcastSection />
      <LabSection />
      <TeamSection />
      <FaqComponent colorClass="text-[#00FF84]" />
      <ClientsLogosSection />
    </main>
  );
}