import { Route } from "wouter";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import Landing from "@/pages/Landing";
import Rules from "@/pages/Rules";
import Projects from "@/pages/Projects";
import ProjectEditor from "@/pages/ProjectEditor";
import PublicProjects from "@/pages/PublicProjects";
import Auth from "@/pages/Auth";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <TooltipProvider>
      <AuthProvider>
        <Layout>
          <Route path="/" component={Landing} />
          <Route path="/rules" component={Rules} />
          <Route path="/showcase" component={PublicProjects} />
          <Route path="/projects" component={Projects} />
          <Route path="/project/:id" component={ProjectEditor} />
          <Route path="/auth" component={Auth} />
          <Route path="/:rest*" component={NotFound} />
          <Toaster />
        </Layout>
      </AuthProvider>
    </TooltipProvider>
  );
}

export default App;
