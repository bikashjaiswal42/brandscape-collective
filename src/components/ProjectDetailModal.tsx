import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Download, Heart, Share2, Eye, Palette, Type, FileText } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectDetailModal = ({ project, isOpen, onClose }: ProjectDetailModalProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();

  if (!project) return null;

  const handleDownload = (type: string) => {
    toast({
      title: "Download Started",
      description: `${type} files are being prepared for download.`,
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: project.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Project link copied to clipboard!",
      });
    }
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: Eye },
    { id: "colors", label: "Colors", icon: Palette },
    { id: "typography", label: "Typography", icon: Type },
    { id: "assets", label: "Assets", icon: FileText }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-brand-card border-brand-gold/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold brand-text-gradient">
            {project.title}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Image and Quick Actions */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-[4/3] rounded-xl overflow-hidden mb-6"
            >
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent" />
              
              {project.featured && (
                <Badge className="absolute top-4 left-4 bg-brand-gold text-brand-dark">
                  Featured
                </Badge>
              )}
            </motion.div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <div className="flex space-x-2">
                <Button
                  onClick={() => setIsLiked(!isLiked)}
                  variant="outline"
                  size="sm"
                  className={`flex-1 ${isLiked ? 'bg-brand-gold text-brand-dark border-brand-gold' : 'brand-button-secondary'}`}
                >
                  <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                  {isLiked ? 'Liked' : 'Like'}
                </Button>
                <Button
                  onClick={handleShare}
                  variant="outline"
                  size="sm"
                  className="flex-1 brand-button-secondary"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>

              <Button
                onClick={() => handleDownload('Style Guide')}
                className="w-full brand-button-primary"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Style Guide
              </Button>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={() => handleDownload('Logo')}
                  variant="outline"
                  size="sm"
                  className="brand-button-secondary"
                >
                  <Download className="w-3 h-3 mr-1" />
                  Logo
                </Button>
                <Button
                  onClick={() => handleDownload('Assets')}
                  variant="outline"
                  size="sm"
                  className="brand-button-secondary"
                >
                  <Download className="w-3 h-3 mr-1" />
                  Assets
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2">
            {/* Project Info */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="secondary" className="bg-brand-accent/20 text-brand-gold border-brand-gold/20">
                  {project.category}
                </Badge>
                <div className="flex items-center space-x-4 text-sm text-brand-muted">
                  <span>👁 1.2k views</span>
                  <span>❤️ 89 likes</span>
                  <span>⬇️ 23 downloads</span>
                </div>
              </div>

              <p className="text-brand-muted leading-relaxed mb-6">
                {project.description} This comprehensive brand identity project showcases 
                a complete visual system designed to elevate the brand's presence across 
                all touchpoints.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs px-3 py-1 bg-brand-muted/10 text-brand-muted rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <Separator className="my-6" />

            {/* Tabs */}
            <div className="space-y-4">
              <div className="flex space-x-1 bg-brand-accent/10 p-1 rounded-lg">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        activeTab === tab.id
                          ? 'bg-brand-gold text-brand-dark'
                          : 'text-brand-muted hover:text-brand-gold'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <div className="min-h-[200px]">
                {activeTab === "overview" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold text-brand-text">Project Overview</h3>
                    <p className="text-brand-muted">
                      This brand identity project represents a comprehensive approach to visual 
                      communication, encompassing logo design, color psychology, typography 
                      selection, and brand application guidelines.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="p-4 bg-brand-accent/10 rounded-lg">
                        <h4 className="font-medium text-brand-text mb-2">Project Duration</h4>
                        <p className="text-sm text-brand-muted">3 weeks</p>
                      </div>
                      <div className="p-4 bg-brand-accent/10 rounded-lg">
                        <h4 className="font-medium text-brand-text mb-2">Team Size</h4>
                        <p className="text-sm text-brand-muted">4 designers</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "colors" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold text-brand-text">Color Palette</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {project.colors.map((color, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-brand-accent/10 rounded-lg">
                          <div
                            className="w-12 h-12 rounded-lg border border-brand-gold/20"
                            style={{ backgroundColor: color }}
                          />
                          <div>
                            <div className="font-mono text-sm text-brand-text">{color}</div>
                            <div className="text-xs text-brand-muted">
                              {index === 0 ? 'Primary' : index === 1 ? 'Secondary' : index === 2 ? 'Accent' : 'Supporting'}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === "typography" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold text-brand-text">Typography System</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-brand-accent/10 rounded-lg">
                        <h4 className="font-bold text-brand-text text-2xl mb-2">Primary Font</h4>
                        <p className="text-brand-muted">Used for headlines and brand touchpoints</p>
                      </div>
                      <div className="p-4 bg-brand-accent/10 rounded-lg">
                        <h4 className="font-medium text-brand-text text-lg mb-2">Secondary Font</h4>
                        <p className="text-brand-muted">Used for body text and supporting content</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "assets" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold text-brand-text">Available Assets</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { name: "Logo Package", size: "2.3 MB", format: "AI, PNG, SVG" },
                        { name: "Brand Guidelines", size: "5.7 MB", format: "PDF" },
                        { name: "Color Swatches", size: "1.2 MB", format: "ASE, ACO" },
                        { name: "Typography Files", size: "12.4 MB", format: "OTF, TTF" },
                        { name: "Mockup Templates", size: "45.6 MB", format: "PSD" }
                      ].map((asset, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-brand-accent/10 rounded-lg">
                          <div>
                            <h4 className="font-medium text-brand-text">{asset.name}</h4>
                            <p className="text-sm text-brand-muted">{asset.format} • {asset.size}</p>
                          </div>
                          <Button
                            onClick={() => handleDownload(asset.name)}
                            size="sm"
                            variant="outline"
                            className="brand-button-secondary"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailModal;