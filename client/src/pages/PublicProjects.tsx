import { useState, useEffect } from "react";
import { Globe, Calendar, User, Eye, Heart, HeartOff, X, Target, Wrench, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot, addDoc, deleteDoc, doc, getDocs, updateDoc, increment } from "firebase/firestore";
import { Project, ProjectUpvote } from "@/types";
import { useToast } from "@/hooks/use-toast";

const PublicProjects = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [userUpvotes, setUserUpvotes] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    // Load public projects
    const publicProjectsQuery = query(
      collection(db, 'projects'),
      where('status', '==', 'public')
    );

    const unsubscribe = onSnapshot(publicProjectsQuery, (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[];
      
      // Sort by upvotes first, then by date
      projectsData.sort((a, b) => {
        if (b.upvotes !== a.upvotes) {
          return b.upvotes - a.upvotes;
        }
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      });
      
      setProjects(projectsData);
      setLoading(false);
    }, (error) => {
      console.error('Error loading public projects:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Load user's upvotes if authenticated
    if (!user) return;

    const loadUserUpvotes = async () => {
      try {
        const upvotesQuery = query(
          collection(db, 'upvotes'),
          where('userId', '==', user.uid)
        );
        const upvotesSnapshot = await getDocs(upvotesQuery);
        const upvotedProjects = new Set(
          upvotesSnapshot.docs.map(doc => doc.data().projectId)
        );
        setUserUpvotes(upvotedProjects);
      } catch (error) {
        console.error('Error loading user upvotes:', error);
      }
    };

    loadUserUpvotes();
  }, [user]);

  const handleUpvote = async (projectId: string) => {
    if (!user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to upvote projects.",
        variant: "destructive",
      });
      return;
    }

    try {
      const hasUpvoted = userUpvotes.has(projectId);
      
      if (hasUpvoted) {
        // Remove upvote
        const upvotesQuery = query(
          collection(db, 'upvotes'),
          where('userId', '==', user.uid),
          where('projectId', '==', projectId)
        );
        const upvotesSnapshot = await getDocs(upvotesQuery);
        
        if (!upvotesSnapshot.empty) {
          await deleteDoc(doc(db, 'upvotes', upvotesSnapshot.docs[0].id));
          await updateDoc(doc(db, 'projects', projectId), {
            upvotes: increment(-1)
          });
          
          setUserUpvotes(prev => {
            const newSet = new Set(prev);
            newSet.delete(projectId);
            return newSet;
          });
        }
      } else {
        // Add upvote
        await addDoc(collection(db, 'upvotes'), {
          projectId,
          userId: user.uid,
          createdAt: new Date().toISOString(),
        });
        
        await updateDoc(doc(db, 'projects', projectId), {
          upvotes: increment(1)
        });
        
        setUserUpvotes(prev => new Set(prev).add(projectId));
      }
    } catch (error) {
      console.error('Error handling upvote:', error);
      toast({
        title: "Error",
        description: "Failed to update upvote. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Loading public projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-innovation rounded-2xl flex items-center justify-center">
            <Globe className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Public Project Showcase</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover innovative projects from our hackathon community. Get inspired by creative solutions 
          and cutting-edge ideas from fellow innovators.
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Globe className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">No Public Projects Yet</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Be the first to share your innovation with the community! 
            Create a project and set it to public to showcase your work.
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-600">
              {projects.length} {projects.length === 1 ? 'project' : 'projects'} shared by the community
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Eye className="h-4 w-4" />
              <span>Public view</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="card-modern group hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {project.image && (
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                  </div>
                )}
                
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
                      {project.title || "Untitled Project"}
                    </CardTitle>
                    <Badge className="bg-green-100 text-green-800 shrink-0 ml-2">
                      <Globe className="w-3 h-3 mr-1" />
                      Public
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                    {project.pitch || "No description available"}
                  </p>

                  {project.mvpInfo && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">MVP Progress</h4>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {project.mvpInfo}
                      </p>
                    </div>
                  )}
                </CardHeader>
                
                <CardContent className="pt-0">
                  {project.market && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">Market Impact</h4>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {project.market}
                      </p>
                    </div>
                  )}

                  {project.resourcesNecessary && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-1">Resources Needed</h4>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {project.resourcesNecessary}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="" />
                        <AvatarFallback className="text-xs">
                          {project.userId ? project.userId.charAt(0).toUpperCase() : 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <span>Anonymous</span>
                      <span>•</span>
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant={userUpvotes.has(project.id) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleUpvote(project.id)}
                        className={`flex items-center space-x-1 ${
                          userUpvotes.has(project.id) 
                            ? "bg-red-500 hover:bg-red-600 text-white" 
                            : "hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                        }`}
                      >
                        {userUpvotes.has(project.id) ? (
                          <Heart className="w-4 h-4 fill-current" />
                        ) : (
                          <Heart className="w-4 h-4" />
                        )}
                        <span className="text-sm font-medium">{project.upvotes || 0}</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      <div className="mt-16 text-center">
        <div className="bg-gradient-card rounded-2xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Share Your Innovation</h3>
          <p className="text-gray-600 mb-4">
            Have a project you'd like to showcase? Set it to public in your project settings 
            and inspire the community with your ideas.
          </p>
          <div className="text-sm text-gray-500">
            Projects are displayed anonymously to protect privacy while sharing innovation.
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900 mb-4">
                {selectedProject.title || "Untitled Project"}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Project Image */}
              {selectedProject.image && (
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}

              {/* Project Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Project Pitch */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-purple-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Project Pitch</h3>
                  </div>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedProject.pitch || "No description available"}
                  </div>
                </div>

                {/* MVP Info */}
                {selectedProject.mvpInfo && (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Wrench className="h-5 w-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">MVP Progress</h3>
                    </div>
                    <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {selectedProject.mvpInfo}
                    </div>
                  </div>
                )}

                {/* Market Impact */}
                {selectedProject.market && (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Market Impact</h3>
                    </div>
                    <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {selectedProject.market}
                    </div>
                  </div>
                )}

                {/* Resources Needed */}
                {selectedProject.resourcesNecessary && (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-orange-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Resources Needed</h3>
                    </div>
                    <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {selectedProject.resourcesNecessary}
                    </div>
                  </div>
                )}
              </div>

              {/* Project Stats */}
              <div className="flex items-center justify-between pt-6 border-t">
                <div className="flex items-center space-x-4">
                  <Badge className="bg-green-100 text-green-800">
                    <Globe className="w-3 h-3 mr-1" />
                    Public
                  </Badge>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>Created {new Date(selectedProject.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span>{selectedProject.upvotes} upvotes</span>
                  </div>
                  
                  {user && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUpvote(selectedProject.id);
                      }}
                      variant={userUpvotes.has(selectedProject.id) ? "default" : "outline"}
                      size="sm"
                      className="flex items-center space-x-1"
                    >
                      {userUpvotes.has(selectedProject.id) ? (
                        <Heart className="h-4 w-4 text-white fill-current" />
                      ) : (
                        <HeartOff className="h-4 w-4" />
                      )}
                      <span>{userUpvotes.has(selectedProject.id) ? 'Upvoted' : 'Upvote'}</span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PublicProjects;