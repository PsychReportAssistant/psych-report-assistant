import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { 
  FileText, 
  Upload, 
  Download, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Zap,
  Shield,
  Users
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Upload,
      title: "Easy Upload",
      description: "Simply upload your Q-Global CSV or Excel export files. We support all standard Q-Global assessment formats.",
    },
    {
      icon: Zap,
      title: "Instant Generation",
      description: "Our tool processes your data and generates professional reports in seconds using pre-loaded templates.",
    },
    {
      icon: Download,
      title: "PDF Download",
      description: "Download your completed reports as professionally formatted PDFs ready for your records.",
    },
    {
      icon: Shield,
      title: "100% Private",
      description: "All processing happens in your browser. Your data never leaves your computer.",
    },
  ];

  const assessments = [
    "WISC-V", "WAIS-IV", "WIAT-4", "KTEA-3", "BASC-3", 
    "Vineland-3", "Conners-4", "BRIEF-2", "CELF-5", "PPVT-5"
  ];

  const testimonials = [
    {
      quote: "This tool has cut my report writing time in half. I can focus more on students and less on paperwork.",
      author: "Dr. Sarah M.",
      role: "School Psychologist, CA",
    },
    {
      quote: "Finally, a tool that understands our workflow. The Q-Global integration is seamless.",
      author: "James K.",
      role: "Licensed Psychologist, TX",
    },
    {
      quote: "As an SLP juggling multiple caseloads, this has been a game-changer for my assessment reports.",
      author: "Michelle R.",
      role: "Speech-Language Pathologist, NY",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="gradient-hero pt-16 pb-24">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-6 animate-fade-in">
              <Sparkles className="h-4 w-4" />
              Free Online Tool for School Psychologists & SLPs
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Generate Professional{" "}
              <span className="text-gradient">Psych Reports</span>{" "}
              in Seconds
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              Upload your Q-Global exports and instantly generate beautifully formatted 
              assessment reports. No login required. 100% free and private.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <Link to="/tool">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  <FileText className="h-5 w-5" />
                  Try Free Tool
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <a href="https://payhip.com/b/Wq3wQ" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  <Sparkles className="h-5 w-5" />
                  Get Premium Version
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Assessments */}
      <section className="py-12 border-b border-border bg-card">
        <div className="container-custom">
          <p className="text-center text-sm text-muted-foreground mb-6">
            Supports all major Q-Global assessments
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {assessments.map((assessment) => (
              <span
                key={assessment}
                className="px-4 py-2 rounded-full bg-muted text-muted-foreground text-sm font-medium"
              >
                {assessment}
              </span>
            ))}
            <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              + Many More
            </span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our streamlined workflow helps you generate professional reports in just a few clicks.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-20 bg-gradient-to-b from-background to-accent/30">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto bg-card rounded-3xl border border-border p-8 sm:p-12 shadow-lg">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-4">
                  <Sparkles className="h-4 w-4" />
                  Premium Desktop Version
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-4">
                  Unlock Advanced Features
                </h2>
                <ul className="space-y-3 mb-6">
                  {[
                    "Full offline bulk report generation",
                    "Advanced customizable templates",
                    "Priority support & updates",
                    "No internet required",
                    "Unlimited reports per day",
                  ].map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-muted-foreground">
                      <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col items-center gap-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">One-time purchase</p>
                  <p className="font-display text-4xl font-bold text-foreground">$49</p>
                </div>
                <a href="https://payhip.com/b/Wq3wQ" target="_blank" rel="noopener noreferrer">
                  <Button variant="premium" size="xl">
                    <Sparkles className="h-5 w-5" />
                    Get Premium Now
                  </Button>
                </a>
                <p className="text-xs text-muted-foreground">Windows Desktop Application</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Trusted by Professionals
            </h2>
            <p className="text-muted-foreground">
              See what school psychologists and SLPs are saying about our tool.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-card border border-border shadow-sm"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-amber-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-foreground mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 gradient-hero">
        <div className="container-custom text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to Save Hours on Report Writing?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of school psychologists and SLPs who have streamlined their workflow.
          </p>
          <Link to="/tool">
            <Button variant="hero" size="xl">
              <FileText className="h-5 w-5" />
              Start Generating Reports Free
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
