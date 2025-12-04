import Layout from "@/components/layout/Layout";
import { FileText, Users, Shield, Award } from "lucide-react";

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-hero py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">
              About Psych Report Assistant
            </h1>
            <p className="text-lg text-muted-foreground">
              Empowering school psychologists, psychologists, and speech-language 
              pathologists with efficient report generation tools.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="container-custom max-w-4xl">
          <div className="prose prose-lg dark:prose-invert mx-auto">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              Our Mission
            </h2>
            <p className="text-muted-foreground mb-6">
              Psych Report Assistant was created by professionals who understand the 
              demanding workload faced by school psychologists and assessment specialists. 
              We know that writing comprehensive assessment reports is time-consuming, 
              yet essential for providing quality services to students and families.
            </p>
            <p className="text-muted-foreground mb-6">
              Our mission is to streamline the report writing process, allowing you to 
              focus more on what matters most: helping students succeed. By automating 
              the repetitive aspects of report generation, we help professionals reclaim 
              valuable time while maintaining the highest standards of documentation.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/30">
        <div className="container-custom">
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-12">
            Our Values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Privacy First</h3>
              <p className="text-sm text-muted-foreground">
                All data processing happens locally in your browser. We never store or transmit your client data.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Professional Focus</h3>
              <p className="text-sm text-muted-foreground">
                Built specifically for the needs of school psychologists, psychologists, and SLPs.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Quality Output</h3>
              <p className="text-sm text-muted-foreground">
                Generate professional, well-formatted reports that meet industry standards.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Accessibility</h3>
              <p className="text-sm text-muted-foreground">
                Free online tool available to all professionals, with premium options for advanced needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16">
        <div className="container-custom max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            Questions or Feedback?
          </h2>
          <p className="text-muted-foreground mb-6">
            We'd love to hear from you. Whether you have suggestions for improvement 
            or need assistance, our team is here to help.
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default About;
