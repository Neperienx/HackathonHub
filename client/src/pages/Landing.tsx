import { useLocation } from "wouter";
import { Rocket, Users, Gift, Zap, Lightbulb, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import homeConfig from "@/data/homeConfig.json";

const Landing = () => {
  const [, setLocation] = useLocation();
  const { user } = useAuth();

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gradient-hero text-white overflow-hidden">
        {/* Hero background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 floating-animation"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 floating-animation" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 floating-animation" style={{animationDelay: '4s'}}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            <div className="flex justify-center items-center mb-8">
              <div className="relative">
                <Lightbulb className="text-yellow-400 text-8xl mb-4 floating-animation" />
                <Sparkles className="absolute -top-2 -right-2 text-cyan-400 text-2xl pulse-innovation" />
                <Zap className="absolute -bottom-2 -left-2 text-purple-400 text-xl floating-animation" style={{animationDelay: '1s'}} />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent leading-tight">
              {homeConfig.tagline}
            </h1>
            
            <div className="relative mb-10">
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-cyan-300 max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
                {homeConfig.subtitle}
              </p>
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            </div>
            
            <p className="text-lg md:text-xl mb-12 text-blue-200 max-w-4xl mx-auto leading-relaxed">
              {homeConfig.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {user ? (
                <>
                  <Button
                    size="lg"
                    className="bg-white text-purple-700 hover:bg-gray-100 font-semibold px-8 py-4 text-lg shadow-xl"
                    onClick={() => setLocation("/projects")}
                  >
                    <Rocket className="mr-2 h-5 w-5" />
                    Start Your Project
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-purple-700 font-semibold px-8 py-4 text-lg"
                    onClick={() => setLocation("/public-projects")}
                  >
                    Explore Projects
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size="lg"
                    className="bg-white text-purple-700 hover:bg-gray-100 font-semibold px-8 py-4 text-lg shadow-xl"
                    onClick={() => setLocation("/auth")}
                  >
                    <Users className="mr-2 h-5 w-5" />
                    Join Now
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-purple-700 font-semibold px-8 py-4 text-lg"
                    onClick={() => setLocation("/rules")}
                  >
                    Learn More
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Why Participate Section */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-purple-50"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {homeConfig.whyParticipate.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join Company Spark and unlock your potential while making a real impact on our organization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {homeConfig.whyParticipate.benefits.map((benefit, index) => {
              const icons = [Lightbulb, Users, Zap, Gift];
              const IconComponent = icons[index] || Lightbulb;
              
              return (
                <div
                  key={index}
                  className="card-modern group hover:scale-105 transition-all duration-300 p-8 text-center"
                >
                  <div className="w-16 h-16 bg-gradient-innovation rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {homeConfig.howItWorks.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to join and participate in Company Spark hackathons.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {homeConfig.howItWorks.steps.map((step, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-innovation rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 pt-2">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="relative py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Spark Innovation?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of colleagues who are already transforming ideas into reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Button
                size="lg"
                className="bg-white text-purple-700 hover:bg-gray-100 font-semibold px-8 py-4 text-lg"
                onClick={() => setLocation("/projects")}
              >
                Create Your Project
              </Button>
            ) : (
              <Button
                size="lg"
                className="bg-white text-purple-700 hover:bg-gray-100 font-semibold px-8 py-4 text-lg"
                onClick={() => setLocation("/auth")}
              >
                Get Started Today
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;