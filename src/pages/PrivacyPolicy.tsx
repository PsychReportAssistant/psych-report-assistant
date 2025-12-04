import Layout from "@/components/layout/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <section className="py-16">
        <div className="container-custom max-w-4xl">
          <h1 className="font-display text-4xl font-bold text-foreground mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg dark:prose-invert">
            <p className="text-muted-foreground mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <h2 className="font-display text-xl font-semibold text-foreground mt-8 mb-4">
              Introduction
            </h2>
            <p className="text-muted-foreground mb-6">
              Psych Report Assistant ("we," "our," or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we handle information when you use our website and 
              online tools at psychreportassistant.com.
            </p>

            <h2 className="font-display text-xl font-semibold text-foreground mt-8 mb-4">
              Information We Do NOT Collect
            </h2>
            <p className="text-muted-foreground mb-6">
              Our free online report generation tool is designed with privacy as a core principle:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>We do NOT collect, store, or transmit any data from your uploaded files</li>
              <li>We do NOT store any client information, assessment data, or personal identifiers</li>
              <li>We do NOT require user accounts or login credentials for the free tool</li>
              <li>All file processing occurs entirely within your web browser (client-side)</li>
              <li>Your uploaded CSV/Excel files never leave your computer</li>
            </ul>

            <h2 className="font-display text-xl font-semibold text-foreground mt-8 mb-4">
              Information We May Collect
            </h2>
            <p className="text-muted-foreground mb-6">
              While our tool processes data locally, we may collect limited information for 
              website functionality and analytics:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li><strong>Analytics Data:</strong> Anonymous usage statistics such as page views, 
              browser type, and general geographic location to improve our services</li>
              <li><strong>Contact Information:</strong> If you voluntarily contact us via our 
              contact form, we collect your name, email, and message content</li>
              <li><strong>Cookies:</strong> We use essential cookies for website functionality 
              and may use analytics cookies (like Google Analytics) to understand site usage</li>
            </ul>

            <h2 className="font-display text-xl font-semibold text-foreground mt-8 mb-4">
              Third-Party Services
            </h2>
            <p className="text-muted-foreground mb-6">
              Our website may use the following third-party services:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li><strong>Google Analytics:</strong> For anonymous website traffic analysis</li>
              <li><strong>Google AdSense:</strong> For displaying relevant advertisements</li>
              <li><strong>Payhip:</strong> For processing purchases of our premium desktop version 
              (subject to Payhip's own privacy policy)</li>
            </ul>

            <h2 className="font-display text-xl font-semibold text-foreground mt-8 mb-4">
              Data Security
            </h2>
            <p className="text-muted-foreground mb-6">
              Because our tool processes all data locally in your browser, your sensitive 
              client information remains on your own device. We recommend:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
              <li>Using the tool on a secure, private network</li>
              <li>Keeping your browser and operating system up to date</li>
              <li>Following your organization's data security policies</li>
            </ul>

            <h2 className="font-display text-xl font-semibold text-foreground mt-8 mb-4">
              HIPAA and FERPA Compliance
            </h2>
            <p className="text-muted-foreground mb-6">
              Our tool is designed to support compliance with HIPAA and FERPA regulations by 
              ensuring that no protected health information (PHI) or student education records 
              are transmitted to or stored on our servers. However, users are responsible for 
              ensuring their own compliance with applicable regulations.
            </p>

            <h2 className="font-display text-xl font-semibold text-foreground mt-8 mb-4">
              Children's Privacy
            </h2>
            <p className="text-muted-foreground mb-6">
              Our website and services are intended for use by professional adults. We do not 
              knowingly collect personal information from children under 13.
            </p>

            <h2 className="font-display text-xl font-semibold text-foreground mt-8 mb-4">
              Your Rights
            </h2>
            <p className="text-muted-foreground mb-6">
              Depending on your location, you may have rights regarding your personal data, 
              including the right to access, correct, or delete information we hold about you. 
              Since we collect minimal data, most users will have no stored personal information 
              with us.
            </p>

            <h2 className="font-display text-xl font-semibold text-foreground mt-8 mb-4">
              Changes to This Policy
            </h2>
            <p className="text-muted-foreground mb-6">
              We may update this Privacy Policy from time to time. We will notify users of any 
              material changes by posting the new policy on this page with an updated revision date.
            </p>

            <h2 className="font-display text-xl font-semibold text-foreground mt-8 mb-4">
              Contact Us
            </h2>
            <p className="text-muted-foreground mb-6">
              If you have questions about this Privacy Policy or our privacy practices, 
              please contact us at:
            </p>
            <p className="text-muted-foreground">
              <a href="/contact" className="text-primary hover:underline">Contact Form</a>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
