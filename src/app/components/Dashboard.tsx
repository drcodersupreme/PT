import { Link } from "react-router";
import { Dumbbell, Menu, Bell, User, Flame, TrendingUp, Calendar, Play, ChevronRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function Dashboard() {
  const workoutData = [
    { day: "Mon", workouts: 1 },
    { day: "Tue", workouts: 0 },
    { day: "Wed", workouts: 1 },
    { day: "Thu", workouts: 1 },
    { day: "Fri", workouts: 0 },
    { day: "Sat", workouts: 1 },
    { day: "Sun", workouts: 1 },
  ];

  const todayWorkout = {
    name: "Push Day",
    exercises: 8,
    duration: "45 min",
    difficulty: "Intermediate",
  };

  const recentActivities = [
    { name: "Bench Press", sets: "4 sets", reps: "12 reps", time: "2 hours ago" },
    { name: "Squats", sets: "5 sets", reps: "10 reps", time: "Yesterday" },
    { name: "Deadlifts", sets: "4 sets", reps: "8 reps", time: "2 days ago" },
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
            { to: "/dashboard", icon: TrendingUp, label: "Dashboard", active: true },
            { to: "/workout-plan", icon: Calendar, label: "Workout Plan" },
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
            <h1 className="text-3xl mb-1" style={{ fontWeight: 700 }}>Welcome Back, Alex</h1>
            <p className="text-muted-foreground">Ready to crush your workout?</p>
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

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Today's Workout */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent"></div>
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Today's Workout</p>
                  <h2 className="text-2xl" style={{ fontWeight: 700 }}>{todayWorkout.name}</h2>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-primary/20 border border-primary/30 text-sm text-primary">
                  {todayWorkout.difficulty}
                </div>
              </div>
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Dumbbell className="w-4 h-4 text-primary" />
                  <span>{todayWorkout.exercises} exercises</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>{todayWorkout.duration}</span>
                </div>
              </div>
              <Link
                to="/workout/1"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all"
                style={{ fontWeight: 600 }}
              >
                <Play className="w-5 h-5" />
                Start Workout
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Streak</p>
                <Flame className="w-5 h-5 text-orange-400" />
              </div>
              <p className="text-3xl" style={{ fontWeight: 700 }}>7 Days</p>
              <p className="text-sm text-muted-foreground mt-1">Keep it up!</p>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Calories Burned</p>
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <p className="text-3xl" style={{ fontWeight: 700 }}>1,247</p>
              <p className="text-sm text-muted-foreground mt-1">This week</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Weekly Activity Chart */}
          <div className="p-6 rounded-2xl bg-card border border-border">
            <h3 className="text-lg mb-6" style={{ fontWeight: 600 }}>Weekly Activity</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={workoutData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="day" stroke="#a0a0a5" />
                <YAxis stroke="#a0a0a5" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1a1a1f", border: "1px solid rgba(57, 255, 20, 0.2)", borderRadius: "12px" }}
                />
                <Line type="monotone" dataKey="workouts" stroke="#39ff14" strokeWidth={3} dot={{ fill: "#39ff14", r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Activity */}
          <div className="p-6 rounded-2xl bg-card border border-border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg" style={{ fontWeight: 600 }}>Recent Activity</h3>
              <Link to="/progress" className="text-sm text-primary hover:underline">View All</Link>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border">
                  <div>
                    <p style={{ fontWeight: 600 }}>{activity.name}</p>
                    <p className="text-sm text-muted-foreground">{activity.sets} • {activity.reps}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
