import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { X, Play, Pause, ChevronRight, CheckCircle, Timer } from "lucide-react";

export function WorkoutTracking() {
  const navigate = useNavigate();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [restTimer, setRestTimer] = useState(90);
  const [completedSets, setCompletedSets] = useState<number[]>([]);

  const workout = {
    name: "Push Day",
    exercises: [
      { name: "Bench Press", sets: 4, reps: "8-12", rest: 90 },
      { name: "Incline Dumbbell Press", sets: 3, reps: "10-12", rest: 60 },
      { name: "Cable Flyes", sets: 3, reps: "12-15", rest: 60 },
      { name: "Shoulder Press", sets: 4, reps: "8-12", rest: 90 },
      { name: "Lateral Raises", sets: 3, reps: "12-15", rest: 60 },
      { name: "Tricep Pushdowns", sets: 3, reps: "12-15", rest: 60 },
    ],
  };

  const currentEx = workout.exercises[currentExercise];
  const progress = ((completedSets.length / workout.exercises.reduce((acc, ex) => acc + ex.sets, 0)) * 100).toFixed(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isResting && restTimer > 0) {
      interval = setInterval(() => {
        setRestTimer((prev) => prev - 1);
      }, 1000);
    } else if (restTimer === 0) {
      setIsResting(false);
      setRestTimer(currentEx.rest);
    }
    return () => clearInterval(interval);
  }, [isResting, restTimer, currentEx.rest]);

  const completeSet = () => {
    setCompletedSets([...completedSets, currentSet]);
    if (currentSet < currentEx.sets) {
      setCurrentSet(currentSet + 1);
      setIsResting(true);
      setRestTimer(currentEx.rest);
    } else {
      // Move to next exercise
      if (currentExercise < workout.exercises.length - 1) {
        setCurrentExercise(currentExercise + 1);
        setCurrentSet(1);
      } else {
        // Workout complete
        navigate("/workout-complete");
      }
    }
  };

  const skipRest = () => {
    setIsResting(false);
    setRestTimer(currentEx.rest);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-background/90 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl" style={{ fontWeight: 700 }}>{workout.name}</h1>
            <p className="text-sm text-muted-foreground">Exercise {currentExercise + 1} of {workout.exercises.length}</p>
          </div>
          <Link to="/workout-plan" className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center hover:border-destructive/50 hover:text-destructive transition-all">
            <X className="w-5 h-5" />
          </Link>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pb-4">
          <div className="flex items-center justify-between mb-2 text-sm">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="text-primary" style={{ fontWeight: 600 }}>{progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-300 shadow-lg shadow-primary/30"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl space-y-8">
          {!isResting ? (
            <>
              {/* Current Exercise */}
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary">
                  Exercise {currentExercise + 1}/{workout.exercises.length}
                </div>
                <h2 className="text-5xl" style={{ fontWeight: 800 }}>{currentEx.name}</h2>
                <p className="text-2xl text-muted-foreground">
                  Set {currentSet} of {currentEx.sets}
                </p>
              </div>

              {/* Reps Card */}
              <div className="p-12 rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/20 text-center">
                <p className="text-sm text-muted-foreground mb-4">Target Reps</p>
                <p className="text-7xl text-primary mb-2" style={{ fontWeight: 800 }}>{currentEx.reps}</p>
                <p className="text-muted-foreground">Give it your all!</p>
              </div>

              {/* Complete Set Button */}
              <button
                onClick={completeSet}
                className="w-full py-6 rounded-2xl bg-primary text-primary-foreground shadow-2xl shadow-primary/40 hover:shadow-primary/60 transition-all flex items-center justify-center gap-3"
                style={{ fontWeight: 700, fontSize: "1.25rem" }}
              >
                <CheckCircle className="w-7 h-7" />
                Complete Set
              </button>

              {/* Sets Progress */}
              <div className="flex justify-center gap-3">
                {Array.from({ length: currentEx.sets }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                      idx + 1 < currentSet
                        ? "bg-primary/20 border-2 border-primary"
                        : idx + 1 === currentSet
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                        : "bg-muted border border-border"
                    }`}
                  >
                    {idx + 1}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Rest Timer */}
              <div className="text-center space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-sm text-blue-400">
                  Rest Time
                </div>
                <h2 className="text-4xl" style={{ fontWeight: 700 }}>Take a Break</h2>

                {/* Timer */}
                <div className="relative">
                  <div className="w-64 h-64 mx-auto rounded-full bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-transparent border-4 border-blue-500/30 flex items-center justify-center">
                    <div className="text-center">
                      <Timer className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                      <p className="text-6xl text-blue-400" style={{ fontWeight: 800 }}>{restTimer}s</p>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground text-lg">Next: Set {currentSet} of {currentEx.sets}</p>

                <button
                  onClick={skipRest}
                  className="px-8 py-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all"
                  style={{ fontWeight: 600 }}
                >
                  Skip Rest
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Exercise List Footer */}
      <div className="border-t border-border bg-card/50 backdrop-blur-xl p-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-muted-foreground mb-3">Upcoming Exercises</p>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {workout.exercises.slice(currentExercise + 1).map((ex, idx) => (
              <div key={idx} className="flex-shrink-0 px-4 py-2 rounded-xl bg-muted/30 border border-border text-sm">
                {ex.name}
              </div>
            ))}
            {currentExercise === workout.exercises.length - 1 && (
              <div className="flex-shrink-0 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-sm text-primary">
                Workout Complete!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
