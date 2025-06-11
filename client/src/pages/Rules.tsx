import { Check, Clock, Users, Target, Award, Shield, BookOpen, Calendar, Lightbulb, Code, Presentation, Rocket, Flag, Upload, Trophy, Flame, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import rulesConfig from "@/data/rulesConfig.json";

const Rules = () => {
  const timelineIcons = [Rocket, Calendar, Flag, Upload, Trophy];
  const timelineColors = [
    "bg-purple-600",
    "bg-blue-600", 
    "bg-cyan-600",
    "bg-indigo-600",
    "bg-violet-600"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          📜 {rulesConfig.title}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          {rulesConfig.description}
        </p>
      </div>

      {/* Theme Section */}
      <div className="relative py-16 mb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-red-50"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-6">
              <Flame className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Theme: "{rulesConfig.theme.title}"
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 font-medium mb-6 max-w-4xl mx-auto">
              {rulesConfig.theme.subtitle}
            </p>
          </div>

          <div className="card-modern p-8 max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-orange-600 mb-2 flex items-center justify-center">
                <Zap className="h-6 w-6 mr-2" />
                Tagline:
              </h3>
              <p className="text-xl font-semibold text-gray-800 italic">
                "{rulesConfig.theme.tagline}"
              </p>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Lightbulb className="h-6 w-6 mr-2" />
                Theme Description:
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                {rulesConfig.theme.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="relative py-16 mb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🗓️ Hackathon Timeline
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Mark your calendars and prepare for an exciting journey of innovation.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-8 bottom-8 w-1 bg-gradient-to-b from-purple-400 to-blue-400 rounded-full hidden md:block"></div>
            
            <div className="space-y-8">
              {rulesConfig.timeline.map((item, index) => {
                const IconComponent = timelineIcons[index] || Calendar;
                const colorClass = timelineColors[index] || "bg-purple-600";
                
                return (
                  <div key={index} className="relative flex items-center">
                    {/* Timeline dot */}
                    <div className={`relative z-10 w-16 h-16 ${colorClass} rounded-full flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    
                    {/* Content */}
                    <div className="ml-8 flex-1">
                      <div className="card-modern p-6 hover:scale-105 transition-all duration-300">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {item.event}
                        </h3>
                        <p className="text-lg text-blue-600 font-medium">
                          {item.date}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Participation Rules */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Users className="h-8 w-8 text-purple-600 mr-3" />
            ✅ Participation Rules
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <Check className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Eligibility</h3>
                <p className="text-gray-600">{rulesConfig.participation.eligibility}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Check className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Team Size</h3>
                <p className="text-gray-600">{rulesConfig.participation.teamSize}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Check className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Collaboration</h3>
                <p className="text-gray-600">{rulesConfig.participation.collaboration}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Check className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Individual Contributors</h3>
                <p className="text-gray-600">{rulesConfig.participation.individuals}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Scope */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Target className="h-8 w-8 text-cyan-600 mr-3" />
            💼 Project Scope
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rulesConfig.projectScope.map((scope, index) => (
              <div key={index} className="flex items-start space-x-3">
                <Lightbulb className="h-6 w-6 text-yellow-500 mt-1 flex-shrink-0" />
                <p className="text-gray-700 leading-relaxed">{scope}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Submission Requirements */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <BookOpen className="h-8 w-8 text-green-600 mr-3" />
            📦 Submission Requirements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rulesConfig.submissionRequirements.map((requirement, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">{requirement}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Evaluation Criteria */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Award className="h-8 w-8 text-yellow-600 mr-3" />
            🏆 Evaluation Criteria
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                    Criterion
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {rulesConfig.evaluationCriteria.map((criteria, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">
                      {criteria.criterion}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">
                      {criteria.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Code of Conduct */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Shield className="h-8 w-8 text-red-600 mr-3" />
            📌 Code of Conduct
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rulesConfig.codeOfConduct.map((conduct, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <Shield className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                <p className="text-gray-800 font-medium">{conduct}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="text-center mt-12 p-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Join Company Spark and be part of the innovation that shapes our company's future. 
          Collaboration over competition—let's grow ideas together!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors">
            Register for Next Event
          </button>
          <button className="px-6 py-3 border border-purple-600 text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition-colors">
            View Project Showcase
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rules;