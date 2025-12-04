import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ASSESSMENT_TEMPLATES, AssessmentTemplate } from "@/lib/templates";
import { FileUp, Check, FileText } from "lucide-react";

interface TemplateSelectorProps {
  selectedTemplate: AssessmentTemplate | null;
  onSelectTemplate: (template: AssessmentTemplate) => void;
  onUploadTemplate: (file: File, template: AssessmentTemplate) => void;
  customTemplateFile: File | null;
}

const TemplateSelector = ({
  selectedTemplate,
  onSelectTemplate,
  onUploadTemplate,
  customTemplateFile
}: TemplateSelectorProps) => {
  const [showAll, setShowAll] = useState(false);
  
  const displayedTemplates = showAll 
    ? ASSESSMENT_TEMPLATES 
    : ASSESSMENT_TEMPLATES.slice(0, 6);

  const handleTemplateFileUpload = (e: React.ChangeEvent<HTMLInputElement>, template: AssessmentTemplate) => {
    const file = e.target.files?.[0];
    if (file) {
      onUploadTemplate(file, template);
    }
    e.target.value = "";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-foreground">
          1. Select Assessment Template
        </h3>
        {ASSESSMENT_TEMPLATES.length > 6 && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : `Show All (${ASSESSMENT_TEMPLATES.length})`}
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {displayedTemplates.map((template) => (
          <div key={template.id} className="relative">
            <button
              onClick={() => onSelectTemplate(template)}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
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
            
            {/* Template file upload for selected template */}
            {selectedTemplate?.id === template.id && (
              <div className="mt-2">
                <label
                  htmlFor={`template-file-${template.id}`}
                  className="flex items-center justify-center gap-2 p-2 border border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  {customTemplateFile ? (
                    <>
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-xs text-foreground truncate max-w-[120px]">
                        {customTemplateFile.name}
                      </span>
                    </>
                  ) : (
                    <>
                      <FileUp className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        Upload .docx template
                      </span>
                    </>
                  )}
                </label>
                <input
                  id={`template-file-${template.id}`}
                  type="file"
                  accept=".docx"
                  className="hidden"
                  onChange={(e) => handleTemplateFileUpload(e, template)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      
      {selectedTemplate && (
        <div className="bg-muted/50 rounded-lg p-3 mt-4">
          <p className="text-xs text-muted-foreground mb-2">
            Expected placeholders in template:
          </p>
          <div className="flex flex-wrap gap-1">
            {selectedTemplate.placeholders.slice(0, 10).map((p) => (
              <code key={p} className="text-xs bg-background px-1.5 py-0.5 rounded border border-border">
                {`{{${p}}}`}
              </code>
            ))}
            {selectedTemplate.placeholders.length > 10 && (
              <span className="text-xs text-muted-foreground">
                +{selectedTemplate.placeholders.length - 10} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
