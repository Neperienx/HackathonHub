import { useLocation } from "wouter";
import { Rocket, Flag, Target, Upload, Trophy, Clock, Users, Gift, Zap, Lightbulb, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import config from "@/data/config.json";

const Landing = () => {
  const [, setLocation] = useLocation();

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
              <button
                className="btn-innovation group relative overflow-hidden"
                onClick={() => setLocation('/signup')}
              >
                <div className="relative z-10 flex items-center">
                  <Users className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                  Start Your Innovation Journey
                </div>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
              
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Hackathon Timeline</h2>
          <p className="text-lg text-gray-600">Key dates and milestones for the competition</p>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-primary-200"></div>
          
          <div className="space-y-8">
            {config.landing.timeline.map((item, index) => {
              const Icon = timelineIcons[index];
              const colorClass = timelineColors[index];
              const isLeft = index % 2 === 0;
              
              return (
                <div key={index} className="relative flex items-center">
                  <div className={`flex-shrink-0 w-8 h-8 ${colorClass} rounded-full flex items-center justify-center ${
                    isLeft ? 'ml-0 md:ml-auto md:mr-4' : 'ml-0 md:ml-4 order-1 md:order-2'
                  }`}>
                    <Icon className="text-white w-4 h-4" />
                  </div>
                  <div className={`ml-6 md:ml-0 md:w-1/2 ${
                    isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8 order-2 md:order-1'
                  }`}>
                    <h3 className="text-lg font-semibold text-gray-900">{item.label}</h3>
                    <p className="text-gray-600">{item.date}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {index === 0 && "Registration opens and rules announced"}
                      {index === 1 && "Official start and team formation"}
                      {index === 2 && "Progress review and mentor feedback"}
                      {index === 3 && "Final project submissions due"}
                      {index === 4 && "Winners announced and celebration"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-primary-50 border-primary-100">
              <CardContent className="text-center p-6">
                <Clock className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">3 Weeks</h3>
                <p className="text-gray-600">To build your innovation</p>
              </CardContent>
            </Card>
            <Card className="bg-secondary-50 border-secondary-100">
              <CardContent className="text-center p-6">
                <Users className="h-12 w-12 text-secondary-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{config.rules.teamSize}</h3>
                <p className="text-gray-600">Per team maximum</p>
              </CardContent>
            </Card>
            <Card className="bg-emerald-50 border-emerald-100">
              <CardContent className="text-center p-6">
                <Gift className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Amazing Prizes</h3>
                <p className="text-gray-600">For winning teams</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
