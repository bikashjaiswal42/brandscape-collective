import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LogIn, User } from "lucide-react";

const Header = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <motion.div 
          className="flex items-center space-x-3"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-brand-dark font-bold text-sm">B</span>
          </div>
          <h1 className="text-xl font-bold brand-text-gradient">
            Brand Identity Hub
          </h1>
        </motion.div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#showcase" className="text-brand-muted hover:text-brand-gold transition-colors">
            Showcase
          </a>
          <a href="#about" className="text-brand-muted hover:text-brand-gold transition-colors">
            About
          </a>
          <a href="#contact" className="text-brand-muted hover:text-brand-gold transition-colors">
            Contact
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-brand-muted hover:text-brand-gold hover:bg-brand-accent/20"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Login
          </Button>
          <Button 
            size="sm"
            className="brand-button-primary"
          >
            <User className="w-4 h-4 mr-2" />
            Sign Up
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;