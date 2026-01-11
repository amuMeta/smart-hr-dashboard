import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ReportGeneration from "./pages/ReportGeneration";
import TalentProfile from "./pages/TalentProfile";
import SmartRecruitment from "./pages/SmartRecruitment";
import EmployeeWellbeing from "./pages/EmployeeWellbeing";
import OrganizationEfficiency from "./pages/OrganizationEfficiency";
import DashboardSettings from "./pages/DashboardSettings";
import ResumeParsingPage from "./pages/ResumeParsingPage";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/reports"} component={ReportGeneration} />
      <Route path={"/talent"} component={TalentProfile} />
      <Route path={"/resume-parsing"} component={ResumeParsingPage} />
      <Route path={"/recruitment"} component={SmartRecruitment} />
      <Route path={"/wellbeing"} component={EmployeeWellbeing} />
      <Route path={"/organization"} component={OrganizationEfficiency} />
      <Route path={"/settings"} component={DashboardSettings} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
