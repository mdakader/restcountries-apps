//src/app/page.tsx
import BannerSection from '@/components/BannerSection';
import CountriesSection from '@/components/CountriesSection';
export default function Home() {
  return (
    <div className="main-wrapper">
      <BannerSection />
      <CountriesSection />
    </div>
  );
}
