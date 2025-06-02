import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertTriangle, Send, Save, FileText, Video, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Team, Submission as SubmissionType } from "@/types";

const submissionSchema = z.object({
  teamId: z.string().min(1, "Please select a team"),
  projectTitle: z.string().min(1, "Project title is required"),
  projectSummary: z.string().min(10, "Project summary must be at least 10 characters"),
  pitchDeckUrl: z.string().url("Please enter a valid URL"),
  demoVideoUrl: z.string().url("Please enter a valid URL"),
  mvpDemoUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  businessImpact: z.string().min(10, "Business impact description must be at least 10 characters"),
  keyLearnings: z.string().min(10, "Key learnings must be at least 10 characters"),
  nextSteps: z.string().optional(),
  techStack: z.string().min(1, "Technology stack is required"),
  sourceCodeUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  submissionConfirmation: z.boolean().refine((val) => val === true, "You must confirm the submission"),
});

type SubmissionFormData = z.infer<typeof submissionSchema>;

const Submission = () => {
  const { toast } = useToast();
  const [teams] = useLocalStorage<Team[]>("hackathon_teams", []);
  const [submissions, setSubmissions] = useLocalStorage<SubmissionType[]>("hackathon_submissions", []);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<SubmissionFormData>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      teamId: "",
      projectTitle: "",
      projectSummary: "",
      pitchDeckUrl: "",
      demoVideoUrl: "",
      mvpDemoUrl: "",
      businessImpact: "",
      keyLearnings: "",
      nextSteps: "",
      techStack: "",
      sourceCodeUrl: "",
      submissionConfirmation: false,
    },
  });

  const selectedTeamId = form.watch("teamId");
  const selectedTeam = teams.find(team => team.id === selectedTeamId);

  const onSubmit = (data: SubmissionFormData) => {
    const newSubmission: SubmissionType = {
      id: Date.now().toString(),
      teamId: data.teamId,
      projectTitle: data.projectTitle,
      projectSummary: data.projectSummary,
      pitchDeckUrl: data.pitchDeckUrl,
      demoVideoUrl: data.demoVideoUrl,
      mvpDemoUrl: data.mvpDemoUrl || "",
      businessImpact: data.businessImpact,
      keyLearnings: data.keyLearnings,
      nextSteps: data.nextSteps || "",
      techStack: data.techStack,
      sourceCodeUrl: data.sourceCodeUrl || "",
      submittedAt: new Date().toISOString(),
    };

    setSubmissions([...submissions, newSubmission]);
    setIsSubmitted(true);
    
    toast({
      title: "Submission Successful!",
      description: "Your project has been submitted successfully. Judges will review all submissions after the deadline.",
    });
  };

  if (teams.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            No teams found. Please register your team first before submitting a project.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-900 mb-4">Submission Successful!</h2>
            <p className="text-green-700">Your project has been submitted successfully. Judges will review all submissions after the deadline.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Submit Your Project</h1>
        <p className="text-lg text-gray-600">Upload your final deliverables and complete your hackathon journey</p>
        
        <Alert className="mt-4 border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>Deadline: July 1, 2025 at 11:59 PM</strong> - Make sure to submit before the deadline!
          </AlertDescription>
        </Alert>
      </div>

      <Card>
        <CardContent className="p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Team Selection */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Select Your Team</h2>
                <FormField
                  control={form.control}
                  name="teamId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose your registered team..." />
                          </SelectTrigger>
                          <SelectContent>
                            {teams.map((team) => (
                              <SelectItem key={team.id} value={team.id}>
                                {team.teamName} - {team.projectName}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Project Overview */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <FileText className="h-5 w-5 text-primary-600 mr-2" />
                  Project Overview
                </h2>
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="projectTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Final Project Title *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="The complete name of your solution" 
                            {...field} 
                            defaultValue={selectedTeam?.projectName || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="projectSummary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Executive Summary *</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={5}
                            placeholder="Brief overview of your solution, problem it solves, and key benefits"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Deliverables */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Video className="h-5 w-5 text-secondary-600 mr-2" />
                  Required Deliverables
                </h2>
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="pitchDeckUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pitch Deck URL *</FormLabel>
                        <FormControl>
                          <Input placeholder="https://drive.google.com/... or similar sharing link" {...field} />
                        </FormControl>
                        <p className="text-sm text-gray-500">Link to your presentation slides (Google Drive, Dropbox, etc.)</p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="demoVideoUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Demo Video URL *</FormLabel>
                        <FormControl>
                          <Input placeholder="https://youtu.be/... or https://vimeo.com/..." {...field} />
                        </FormControl>
                        <p className="text-sm text-gray-500">Short video demonstrating your solution (2-5 minutes)</p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mvpDemoUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>MVP Demo URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://your-demo-site.com or GitHub repository" {...field} />
                        </FormControl>
                        <p className="text-sm text-gray-500">Optional: Link to your working prototype or code repository</p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Impact & Learning */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Laptop className="h-5 w-5 text-green-600 mr-2" />
                  Impact & Learnings
                </h2>
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="businessImpact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Impact *</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={4}
                            placeholder="Describe the potential business value, market opportunity, and expected impact of your solution"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="keyLearnings"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Key Learnings *</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={4}
                            placeholder="What did your team learn during development? What challenges did you overcome?"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="nextSteps"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Next Steps</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={3}
                            placeholder="If you were to continue development, what would be the next priorities?"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Technical Details */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Technical Implementation</h2>
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="techStack"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Technology Stack *</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={3}
                            placeholder="List the technologies, frameworks, and tools used in your solution"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sourceCodeUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Source Code Repository</FormLabel>
                        <FormControl>
                          <Input placeholder="https://github.com/..." {...field} />
                        </FormControl>
                        <p className="text-sm text-gray-500">Optional: GitHub, GitLab, or other repository link</p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Submission Confirmation */}
              <div>
                <FormField
                  control={form.control}
                  name="submissionConfirmation"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 bg-gray-50 rounded-lg">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm">
                          I confirm that all information provided is accurate and complete. I understand that this submission 
                          represents our team's final deliverables for the hackathon, and all intellectual property developed 
                          belongs to the company as outlined in the competition rules.
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline">
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>
                <Button type="submit">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Project
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Submission;
