import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";

// Generate a default DOCX template from placeholders
export const generateDefaultTemplate = (
  templateName: string,
  placeholders: string[]
): ArrayBuffer => {
  // Create a minimal DOCX structure
  const docxTemplate = createMinimalDocx(templateName, placeholders);
  return docxTemplate;
};

// Create a minimal DOCX file with placeholders
const createMinimalDocx = (title: string, placeholders: string[]): ArrayBuffer => {
  // Minimal DOCX structure (based on Office Open XML)
  const contentTypes = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`;

  const rels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;

  const wordRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
</Relationships>`;

  // Build document content with placeholders
  const paragraphs = buildDocumentContent(title, placeholders);

  const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    ${paragraphs}
  </w:body>
</w:document>`;

  // Create the ZIP structure for DOCX
  const zip = new PizZip();
  zip.file("[Content_Types].xml", contentTypes);
  zip.folder("_rels")?.file(".rels", rels);
  zip.folder("word")?.file("document.xml", documentXml);
  zip.folder("word")?.folder("_rels")?.file("document.xml.rels", wordRels);

  return zip.generate({ type: "arraybuffer" });
};

// Build document paragraphs with proper formatting
const buildDocumentContent = (title: string, placeholders: string[]): string => {
  const paragraphs: string[] = [];

  // Title
  paragraphs.push(`
    <w:p>
      <w:pPr><w:jc w:val="center"/></w:pPr>
      <w:r>
        <w:rPr><w:b/><w:sz w:val="32"/></w:rPr>
        <w:t>${title} Assessment Report</w:t>
      </w:r>
    </w:p>
  `);

  // Blank line
  paragraphs.push(`<w:p><w:r><w:t></w:t></w:r></w:p>`);

  // Client Information Section
  paragraphs.push(`
    <w:p>
      <w:r>
        <w:rPr><w:b/><w:sz w:val="24"/></w:rPr>
        <w:t>Client Information</w:t>
      </w:r>
    </w:p>
  `);

  // Demographics placeholders
  const demographics = ["FirstName", "LastName", "DOB", "Age", "Gender", "Grade", "School", "ExaminerName", "TestDate"];
  demographics.forEach(field => {
    if (placeholders.includes(field)) {
      paragraphs.push(`
        <w:p>
          <w:r><w:t>${formatFieldLabel(field)}: </w:t></w:r>
          <w:r><w:t>{${field}}</w:t></w:r>
        </w:p>
      `);
    }
  });

  // Blank line
  paragraphs.push(`<w:p><w:r><w:t></w:t></w:r></w:p>`);

  // Scores Section
  paragraphs.push(`
    <w:p>
      <w:r>
        <w:rPr><w:b/><w:sz w:val="24"/></w:rPr>
        <w:t>Assessment Results</w:t>
      </w:r>
    </w:p>
  `);

  // Score placeholders (excluding demographics)
  const scorePlaceholders = placeholders.filter(p => !demographics.includes(p));
  scorePlaceholders.forEach(field => {
    paragraphs.push(`
      <w:p>
        <w:r><w:t>${formatFieldLabel(field)}: </w:t></w:r>
        <w:r><w:t>{${field}}</w:t></w:r>
      </w:p>
    `);
  });

  return paragraphs.join("\n");
};

// Format field label for display
const formatFieldLabel = (field: string): string => {
  // Add spaces before capital letters and capitalize first letter
  return field
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, str => str.toUpperCase())
    .trim();
};
