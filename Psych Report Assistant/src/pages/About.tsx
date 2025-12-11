import { Layout } from "@/components/layout";
import { Brain, Target, Sparkles, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              About <span className="text-primary">Psych Report Assistant</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Built by a school psychologist who found a better way.
            </p>
          </div>

      {/* Story Card */}
<Card variant="gradient" className="mb-12">
  <CardContent className="p-8 md:p-12">
    <div className="flex items-center gap-3 mb-6">
      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
        <Sparkles className="w-6 h-6 text-primary" />
      </div>
      <h2 className="text-2xl font-bold">My Story</h2>
    </div>

    <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
      <p>
        Hello fellow School Psychs — if you’ve ever sat there thinking, “There has to be an easier way to do this,” then you’re in the right place. This blog is for people who love the work but don’t love drowning in paperwork.
      </p>

      <p>
        My name is <strong>Quentarius Wade</strong>. I’m a former teacher and School Psychologist with a PhD in School Psychology from Howard University, and now I work as a software developer.
      </p>

      <p>
        I never felt naturally gifted in this field. I was slow to pick things up, slow to write reports, and half the time in meetings I would stumble over my words because I wasn't sure of myself. 
      </p>

      <p>
        Then I started learning to code in 2018 — not to switch careers, but to make my own report-writing less painful. That’s when I realized I enjoyed being a School Psych, but I had a real passion for building tools that actually help other School Psychs get the work done.
      </p>

      <p>
        That’s how <strong>Psych Report Assistant</strong> started. Simple idea: automate what slows us down and make the job feel lighter. If there’s a topic you want me to dig into or a tool you'd like to see built, feel free to email me.
      </p>
    </div>
  </CardContent>
</Card>


          {/* Mission */}
          <Card variant="glow" className="mb-12">
            <CardContent className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">My Mission</h2>
              </div>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                <span className="text-foreground font-semibold">Help school psychologists automate psych reports so they can focus on students, not paperwork.</span>
              </p>
              
              <p className="text-muted-foreground mt-4 leading-relaxed">
                Every hour saved on report writing is an hour that can be spent on consultation, intervention planning, or simply avoiding burnout. That's what drives everything I build.
              </p>
            </CardContent>
          </Card>

          {/* What We Do */}
          <Card variant="glass" className="mb-12">
            <CardContent className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">What We Build</h2>
              </div>
              
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span><strong className="text-foreground">Q-Global Report Generator:</strong> Automatically extract demographics, standard scores, percentile ranks, and classifications from any Q-Global assessment export.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span><strong className="text-foreground">Template Automation:</strong> Convert raw data into professional placeholder format, ready for your report templates.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span><strong className="text-foreground">Bulk Processing:</strong> Handle multiple assessments at once with automatic ZIP packaging.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span><strong className="text-foreground">Privacy-First Design:</strong> All processing happens in your browser. No student data ever touches a server.</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <p className="text-muted-foreground mb-6">
              Ready to reclaim your time?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="xl">
                <Link to="/">
                  Try the Free Tool
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <a href="https://payhip.com/b/Wq3wQ" target="_blank" rel="noopener noreferrer">
                  Get Desktop Version
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
