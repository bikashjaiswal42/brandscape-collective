import { motion } from "framer-motion";
import { Github, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-brand-card border-t border-brand-gold/20 py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-2"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-brand-dark font-bold">B</span>
              </div>
              <h3 className="text-2xl font-bold brand-text-gradient">
                Brand Identity Hub
              </h3>
            </div>
            <p className="text-brand-muted leading-relaxed mb-6 max-w-md">
              Discover and explore exceptional brand identity projects. 
              From concept to execution, find inspiration for your next creative venture.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Github, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Mail, href: "#" }
              ].map(({ icon: Icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  className="p-2 bg-brand-accent/20 text-brand-muted hover:text-brand-gold hover:bg-brand-accent/40 rounded-lg transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-brand-text mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {["Showcase", "Categories", "Featured", "About", "Contact"].map((link, index) => (
                <li key={index}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-brand-muted hover:text-brand-gold transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-brand-text mb-4">Categories</h4>
            <ul className="space-y-3">
              {["Luxury Retail", "Technology", "Food & Beverage", "Architecture", "Wellness"].map((category, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-brand-muted hover:text-brand-gold transition-colors"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-brand-gold/20 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between"
        >
          <p className="text-brand-muted text-sm">
            © 2024 Brand Identity Hub. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-brand-muted hover:text-brand-gold transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-brand-muted hover:text-brand-gold transition-colors text-sm">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;