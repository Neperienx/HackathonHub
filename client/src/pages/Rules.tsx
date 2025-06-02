import { Users, CheckCircle, BarChart3, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import config from "@/data/config.json";

const Rules = () => {
  const evaluationWeights = [40, 30, 30]; // Innovation, Feasibility, Impact
  const evaluationColors = ["text-primary-600", "text-secondary-600", "text-emerald-600"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Rules & Guidelines</h1>
        <p className="text-lg text-gray-600">Everything you need to know to participate</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Team Requirements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-6 w-6 text-primary-600 mr-3" />
              Team Requirements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Team Size</h3>
                <p className="text-gray-600">{config.rules.teamSize}</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Eligibility</h3>
                <p className="text-gray-600">All company employees are eligible</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900">Cross-Department</h3>
                <p className="text-gray-600">Teams can include members from different departments</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Required Deliverables */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-6 w-6 text-secondary-600 mr-3" />
              Required Deliverables
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {config.rules.deliverables.map((deliverable, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="h-5 w-5 text-primary-600 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">{deliverable}</h3>
                  <p className="text-gray-600">
                    {index === 0 && "10-minute presentation of your solution"}
                    {index === 1 && "Working prototype or demonstration"}
                    {index === 2 && "Business viability and impact assessment"}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Evaluation Criteria */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-6 w-6 text-yellow-500 mr-3" />
            Evaluation Criteria
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {config.rules.evaluationCriteria.map((criteria, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
                <Award className={`h-12 w-12 ${evaluationColors[index]} mx-auto mb-4`} />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{criteria}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {index === 0 && "Creativity and originality of the solution"}
                  {index === 1 && "Technical viability and implementation"}
                  {index === 2 && "Business value and market potential"}
                </p>
                <div className={`text-lg font-semibold ${evaluationColors[index]}`}>
                  {evaluationWeights[index]}%
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Rules */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Additional Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-gray-600">
            <p>• All intellectual property developed during the hackathon remains with the company</p>
            <p>• Teams must use at least one existing company technology or platform</p>
            <p>• External APIs and open-source libraries are permitted</p>
            <p>• Teams may not begin development before the official kickoff</p>
            <p>• All submissions must be completed by the deadline</p>
            <p>• Judges' decisions are final</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Rules;
