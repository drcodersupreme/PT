import { Link } from "react-router";
import { Dumbbell, Activity, TrendingUp, Brain, ChevronRight } from "lucide-react";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/30">
              <Dumbbell className="w-6 h-6 text-background" />
            </div>
            <span className="text-2xl tracking-tight" style={{ fontWeight: 700 }}>PT</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#exercises" className="text-muted-foreground hover:text-foreground transition-colors">Exercises</a>
            <a href="#progress" className="text-muted-foreground hover:text-foreground transition-colors">Progress</a>
            <Link
              to="/login"
              className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Brain className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary">AI-Powered Training</span>
              </div>
              <h1 className="text-6xl tracking-tight" style={{ fontWeight: 800, lineHeight: 1.1 }}>
                Train <span className="text-primary">Smarter</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Your AI personal trainer that guides every rep, tracks every milestone, and adapts to your journey. Experience the future of fitness.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/onboarding"
                  className="group px-8 py-4 rounded-xl bg-primary text-primary-foreground shadow-2xl shadow-primary/40 hover:shadow-primary/60 transition-all flex items-center gap-2"
                  style={{ fontWeight: 600 }}
                >
                  Start Training
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/exercises"
                  className="px-8 py-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all"
                  style={{ fontWeight: 600 }}
                >
                  Explore Exercises
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl blur-3xl"></div>
              <img
                src="https://images.unsplash.com/photo-1605296867724-fa87a8ef53fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxneW0lMjBmaXRuZXNzJTIwdHJhaW5pbmclMjBkYXJrfGVufDF8fHx8MTc3ODg0MDExNXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Fitness Training"
                className="relative rounded-3xl shadow-2xl border border-primary/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4" style={{ fontWeight: 700 }}>Premium Features</h2>
            <p className="text-muted-foreground text-lg">Everything you need to transform your fitness journey</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI Workout Guidance",
                description: "Personalized workout plans powered by advanced AI that adapts to your progress and goals."
              },
              {
                icon: Activity,
                title: "Form Correction",
                description: "Real-time feedback on your form with detailed muscle anatomy visualizations and technique tips."
              },
              {
                icon: TrendingUp,
                title: "Progress Tracking",
                description: "Comprehensive analytics, charts, and insights to keep you motivated and on track."
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group p-8 rounded-2xl bg-card/50 backdrop-blur-xl border border-border hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl mb-3" style={{ fontWeight: 600 }}>{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/20 p-12 text-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent"></div>
            <div className="relative z-10">
              <h2 className="text-4xl mb-4" style={{ fontWeight: 700 }}>Ready to Transform?</h2>
              <p className="text-muted-foreground text-lg mb-8">Join thousands of users achieving their fitness goals with AI-powered training.</p>
              <Link
                to="/onboarding"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground shadow-2xl shadow-primary/40 hover:shadow-primary/60 transition-all"
                style={{ fontWeight: 600 }}
              >
                Get Started Free
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2026 PT. Your AI Personal Trainer.</p>
        </div>
      </footer>
    </div>
  );
}
