import { useLocation } from "wouter";
import { Rocket, Flag, Target, Upload, Trophy, Clock, Users, Gift, Zap, Lightbulb, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import config from "@/data/config.json";

const Landing = () => {
  const [, setLocation] = useLocation();
  const { user, signInWithGoogle } = useAuth();

  const timelineIcons = [Rocket, Flag, Target, Upload, Trophy];
  const timelineColors = [
    "bg-purple-600",
    "bg-blue-600", 
    "bg-cyan-600",
    "bg-indigo-600",
    "bg-violet-600"
  ];

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
            
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              {config.landing.title}
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-4xl mx-auto leading-relaxed">
              {config.landing.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {user ? (
                <button
                  className="btn-innovation group relative overflow-hidden"
                  onClick={() => setLocation('/projects')}
                >
                  <div className="relative z-10 flex items-center">
                    <Zap className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                    Go to My Projects
                  </div>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </button>
              ) : (
                <button
                  className="btn-innovation group relative overflow-hidden"
                  onClick={signInWithGoogle}
                >
                  <div className="relative z-10 flex items-center">
                    <Users className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                    Start Your Innovation Journey
                  </div>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </button>
              )}
              
              <button
                className="px-8 py-3 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                onClick={() => setLocation('/rules')}
              >
                <Flag className="mr-2 h-5 w-5 inline" />
                View Guidelines
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Innovation Timeline</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Your journey from idea to impact - key milestones that will shape your innovation</p>
        </div>

        <div className="timeline-modern">
          <div className="space-y-12 md:space-y-16">
            {config.landing.timeline.map((item, index) => {
              const Icon = timelineIcons[index];
              const colorClass = timelineColors[index];
              const isLeft = index % 2 === 0;
              
              return (
                <div key={index} className="relative flex items-center">
                  <div className={`flex-shrink-0 w-16 h-16 ${colorClass} rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 innovation-glow ${
                    isLeft ? 'ml-0 md:ml-auto md:mr-8' : 'ml-0 md:ml-8 order-1 md:order-2'
                  }`}>
                    <Icon className="text-white w-8 h-8" />
                  </div>
                  <div className={`ml-8 md:ml-0 md:w-1/2 ${
                    isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 order-2 md:order-1'
                  }`}>
                    <div className="glass-card p-6 rounded-2xl">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.label}</h3>
                      <p className="text-lg text-purple-600 font-semibold mb-3">{item.date}</p>
                      <p className="text-gray-600 leading-relaxed">
                        {index === 0 && "Registration opens and rules announced - Begin your journey"}
                        {index === 1 && "Official start and team formation - Collaborate and ideate"}
                        {index === 2 && "Progress review and mentor feedback - Refine your vision"}
                        {index === 3 && "Final project submissions due - Showcase your innovation"}
                        {index === 4 && "Winners announced and celebration - Recognize excellence"}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Stats Section */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Join the Innovation Challenge?</h2>
            <p className="text-xl text-gray-600">Experience the thrill of turning ideas into reality</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-modern text-center p-8 group hover:scale-105 transition-all duration-300">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-innovation rounded-2xl flex items-center justify-center mx-auto group-hover:rotate-12 transition-transform duration-300">
                  <Clock className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">3 Weeks</h3>
              <p className="text-gray-600 text-lg">To transform your breakthrough idea into reality</p>
            </div>
            
            <div className="card-modern text-center p-8 group hover:scale-105 transition-all duration-300">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-innovation rounded-2xl flex items-center justify-center mx-auto group-hover:rotate-12 transition-transform duration-300">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                  <Zap className="h-3 w-3 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">{config.rules.teamSize}</h3>
              <p className="text-gray-600 text-lg">Cross-functional teams for maximum innovation</p>
            </div>
            
            <div className="card-modern text-center p-8 group hover:scale-105 transition-all duration-300">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-innovation rounded-2xl flex items-center justify-center mx-auto group-hover:rotate-12 transition-transform duration-300">
                  <Trophy className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center">
                  <Gift className="h-3 w-3 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">Epic Rewards</h3>
              <p className="text-gray-600 text-lg">Recognition, prizes, and career opportunities await</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
