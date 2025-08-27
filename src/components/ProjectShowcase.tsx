import { motion } from "framer-motion";
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectDetailModal from "./ProjectDetailModal";
import { Button } from "@/components/ui/button";
import { Filter, Grid, List } from "lucide-react";

// Import project images
import noveltyJewelry from "@/assets/novelty-jewelry.jpg";
import greentechSolutions from "@/assets/greentech-solutions.jpg";
import artisanCoffee from "@/assets/artisan-coffee.jpg";
import zenithArchitecture from "@/assets/zenith-architecture.jpg";
import lunaWellness from "@/assets/luna-wellness.jpg";
import velocitySports from "@/assets/velocity-sports.jpg";

// Mock data - will be replaced with database data
const mockProjects = [
  {
    id: "1",
    title: "Novelty - Imitation Jewellery",
    category: "Luxury Retail",
    description: "Elegant brand identity for premium imitation jewelry brand focusing on sophistication and affordability.",
    colors: ["#FFD700", "#1A1A1A", "#2D5016", "#C5A572"],
    tags: ["Luxury", "Jewelry", "Retail", "Gold", "Premium"],
    image: noveltyJewelry,
    featured: true
  },
  {
    id: "2",
    title: "GreenTech Solutions",
    category: "Technology",
    description: "Sustainable technology company branding with eco-friendly color palette and modern typography.",
    colors: ["#22C55E", "#1F2937", "#10B981", "#065F46"],
    tags: ["Technology", "Eco", "Sustainable", "Modern"],
    image: greentechSolutions
  },
  {
    id: "3",
    title: "Artisan Coffee Co.",
    category: "Food & Beverage",
    description: "Artisanal coffee brand with rustic charm and premium positioning in the specialty coffee market.",
    colors: ["#A0522D", "#8B4513", "#DEB887", "#2F1B14"],
    tags: ["Coffee", "Artisan", "Premium", "Rustic"],
    image: artisanCoffee
  },
  {
    id: "4",
    title: "Zenith Architecture",
    category: "Architecture",
    description: "Modern architectural firm branding emphasizing clean lines, innovation, and sustainable design.",
    colors: ["#374151", "#6B7280", "#F3F4F6", "#111827"],
    tags: ["Architecture", "Modern", "Clean", "Professional"],
    image: zenithArchitecture
  },
  {
    id: "5",
    title: "Luna Wellness Spa",
    category: "Wellness",
    description: "Luxury spa and wellness center with calming colors and serene brand positioning.",
    colors: ["#E0E7FF", "#8B5CF6", "#A78BFA", "#4C1D95"],
    tags: ["Wellness", "Spa", "Luxury", "Calming"],
    image: lunaWellness,
    featured: true
  },
  {
    id: "6",
    title: "Velocity Sports",
    category: "Sports",
    description: "Dynamic sports brand with energetic color scheme and bold typography for athletic performance.",
    colors: ["#EF4444", "#DC2626", "#FEE2E2", "#991B1B"],
    tags: ["Sports", "Dynamic", "Energy", "Performance"],
    image: velocitySports
  }
];

const categories = ["All", "Luxury Retail", "Technology", "Food & Beverage", "Architecture", "Wellness", "Sports"];

const ProjectShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProject, setSelectedProject] = useState<typeof mockProjects[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects = selectedCategory === "All" 
    ? mockProjects 
    : mockProjects.filter(project => project.category === selectedCategory);

  const handleViewProject = (project: typeof mockProjects[0]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <section id="showcase" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="brand-text-gradient">Featured Projects</span>
          </h2>
          <p className="text-xl text-brand-muted max-w-3xl mx-auto">
            Explore our curated collection of exceptional brand identity projects. 
            Each project showcases unique design solutions and strategic brand thinking.
          </p>
        </motion.div>

        {/* Filters and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between mb-12 space-y-4 md:space-y-0"
        >
          {/* Category filters */}
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="w-5 h-5 text-brand-muted mr-2" />
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "brand-button-primary"
                    : "text-brand-muted hover:text-brand-gold hover:bg-brand-accent/20"
                }
              >
                {category}
              </Button>
            ))}
          </div>

          {/* View mode toggle */}
          <div className="flex items-center space-x-2 bg-brand-card rounded-lg p-1 border border-brand-gold/20">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-brand-gold text-brand-dark" : "text-brand-muted"}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-brand-gold text-brand-dark" : "text-brand-muted"}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className={`grid gap-8 ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
              : "grid-cols-1 max-w-4xl mx-auto"
          }`}
          layout
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onView={handleViewProject}
            />
          ))}
        </motion.div>

        {/* Load more button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button size="lg" className="brand-button-secondary">
            Load More Projects
          </Button>
        </motion.div>
      </div>

      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default ProjectShowcase;