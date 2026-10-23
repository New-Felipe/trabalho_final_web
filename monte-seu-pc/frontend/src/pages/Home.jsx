import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import CategoriesSection from "../components/CategoriesSection";

function Home() {
  return (
    <div className="min-h-screen bg-ink">
      <Header />

      <main>
        <HeroSection
          mascotSrc="/images/mascote.png"
          mascotAlt="Robô assistente do Monte Seu PC segurando uma placa de vídeo"
        />
        <CategoriesSection />
      </main>
    </div>
  );
}

export default Home;
