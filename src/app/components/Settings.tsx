import { Link } from "react-router";
import { Dumbbell, Calendar, TrendingUp, Flame, User, Menu, Bell, LogOut, Crown, Edit } from "lucide-react";

export function Settings() {
  const userProfile = {
    name: "Alex Johnson",
    email: "alex@example.com",
    age: 28,
    height: 175,
    weight: 72.8,
    goal: "Fat Loss",
    experience: "Intermediate",
    memberSince: "January 2026",
  };

  const achievements = [
    { title: "Early Bird", description: "Completed 10 morning workouts", unlocked: true },
    { title: "Consistent", description: "7 day workout streak", unlocked: true },
    { title: "Strong", description: "Lifted 1000kg total in one week", unlocked: true },
    { title: "Dedicated", description: "30 day workout streak", unlocked: false },
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
            { to: "/progress", icon: Flame, label: "Progress" },
            { to: "/settings", icon: User, label: "Settings", active: true },
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
            <h1 className="text-3xl mb-1" style={{ fontWeight: 700 }}>Settings & Profile</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/20">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/30">
                    <User className="w-10 h-10 text-background" />
                  </div>
                  <div>
                    <h2 className="text-2xl mb-1" style={{ fontWeight: 700 }}>{userProfile.name}</h2>
                    <p className="text-muted-foreground">{userProfile.email}</p>
                    <p className="text-sm text-muted-foreground mt-1">Member since {userProfile.memberSince}</p>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-xl bg-card border border-border hover:border-primary/30 transition-all flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
              </div>
            </div>

            {/* Personal Information */}
            <div className="p-8 rounded-2xl bg-card border border-border">
              <h3 className="text-xl mb-6" style={{ fontWeight: 700 }}>Personal Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Age</p>
                  <p className="text-lg" style={{ fontWeight: 600 }}>{userProfile.age} years</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Height</p>
                  <p className="text-lg" style={{ fontWeight: 600 }}>{userProfile.height} cm</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Weight</p>
                  <p className="text-lg" style={{ fontWeight: 600 }}>{userProfile.weight} kg</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Experience Level</p>
                  <p className="text-lg" style={{ fontWeight: 600 }}>{userProfile.experience}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground mb-2">Fitness Goal</p>
                  <p className="text-lg" style={{ fontWeight: 600 }}>{userProfile.goal}</p>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="p-8 rounded-2xl bg-card border border-border">
              <h3 className="text-xl mb-6" style={{ fontWeight: 700 }}>Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border">
                  <div>
                    <p style={{ fontWeight: 600 }}>Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive workout reminders</p>
                  </div>
                  <div className="w-12 h-7 rounded-full bg-primary flex items-center px-1 cursor-pointer">
                    <div className="w-5 h-5 rounded-full bg-background ml-auto"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border">
                  <div>
                    <p style={{ fontWeight: 600 }}>Rest Day Reminders</p>
                    <p className="text-sm text-muted-foreground">Get notified on rest days</p>
                  </div>
                  <div className="w-12 h-7 rounded-full bg-primary flex items-center px-1 cursor-pointer">
                    <div className="w-5 h-5 rounded-full bg-background ml-auto"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border">
                  <div>
                    <p style={{ fontWeight: 600 }}>Progress Updates</p>
                    <p className="text-sm text-muted-foreground">Weekly progress summaries</p>
                  </div>
                  <div className="w-12 h-7 rounded-full bg-muted flex items-center px-1 cursor-pointer">
                    <div className="w-5 h-5 rounded-full bg-background"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button className="flex-1 px-6 py-3.5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all">
                Change Password
              </button>
              <button className="flex-1 px-6 py-3.5 rounded-xl bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20 transition-all flex items-center justify-center gap-2">
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Subscription */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-yellow-500/20 via-yellow-500/10 to-transparent border border-yellow-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Crown className="w-6 h-6 text-yellow-400" />
                <h3 className="text-lg" style={{ fontWeight: 700 }}>Premium</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Unlock advanced features, custom plans, and personalized coaching
              </p>
              <button className="w-full px-6 py-3 rounded-xl bg-yellow-400 text-background hover:bg-yellow-500 transition-all" style={{ fontWeight: 600 }}>
                Upgrade Now
              </button>
            </div>

            {/* Achievements */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="text-lg mb-4" style={{ fontWeight: 700 }}>Achievements</h3>
              <div className="space-y-3">
                {achievements.map((achievement, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border ${
                      achievement.unlocked
                        ? "bg-primary/5 border-primary/20"
                        : "bg-muted/20 border-border opacity-50"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-1">
                      {achievement.unlocked && <Crown className="w-4 h-4 text-yellow-400" />}
                      <p className="text-sm" style={{ fontWeight: 600 }}>{achievement.title}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* App Info */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="text-lg mb-4" style={{ fontWeight: 700 }}>About</h3>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">Version 1.0.0</p>
                <a href="#" className="block text-primary hover:underline">Privacy Policy</a>
                <a href="#" className="block text-primary hover:underline">Terms of Service</a>
                <a href="#" className="block text-primary hover:underline">Help & Support</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
