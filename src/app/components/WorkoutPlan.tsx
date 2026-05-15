import { Link } from "react-router";
import { Dumbbell, Calendar, Clock, Target, Menu, Bell, User, TrendingUp, Flame } from "lucide-react";

export function WorkoutPlan() {
  const weeklyPlan = [
    {
      day: "Monday",
      name: "Push Day",
      exercises: 8,
      duration: "45 min",
      muscles: ["Chest", "Shoulders", "Triceps"],
      difficulty: "Intermediate",
      completed: true,
    },
    {
      day: "Tuesday",
      name: "Rest Day",
      isRest: true,
    },
    {
      day: "Wednesday",
      name: "Pull Day",
      exercises: 7,
      duration: "50 min",
      muscles: ["Back", "Biceps"],
      difficulty: "Intermediate",
      completed: false,
    },
    {
      day: "Thursday",
      name: "Leg Day",
      exercises: 6,
      duration: "60 min",
      muscles: ["Quads", "Hamstrings", "Calves"],
      difficulty: "Advanced",
      completed: false,
    },
    {
      day: "Friday",
      name: "Rest Day",
      isRest: true,
    },
    {
      day: "Saturday",
      name: "Upper Body",
      exercises: 9,
      duration: "55 min",
      muscles: ["Chest", "Back", "Arms"],
      difficulty: "Intermediate",
      completed: false,
    },
    {
      day: "Sunday",
      name: "Lower Body",
      exercises: 7,
      duration: "50 min",
      muscles: ["Legs", "Core"],
      difficulty: "Intermediate",
      completed: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-sidebar border-r border-sidebar-border p-6 space-y-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/30">
            <Dumbbell className="w-6 h-6 text-background" />
          </div>
          <span className="text-2xl tracking-tight" style={{ fontWeight: 700 }}>PT</span>
        </Link>

        <nav className="space-y-2">
          {[
            { to: "/dashboard", icon: TrendingUp, label: "Dashboard" },
            { to: "/workout-plan", icon: Calendar, label: "Workout Plan", active: true },
            { to: "/exercises", icon: Dumbbell, label: "Exercises" },
            { to: "/progress", icon: Flame, label: "Progress" },
            { to: "/settings", icon: User, label: "Settings" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                item.active
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span style={{ fontWeight: item.active ? 600 : 400 }}>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl mb-1" style={{ fontWeight: 700 }}>Your Weekly Plan</h1>
            <p className="text-muted-foreground">Personalized training schedule</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center hover:border-primary/30 transition-all">
              <Bell className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center hover:border-primary/30 transition-all">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Weekly Overview */}
        <div className="grid gap-6">
          {weeklyPlan.map((workout, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border transition-all ${
                workout.isRest
                  ? "bg-muted/30 border-border"
                  : workout.completed
                  ? "bg-primary/5 border-primary/20"
                  : "bg-card border-border hover:border-primary/30"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <p className="text-sm text-muted-foreground">{workout.day}</p>
                    {workout.completed && (
                      <span className="px-3 py-1 rounded-lg bg-primary/20 border border-primary/30 text-xs text-primary">
                        Completed
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl mb-3" style={{ fontWeight: 700 }}>{workout.name}</h3>

                  {!workout.isRest && (
                    <>
                      <div className="flex flex-wrap items-center gap-6 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Dumbbell className="w-4 h-4 text-primary" />
                          <span>{workout.exercises} exercises</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-primary" />
                          <span>{workout.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Target className="w-4 h-4 text-primary" />
                          <span>{workout.difficulty}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {workout.muscles?.map((muscle, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-lg bg-muted/50 border border-border text-xs"
                          >
                            {muscle}
                          </span>
                        ))}
                      </div>

                      <Link
                        to={`/workout/${idx + 1}`}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all text-sm"
                        style={{ fontWeight: 600 }}
                      >
                        {workout.completed ? "View Workout" : "Start Workout"}
                      </Link>
                    </>
                  )}

                  {workout.isRest && (
                    <p className="text-muted-foreground">Recovery is essential for muscle growth</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
