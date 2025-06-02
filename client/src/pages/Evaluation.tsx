import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Star, Gavel, Download, Video, FileText, ExternalLink, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Team, Submission, Evaluation } from "@/types";

const evaluationSchema = z.object({
  innovation: z.number().min(1).max(10),
  feasibility: z.number().min(1).max(10),
  impact: z.number().min(1).max(10),
  innovationNotes: z.string().optional(),
  feasibilityNotes: z.string().optional(),
  impactNotes: z.string().optional(),
  finalComments: z.string().min(10, "Overall feedback must be at least 10 characters"),
});

type EvaluationFormData = z.infer<typeof evaluationSchema>;

const Evaluation = () => {
  const { toast } = useToast();
  const [teams] = useLocalStorage<Team[]>("hackathon_teams", []);
  const [submissions] = useLocalStorage<Submission[]>("hackathon_submissions", []);
  const [evaluations, setEvaluations] = useLocalStorage<Evaluation[]>("hackathon_evaluations", []);
  const [currentSubmissionIndex, setCurrentSubmissionIndex] = useState(0);

  const form = useForm<EvaluationFormData>({
    resolver: zodResolver(evaluationSchema),
    defaultValues: {
      innovation: 5,
      feasibility: 5,
      impact: 5,
      innovationNotes: "",
      feasibilityNotes: "",
      impactNotes: "",
      finalComments: "",
    },
  });

  const innovation = form.watch("innovation");
  const feasibility = form.watch("feasibility");
  const impact = form.watch("impact");

  // Calculate weighted score: Innovation 40%, Feasibility 30%, Impact 30%
  const overallScore = (innovation * 0.4 + feasibility * 0.3 + impact * 0.3).toFixed(1);

  const currentSubmission = submissions[currentSubmissionIndex];
  const currentTeam = currentSubmission ? teams.find(team => team.id === currentSubmission.teamId) : null;

  const onSubmit = (data: EvaluationFormData) => {
    if (!currentSubmission) return;

    const newEvaluation: Evaluation = {
      id: Date.now().toString(),
      submissionId: currentSubmission.id,
      teamId: currentSubmission.teamId,
      innovation: data.innovation,
      feasibility: data.feasibility,
      impact: data.impact,
      innovationNotes: data.innovationNotes || "",
      feasibilityNotes: data.feasibilityNotes || "",
      impactNotes: data.impactNotes || "",
      finalComments: data.finalComments,
      overallScore: parseFloat(overallScore),
      evaluatedAt: new Date().toISOString(),
    };

    setEvaluations([...evaluations, newEvaluation]);
    
    toast({
      title: "Evaluation Submitted",
      description: "Your evaluation has been saved successfully.",
    });

    // Move to next submission
    if (currentSubmissionIndex < submissions.length - 1) {
      setCurrentSubmissionIndex(currentSubmissionIndex + 1);
      form.reset();
    }
  };

  if (submissions.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center py-12">
          <Gavel className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions to evaluate</h3>
          <p className="text-gray-600">Submissions will appear here after teams submit their projects.</p>
        </div>
      </div>
    );
  }

  if (!currentSubmission || !currentTeam) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">All submissions evaluated</h3>
          <p className="text-gray-600">You have completed evaluating all submitted projects.</p>
          <Button className="mt-4">
            <Download className="mr-2 h-4 w-4" />
            Export Results
          </Button>
        </div>
      </div>
    );
  }

  const isEvaluated = evaluations.some(evaluation => evaluation.submissionId === currentSubmission.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Project Evaluation</h1>
        <p className="text-lg text-gray-600">Judge panel interface for scoring submitted projects</p>
        
        <div className="mt-4 flex items-center justify-center space-x-4">
          <Badge variant="outline">
            <Gavel className="h-4 w-4 mr-2" />
            Judge Panel Access
          </Badge>
          <span className="text-sm text-gray-500">
            Project {currentSubmissionIndex + 1} of {submissions.length}
          </span>
        </div>
      </div>

      {/* Evaluation Criteria Reference */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Evaluation Criteria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary-600 mb-2">40%</div>
              <h3 className="font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-sm text-gray-600">Creativity and novel use of existing technologies</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600 mb-2">30%</div>
              <h3 className="font-semibold text-gray-900 mb-2">Feasibility</h3>
              <p className="text-sm text-gray-600">Technical viability and implementation practicality</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">30%</div>
              <h3 className="font-semibold text-gray-900 mb-2">Impact</h3>
              <p className="text-sm text-gray-600">Business value and potential market impact</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Evaluation */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">{currentSubmission.projectTitle}</h3>
              <p className="text-primary-100">Team: {currentTeam.teamName}</p>
            </div>
            <div className="text-right">
              {isEvaluated ? (
                <Badge className="bg-green-100 text-green-800">
                  <Check className="h-4 w-4 mr-1" />
                  Evaluated
                </Badge>
              ) : (
                <div>
                  <div className="text-2xl font-bold">{overallScore}</div>
                  <div className="text-primary-100 text-sm">Total Score</div>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          {/* Project Summary */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-2">Project Summary</h4>
            <p className="text-gray-600 text-sm">{currentSubmission.projectSummary}</p>
          </div>

          {/* Deliverables Links */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Deliverables</h4>
            <div className="flex flex-wrap gap-3">
              <a 
                href={currentSubmission.pitchDeckUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
              >
                <FileText className="w-4 h-4 mr-2" />
                Pitch Deck
              </a>
              <a 
                href={currentSubmission.demoVideoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
              >
                <Video className="w-4 h-4 mr-2" />
                Demo Video
              </a>
              {currentSubmission.mvpDemoUrl && (
                <a 
                  href={currentSubmission.mvpDemoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </a>
              )}
            </div>
          </div>

          {/* Evaluation Form */}
          {!isEvaluated && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Innovation Score */}
                  <div className="space-y-4">
                    <div className="text-center">
                      <h5 className="font-medium text-gray-900 mb-2">Innovation (40%)</h5>
                      <p className="text-sm text-gray-600 mb-4">Creativity and originality of the solution</p>
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="innovation"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="space-y-2">
                              <Slider
                                value={[field.value]}
                                onValueChange={(value) => field.onChange(value[0])}
                                max={10}
                                min={1}
                                step={1}
                                className="w-full"
                              />
                              <div className="flex justify-between text-xs text-gray-500">
                                <span>1</span>
                                <span className="font-medium">{field.value}/10</span>
                                <span>10</span>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="innovationNotes"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              rows={3}
                              placeholder="Comments on innovation..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* Feasibility Score */}
                  <div className="space-y-4">
                    <div className="text-center">
                      <h5 className="font-medium text-gray-900 mb-2">Feasibility (30%)</h5>
                      <p className="text-sm text-gray-600 mb-4">Technical viability and implementation quality</p>
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="feasibility"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="space-y-2">
                              <Slider
                                value={[field.value]}
                                onValueChange={(value) => field.onChange(value[0])}
                                max={10}
                                min={1}
                                step={1}
                                className="w-full"
                              />
                              <div className="flex justify-between text-xs text-gray-500">
                                <span>1</span>
                                <span className="font-medium">{field.value}/10</span>
                                <span>10</span>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="feasibilityNotes"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              rows={3}
                              placeholder="Comments on feasibility..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* Impact Score */}
                  <div className="space-y-4">
                    <div className="text-center">
                      <h5 className="font-medium text-gray-900 mb-2">Impact (30%)</h5>
                      <p className="text-sm text-gray-600 mb-4">Business value and market potential</p>
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="impact"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="space-y-2">
                              <Slider
                                value={[field.value]}
                                onValueChange={(value) => field.onChange(value[0])}
                                max={10}
                                min={1}
                                step={1}
                                className="w-full"
                              />
                              <div className="flex justify-between text-xs text-gray-500">
                                <span>1</span>
                                <span className="font-medium">{field.value}/10</span>
                                <span>10</span>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="impactNotes"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              rows={3}
                              placeholder="Comments on business impact..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                {/* Overall Score Calculation */}
                <Card className="bg-gray-50">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h6 className="font-semibold text-gray-900">Overall Score</h6>
                        <p className="text-sm text-gray-600">Weighted average based on criteria</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-primary-600">{overallScore}</p>
                        <p className="text-sm text-gray-500">out of 10.0</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Final Comments */}
                <FormField
                  control={form.control}
                  name="finalComments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Overall Feedback</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder="Provide overall feedback and suggestions for the team..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Submit Evaluation */}
                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline">
                    Save Draft
                  </Button>
                  <Button type="submit">
                    <Check className="mr-2 h-4 w-4" />
                    Submit Evaluation
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Evaluation;
