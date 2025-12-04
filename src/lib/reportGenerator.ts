import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export interface ReportData {
  [key: string]: string | number;
}

// Generate a single DOCX report from template and data
export const generateDocxReport = async (
  templateBuffer: ArrayBuffer,
  data: ReportData
): Promise<Blob> => {
  const zip = new PizZip(templateBuffer);
  
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    delimiters: { start: "{{", end: "}}" }
  });
  
  // Set the template data
  doc.setData(data);
  
  // Render the document
  doc.render();
  
  // Generate the output
  const output = doc.getZip().generate({
    type: "blob",
    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  });
  
  return output;
};

// Bulk generate reports and zip them
export const bulkGenerateReports = async (
  templateBuffer: ArrayBuffer,
  dataRows: ReportData[],
  fileNameField: string = "FirstName",
  onProgress?: (current: number, total: number) => void
): Promise<Blob> => {
  const zip = new JSZip();
  const reportsFolder = zip.folder("reports");
  
  if (!reportsFolder) {
    throw new Error("Failed to create reports folder");
  }
  
  for (let i = 0; i < dataRows.length; i++) {
    const row = dataRows[i];
    
    try {
      const report = await generateDocxReport(templateBuffer, row);
      
      // Generate filename from data or use index
      const fileName = row[fileNameField] 
        ? `${row[fileNameField]}_${row["LastName"] || ""}_Report.docx`
        : `Report_${i + 1}.docx`;
      
      reportsFolder.file(fileName.replace(/\s+/g, "_"), report);
      
      if (onProgress) {
        onProgress(i + 1, dataRows.length);
      }
    } catch (error) {
      console.error(`Error generating report for row ${i + 1}:`, error);
      // Continue with other reports
    }
  }
  
  // Generate the zip file
  const zipBlob = await zip.generateAsync({ type: "blob" });
  return zipBlob;
};

// Download the zip file
export const downloadZip = (zipBlob: Blob, fileName: string = "reports.zip"): void => {
  saveAs(zipBlob, fileName);
};

// Extract placeholders from a DOCX template
export const extractPlaceholders = async (
  templateBuffer: ArrayBuffer
): Promise<string[]> => {
  const zip = new PizZip(templateBuffer);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    delimiters: { start: "{{", end: "}}" }
  });
  
  // Get all tags from the template
  const tags = doc.getFullText();
  const placeholderRegex = /\{\{([^}]+)\}\}/g;
  const placeholders: string[] = [];
  let match;
  
  while ((match = placeholderRegex.exec(tags)) !== null) {
    if (!placeholders.includes(match[1])) {
      placeholders.push(match[1]);
    }
  }
  
  return placeholders;
};

// Create a mapping from CSV headers to template placeholders
export const createDataMapping = (
  csvRow: Record<string, any>,
  headerMapping: Map<string, string>
): ReportData => {
  const mappedData: ReportData = {};
  
  Object.entries(csvRow).forEach(([header, value]) => {
    const placeholder = headerMapping.get(header);
    if (placeholder) {
      mappedData[placeholder] = value ?? "";
    } else {
      // Use header as-is if no mapping found
      mappedData[header] = value ?? "";
    }
  });
  
  return mappedData;
};
