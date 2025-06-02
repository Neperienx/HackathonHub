import { Route } from "wouter";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import Layout from "@/components/Layout";
import Landing from "@/pages/Landing";
import Rules from "@/pages/Rules";
import Resources from "@/pages/Resources";
import TeamSignUp from "@/pages/TeamSignUp";
import Dashboard from "@/pages/Dashboard";
import Submission from "@/pages/Submission";
import Evaluation from "@/pages/Evaluation";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <TooltipProvider>
      <Layout>
        <Route path="/" component={Landing} />
        <Route path="/rules" component={Rules} />
        <Route path="/resources" component={Resources} />
        <Route path="/signup" component={TeamSignUp} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/submission" component={Submission} />
        <Route path="/evaluation" component={Evaluation} />
        <Route component={NotFound} />
        <Toaster />
      </Layout>
    </TooltipProvider>
  );
}

export default App;
