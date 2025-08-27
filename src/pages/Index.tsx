import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProjectShowcase from "@/components/ProjectShowcase";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ProjectShowcase />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
