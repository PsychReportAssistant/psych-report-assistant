import { useState, useCallback, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Download, 
  Loader2,
  Sparkles,
  Info,
  Package,
  Check
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import FileUploader, { UploadedFile } from "@/components/tool/FileUploader";
import { AssessmentTemplate, ASSESSMENT_TEMPLATES } from "@/lib/templates";
import { bulkGenerateReports, downloadZip } from "@/lib/reportGenerator";
import { generateDefaultTemplate } from "@/lib/defaultTemplates";

const Tool = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<AssessmentTemplate | null>(null);
  const [templateBuffer, setTemplateBuffer] = useState<ArrayBuffer | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  // Generate embedded template when template is selected
  useEffect(() => {
    if (selectedTemplate) {
      const buffer = generateDefaultTemplate(
        selectedTemplate.name, 
        selectedTemplate.placeholders
      );
      setTemplateBuffer(buffer);
    }
  }, [selectedTemplate]);

  const handleTemplateSelect = (template: AssessmentTemplate) => {
    setSelectedTemplate(template);
  };

  const handleFileUploadSuccess = useCallback((file: UploadedFile) => {
    toast({
      title: "File uploaded",
      description: `${file.name} - ${file.data.length} records found.`,
    });
  }, [toast]);

  const handleFileUploadError = useCallback((message: string) => {
    toast({
      title: "Upload failed",
      description: message,
      variant: "destructive",
    });
  }, [toast]);

  const processFiles = async () => {
    if (!selectedTemplate) {
      toast({
        title: "No template selected",
        description: "Please select an assessment template first.",
        variant: "destructive",
      });
      return;
    }

    if (!templateBuffer) {
      toast({
        title: "Template error",
        description: "Failed to load template. Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (files.length === 0) {
      toast({
        title: "No data files",
        description: "Please upload at least one Q-Global export file.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      // Combine all data from uploaded files - data keys already match CSV headers
      const allData = files.flatMap(file => file.data);

      // Update file statuses
      setFiles(prev => prev.map(f => ({ ...f, status: "processing" as const })));

      // Generate reports - pass data directly (headers match placeholders)
      const zipBlob = await bulkGenerateReports(
        templateBuffer,
        allData,
        "FirstName",
        (current, total) => {
          setProgress((current / total) * 100);
        }
      );

      // Update file statuses to completed
      setFiles(prev => prev.map(f => ({ ...f, status: "completed" as const })));

      // Download the zip
      const timestamp = new Date().toISOString().split("T")[0];
      downloadZip(zipBlob, `${selectedTemplate.name}_Reports_${timestamp}.zip`);

      toast({
        title: "Reports generated!",
        description: `Successfully generated ${allData.length} report(s) and downloaded as ZIP.`,
      });
    } catch (error) {
      console.error("Error generating reports:", error);
      setFiles(prev => prev.map(f => ({ ...f, status: "error" as const })));
      toast({
        title: "Generation failed",
        description: "An error occurred while generating reports. Please check your data.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const totalRecords = files.reduce((sum, f) => sum + f.data.length, 0);
  const canGenerate = selectedTemplate && templateBuffer && files.length > 0 && !isProcessing;

  return (
    <Layout>
      {/* SEO Header */}
      <section className="gradient-hero py-12">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Free Q-Global Report Generator
            </h1>
            <p className="text-muted-foreground">
              Select your assessment type, upload Q-Global export files, and instantly 
              generate professional reports. All processing happens in your browser.
            </p>
          </div>
        </div>
      </section>

      {/* Tool Interface */}
      <section className="py-12">
        <div className="container-custom max-w-4xl">
          {/* Info Banner */}
          <div className="bg-accent/50 border border-accent rounded-xl p-4 mb-8 flex items-start gap-3">
            <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground mb-1">Privacy First</p>
              <p className="text-muted-foreground">
                All processing happens locally in your browser. Your data never leaves your computer 
                and is not stored or transmitted anywhere.
              </p>
            </div>
          </div>

          {/* Main Tool Card */}
          <div className="bg-card border border-border rounded-2xl p-6 space-y-8">
            {/* Step 1: Template Selection */}
            <div className="space-y-4">
              <h3 className="font-display font-semibold text-foreground">
                1. Select Assessment Type
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {ASSESSMENT_TEMPLATES.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleTemplateSelect(template)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      selectedTemplate?.id === template.id
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-foreground text-sm">
                          {template.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {template.description}
                        </p>
                      </div>
                      {selectedTemplate?.id === template.id && (
                        <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: File Upload */}
            <FileUploader
              files={files}
              setFiles={setFiles}
              isProcessing={isProcessing}
              onUploadSuccess={handleFileUploadSuccess}
              onUploadError={handleFileUploadError}
            />

            {/* Progress Bar */}
            {isProcessing && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Generating reports...</span>
                  <span className="text-sm font-medium text-foreground">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            {/* Generate Button */}
            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-muted-foreground">
                  {totalRecords > 0 && (
                    <span className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      {totalRecords} records ready to process
                    </span>
                  )}
                </div>
              </div>
              <Button
                variant="hero"
                size="lg"
                className="w-full"
                onClick={processFiles}
                disabled={!canGenerate}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Generating Reports...
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5" />
                    Generate & Download ZIP
                  </>
                )}
              </Button>
              {!canGenerate && !isProcessing && (
                <p className="text-xs text-muted-foreground text-center mt-2">
                  {!selectedTemplate && "Select an assessment type • "}
                  {files.length === 0 && "Upload data file(s)"}
                </p>
              )}
            </div>
          </div>

          {/* Premium Upsell */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200 dark:border-amber-800 rounded-2xl p-6 mt-8">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-5 w-5 text-amber-600" />
                  <span className="font-display font-semibold text-amber-900 dark:text-amber-100">
                    Need Custom Templates?
                  </span>
                </div>
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  Get the Premium Desktop Version for custom DOCX templates, 
                  offline bulk generation, advanced formatting, and unlimited reports.
                </p>
              </div>
              <a href="https://payhip.com/your-store" target="_blank" rel="noopener noreferrer">
                <Button variant="premium" size="lg">
                  <Sparkles className="h-4 w-4" />
                  Get Premium
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Tool;
