import { Check, Clock, Users, Target, Award, Shield, BookOpen, Calendar, Lightbulb, Code, Presentation } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import config from "@/data/config.json";

const Rules = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          📜 Rules & Guidelines
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Everything you need to know to participate in Company Spark hackathons successfully.
        </p>
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
                <p className="text-gray-600">{config.rules.participation.eligibility}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Check className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Team Size</h3>
                <p className="text-gray-600">{config.rules.participation.teamSize}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Check className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Collaboration</h3>
                <p className="text-gray-600">{config.rules.participation.collaboration}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Check className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Individual Contributors</h3>
                <p className="text-gray-600">{config.rules.participation.individuals}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hackathon Timeline */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Clock className="h-8 w-8 text-blue-600 mr-3" />
            🕐 Hackathon Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {config.rules.timeline.map((item, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0"></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.event}</h3>
                  <p className="text-blue-600 font-medium">{item.date}</p>
                </div>
              </div>
            ))}
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
            {config.rules.projectScope.map((scope, index) => (
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
            {config.rules.submissionRequirements.map((requirement, index) => (
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
                {config.rules.evaluationCriteria.map((criteria, index) => (
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
            {config.rules.codeOfConduct.map((conduct, index) => (
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