import Layout from "@/components/layout/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const faqs = [
  {
    question: "What is Psych Report Assistant?",
    answer: "Psych Report Assistant is a free online tool that helps school psychologists, psychologists, and speech-language pathologists generate professional assessment reports from Q-Global exports. Simply upload your CSV or Excel files, and our tool will create formatted reports in seconds.",
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. All data processing happens entirely in your browser. Your assessment data never leaves your computer and is not stored on any server. We take student privacy and FERPA compliance seriously.",
  },
  {
    question: "What Q-Global assessments are supported?",
    answer: "Our tool supports all major Q-Global assessments including WISC-V, WAIS-IV, WIAT-4, KTEA-3, BASC-3, Vineland-3, Conners-4, BRIEF-2, CELF-5, PPVT-5, and many more. If you export data from Q-Global, our tool can process it.",
  },
  {
    question: "How do I export data from Q-Global?",
    answer: "In Q-Global, navigate to your completed assessment, select 'Export' or 'Download', and choose CSV or Excel format. The exported file can then be uploaded directly to our tool.",
  },
  {
    question: "What's the difference between the free tool and the premium version?",
    answer: "The free online tool allows you to generate reports one at a time with basic templates. The premium desktop version offers bulk report generation, advanced customizable templates, offline functionality, and unlimited daily reports.",
  },
  {
    question: "Does the premium version require internet?",
    answer: "No! The premium desktop version works completely offline. Once installed on your Windows computer, you can generate reports anytime without an internet connection.",
  },
  {
    question: "Can I customize the report templates?",
    answer: "The free tool uses pre-loaded templates optimized for professional reporting. The premium version allows full template customization including headers, sections, and formatting.",
  },
  {
    question: "Is there a limit to how many reports I can generate?",
    answer: "The free online tool has no hard limit, but is designed for individual report generation. For bulk processing of multiple assessments at once, we recommend the premium desktop version.",
  },
  {
    question: "What file formats are supported for upload?",
    answer: "We support CSV (.csv) and Excel (.xlsx, .xls) files exported from Q-Global. The tool automatically detects the file format and processes it accordingly.",
  },
  {
    question: "How do I get support?",
    answer: "You can reach us through our Contact page or email support@psychreportassistant.com. We typically respond within 24-48 hours on business days.",
  },
  {
    question: "Is there a refund policy for the premium version?",
    answer: "Yes, we offer a 30-day money-back guarantee for the premium desktop version. If you're not satisfied, contact us for a full refund.",
  },
  {
    question: "Can I use this tool for private practice assessments?",
    answer: "Absolutely! While many of our users are school-based professionals, the tool works equally well for private practice psychologists and SLPs conducting assessments.",
  },
];

const FAQ = () => {
  return (
    <Layout>
      {/* Header */}
      <section className="gradient-hero py-12">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground">
              Find answers to common questions about Psych Report Assistant.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-12">
        <div className="container-custom max-w-3xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Contact CTA */}
          <div className="mt-12 bg-accent/50 rounded-2xl p-8 text-center">
            <h3 className="font-display text-xl font-bold text-foreground mb-2">
              Still have questions?
            </h3>
            <p className="text-muted-foreground mb-4">
              We're here to help. Reach out and we'll get back to you as soon as possible.
            </p>
            <Link to="/contact">
              <Button variant="hero">
                <MessageCircle className="h-4 w-4" />
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
