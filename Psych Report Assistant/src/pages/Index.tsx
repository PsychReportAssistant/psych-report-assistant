import { useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Zap, Download, Shield, CheckCircle, ArrowRight, ExternalLink, Lock, Brain, BookOpen, Stethoscope, Users, Target, BarChart3, ClipboardList, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout";
import { ReportUploader } from "@/components/tool/ReportUploader";
import { cn } from "@/lib/utils";

const assessments = [
  { id: "wisc-v", name: "WISC-V", icon: Brain, description: "Cognitive Assessment", available: true },
  { id: "ktea-3", name: "KTEA-3", icon: BookOpen, description: "Achievement Test", available: false },
  { id: "ppvt-5", name: "PPVT-5", icon: Target, description: "Vocabulary Test", available: false },
  { id: "celf-5", name: "CELF-5", icon: Activity, description: "Language Evaluation", available: false },
  { id: "kbit-2", name: "KBIT-2 Revised", icon: BarChart3, description: "Brief Intelligence", available: false },
  { id: "wiat-4", name: "WIAT-4", icon: ClipboardList, description: "Achievement Test", available: false },
  { id: "vineland-3", name: "Vineland-3", icon: Users, description: "Adaptive Behavior", available: false },
  { id: "wrat-5", name: "WRAT-5", icon: Stethoscope, description: "Achievement Test", available: false },
];

const features = [
  {
    icon: FileText,
    title: "WISC-V Bulk Reports",
    description: "Upload your WISC-V Q-Global export CSV and instantly generate clean, formatted reports in bulk. One CSV, unlimited reports.",
  },
  {
    icon: Zap,
    title: "Smart Column Detection",
    description: "Automatically identifies demographics, standard scores (SS), percentile ranks (PR), and categories/classifications (CAT).",
  },
  {
    icon: Download,
    title: "ZIP Download",
    description: "All reports are generated instantly and packaged into a ZIP folder that downloads directly to your computer.",
  },
  {
    icon: Shield,
    title: "100% Browser-Based",
    description: "All processing happens locally in your browser. No data is ever uploaded to any server. FERPA compliant by design.",
  },
];

const benefits = [
  "Auto-detects SS, PR, and CAT columns",
  "Extracts student demographics automatically",
  "Generates {{Placeholder}} template format",
  "Export to DOCX or PDF",
  "Bulk processing with ZIP download",
  "Professional report formatting",
];

export default function Index() {
  const [selectedAssessment, setSelectedAssessment] = useState<string>("wisc-v");

  const handleAssessmentClick = (id: string, available: boolean) => {
    if (available) {
      setSelectedAssessment(id);
    } else {
      window.open("https://payhip.com/b/Wq3wQ", "_blank");
    }
  };

  return (
    <Layout>
      {/* Hero + Tool Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 glow-bg opacity-50" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative">
          <div className="max-w-4xl mx-auto text-center mb-8 stagger-children">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Free WISC-V Bulk Report Generator (Web Version)
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Automate Your WISC-V{" "}
              <span className="gradient-text">Assessment Reports</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-3xl mx-auto">
              Upload your WISC-V Q-Global export and instantly generate clean, formatted reports in bulk. 
              This free web version supports WISC-V only.
            </p>
            <a 
              href="https://qglobal.pearsonclinical.com/qg/static/Platform/Customer/en/WebHelp/Export/Exporting_Export_Data.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm mb-6"
            >
              <ExternalLink className="w-4 h-4" />
              How to export Q-Global assessment data
            </a>
          </div>

          {/* Assessment Selection Cards */}
          <div className="max-w-5xl mx-auto mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {assessments.map((assessment) => {
                const IconComponent = assessment.icon;
                const isSelected = selectedAssessment === assessment.id;
                const isAvailable = assessment.available;
                
                return (
                  <button
                    key={assessment.id}
                    onClick={() => handleAssessmentClick(assessment.id, isAvailable)}
                    className={cn(
                      "relative p-4 rounded-xl border-2 transition-all duration-300 text-left group",
                      isAvailable && isSelected
                        ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                        : isAvailable
                        ? "border-border bg-card hover:border-primary/50 hover:bg-card/80"
                        : "border-border/50 bg-card/50 cursor-pointer hover:border-primary/30"
                    )}
                  >
                    {!isAvailable && (
                      <div className="absolute top-2 right-2">
                        <Lock className="w-4 h-4 text-muted-foreground" />
                      </div>
                    )}
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors",
                      isSelected ? "bg-primary/20" : "bg-secondary",
                      !isAvailable && "opacity-60"
                    )}>
                      <IconComponent className={cn(
                        "w-5 h-5",
                        isSelected ? "text-primary" : "text-muted-foreground"
                      )} />
                    </div>
                    <h3 className={cn(
                      "font-semibold text-sm mb-1",
                      !isAvailable && "opacity-60"
                    )}>
                      {assessment.name}
                    </h3>
                    <p className={cn(
                      "text-xs text-muted-foreground",
                      !isAvailable && "opacity-60"
                    )}>
                      {isAvailable ? assessment.description : "Desktop Only"}
                    </p>
                    {isAvailable && isSelected && (
                      <div className="absolute bottom-2 right-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            <p className="text-center text-xs text-muted-foreground mt-3">
              <Lock className="w-3 h-3 inline mr-1" />
              Locked assessments require the Desktop Version
            </p>
          </div>

          {/* Tool Component */}
          <div className="max-w-4xl mx-auto">
            <Card variant="gradient" className="p-6 md:p-8">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold mb-2">WISC-V Report Generator</h2>
                <p className="text-sm text-muted-foreground">
                  Upload your WISC-V Q-Global CSV export to auto-generate professional reports
                </p>
              </div>
              <ReportUploader assessmentType="wisc-v" />
            </Card>
          </div>

          {/* Desktop Version CTA */}
          <div className="max-w-4xl mx-auto mt-8">
            <Card variant="glass" className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Need More Than WISC-V?</h3>
              <p className="text-muted-foreground text-sm mb-4 max-w-2xl mx-auto">
                The desktop version supports all major Q-Global assessments—WISC-V, WIAT-4, BASC-3, KTEA-3, 
                Conners 4, PPVT-5, CELF-5, Vineland-3, and more. Upload any Q-Global export and bulk-generate 
                professional reports instantly.
              </p>
              <Button asChild variant="hero" size="xl" className="shadow-lg shadow-primary/20">
                <a href="https://payhip.com/b/Wq3wQ" target="_blank" rel="noopener noreferrer">
                  Get Desktop Version – Supports All Q-Global Assessments
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It <span className="text-primary">Works</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our tool reads your WISC-V Q-Global CSV export, detects columns (demographics, SS, PR, CAT), 
              merges with a professional template, and outputs formatted reports.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card variant="glass" className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold mb-2">Upload CSV</h3>
              <p className="text-sm text-muted-foreground">
                Export your WISC-V assessment record from Q-Global as CSV and upload it here.
              </p>
            </Card>
            
            <Card variant="glass" className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold mb-2">Auto-Detect & Merge</h3>
              <p className="text-sm text-muted-foreground">
                We scan for demographics, SS, PR, and CAT columns and merge values into templates.
              </p>
            </Card>
            
            <Card variant="glass" className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold mb-2">Download ZIP</h3>
              <p className="text-sm text-muted-foreground">
                Get all reports packaged in a ZIP folder, saved directly to your Downloads.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Built for <span className="text-primary">School Psychologists</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Purpose-built for professionals who use Q-Global for WISC-V Q-Global scoring, 
              WIAT-4 Q-Global scoring, BASC-3, KTEA-3, and Conners 4 Q-Global scoring.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} variant="glow" className="group hover:scale-105 transition-transform duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Automate Psych Reports &{" "}
                <span className="text-primary">Save Hours Weekly</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Stop manually copying scores from Q-Global exports. Our tool automatically scans for 
                demographics, standard scores, percentile ranks, and classifications—then merges 
                everything into clean, professional psychological evaluation reports.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <Card variant="gradient" className="p-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b border-border">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Extracted Placeholders</p>
                      <p className="text-sm text-muted-foreground">WISC-V Assessment</p>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm font-mono">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{"{{FirstName}}"}</span>
                      <span className="text-primary">John</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{"{{LastName}}"}</span>
                      <span className="text-primary">Smith</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{"{{FSIQ_SS}}"}</span>
                      <span className="text-primary">105</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{"{{VCI_SS}}"}</span>
                      <span className="text-primary">110</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{"{{Classification}}"}</span>
                      <span className="text-primary">Average</span>
                    </div>
                  </div>
                </div>
              </Card>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

{/* SEO Section */}
<section className="py-12">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <p className="text-center text-muted-foreground text-sm max-w-3xl mx-auto">
      Start with the free WISC-V report generator — built for School Psychs who want fast, accurate, automated reports without extra steps. When you're ready to automate more tests, the Desktop Version lets you generate reports for multiple Q-Global assessments on Windows.
    </p>
  </div>
</section>

{/* CTA Section */}
<section className="py-16">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <Card variant="glow" className="max-w-4xl mx-auto overflow-hidden">
      <CardContent className="p-8 md:p-12 text-center relative">
        <div className="absolute inset-0 glow-bg opacity-30" />
        <div className="relative">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Automate Your Reports — Your Way
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            The free tool handles WISC-V instantly. If you need WIAT-4, BASC-3, KTEA-3, Conners 4, and more — the Desktop Version is your upgrade path. Same workflow, more assessments. Just customize your template with placeholders and generate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="hero"
              size="xl"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Try Free WISC-V Tool
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button asChild variant="outline" size="xl">
              <a href="https://payhip.com/b/Wq3wQ" target="_blank" rel="noopener noreferrer">
                Get Desktop Version
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</section>

