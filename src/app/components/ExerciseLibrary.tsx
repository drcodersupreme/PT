import { useState } from "react";
import { Link } from "react-router";
import { Dumbbell, Search, Filter, Calendar, TrendingUp, Flame, User, Menu, Bell } from "lucide-react";

export function ExerciseLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMuscle, setSelectedMuscle] = useState("all");

  const muscleGroups = ["All", "Chest", "Back", "Shoulders", "Arms", "Legs", "Core"];

  const exercises = [
    { id: 1, name: "Bench Press", muscle: "Chest", difficulty: "Intermediate", equipment: "Barbell" },
    { id: 2, name: "Squats", muscle: "Legs", difficulty: "Intermediate", equipment: "Barbell" },
    { id: 3, name: "Deadlifts", muscle: "Back", difficulty: "Advanced", equipment: "Barbell" },
    { id: 4, name: "Shoulder Press", muscle: "Shoulders", difficulty: "Intermediate", equipment: "Dumbbells" },
    { id: 5, name: "Pull-ups", muscle: "Back", difficulty: "Advanced", equipment: "Pull-up Bar" },
    { id: 6, name: "Bicep Curls", muscle: "Arms", difficulty: "Beginner", equipment: "Dumbbells" },
    { id: 7, name: "Tricep Dips", muscle: "Arms", difficulty: "Intermediate", equipment: "Bodyweight" },
    { id: 8, name: "Lunges", muscle: "Legs", difficulty: "Beginner", equipment: "Bodyweight" },
    { id: 9, name: "Plank", muscle: "Core", difficulty: "Beginner", equipment: "Bodyweight" },
    { id: 10, name: "Lat Pulldown", muscle: "Back", difficulty: "Intermediate", equipment: "Cable Machine" },
    { id: 11, name: "Leg Press", muscle: "Legs", difficulty: "Intermediate", equipment: "Machine" },
    { id: 12, name: "Incline Bench", muscle: "Chest", difficulty: "Intermediate", equipment: "Dumbbells" },
  ];

  const filteredExercises = exercises.filter((ex) => {
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMuscle = selectedMuscle === "all" || ex.muscle === selectedMuscle;
    return matchesSearch && matchesMuscle;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500/10 text-green-400 border-green-500/20";
      case "Intermediate": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "Advanced": return "bg-red-500/10 text-red-400 border-red-500/20";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

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
            { to: "/exercises", icon: Dumbbell, label: "Exercises", active: true },
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
            <h1 className="text-3xl mb-1" style={{ fontWeight: 700 }}>Exercise Library</h1>
            <p className="text-muted-foreground">{filteredExercises.length} exercises available</p>
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

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search exercises..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            />
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            <Filter className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            {muscleGroups.map((muscle) => (
              <button
                key={muscle}
                onClick={() => setSelectedMuscle(muscle === "All" ? "all" : muscle)}
                className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                  (muscle === "All" && selectedMuscle === "all") || muscle === selectedMuscle
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "bg-card border border-border hover:border-primary/30"
                }`}
              >
                {muscle}
              </button>
            ))}
          </div>
        </div>

        {/* Exercise Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((exercise) => (
            <Link
              key={exercise.id}
              to={`/exercises/${exercise.id}`}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all"
            >
              <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 mb-4 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/10 transition-all">
                <Dumbbell className="w-12 h-12 text-primary" />
              </div>

              <h3 className="text-xl mb-2" style={{ fontWeight: 600 }}>{exercise.name}</h3>

              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 text-xs text-primary">
                  {exercise.muscle}
                </span>
                <span className={`px-3 py-1 rounded-lg border text-xs ${getDifficultyColor(exercise.difficulty)}`}>
                  {exercise.difficulty}
                </span>
              </div>

              <p className="text-sm text-muted-foreground">{exercise.equipment}</p>
            </Link>
          ))}
        </div>

        {filteredExercises.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No exercises found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
