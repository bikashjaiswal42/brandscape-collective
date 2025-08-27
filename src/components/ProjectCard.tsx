import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Heart, Download, Eye } from "lucide-react";
import { useState } from "react";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  colors: string[];
  tags: string[];
  image: string;
  featured?: boolean;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  onView?: (project: Project) => void;
}

const ProjectCard = ({ project, index, onView }: ProjectCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="brand-card rounded-2xl overflow-hidden brand-hover-glow transition-all duration-500 group-hover:scale-[1.02]">
        {/* Image Container */}
        <div className="relative h-64 bg-gradient-to-br from-brand-muted/10 to-brand-accent/10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/20 to-brand-accent/20 flex items-center justify-center">
            <div className="text-6xl font-bold text-brand-gold/30">
              {project.title.charAt(0)}
            </div>
          </div>
          
          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 bg-brand-dark/80 flex items-center justify-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              className="p-3 bg-brand-gold text-brand-dark rounded-full hover:scale-110 transition-transform"
              onClick={() => onView?.(project)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Eye className="w-5 h-5" />
            </motion.button>
            <motion.button
              className="p-3 bg-brand-accent text-brand-text rounded-full hover:scale-110 transition-transform"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-brand-gold text-brand-dark font-semibold">
                Featured
              </Badge>
            </div>
          )}

          {/* Like button */}
          <motion.button
            className="absolute top-4 right-4 p-2 bg-brand-dark/50 backdrop-blur-sm rounded-full"
            onClick={() => setIsLiked(!isLiked)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isLiked ? "fill-brand-gold text-brand-gold" : "text-brand-muted"
              }`}
            />
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <Badge variant="secondary" className="bg-brand-accent/20 text-brand-gold border-brand-gold/20">
              {project.category}
            </Badge>
          </div>

          <h3 className="text-xl font-bold text-brand-text mb-2 group-hover:text-brand-gold transition-colors">
            {project.title}
          </h3>

          <p className="text-brand-muted text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Color palette */}
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-xs text-brand-muted">Colors:</span>
            <div className="flex space-x-1">
              {project.colors.map((color, idx) => (
                <div
                  key={idx}
                  className="w-4 h-4 rounded-full border border-brand-gold/20"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-1 bg-brand-muted/10 text-brand-muted rounded-full"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="text-xs px-2 py-1 bg-brand-muted/10 text-brand-muted rounded-full">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;