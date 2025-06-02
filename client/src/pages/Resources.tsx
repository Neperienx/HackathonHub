import { Zap, Waves, Eye, Download, BookOpen, Video, Headphones } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import config from "@/data/config.json";

const Resources = () => {
  const technologyIcons = [Zap, Waves, Eye];
  const technologyColors = ["text-primary-600", "text-secondary-600", "text-emerald-600"];

  const additionalTechnologies = [
    {
      name: "Vision System C",
      description: "Computer vision module for object recognition and tracking",
      icon: Eye,
      color: "text-emerald-600",
      tags: ["Computer Vision", "AI/ML"]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Resources & Technologies</h1>
        <p className="text-lg text-gray-600">Available tools and technologies for your hackathon project</p>
      </div>

      {/* Technology Catalog */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Available Technologies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {config.resources.technologies.map((tech, index) => {
            const Icon = technologyIcons[index];
            const colorClass = technologyColors[index];
            
            return (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon className={`h-6 w-6 ${colorClass} mr-3`} />
                    {tech.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{tech.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <BookOpen className="h-4 w-4 mr-2" />
                    <span>Documentation available</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          
          {/* Additional technologies */}
          {additionalTechnologies.map((tech, index) => {
            const Icon = tech.icon;
            
            return (
              <Card key={`additional-${index}`} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon className={`h-6 w-6 ${tech.color} mr-3`} />
                    {tech.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{tech.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tech.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <BookOpen className="h-4 w-4 mr-2" />
                    <span>API reference provided</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Documentation & Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Documentation & Support</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Card className="border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors">
                <CardContent className="flex items-center p-4">
                  <Download className="h-6 w-6 text-red-500 mr-4" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Pitch Deck Template</h3>
                    <p className="text-sm text-gray-600">PowerPoint template for your final presentation</p>
                  </div>
                  <Download className="h-5 w-5 text-gray-400" />
                </CardContent>
              </Card>
              
              <Card className="border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors">
                <CardContent className="flex items-center p-4">
                  <BookOpen className="h-6 w-6 text-blue-500 mr-4" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">API Documentation</h3>
                    <p className="text-sm text-gray-600">Complete technical documentation for all available APIs</p>
                  </div>
                  <BookOpen className="h-5 w-5 text-gray-400" />
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-4">
              <Card className="border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors">
                <CardContent className="flex items-center p-4">
                  <Video className="h-6 w-6 text-purple-500 mr-4" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Tutorial Videos</h3>
                    <p className="text-sm text-gray-600">Step-by-step guides for getting started</p>
                  </div>
                  <Video className="h-5 w-5 text-gray-400" />
                </CardContent>
              </Card>
              
              <Card className="border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors">
                <CardContent className="flex items-center p-4">
                  <Headphones className="h-6 w-6 text-green-500 mr-4" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Technical Support</h3>
                    <p className="text-sm text-gray-600">Get help from our technical team</p>
                  </div>
                  <Headphones className="h-5 w-5 text-gray-400" />
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Resources;
