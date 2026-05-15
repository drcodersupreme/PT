import { Link } from "react-router";
import { Dumbbell, Calendar, TrendingUp, Flame, User, Menu, Bell, Award, Target } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function ProgressTracking() {
  const weightData = [
    { week: "Week 1", weight: 75 },
    { week: "Week 2", weight: 74.5 },
    { week: "Week 3", weight: 74 },
    { week: "Week 4", weight: 73.5 },
    { week: "Week 5", weight: 73.2 },
    { week: "Week 6", weight: 72.8 },
  ];

  const workoutFrequency = [
    { month: "Jan", workouts: 12 },
    { month: "Feb", workouts: 15 },
    { month: "Mar", workouts: 18 },
    { month: "Apr", workouts: 16 },
    { month: "May", workouts: 20 },
  ];

  const personalRecords = [
    { exercise: "Bench Press", weight: "80 kg", date: "May 10, 2026" },
    { exercise: "Squat", weight: "120 kg", date: "May 8, 2026" },
    { exercise: "Deadlift", weight: "140 kg", date: "May 5, 2026" },
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
            { to: "/workout-plan", icon: Calendar, label: "Workout Plan" },
            { to: "/exercises", icon: Dumbbell, label: "Exercises" },
            { to: "/progress", icon: Flame, label: "Progress", active: true },
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
            <h1 className="text-3xl mb-1" style={{ fontWeight: 700 }}>Your Progress</h1>
            <p className="text-muted-foreground">Track your fitness journey</p>
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

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/20">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Total Workouts</p>
              <Dumbbell className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl mb-1" style={{ fontWeight: 700 }}>127</p>
            <p className="text-xs text-primary">+12 this month</p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Current Streak</p>
              <Flame className="w-5 h-5 text-orange-400" />
            </div>
            <p className="text-3xl mb-1" style={{ fontWeight: 700 }}>8 Days</p>
            <p className="text-xs text-muted-foreground">Personal best: 15</p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Weight Progress</p>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-3xl mb-1" style={{ fontWeight: 700 }}>-2.2 kg</p>
            <p className="text-xs text-muted-foreground">Last 6 weeks</p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">Personal Records</p>
              <Award className="w-5 h-5 text-yellow-400" />
            </div>
            <p className="text-3xl mb-1" style={{ fontWeight: 700 }}>{personalRecords.length}</p>
            <p className="text-xs text-muted-foreground">This month</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Weight Progress Chart */}
          <div className="p-6 rounded-2xl bg-card border border-border">
            <h3 className="text-xl mb-6" style={{ fontWeight: 700 }}>Weight Progress</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weightData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="week" stroke="#a0a0a5" />
                <YAxis stroke="#a0a0a5" domain={[72, 76]} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1a1a1f", border: "1px solid rgba(57, 255, 20, 0.2)", borderRadius: "12px" }}
                />
                <Line type="monotone" dataKey="weight" stroke="#39ff14" strokeWidth={3} dot={{ fill: "#39ff14", r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Workout Frequency */}
          <div className="p-6 rounded-2xl bg-card border border-border">
            <h3 className="text-xl mb-6" style={{ fontWeight: 700 }}>Monthly Workouts</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={workoutFrequency}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="month" stroke="#a0a0a5" />
                <YAxis stroke="#a0a0a5" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1a1a1f", border: "1px solid rgba(57, 255, 20, 0.2)", borderRadius: "12px" }}
                />
                <Bar dataKey="workouts" fill="#39ff14" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Personal Records */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-yellow-500/10 via-transparent to-transparent border border-yellow-500/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
              <Award className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="text-2xl" style={{ fontWeight: 700 }}>Personal Records</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {personalRecords.map((record, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-card/50 border border-border">
                <p className="text-lg mb-2" style={{ fontWeight: 600 }}>{record.exercise}</p>
                <p className="text-3xl text-yellow-400 mb-2" style={{ fontWeight: 700 }}>{record.weight}</p>
                <p className="text-sm text-muted-foreground">{record.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
