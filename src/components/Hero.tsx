import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import AuthModal from "./AuthModal";
import heroBackground from "@/assets/hero-background.jpg";

const Hero = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const scrollToShowcase = () => {
    const showcaseSection = document.getElementById('showcase');
    showcaseSection?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-brand-dark/70" />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-brand-gold/10 rounded-full blur-xl"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-48 h-48 bg-brand-accent/10 rounded-full blur-xl"
          animate={{ 
            x: [0, -40, 0],
            y: [0, 30, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-brand-accent/20 px-4 py-2 rounded-full border border-brand-gold/20 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Sparkles className="w-4 h-4 text-brand-gold" />
            <span className="text-sm text-brand-muted">Premium Brand Identity Showcase</span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Discover Exceptional
            <br />
            <span className="brand-text-gradient">Brand Identities</span>
          </motion.h1>

          <motion.p
            className="text-xl text-brand-muted mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Explore a curated collection of premium brand identity projects. 
            From logos to complete style guides, find inspiration for your next creative venture.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <Button size="lg" className="brand-button-primary group" onClick={scrollToShowcase}>
              Explore Projects
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="brand-button-secondary"
              onClick={() => setAuthModalOpen(true)}
            >
              Join Community
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating brand cards preview */}
        <motion.div
          className="absolute top-1/2 left-10 hidden lg:block"
          initial={{ opacity: 0, x: -50, rotate: -12 }}
          animate={{ opacity: 1, x: 0, rotate: -12 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <div className="w-32 h-44 brand-card rounded-xl p-4 animate-float">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg mb-3"></div>
            <div className="h-2 bg-brand-muted/30 rounded mb-2"></div>
            <div className="h-2 bg-brand-muted/20 rounded w-3/4"></div>
          </div>
        </motion.div>

        <motion.div
          className="absolute top-1/3 right-10 hidden lg:block"
          initial={{ opacity: 0, x: 50, rotate: 8 }}
          animate={{ opacity: 1, x: 0, rotate: 8 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          <div className="w-32 h-44 brand-card rounded-xl p-4 animate-float" style={{ animationDelay: '2s' }}>
            <div className="w-8 h-8 bg-gradient-accent rounded-lg mb-3"></div>
            <div className="h-2 bg-brand-muted/30 rounded mb-2"></div>
            <div className="h-2 bg-brand-muted/20 rounded w-2/3"></div>
          </div>
        </motion.div>
      </div>

      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode="signup"
      />
    </section>
  );
};

export default Hero;