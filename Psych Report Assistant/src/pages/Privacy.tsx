import { Layout } from "@/components/layout";

export default function Privacy() {
  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-8">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: December 6, 2024</p>
          <div className="prose prose-invert prose-lg max-w-none prose-p:text-muted-foreground prose-headings:text-foreground prose-li:text-muted-foreground">
            <h2>Introduction</h2>
            <p>Psych Report Assistant ("we," "our," or "us") respects your privacy. This Privacy Policy explains how we collect, use, and protect your information when you use our website and services.</p>
            <h2>Information We Collect</h2>
            <h3>Files You Upload</h3>
            <p>When you use our Q-Global report generator tool, files are processed entirely in your browser. We do not upload, store, or have access to any files you process, including assessment data, student information, or generated reports.</p>
            <h3>Analytics Data</h3>
            <p>We may collect anonymous usage statistics to improve our services, including pages visited, browser type, and general geographic location. This data cannot identify individual users.</p>
            <h2>How We Use Information</h2>
            <ul><li>To provide and improve our services</li><li>To analyze usage patterns and optimize user experience</li><li>To communicate important updates about our services</li></ul>
            <h2>Data Security</h2>
            <p>All file processing occurs locally in your web browser. No student data, assessment results, or personally identifiable information is transmitted to our servers. This design ensures FERPA compliance and protects student privacy.</p>
            <h2>Third-Party Services</h2>
            <p>Our website may use third-party analytics services. These services may collect anonymous data according to their own privacy policies.</p>
            <h2>Cookies</h2>
            <p>We use essential cookies to ensure our website functions properly. We may also use analytics cookies to understand how visitors use our site.</p>
            <h2>Children's Privacy</h2>
            <p>Our services are designed for adult professionals. We do not knowingly collect information from children under 13.</p>
            <h2>Changes to This Policy</h2>
            <p>We may update this Privacy Policy periodically. We will notify users of significant changes by posting the new policy on this page.</p>
            <h2>Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us at info@psychreportassistant.com.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
