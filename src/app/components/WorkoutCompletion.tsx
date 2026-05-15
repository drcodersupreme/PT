import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Trophy, Flame, Clock, Dumbbell, TrendingUp, Share2 } from "lucide-react";
import confetti from "canvas-confetti";

export function WorkoutCompletion() {
  const [showStats, setShowStats] = useState(false);

  const stats = {
    workoutName: "Push Day",
    duration: "47 min",
    exercises: 8,
    totalSets: 24,
    calories: 385,
    streak: 8,
    personalRecords: 2,
  };

  const achievements = [
    { title: "Week Warrior", description: "7 day streak!", icon: Flame, color: "text-orange-400" },
    { title: "New PR", description: "Bench Press 80kg", icon: Trophy, color: "text-yellow-400" },
  ];

  useEffect(() => {
    // Celebration confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#39ff14", "#00d9ff", "#ff3366"],
    });

    setTimeout(() => setShowStats(true), 300);
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-3xl space-y-8">
        {/* Success Message */}
        <div className="text-center space-y-6">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full"></div>
            <div className="relative w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-2xl shadow-primary/40 animate-bounce">
              <Trophy className="w-16 h-16 text-background" />
            </div>
          </div>

          <div>
            <h1 className="text-5xl mb-4" style={{ fontWeight: 800 }}>Workout Complete!</h1>
            <p className="text-xl text-muted-foreground">Incredible work, you crushed it!</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className={`grid md:grid-cols-3 gap-4 transition-all duration-500 ${showStats ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <div className="p-6 rounded-2xl bg-card border border-border text-center">
            <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
            <p className="text-3xl mb-1" style={{ fontWeight: 700 }}>{stats.duration}</p>
            <p className="text-sm text-muted-foreground">Duration</p>
          </div>
          <div className="p-6 rounded-2xl bg-card border border-border text-center">
            <Dumbbell className="w-8 h-8 text-primary mx-auto mb-3" />
            <p className="text-3xl mb-1" style={{ fontWeight: 700 }}>{stats.exercises}</p>
            <p className="text-sm text-muted-foreground">Exercises</p>
          </div>
          <div className="p-6 rounded-2xl bg-card border border-border text-center">
            <Flame className="w-8 h-8 text-orange-400 mx-auto mb-3" />
            <p className="text-3xl mb-1" style={{ fontWeight: 700 }}>{stats.calories}</p>
            <p className="text-sm text-muted-foreground">Calories Burned</p>
          </div>
        </div>

        {/* Workout Summary */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-transparent border border-primary/20">
          <h2 className="text-2xl mb-6" style={{ fontWeight: 700 }}>Workout Summary</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Workout</p>
              <p className="text-xl" style={{ fontWeight: 600 }}>{stats.workoutName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Total Sets</p>
              <p className="text-xl" style={{ fontWeight: 600 }}>{stats.totalSets} sets</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Current Streak</p>
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-400" />
                <p className="text-xl text-orange-400" style={{ fontWeight: 600 }}>{stats.streak} days</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Personal Records</p>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <p className="text-xl text-yellow-400" style={{ fontWeight: 600 }}>{stats.personalRecords} new PRs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        {achievements.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl" style={{ fontWeight: 700 }}>Achievements Unlocked</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {achievements.map((achievement, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-card border border-border flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <achievement.icon className={`w-6 h-6 ${achievement.color}`} />
                  </div>
                  <div>
                    <p style={{ fontWeight: 600 }}>{achievement.title}</p>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            to="/dashboard"
            className="px-6 py-4 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all text-center"
            style={{ fontWeight: 600 }}
          >
            <TrendingUp className="w-5 h-5 inline mr-2" />
            View Progress
          </Link>
          <button className="px-6 py-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all">
            <Share2 className="w-5 h-5 inline mr-2" />
            Share Achievement
          </button>
        </div>

        <div className="text-center">
          <Link to="/workout-plan" className="text-muted-foreground hover:text-foreground transition-colors">
            Back to Workout Plan
          </Link>
        </div>
      </div>
    </div>
  );
}
