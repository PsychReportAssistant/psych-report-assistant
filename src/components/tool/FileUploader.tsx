import { useCallback } from "react";
import { Upload, FileText, Trash2, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";

export interface UploadedFile {
  name: string;
  data: Record<string, any>[];
  headers: string[];
  status: "pending" | "processing" | "completed" | "error";
}

interface FileUploaderProps {
  files: UploadedFile[];
  setFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
  isProcessing: boolean;
  onUploadSuccess: (file: UploadedFile) => void;
  onUploadError: (message: string) => void;
}

const FileUploader = ({
  files,
  setFiles,
  isProcessing,
  onUploadSuccess,
  onUploadError
}: FileUploaderProps) => {
  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files;
    if (!uploadedFiles) return;

    Array.from(uploadedFiles).forEach((file) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const data = event.target?.result;
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          
          // Extract headers from first row
          const headers = jsonData.length > 0 
            ? Object.keys(jsonData[0] as object)
            : [];

          const uploadedFile: UploadedFile = {
            name: file.name,
            data: jsonData as Record<string, any>[],
            headers,
            status: "pending",
          };

          setFiles((prev) => [...prev, uploadedFile]);
          onUploadSuccess(uploadedFile);
        } catch (error) {
          onUploadError("Please ensure you're uploading a valid CSV or Excel file.");
        }
      };

      reader.readAsBinaryString(file);
    });

    e.target.value = "";
  }, [setFiles, onUploadSuccess, onUploadError]);

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <h3 className="font-display font-semibold text-foreground">
        2. Upload Q-Global Export Data
      </h3>
      
      {/* Upload Area */}
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-border rounded-xl cursor-pointer bg-card hover:bg-muted/50 transition-colors"
      >
        <div className="flex flex-col items-center justify-center py-4">
          <Upload className="h-10 w-10 text-muted-foreground mb-3" />
          <p className="mb-1 text-sm text-foreground">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-muted-foreground">
            Q-Global CSV or Excel exports (.csv, .xlsx, .xls)
          </p>
        </div>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          accept=".csv,.xlsx,.xls"
          multiple
          onChange={handleFileUpload}
        />
      </label>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border"
            >
              <div className="flex items-center gap-3 min-w-0">
                <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                <div className="min-w-0">
                  <span className="text-sm font-medium text-foreground truncate block">
                    {file.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {file.data.length} records • {file.headers.length} columns
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {file.status === "pending" && (
                  <span className="text-xs text-muted-foreground px-2 py-1 rounded-full bg-muted">
                    Ready
                  </span>
                )}
                {file.status === "processing" && (
                  <Loader2 className="h-4 w-4 text-primary animate-spin" />
                )}
                {file.status === "completed" && (
                  <CheckCircle2 className="h-4 w-4 text-success" />
                )}
                {file.status === "error" && (
                  <AlertCircle className="h-4 w-4 text-destructive" />
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                  disabled={isProcessing}
                >
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
