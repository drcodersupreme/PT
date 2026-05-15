import { Link } from "react-router";
import { ArrowLeft, Play, CheckCircle, ChevronRight, ChevronLeft, AlertCircle, Wind, Info } from "lucide-react";

export function ExerciseDetail() {
  const exercise = {
    name: "Bench Press",
    difficulty: "Intermediate",
    equipment: "Barbell",
    primaryMuscles: ["Chest"],
    secondaryMuscles: ["Triceps", "Shoulders"],
    sets: "3-4",
    reps: "8-12",
  };

  const instructions = [
    "Lie flat on the bench with your feet firmly on the ground",
    "Grip the barbell slightly wider than shoulder-width apart",
    "Lower the bar to your mid-chest in a controlled motion",
    "Press the bar back up to starting position, fully extending your arms",
    "Keep your shoulder blades retracted throughout the movement",
  ];

  const commonMistakes = [
    "Bouncing the bar off your chest",
    "Flaring elbows too wide",
    "Lifting hips off the bench",
    "Not using full range of motion",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-background/90 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/exercises" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Exercises</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/exercises/1"
              className="px-4 py-2 rounded-xl bg-card border border-border hover:border-primary/30 transition-all flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Link>
            <button className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Mark Complete
            </button>
            <Link
              to="/exercises/3"
              className="px-4 py-2 rounded-xl bg-card border border-border hover:border-primary/30 transition-all flex items-center gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-sm text-primary">
              {exercise.difficulty}
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-muted/50 border border-border text-sm">
              {exercise.equipment}
            </span>
          </div>
          <h1 className="text-5xl mb-4" style={{ fontWeight: 800 }}>{exercise.name}</h1>
          <p className="text-muted-foreground text-lg">Master this fundamental compound movement for upper body strength</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Section */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/20 aspect-video">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent"></div>
              <div className="relative z-10 h-full flex items-center justify-center">
                <button className="group w-20 h-20 rounded-full bg-primary/20 backdrop-blur-xl border border-primary/30 flex items-center justify-center hover:scale-110 transition-transform shadow-2xl shadow-primary/40">
                  <Play className="w-10 h-10 text-primary ml-1" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent">
                <p className="text-sm text-muted-foreground">Watch proper form demonstration</p>
              </div>
            </div>

            {/* Instructions */}
            <div className="p-8 rounded-2xl bg-card border border-border">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl" style={{ fontWeight: 700 }}>Step-by-Step Instructions</h2>
              </div>
              <div className="space-y-4">
                {instructions.map((instruction, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary" style={{ fontWeight: 600 }}>
                      {idx + 1}
                    </div>
                    <p className="pt-1 leading-relaxed">{instruction}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Breathing Technique */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 via-transparent to-transparent border border-blue-500/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Wind className="w-5 h-5 text-blue-400" />
                </div>
                <h2 className="text-2xl" style={{ fontWeight: 700 }}>Breathing Technique</h2>
              </div>
              <div className="space-y-3">
                <p className="leading-relaxed"><strong className="text-blue-400">Inhale:</strong> Take a deep breath as you lower the bar to your chest</p>
                <p className="leading-relaxed"><strong className="text-blue-400">Exhale:</strong> Breathe out forcefully as you press the bar back up</p>
                <p className="text-sm text-muted-foreground mt-4">Proper breathing helps maintain stability and power throughout the movement</p>
              </div>
            </div>

            {/* Common Mistakes */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-red-500/10 via-transparent to-transparent border border-red-500/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                </div>
                <h2 className="text-2xl" style={{ fontWeight: 700 }}>Common Mistakes to Avoid</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {commonMistakes.map((mistake, idx) => (
                  <div key={idx} className="flex gap-3 p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-red-400 mt-2"></div>
                    <p>{mistake}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Muscle Anatomy */}
            <div className="p-6 rounded-2xl bg-card border border-border sticky top-24">
              <h3 className="text-xl mb-6" style={{ fontWeight: 700 }}>Muscles Worked</h3>

              {/* Muscle Visualization */}
              <div className="aspect-square rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 mb-6 flex items-center justify-center border border-primary/10">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
                    <svg className="w-20 h-20 text-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                      <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"/>
                    </svg>
                  </div>
                  <p className="text-sm text-muted-foreground">Muscle anatomy visualization</p>
                </div>
              </div>

              {/* Primary Muscles */}
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-3">Primary Muscles</p>
                <div className="space-y-2">
                  {exercise.primaryMuscles.map((muscle, idx) => (
                    <div key={idx} className="px-4 py-3 rounded-xl bg-primary/10 border border-primary/20 text-primary" style={{ fontWeight: 600 }}>
                      {muscle}
                    </div>
                  ))}
                </div>
              </div>

              {/* Secondary Muscles */}
              <div>
                <p className="text-sm text-muted-foreground mb-3">Secondary Muscles</p>
                <div className="space-y-2">
                  {exercise.secondaryMuscles.map((muscle, idx) => (
                    <div key={idx} className="px-4 py-3 rounded-xl bg-muted/30 border border-border">
                      {muscle}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommended Sets & Reps */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-transparent border border-primary/20">
              <h3 className="text-xl mb-4" style={{ fontWeight: 700 }}>Recommended</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Sets</p>
                  <p className="text-2xl text-primary" style={{ fontWeight: 700 }}>{exercise.sets}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Reps</p>
                  <p className="text-2xl text-primary" style={{ fontWeight: 700 }}>{exercise.reps}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Rest Between Sets</p>
                  <p className="text-2xl text-primary" style={{ fontWeight: 700 }}>90-120s</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
