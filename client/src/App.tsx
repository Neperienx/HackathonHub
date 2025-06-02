import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <TooltipProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/signup" element={<TeamSignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/submission" element={<Submission />} />
            <Route path="/evaluation" element={<Evaluation />} />
          </Routes>
        </Layout>
        <Toaster />
      </Router>
    </TooltipProvider>
  );
}

export default App;
