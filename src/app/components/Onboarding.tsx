import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronRight, ChevronLeft } from "lucide-react";

export function Onboarding() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: "",
    height: "",
    weight: "",
    experience: "beginner",
    goal: "",
    equipment: [] as string[],
    duration: "30",
    days: [] as string[],
  });
  const navigate = useNavigate();

  const totalSteps = 6;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      navigate("/goals");
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleArrayItem = (array: string[], item: string) => {
    return array.includes(item)
      ? array.filter((i) => i !== item)
      : [...array, item];
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Step {step} of {totalSteps}</span>
            <span className="text-sm text-primary">{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-300 shadow-lg shadow-primary/30"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Card */}
        <div className="p-8 rounded-2xl bg-card border border-border backdrop-blur-xl">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-3xl" style={{ fontWeight: 700 }}>Let's get to know you</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-input-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    placeholder="25"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Height (cm)</label>
                  <input
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-input-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    placeholder="175"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">Weight (kg)</label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-input-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    placeholder="70"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-3xl" style={{ fontWeight: 700 }}>What's your fitness experience?</h2>
              <div className="grid gap-4">
                {[
                  { value: "beginner", label: "Beginner", desc: "New to working out" },
                  { value: "intermediate", label: "Intermediate", desc: "Regular gym-goer" },
                  { value: "advanced", label: "Advanced", desc: "Experienced athlete" },
                ].map((level) => (
                  <button
                    key={level.value}
                    onClick={() => setFormData({ ...formData, experience: level.value })}
                    className={`p-6 rounded-xl text-left transition-all ${
                      formData.experience === level.value
                        ? "bg-primary/10 border-2 border-primary shadow-lg shadow-primary/20"
                        : "bg-card border border-border hover:border-primary/30"
                    }`}
                  >
                    <div className="text-lg" style={{ fontWeight: 600 }}>{level.label}</div>
                    <div className="text-sm text-muted-foreground">{level.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-3xl" style={{ fontWeight: 700 }}>What equipment do you have?</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {["Dumbbells", "Barbell", "Resistance Bands", "Bench", "Pull-up Bar", "None"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setFormData({ ...formData, equipment: toggleArrayItem(formData.equipment, item) })}
                    className={`p-4 rounded-xl transition-all ${
                      formData.equipment.includes(item)
                        ? "bg-primary/10 border-2 border-primary"
                        : "bg-card border border-border hover:border-primary/30"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-3xl" style={{ fontWeight: 700 }}>Workout duration per session</h2>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Minutes</span>
                  <span className="text-primary" style={{ fontWeight: 600 }}>{formData.duration} min</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="120"
                  step="15"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full h-2 rounded-full bg-muted appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-primary/30"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>15 min</span>
                  <span>120 min</span>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <h2 className="text-3xl" style={{ fontWeight: 700 }}>Preferred workout days</h2>
              <div className="grid grid-cols-7 gap-3">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                  <button
                    key={day}
                    onClick={() => setFormData({ ...formData, days: toggleArrayItem(formData.days, day) })}
                    className={`aspect-square rounded-xl transition-all ${
                      formData.days.includes(day)
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                        : "bg-card border border-border hover:border-primary/30"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-6 text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <ChevronRight className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-3xl" style={{ fontWeight: 700 }}>Almost there!</h2>
              <p className="text-muted-foreground text-lg">
                Now let's set your fitness goal to create the perfect workout plan for you.
              </p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-8 border-t border-border">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border hover:border-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all"
              style={{ fontWeight: 600 }}
            >
              {step === totalSteps ? "Continue" : "Next"}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
