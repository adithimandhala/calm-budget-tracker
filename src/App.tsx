import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { BudgetProvider } from "./hooks/BudgetContext";
import FinancialBackground from "./components/FinancialBackground";
import DashboardPage from "./pages/DashboardPage";
import BudgetTrackerPage from "./pages/BudgetTrackerPage";
import AddExpensePage from "./pages/AddExpensePage";
import GroupsPage from "./pages/GroupsPage";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import AIAssistantPage from "./pages/AIAssistantPage";
import Auth from "./pages/Auth";
import { API } from "@/lib/api";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const hasToken = !!API.token;
  if (!hasToken) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

const AppInner = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/auth" element={<Auth onSuccess={() => {}} />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tracker"
          element={
            <ProtectedRoute>
              <BudgetTrackerPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddExpensePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assistant"
          element={
            <ProtectedRoute>
              <AIAssistantPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/groups"
          element={
            <ProtectedRoute>
              <GroupsPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BudgetProvider>
        <FinancialBackground />
        <BrowserRouter>
          <AppInner />
        </BrowserRouter>
      </BudgetProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
