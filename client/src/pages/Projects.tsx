import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Plus, Folder, Lock, Globe, Edit, Trash2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, orderBy, onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";
import { Project } from "@/types";
import { useToast } from "@/hooks/use-toast";

const Projects = () => {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLocation('/');
      return;
    }

    const projectsQuery = query(
      collection(db, 'projects'),
      where('userId', '==', user.uid),
      orderBy('updatedAt', 'desc')
    );

    const unsubscribe = onSnapshot(projectsQuery, (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[];
      setProjects(projectsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, setLocation]);

  const createNewProject = async () => {
    if (!user) return;

    try {
      const newProject = {
        userId: user.uid,
        title: "Untitled Project",
        pitch: "",
        mvpInfo: "",
        resourcesNecessary: "",
        market: "",
        status: "private" as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, 'projects'), newProject);
      setLocation(`/project/${docRef.id}`);
      
      toast({
        title: "Project Created",
        description: "Your new project has been created successfully.",
      });
    } catch (error) {
      console.error('Error creating project:', error);
      toast({
        title: "Error",
        description: "Failed to create project. Please try again.",
        variant: "destructive",
      });
    }
  };

  const deleteProject = async (projectId: string) => {
    try {
      await deleteDoc(doc(db, 'projects', projectId));
      toast({
        title: "Project Deleted",
        description: "Your project has been deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Error",
        description: "Failed to delete project. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Loading your projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Projects</h1>
          <p className="text-xl text-gray-600">Manage and track your innovation projects</p>
        </div>
        <Button
          onClick={createNewProject}
          className="btn-innovation"
        >
          <Plus className="mr-2 h-5 w-5" />
          New Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gradient-innovation rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Folder className="h-12 w-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">No projects yet</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Start your innovation journey by creating your first project. 
            Document your ideas, track progress, and bring your vision to life.
          </p>
          <Button
            onClick={createNewProject}
            className="btn-innovation"
          >
            <Plus className="mr-2 h-5 w-5" />
            Create Your First Project
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="card-modern group hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => setLocation(`/project/${project.id}`)}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {project.title || "Untitled Project"}
                  </CardTitle>
                  <Badge
                    variant={project.status === 'public' ? 'default' : 'secondary'}
                    className={project.status === 'public' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                  >
                    {project.status === 'public' ? (
                      <Globe className="w-3 h-3 mr-1" />
                    ) : (
                      <Lock className="w-3 h-3 mr-1" />
                    )}
                    {project.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {project.pitch || "No description yet"}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(project.updatedAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex justify-end space-x-2" onClick={(e) => e.stopPropagation()}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setLocation(`/project/${project.id}`)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteProject(project.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;