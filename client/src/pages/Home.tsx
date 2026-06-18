import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import Carousel from "@/components/Carousel";
import DatabaseSection from "@/components/DatabaseSection";
import ScenariosSection from "@/components/ScenariosSection";
import AboutSection from "@/components/AboutSection";
import PartnersSection from "@/components/PartnersSection";
import ApiSection from "@/components/ApiSection";
import ContactSection from "@/components/ContactSection";
import CooperationFlowSection from "@/components/CooperationFlowSection";
import Footer from "@/components/Footer";

const carouselSlides = [
  {
    id: 'slide-1',
    image: '/manus-storage/pasted_file_qa51PQ_image_dc8848c8.png',
    alt: 'CnOpenData - 数据的顶端，也是学术的顶端',
  },
  {
    id: 'slide-2',
    image: '/manus-storage/pasted_file_i0fVZG_image_17f5d75d.png',
    alt: 'AER红 - 爱AER，也爱经济研究',
  },
  {
    id: 'slide-3',
    image: '/manus-storage/pasted_file_wXzOia_image_9927a055.png',
    alt: 'RES绿 - 爱paper，不爱endogeneity',
  },
  {
    id: 'slide-4',
    image: '/manus-storage/pasted_file_CtZDcI_image_1d304f10.png',
    alt: 'JPE青 - 爱DID，也爱RDD',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <Carousel slides={carouselSlides} autoPlayInterval={5000} />
        <DatabaseSection />
        <ScenariosSection />
        <ApiSection />
        <AboutSection />
        <PartnersSection />
        <ContactSection />
        <CooperationFlowSection />
      </main>
      <Footer />
    </div>
  );
}
