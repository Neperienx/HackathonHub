import { useState } from "react";
import { Edit, Trash2, RefreshCw, Users, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Team } from "@/types";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [teams, setTeams] = useLocalStorage<Team[]>("hackathon_teams", []);

  const updateTeamStatus = (teamId: string, newStatus: string) => {
    const updatedTeams = teams.map(team => {
      if (team.id === teamId) {
        const progressMap: { [key: string]: number } = {
          ideation: 25,
          prototyping: 50,
          testing: 75,
          submitted: 100
        };
        return {
          ...team,
          status: newStatus,
          progress: progressMap[newStatus] || 25
        };
      }
      return team;
    });
    setTeams(updatedTeams);
    
    toast({
      title: "Status Updated",
      description: "Team status has been updated successfully.",
    });
  };

  const deleteTeam = (teamId: string) => {
    const updatedTeams = teams.filter(team => team.id !== teamId);
    setTeams(updatedTeams);
    
    toast({
      title: "Team Deleted",
      description: "Team has been removed successfully.",
      variant: "destructive",
    });
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      ideation: "bg-blue-100 text-blue-800",
      prototyping: "bg-yellow-100 text-yellow-800",
      testing: "bg-orange-100 text-orange-800",
      submitted: "bg-green-100 text-green-800"
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getProgressColor = (status: string) => {
    const colors: { [key: string]: string } = {
      ideation: "bg-blue-600",
      prototyping: "bg-yellow-600",
      testing: "bg-orange-600",
      submitted: "bg-green-600"
    };
    return colors[status] || "bg-gray-600";
  };

  if (teams.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center py-12">
          <Users className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No teams registered yet</h3>
          <p className="text-gray-600 mb-6">Be the first to register your team for the hackathon!</p>
          <Button onClick={() => navigate('/signup')}>
            <UserPlus className="mr-2 h-5 w-5" />
            Register Team
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Team Dashboard</h1>
          <p className="text-lg text-gray-600">Track progress and manage team information</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">Teams Registered:</span>
          <span className="text-2xl font-bold text-primary-600">{teams.length}</span>
          <Button variant="outline" onClick={() => window.location.reload()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {teams.map((team) => (
          <Card key={team.id} className="overflow-hidden">
            <CardHeader className="border-b border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <CardTitle className="text-xl">{team.teamName}</CardTitle>
                  <p className="text-gray-600 font-medium">{team.projectName}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(team.status)}>
                    {team.status.charAt(0).toUpperCase() + team.status.slice(1)}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => deleteTeam(team.id)}
                    className="text-red-600 hover:text-red-800 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{team.projectDescription}</p>
              
              {team.primaryTechnology && (
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{team.primaryTechnology}</Badge>
                </div>
              )}
            </CardHeader>
            
            <CardContent className="p-6 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Team Members</h3>
                  <div className="space-y-2">
                    {team.members.map((member, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mr-2">
                          <span className="text-xs font-medium text-primary-600">
                            {member.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span>{member.name}</span>
                        {member.role && (
                          <span className="text-gray-400 ml-2">({member.role})</span>
                        )}
                        <span className="text-gray-400 ml-2">- {member.email}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Progress Tracking</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Status</label>
                      <Select
                        value={team.status}
                        onValueChange={(value) => updateTeamStatus(team.id, value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ideation">Ideation</SelectItem>
                          <SelectItem value="prototyping">Prototyping</SelectItem>
                          <SelectItem value="testing">Testing</SelectItem>
                          <SelectItem value="submitted">Submitted</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Progress</label>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getProgressColor(team.status)}`}
                          style={{ width: `${team.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{team.progress}% Complete</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
