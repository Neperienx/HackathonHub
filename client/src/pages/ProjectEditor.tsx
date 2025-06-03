import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Save, ArrowLeft, Globe, Lock, Loader2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Project } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { resizeImage, validateImageFile } from "@/lib/imageUtils";

const ProjectEditor = ({ params }: { params: { id: string } }) => {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) {
      setLocation('/auth');
      return;
    }

    const loadProject = async () => {
      try {
        const projectDoc = await getDoc(doc(db, 'projects', params.id));
        if (projectDoc.exists()) {
          const projectData = { id: projectDoc.id, ...projectDoc.data() } as Project;
          if (projectData.userId === user.uid) {
            setProject(projectData);
          } else {
            toast({
              title: "Access Denied",
              description: "You don't have permission to edit this project.",
              variant: "destructive",
            });
            setLocation('/projects');
          }
        } else {
          toast({
            title: "Project Not Found",
            description: "The project you're looking for doesn't exist.",
            variant: "destructive",
          });
          setLocation('/projects');
        }
      } catch (error) {
        console.error('Error loading project:', error);
        toast({
          title: "Error",
          description: "Failed to load project. Please try again.",
          variant: "destructive",
        });
        setLocation('/projects');
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [user, params.id, setLocation, toast]);

  const handleInputChange = (field: keyof Project, value: string) => {
    if (!project) return;
    setProject({
      ...project,
      [field]: value,
      updatedAt: new Date().toISOString(),
    });
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!validateImageFile(file)) {
      toast({
        title: "Invalid File",
        description: "Please select a valid image file (JPEG, PNG, WebP) under 10MB.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      const resizedImage = await resizeImage(file);
      handleInputChange('image', resizedImage);
      toast({
        title: "Image Uploaded",
        description: "Your project image has been uploaded successfully.",
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to process image. Please try a smaller file.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    handleInputChange('image', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const saveProject = async () => {
    if (!project || !user) return;

    setSaving(true);
    try {
      const updateData: any = {
        title: project.title,
        pitch: project.pitch,
        mvpInfo: project.mvpInfo,
        resourcesNecessary: project.resourcesNecessary,
        market: project.market,
        status: project.status,
        updatedAt: new Date().toISOString(),
      };

      if (project.image) {
        updateData.image = project.image;
      }

      await updateDoc(doc(db, 'projects', project.id), updateData);

      toast({
        title: "Project Saved",
        description: "Your project has been saved successfully.",
      });
    } catch (error: any) {
      console.error('Error saving project:', error);
      let errorMessage = "Failed to save project. Please try again.";
      
      if (error.code === 'permission-denied') {
        errorMessage = "Permission denied. Please check your Firestore security rules.";
      } else if (error.code === 'unavailable') {
        errorMessage = "Database unavailable. Please check your Firebase configuration.";
      }
      
      toast({
        title: "Save Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-purple-600" />
          <p className="text-gray-600">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => setLocation('/projects')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Projects</span>
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Edit Project</h1>
        </div>
        <div className="flex items-center space-x-3">
          <Select
            value={project.status}
            onValueChange={(value: "private" | "public") => handleInputChange('status', value)}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="private">
                <div className="flex items-center space-x-2">
                  <Lock className="h-4 w-4" />
                  <span>Private</span>
                </div>
              </SelectItem>
              <SelectItem value="public">
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span>Public</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={saveProject}
            disabled={saving}
            className="btn-innovation"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Project
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <Card className="card-modern">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>Project Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                value={project.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter your project title"
                className="mt-2"
              />
            </div>

            <div>
              <Label>Project Image</Label>
              <div className="mt-2 space-y-4">
                {project.image ? (
                  <div className="relative inline-block">
                    <img
                      src={project.image}
                      alt="Project preview"
                      className="w-full max-w-md h-48 object-cover rounded-lg border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={removeImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Upload a project image</p>
                    <p className="text-sm text-gray-500">JPEG, PNG, or WebP up to 10MB</p>
                  </div>
                )}
                
                <div className="flex items-center space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="flex items-center space-x-2"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4" />
                        <span>{project.image ? 'Change Image' : 'Upload Image'}</span>
                      </>
                    )}
                  </Button>
                  
                  {project.image && (
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={removeImage}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove Image
                    </Button>
                  )}
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="pitch">Project Pitch</Label>
              <Textarea
                id="pitch"
                value={project.pitch}
                onChange={(e) => handleInputChange('pitch', e.target.value)}
                placeholder="Describe your project idea and what problem it solves..."
                className="mt-2 min-h-[120px]"
              />
            </div>

            <div>
              <Label htmlFor="mvpInfo">MVP Information</Label>
              <Textarea
                id="mvpInfo"
                value={project.mvpInfo}
                onChange={(e) => handleInputChange('mvpInfo', e.target.value)}
                placeholder="Describe your minimum viable product, key features, and current progress..."
                className="mt-2 min-h-[120px]"
              />
            </div>

            <div>
              <Label htmlFor="resources">Resources Necessary</Label>
              <Textarea
                id="resources"
                value={project.resourcesNecessary}
                onChange={(e) => handleInputChange('resourcesNecessary', e.target.value)}
                placeholder="List the resources, tools, technologies, or team members you need..."
                className="mt-2 min-h-[100px]"
              />
            </div>

            <div>
              <Label htmlFor="market">Market & Impact</Label>
              <Textarea
                id="market"
                value={project.market}
                onChange={(e) => handleInputChange('market', e.target.value)}
                placeholder="Describe your target market, potential impact, and business model..."
                className="mt-2 min-h-[120px]"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center pt-6 border-t">
          <p className="text-sm text-gray-500">
            Last updated: {new Date(project.updatedAt).toLocaleString()}
          </p>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setLocation('/projects')}
            >
              Cancel
            </Button>
            <Button
              onClick={saveProject}
              disabled={saving}
              className="btn-innovation"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectEditor;