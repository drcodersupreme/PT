import { useNavigate } from "react-router";
import { Flame, TrendingUp, Zap, Heart } from "lucide-react";

export function GoalSelection() {
  const navigate = useNavigate();

  const goals = [
    {
      id: "muscle",
      icon: TrendingUp,
      title: "Muscle Gain",
      description: "Build strength and increase muscle mass",
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
    },
    {
      id: "fat-loss",
      icon: Flame,
      title: "Fat Loss",
      description: "Burn calories and shed excess weight",
      gradient: "from-orange-500/20 to-red-500/20",
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-400",
    },
    {
      id: "strength",
      icon: Zap,
      title: "Strength",
      description: "Increase power and performance",
      gradient: "from-yellow-500/20 to-amber-500/20",
      iconBg: "bg-yellow-500/10",
      iconColor: "text-yellow-400",
    },
    {
      id: "general",
      icon: Heart,
      title: "General Fitness",
      description: "Stay healthy and maintain wellness",
      gradient: "from-pink-500/20 to-rose-500/20",
      iconBg: "bg-pink-500/10",
      iconColor: "text-pink-400",
    },
  ];

  const handleGoalSelect = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-5xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl" style={{ fontWeight: 700 }}>Choose Your Fitness Goal</h1>
          <p className="text-muted-foreground text-lg">Select your primary goal to get a personalized training plan</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {goals.map((goal) => (
            <button
              key={goal.id}
              onClick={handleGoalSelect}
              className="group relative overflow-hidden p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all text-left"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${goal.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-xl ${goal.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <goal.icon className={`w-8 h-8 ${goal.iconColor}`} />
                </div>
                <h3 className="text-2xl mb-2" style={{ fontWeight: 600 }}>{goal.title}</h3>
                <p className="text-muted-foreground">{goal.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
