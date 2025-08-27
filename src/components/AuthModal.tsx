import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { X, Eye, EyeOff, Mail, Lock, User, Github } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "signup";
}

const AuthModal = ({ isOpen, onClose, initialMode = "login" }: AuthModalProps) => {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (mode === "signup") {
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Error",
          description: "Passwords don't match",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }
      toast({
        title: "Account created!",
        description: "Please check your email to verify your account.",
      });
    } else {
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
    }

    setIsLoading(false);
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return { minLength, hasUpper, hasLower, hasNumber, hasSpecial };
  };

  const passwordChecks = validatePassword(formData.password);
  const isPasswordValid = Object.values(passwordChecks).every(Boolean);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="brand-card p-8 relative overflow-hidden">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-brand-muted hover:text-brand-gold transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-brand-dark font-bold text-lg">B</span>
                </div>
                <h2 className="text-2xl font-bold brand-text-gradient mb-2">
                  {mode === "login" ? "Welcome Back" : "Create Account"}
                </h2>
                <p className="text-brand-muted">
                  {mode === "login" 
                    ? "Sign in to your account to continue" 
                    : "Join our community of brand enthusiasts"
                  }
                </p>
              </div>

              {/* Social Login */}
              <div className="space-y-3 mb-6">
                <Button 
                  variant="outline" 
                  className="w-full brand-button-secondary flex items-center justify-center space-x-3"
                >
                  <Github className="w-5 h-5" />
                  <span>Continue with GitHub</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full brand-button-secondary flex items-center justify-center space-x-3"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Continue with Google</span>
                </Button>
              </div>

              <div className="relative mb-6">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-card px-3 text-sm text-brand-muted">
                  or {mode === "login" ? "sign in" : "sign up"} with email
                </span>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === "signup" && (
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-brand-text">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="pl-10 bg-brand-accent/20 border-brand-gold/20 focus:border-brand-gold"
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-brand-text">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="pl-10 bg-brand-accent/20 border-brand-gold/20 focus:border-brand-gold"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-brand-text">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className="pl-10 pr-10 bg-brand-accent/20 border-brand-gold/20 focus:border-brand-gold"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-gold"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Password strength indicator */}
                  {mode === "signup" && formData.password && (
                    <div className="space-y-2 mt-3">
                      <div className="text-xs text-brand-muted">Password requirements:</div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {[
                          { label: "8+ characters", valid: passwordChecks.minLength },
                          { label: "Uppercase", valid: passwordChecks.hasUpper },
                          { label: "Lowercase", valid: passwordChecks.hasLower },
                          { label: "Number", valid: passwordChecks.hasNumber },
                          { label: "Special char", valid: passwordChecks.hasSpecial }
                        ].map((check, index) => (
                          <div key={index} className={`flex items-center space-x-1 ${
                            check.valid ? "text-green-400" : "text-brand-muted"
                          }`}>
                            <div className={`w-2 h-2 rounded-full ${
                              check.valid ? "bg-green-400" : "bg-brand-muted/30"
                            }`} />
                            <span>{check.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {mode === "signup" && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-brand-text">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                        className="pl-10 bg-brand-accent/20 border-brand-gold/20 focus:border-brand-gold"
                        required
                      />
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full brand-button-primary mt-6"
                  disabled={isLoading || (mode === "signup" && !isPasswordValid)}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-brand-dark/30 border-t-brand-dark rounded-full animate-spin" />
                      <span>{mode === "login" ? "Signing in..." : "Creating account..."}</span>
                    </div>
                  ) : (
                    mode === "login" ? "Sign In" : "Create Account"
                  )}
                </Button>
              </form>

              {/* Footer */}
              <div className="text-center mt-6">
                <p className="text-sm text-brand-muted">
                  {mode === "login" ? "Don't have an account?" : "Already have an account?"}
                  <button
                    onClick={() => setMode(mode === "login" ? "signup" : "login")}
                    className="ml-2 text-brand-gold hover:underline font-medium"
                  >
                    {mode === "login" ? "Sign up" : "Sign in"}
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;