import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, Download, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { parseWISCVCSV, type AssessmentData } from '@/lib/reportParser';
import { generateDOCX, generatePDF } from '@/lib/reportGenerator';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface UploadedFile {
  file: File;
  status: 'pending' | 'processing' | 'complete' | 'error';
  data?: AssessmentData[];
  error?: string;
}

interface ReportUploaderProps {
  assessmentType?: string;
}

export function ReportUploader({ assessmentType = 'wisc-v' }: ReportUploaderProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [exportFormat, setExportFormat] = useState<'docx' | 'pdf'>('docx');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      status: 'pending' as const,
    }));
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.csv'],
    },
    multiple: true,
  });

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const processFiles = async () => {
    setIsGenerating(true);
    
    const updatedFiles = [...files];
    
    for (let i = 0; i < updatedFiles.length; i++) {
      if (updatedFiles[i].status !== 'pending') continue;
      
      updatedFiles[i].status = 'processing';
      setFiles([...updatedFiles]);

      try {
        const file = updatedFiles[i].file;
        const text = await file.text();
        
        // Parse CSV and get all rows as separate assessment records
        const records = parseWISCVCSV(text);
        
        if (records.length === 0) {
          throw new Error('No valid data rows found in CSV');
        }

        updatedFiles[i].data = records;
        updatedFiles[i].status = 'complete';
      } catch (error) {
        updatedFiles[i].status = 'error';
        updatedFiles[i].error = error instanceof Error ? error.message : 'Failed to parse file';
      }
      
      setFiles([...updatedFiles]);
    }

    setIsGenerating(false);
  };

  const downloadReports = async () => {
    const completedFiles = files.filter(f => f.status === 'complete' && f.data);
    
    if (completedFiles.length === 0) return;

    // Collect all records from all files
    const allRecords: { data: AssessmentData; fileName: string }[] = [];
    
    for (const f of completedFiles) {
      if (f.data) {
        f.data.forEach((record, idx) => {
          const baseName = f.file.name.replace(/\.(csv)$/i, '');
          const studentName = record.studentName.replace(/[^a-zA-Z0-9]/g, '_') || `Student_${idx + 1}`;
          allRecords.push({
            data: record,
            fileName: `${baseName}_${studentName}`,
          });
        });
      }
    }

    if (allRecords.length === 1) {
      // Single report - direct download
      const { data, fileName } = allRecords[0];
      
      if (exportFormat === 'docx') {
        const blob = await generateDOCX(data);
        saveAs(blob, `${fileName}_report.docx`);
      } else {
        const blob = generatePDF(data);
        saveAs(blob, `${fileName}_report.pdf`);
      }
    } else {
      // Multiple reports - ZIP download
      const zip = new JSZip();
      
      for (const { data, fileName } of allRecords) {
        if (exportFormat === 'docx') {
          const blob = await generateDOCX(data);
          zip.file(`${fileName}_report.docx`, blob);
        } else {
          const blob = generatePDF(data);
          zip.file(`${fileName}_report.pdf`, blob);
        }
      }
      
      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, 'WISC-V_Reports.zip');
    }
  };

  const getTotalRecords = () => {
    return files.reduce((total, f) => {
      if (f.status === 'complete' && f.data) {
        return total + f.data.length;
      }
      return total;
    }, 0);
  };

  const completedCount = getTotalRecords();
  const hasFiles = files.length > 0;
  const allProcessed = files.every(f => f.status === 'complete' || f.status === 'error');

  return (
    <div className="space-y-6">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-xl p-8 md:p-12 text-center cursor-pointer transition-all duration-300",
          isDragActive 
            ? "border-primary bg-primary/5" 
            : "border-border hover:border-primary/50 hover:bg-card/50"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          <div className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center transition-colors",
            isDragActive ? "bg-primary/20" : "bg-secondary"
          )}>
            <Upload className={cn(
              "w-8 h-8 transition-colors",
              isDragActive ? "text-primary" : "text-muted-foreground"
            )} />
          </div>
          <div>
            <p className="text-lg font-medium mb-1">
              {isDragActive ? "Drop your CSV here" : "Drag & drop WISC-V Q-Global CSV"}
            </p>
            <p className="text-muted-foreground text-sm">
              Upload your WISC-V Q-Global export CSV. Each row = one report.
            </p>
          </div>
          <Button variant="outline" size="lg" className="mt-2">
            Browse Files
          </Button>
        </div>
      </div>

      {/* File List */}
      {hasFiles && (
        <Card variant="glass">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Uploaded Files ({files.length})</h3>
              {completedCount > 0 && (
                <span className="text-sm text-primary">{completedCount} reports ready</span>
              )}
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {files.map((f, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium truncate max-w-[200px] md:max-w-none">
                        {f.file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {(f.file.size / 1024).toFixed(1)} KB
                        {f.data && f.status === 'complete' && ` • ${f.data.length} records`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {f.status === 'pending' && (
                      <span className="text-xs text-muted-foreground">Pending</span>
                    )}
                    {f.status === 'processing' && (
                      <Loader2 className="w-4 h-4 text-primary animate-spin" />
                    )}
                    {f.status === 'complete' && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                    {f.status === 'error' && (
                      <AlertCircle className="w-4 h-4 text-destructive" />
                    )}
                    <button
                      onClick={() => removeFile(index)}
                      className="p-1 hover:bg-secondary rounded"
                    >
                      <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      {hasFiles && (
        <div className="flex flex-col sm:flex-row gap-4">
          {!allProcessed && (
            <Button
              variant="hero"
              size="lg"
              onClick={processFiles}
              disabled={isGenerating}
              className="flex-1"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <FileText className="w-5 h-5" />
                  Generate Reports
                </>
              )}
            </Button>
          )}
          
          {completedCount > 0 && (
            <>
              <div className="flex gap-2">
                <Button
                  variant={exportFormat === 'docx' ? 'default' : 'outline'}
                  onClick={() => setExportFormat('docx')}
                >
                  DOCX
                </Button>
                <Button
                  variant={exportFormat === 'pdf' ? 'default' : 'outline'}
                  onClick={() => setExportFormat('pdf')}
                >
                  PDF
                </Button>
              </div>
              <Button
                variant="glow"
                size="lg"
                onClick={downloadReports}
                className="flex-1"
              >
                <Download className="w-5 h-5" />
                Download {completedCount > 1 ? `${completedCount} Reports (ZIP)` : 'Report'}
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
