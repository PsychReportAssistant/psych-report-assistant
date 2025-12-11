import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";

export default function Contact() {
  return (
    <Layout>
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-12">
              If you’d like me to build a custom tool or workflow solution for your department or practice, feel free to reach out. I'd love to help.
            </p>
            <Card variant="glow">
              <CardContent className="p-8 md:p-12">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold mb-4">Email Me</h2>
                <p className="text-muted-foreground mb-6">
                  The best way to reach me is through email. I typically respond within 24–48 hours. I apologize for the personal email — I’m working on getting a professional one set up.
                </p>
                <Button asChild variant="hero" size="xl">
                  <a href="mailto:quentariusdwade@gmail.com">
                    <Mail className="w-5 h-5" />
                    quentariusdwade@gmail.com
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
