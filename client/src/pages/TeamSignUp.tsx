import { useState } from "react";
import { useLocation } from "wouter";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Trash2, Users, Lightbulb, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Team } from "@/types";

const memberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  role: z.string().optional(),
});

const teamSchema = z.object({
  teamName: z.string().min(1, "Team name is required"),
  projectName: z.string().min(1, "Project name is required"),
  projectDescription: z.string().min(10, "Project description must be at least 10 characters"),
  members: z.array(memberSchema).min(2, "At least 2 team members required").max(5, "Maximum 5 team members allowed"),
  primaryTechnology: z.string().optional(),
  termsAgreement: z.boolean().refine((val) => val === true, "You must agree to the terms"),
});

type TeamFormData = z.infer<typeof teamSchema>;

const TeamSignUp = () => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [teams, setTeams] = useLocalStorage<Team[]>("hackathon_teams", []);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<TeamFormData>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      teamName: "",
      projectName: "",
      projectDescription: "",
      members: [
        { name: "", email: "", role: "" },
        { name: "", email: "", role: "" },
      ],
      primaryTechnology: "",
      termsAgreement: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "members",
  });

  const onSubmit = (data: TeamFormData) => {
    const newTeam: Team = {
      id: Date.now().toString(),
      teamName: data.teamName,
      projectName: data.projectName,
      projectDescription: data.projectDescription,
      members: data.members,
      primaryTechnology: data.primaryTechnology || "",
      status: "ideation",
      progress: 25,
      createdAt: new Date().toISOString(),
    };

    setTeams([...teams, newTeam]);
    setIsSubmitted(true);
    
    toast({
      title: "Registration Successful!",
      description: "Your team has been registered. Check the dashboard to view and manage your team.",
    });

    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  const addMember = () => {
    if (fields.length < 5) {
      append({ name: "", email: "", role: "" });
    }
  };

  const removeMember = (index: number) => {
    if (fields.length > 2) {
      remove(index);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Save className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-900 mb-4">Registration Successful!</h2>
            <p className="text-green-700 mb-6">Your team has been registered. Redirecting to dashboard...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Register Your Team</h1>
        <p className="text-lg text-gray-600">Join the hackathon and start building your innovation</p>
      </div>

      <Card>
        <CardContent className="p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Team Information */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Users className="h-5 w-5 text-primary-600 mr-2" />
                  Team Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="teamName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Team Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your team name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="projectName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="What will you build?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="projectDescription"
                  render={({ field }) => (
                    <FormItem className="mt-6">
                      <FormLabel>Project Description *</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder="Briefly describe your project idea..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Team Members */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Team Members (2-5 required)</h2>
                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <Card key={field.id} className="border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-medium text-gray-900">
                            {index === 0 ? "Team Leader" : `Team Member ${index + 1}`}
                          </h3>
                          {fields.length > 2 && index > 0 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeMember(index)}
                              className="text-red-600 hover:text-red-800 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name={`members.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Member name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`members.${index}.email`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email *</FormLabel>
                                <FormControl>
                                  <Input placeholder="email@company.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`members.${index}.role`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Role</FormLabel>
                                <FormControl>
                                  <Input placeholder="Developer, Designer, etc." {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {fields.length < 5 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addMember}
                    className="mt-4"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Team Member
                  </Button>
                )}
              </div>

              {/* Technology Selection */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Lightbulb className="h-5 w-5 text-green-600 mr-2" />
                  Primary Technology (Optional)
                </h2>
                <FormField
                  control={form.control}
                  name="primaryTechnology"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a primary technology..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="radar-sensor-a">Radar Sensor A</SelectItem>
                            <SelectItem value="ultrasonic-module-b">Ultrasonic Module B</SelectItem>
                            <SelectItem value="vision-system-c">Vision System C</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Terms Agreement */}
              <div>
                <FormField
                  control={form.control}
                  name="termsAgreement"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm">
                          I acknowledge that my team has read and agrees to the hackathon rules and guidelines, 
                          and that all intellectual property developed during the event belongs to the company.
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => navigate('/')}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  Register Team
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamSignUp;
