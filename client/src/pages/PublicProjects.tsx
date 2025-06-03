import { useState, useEffect } from "react";
import { Globe, Calendar, User, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { db } from "@/lib/firebase";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { Project } from "@/types";

const PublicProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const publicProjectsQuery = query(
      collection(db, 'projects'),
      where('status', '==', 'public'),
      orderBy('updatedAt', 'desc')
    );

    const unsubscribe = onSnapshot(publicProjectsQuery, (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[];
      setProjects(projectsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

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
                className="card-modern group hover:scale-105 transition-all duration-300"
              >
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

                  <div className="flex items-center justify-between text-xs text-gray-500 mt-4 pt-4 border-t">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="" />
                        <AvatarFallback className="text-xs">
                          {project.userId ? project.userId.charAt(0).toUpperCase() : 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <span>Anonymous</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
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
    </div>
  );
};

export default PublicProjects;