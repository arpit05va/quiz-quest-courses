
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CourseDetail from "./pages/CourseDetail";
import TutorialDetail from "./pages/TutorialDetail";
import ArticleDetail from "./pages/ArticleDetail";
import NotFound from "./pages/NotFound";
import UserProfilePage from "./pages/UserProfilePage";
import RecruiterPanelPage from "./pages/RecruiterPanelPage";
import StudentPanelPage from "./pages/StudentPanelPage";
import TutorialsPage from "./pages/TutorialsPage";
import ArticlesPage from "./pages/ArticlesPage";
import QuizzesPage from "./pages/QuizzesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="eduplatform-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/profile" element={<UserProfilePage />} />
            <Route path="/dashboard/recruiter" element={<RecruiterPanelPage />} />
            <Route path="/dashboard/student" element={<StudentPanelPage />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/tutorials" element={<TutorialsPage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/quizzes" element={<QuizzesPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/tutorial/:id" element={<TutorialDetail />} />
            <Route path="/article/:id" element={<ArticleDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
