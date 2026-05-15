import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { LandingPage } from "./components/LandingPage";
import { LoginSignup } from "./components/LoginSignup";
import { Onboarding } from "./components/Onboarding";
import { GoalSelection } from "./components/GoalSelection";
import { Dashboard } from "./components/Dashboard";
import { WorkoutPlan } from "./components/WorkoutPlan";
import { ExerciseLibrary } from "./components/ExerciseLibrary";
import { ExerciseDetail } from "./components/ExerciseDetail";
import { WorkoutTracking } from "./components/WorkoutTracking";
import { WorkoutCompletion } from "./components/WorkoutCompletion";
import { ProgressTracking } from "./components/ProgressTracking";
import { Settings } from "./components/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: LandingPage },
      { path: "login", Component: LoginSignup },
      { path: "onboarding", Component: Onboarding },
      { path: "goals", Component: GoalSelection },
      { path: "dashboard", Component: Dashboard },
      { path: "workout-plan", Component: WorkoutPlan },
      { path: "exercises", Component: ExerciseLibrary },
      { path: "exercises/:id", Component: ExerciseDetail },
      { path: "workout/:id", Component: WorkoutTracking },
      { path: "workout-complete", Component: WorkoutCompletion },
      { path: "progress", Component: ProgressTracking },
      { path: "settings", Component: Settings },
    ],
  },
]);
