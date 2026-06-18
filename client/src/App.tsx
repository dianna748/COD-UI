import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import FloatingContactButton from "./components/FloatingContactButton";
import Home from "./pages/Home";
import ApiStore from "./pages/ApiStore";
import ApiDetail from "./pages/ApiDetail";
import Databases from "./pages/Databases";
import DatabaseDetailPage from "./pages/DatabaseDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Papers from "./pages/Papers";
import PaperDetail from "./pages/PaperDetail";
import UseCaseDetail from "./pages/UseCaseDetail";
import HelpCenter from "./pages/HelpCenter";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/api-store" component={ApiStore} />
      <Route path="/api-store/:slug" component={ApiDetail} />
      <Route path="/databases" component={Databases} />
      <Route path="/databases/:category" component={Databases} />
      <Route path="/database/:id" component={DatabaseDetailPage} />
      <Route path="/papers" component={Papers} />
      <Route path="/papers/:id" component={PaperDetail} />
      <Route path="/use-cases/:slug" component={UseCaseDetail} />
      <Route path="/help" component={HelpCenter} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
          <FloatingContactButton />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
