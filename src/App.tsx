import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from './components/ui/sonner';
import ScrollToTop from './components/ScrollToTop';
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import CourseDetailsPage from './pages/CourseDetailsPage';
import PaymentPage from './pages/PaymentPage';
import CourseLearnPage from './pages/CourseLearnPage';
import TutorialsPage from './pages/TutorialsPage';
import TutorialDetail from './pages/TutorialDetail';
import ArticlesPage from './pages/ArticlesPage';
import ArticleDetail from './pages/ArticleDetail';
import QuizzesPage from './pages/QuizzesPage';
import QuizDetailPage from './pages/QuizDetailPage';
import QuizSummaryPage from './pages/QuizSummaryPage';
import ProblemsPage from './pages/ProblemsPage';
import ProblemDetailPage from './pages/ProblemDetailPage';
import StudentPanelPage from './pages/StudentPanelPage';
import RecruiterPanelPage from './pages/RecruiterPanelPage';
import UserProfilePage from './pages/UserProfilePage';
import ExpertDashboardPage from './pages/ExpertDashboardPage';
import SeekerDashboardPage from './pages/SeekerDashboardPage';
import AspirantPanelPage from './pages/AspirantPanelPage';
import HRPanelPage from './pages/HRPanelPage';
import ExpertConnectPage from './pages/ExpertConnectPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import HelpCenter from './pages/HelpCenter';
import FAQs from './pages/FAQs';
import Community from './pages/Community';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <ScrollToTop />
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/course/:courseId/details" element={<CourseDetailsPage />} />
            <Route path="/payment/:courseId" element={<PaymentPage />} />
            <Route path="/course/:courseId/learn" element={<CourseLearnPage />} />
            <Route path="/tutorials" element={<TutorialsPage />} />
            <Route path="/tutorial/:id" element={<TutorialDetail />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/article/:id" element={<ArticleDetail />} />
            <Route path="/quizzes" element={<QuizzesPage />} />
            <Route path="/quiz/:id" element={<QuizDetailPage />} />
            <Route path="/quiz/:id/summary" element={<QuizSummaryPage />} />
            <Route path="/quiz/:id/retake" element={<QuizDetailPage />} />
            <Route path="/problems" element={<ProblemsPage />} />
            <Route path="/problem/:id" element={<ProblemDetailPage />} />
            <Route path="/dashboard/student" element={<StudentPanelPage />} />
            <Route path="/dashboard/recruiter" element={<RecruiterPanelPage />} />
            <Route path="/dashboard/profile" element={<UserProfilePage />} />
            <Route path="/expertconnect/expert" element={<ExpertDashboardPage />} />
            <Route path="/expertconnect/seeker" element={<SeekerDashboardPage />} />
            <Route path="/aspirant-panel" element={<AspirantPanelPage />} />
            <Route path="/hr-panel" element={<HRPanelPage />} />
            <Route path="/expert-connect" element={<ExpertConnectPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/community" element={<Community />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;
