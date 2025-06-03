import { Route } from "wouter";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import Landing from "@/pages/Landing";
import Rules from "@/pages/Rules";
import Projects from "@/pages/Projects";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <TooltipProvider>
      <AuthProvider>
        <Layout>
          <Route path="/" component={Landing} />
          <Route path="/rules" component={Rules} />
          <Route path="/projects" component={Projects} />
          <Route component={NotFound} />
          <Toaster />
        </Layout>
      </AuthProvider>
    </TooltipProvider>
  );
}

export default App;
