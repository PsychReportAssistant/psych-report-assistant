import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle, convertInchesToTwip } from 'docx';
import { jsPDF } from 'jspdf';
import type { AssessmentData } from './reportParser';

const borderStyle = {
  top: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
  bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
  left: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
  right: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" },
};

const headerBorder = {
  top: { style: BorderStyle.SINGLE, size: 2, color: "2596BE" },
  bottom: { style: BorderStyle.SINGLE, size: 2, color: "2596BE" },
  left: { style: BorderStyle.SINGLE, size: 2, color: "2596BE" },
  right: { style: BorderStyle.SINGLE, size: 2, color: "2596BE" },
};

export async function generateDOCX(data: AssessmentData): Promise<Blob> {
  // Composite/Index Scores Table
  const compositeTableRows = [
    new TableRow({
      tableHeader: true,
      children: [
        new TableCell({ 
          children: [new Paragraph({ children: [new TextRun({ text: "Index", bold: true, size: 22 })] })],
          width: { size: 3500, type: WidthType.DXA },
          shading: { fill: "2596BE" },
          borders: headerBorder,
        }),
        new TableCell({ 
          children: [new Paragraph({ children: [new TextRun({ text: "Abbreviation", bold: true, size: 22, color: "FFFFFF" })] })],
          width: { size: 1500, type: WidthType.DXA },
          shading: { fill: "2596BE" },
          borders: headerBorder,
        }),
        new TableCell({ 
          children: [new Paragraph({ children: [new TextRun({ text: "Standard Score", bold: true, size: 22, color: "FFFFFF" })], alignment: AlignmentType.CENTER })],
          width: { size: 1500, type: WidthType.DXA },
          shading: { fill: "2596BE" },
          borders: headerBorder,
        }),
        new TableCell({ 
          children: [new Paragraph({ children: [new TextRun({ text: "Percentile", bold: true, size: 22, color: "FFFFFF" })], alignment: AlignmentType.CENTER })],
          width: { size: 1200, type: WidthType.DXA },
          shading: { fill: "2596BE" },
          borders: headerBorder,
        }),
        new TableCell({ 
          children: [new Paragraph({ children: [new TextRun({ text: "Classification", bold: true, size: 22, color: "FFFFFF" })], alignment: AlignmentType.CENTER })],
          width: { size: 2000, type: WidthType.DXA },
          shading: { fill: "2596BE" },
          borders: headerBorder,
        }),
      ],
    }),
    ...(data.compositeScores || []).map((s, i) => new TableRow({
      children: [
        new TableCell({ 
          children: [new Paragraph({ children: [new TextRun({ text: s.name, size: 22 })] })],
          borders: borderStyle,
          shading: { fill: i % 2 === 0 ? "FFFFFF" : "F8F9FA" },
        }),
        new TableCell({ 
          children: [new Paragraph({ text: s.abbreviation, alignment: AlignmentType.CENTER })],
          borders: borderStyle,
          shading: { fill: i % 2 === 0 ? "FFFFFF" : "F8F9FA" },
        }),
        new TableCell({ 
          children: [new Paragraph({ text: s.standardScore?.toString() || 'N/A', alignment: AlignmentType.CENTER })],
          borders: borderStyle,
          shading: { fill: i % 2 === 0 ? "FFFFFF" : "F8F9FA" },
        }),
        new TableCell({ 
          children: [new Paragraph({ text: s.percentileRank?.toString() || 'N/A', alignment: AlignmentType.CENTER })],
          borders: borderStyle,
          shading: { fill: i % 2 === 0 ? "FFFFFF" : "F8F9FA" },
        }),
        new TableCell({ 
          children: [new Paragraph({ text: s.classification || 'N/A', alignment: AlignmentType.CENTER })],
          borders: borderStyle,
          shading: { fill: i % 2 === 0 ? "FFFFFF" : "F8F9FA" },
        }),
      ],
    })),
  ];

  // Subtest Scores Table
  const subtestTableRows = [
    new TableRow({
      tableHeader: true,
      children: [
        new TableCell({ 
          children: [new Paragraph({ children: [new TextRun({ text: "Subtest", bold: true, size: 22, color: "FFFFFF" })] })],
          width: { size: 4000, type: WidthType.DXA },
          shading: { fill: "2596BE" },
          borders: headerBorder,
        }),
        new TableCell({ 
          children: [new Paragraph({ children: [new TextRun({ text: "Scaled Score", bold: true, size: 22, color: "FFFFFF" })], alignment: AlignmentType.CENTER })],
          width: { size: 1500, type: WidthType.DXA },
          shading: { fill: "2596BE" },
          borders: headerBorder,
        }),
        new TableCell({ 
          children: [new Paragraph({ children: [new TextRun({ text: "Percentile", bold: true, size: 22, color: "FFFFFF" })], alignment: AlignmentType.CENTER })],
          width: { size: 1200, type: WidthType.DXA },
          shading: { fill: "2596BE" },
          borders: headerBorder,
        }),
        new TableCell({ 
          children: [new Paragraph({ children: [new TextRun({ text: "Classification", bold: true, size: 22, color: "FFFFFF" })], alignment: AlignmentType.CENTER })],
          width: { size: 2300, type: WidthType.DXA },
          shading: { fill: "2596BE" },
          borders: headerBorder,
        }),
      ],
    }),
    ...data.scores.map((s, i) => new TableRow({
      children: [
        new TableCell({ 
          children: [new Paragraph({ children: [new TextRun({ text: s.scaleName, size: 22 })] })],
          borders: borderStyle,
          shading: { fill: i % 2 === 0 ? "FFFFFF" : "F8F9FA" },
        }),
        new TableCell({ 
          children: [new Paragraph({ text: s.standardScore?.toString() || 'N/A', alignment: AlignmentType.CENTER })],
          borders: borderStyle,
          shading: { fill: i % 2 === 0 ? "FFFFFF" : "F8F9FA" },
        }),
        new TableCell({ 
          children: [new Paragraph({ text: s.percentileRank?.toString() || 'N/A', alignment: AlignmentType.CENTER })],
          borders: borderStyle,
          shading: { fill: i % 2 === 0 ? "FFFFFF" : "F8F9FA" },
        }),
        new TableCell({ 
          children: [new Paragraph({ text: s.classification || 'N/A', alignment: AlignmentType.CENTER })],
          borders: borderStyle,
          shading: { fill: i % 2 === 0 ? "FFFFFF" : "F8F9FA" },
        }),
      ],
    })),
  ];

  // Find FSIQ for summary
  const fsiq = data.compositeScores?.find(s => s.abbreviation === 'FSIQ');

  const doc = new Document({
    styles: {
      paragraphStyles: [
        {
          id: "Normal",
          name: "Normal",
          run: { size: 22, font: "Calibri" },
          paragraph: { spacing: { after: 120, line: 276 } },
        },
      ],
    },
    sections: [{
      properties: {
        page: {
          margin: {
            top: convertInchesToTwip(1),
            right: convertInchesToTwip(1),
            bottom: convertInchesToTwip(1),
            left: convertInchesToTwip(1),
          },
        },
      },
      children: [
        // Title
        new Paragraph({
          children: [new TextRun({ text: "PSYCHOLOGICAL ASSESSMENT REPORT", bold: true, size: 36 })],
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
        }),
        new Paragraph({
          children: [new TextRun({ text: "Wechsler Intelligence Scale for Children - Fifth Edition (WISC-V)", size: 24, italics: true })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
        }),

        // Section: Identifying Information
        new Paragraph({
          children: [new TextRun({ text: "IDENTIFYING INFORMATION", bold: true, size: 26, color: "2596BE" })],
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 200 },
          border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: "2596BE" } },
        }),
        new Paragraph({ text: "", spacing: { after: 100 } }),
        
        // Demographics in two-column style
        new Table({
          rows: [
            new TableRow({
              children: [
                new TableCell({ 
                  children: [new Paragraph({ children: [new TextRun({ text: "Student Name:", bold: true, size: 22 })] })],
                  width: { size: 2500, type: WidthType.DXA },
                  borders: { top: { style: BorderStyle.NIL }, bottom: { style: BorderStyle.NIL }, left: { style: BorderStyle.NIL }, right: { style: BorderStyle.NIL } },
                }),
                new TableCell({ 
                  children: [new Paragraph({ children: [new TextRun({ text: data.studentName, size: 22 })] })],
                  width: { size: 3000, type: WidthType.DXA },
                  borders: { top: { style: BorderStyle.NIL }, bottom: { style: BorderStyle.NIL }, left: { style: BorderStyle.NIL }, right: { style: BorderStyle.NIL } },
                }),
                new TableCell({ 
                  children: [new Paragraph({ children: [new TextRun({ text: "Date of Testing:", bold: true, size: 22 })] })],
                  width: { size: 2500, type: WidthType.DXA },
                  borders: { top: { style: BorderStyle.NIL }, bottom: { style: BorderStyle.NIL }, left: { style: BorderStyle.NIL }, right: { style: BorderStyle.NIL } },
                }),
                new TableCell({ 
                  children: [new Paragraph({ children: [new TextRun({ text: data.dateOfTesting, size: 22 })] })],
                  width: { size: 2000, type: WidthType.DXA },
                  borders: { top: { style: BorderStyle.NIL }, bottom: { style: BorderStyle.NIL }, left: { style: BorderStyle.NIL }, right: { style: BorderStyle.NIL } },
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ 
                  children: [new Paragraph({ children: [new TextRun({ text: "Date of Birth:", bold: true, size: 22 })] })],
                  borders: { top: { style: BorderStyle.NIL }, bottom: { style: BorderStyle.NIL }, left: { style: BorderStyle.NIL }, right: { style: BorderStyle.NIL } },
                }),
                new TableCell({ 
                  children: [new Paragraph({ children: [new TextRun({ text: data.dateOfBirth, size: 22 })] })],
                  borders: { top: { style: BorderStyle.NIL }, bottom: { style: BorderStyle.NIL }, left: { style: BorderStyle.NIL }, right: { style: BorderStyle.NIL } },
                }),
                new TableCell({ 
                  children: [new Paragraph({ children: [new TextRun({ text: "Chronological Age:", bold: true, size: 22 })] })],
                  borders: { top: { style: BorderStyle.NIL }, bottom: { style: BorderStyle.NIL }, left: { style: BorderStyle.NIL }, right: { style: BorderStyle.NIL } },
                }),
                new TableCell({ 
                  children: [new Paragraph({ children: [new TextRun({ text: data.chronologicalAge, size: 22 })] })],
                  borders: { top: { style: BorderStyle.NIL }, bottom: { style: BorderStyle.NIL }, left: { style: BorderStyle.NIL }, right: { style: BorderStyle.NIL } },
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ 
                  children: [new Paragraph({ children: [new TextRun({ text: "Grade:", bold: true, size: 22 })] })],
                  borders: { top: { style: BorderStyle.NIL }, bottom: { style: BorderStyle.NIL }, left: { style: BorderStyle.NIL }, right: { style: BorderStyle.NIL } },
                }),
                new TableCell({ 
                  children: [new Paragraph({ children: [new TextRun({ text: data.grade, size: 22 })] })],
                  borders: { top: { style: BorderStyle.NIL }, bottom: { style: BorderStyle.NIL }, left: { style: BorderStyle.NIL }, right: { style: BorderStyle.NIL } },
                }),
                new TableCell({ 
                  children: [new Paragraph({ children: [new TextRun({ text: "Examiner:", bold: true, size: 22 })] })],
                  borders: { top: { style: BorderStyle.NIL }, bottom: { style: BorderStyle.NIL }, left: { style: BorderStyle.NIL }, right: { style: BorderStyle.NIL } },
                }),
                new TableCell({ 
                  children: [new Paragraph({ children: [new TextRun({ text: data.examiner, size: 22 })] })],
                  borders: { top: { style: BorderStyle.NIL }, bottom: { style: BorderStyle.NIL }, left: { style: BorderStyle.NIL }, right: { style: BorderStyle.NIL } },
                }),
              ],
            }),
          ],
          width: { size: 100, type: WidthType.PERCENTAGE },
        }),

        // Section: Reason for Referral
        new Paragraph({
          children: [new TextRun({ text: "REASON FOR REFERRAL", bold: true, size: 26, color: "2596BE" })],
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400, after: 200 },
          border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: "2596BE" } },
        }),
        new Paragraph({ text: "", spacing: { after: 100 } }),
        new Paragraph({ 
          children: [new TextRun({ text: `${data.studentName} was referred for a comprehensive psychological evaluation to assess cognitive functioning and identify areas of strength or weakness that may impact academic performance.`, size: 22 })]
        }),

        // Section: Background Information
        new Paragraph({
          children: [new TextRun({ text: "BACKGROUND INFORMATION", bold: true, size: 26, color: "2596BE" })],
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400, after: 200 },
          border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: "2596BE" } },
        }),
        new Paragraph({ text: "", spacing: { after: 100 } }),
        new Paragraph({ 
          children: [new TextRun({ text: "[Insert relevant background information including developmental history, educational history, and any pertinent medical or social history.]", size: 22, italics: true })]
        }),

        // Section: Test Results - Composite Scores
        new Paragraph({
          children: [new TextRun({ text: "TEST RESULTS", bold: true, size: 26, color: "2596BE" })],
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400, after: 200 },
          border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: "2596BE" } },
        }),
        new Paragraph({ text: "", spacing: { after: 100 } }),
        
        new Paragraph({ 
          children: [new TextRun({ text: "Composite/Index Scores", bold: true, size: 24 })],
          spacing: { after: 150 },
        }),
        
        ...(data.compositeScores && data.compositeScores.length > 0 ? [
          new Table({
            rows: compositeTableRows,
            width: { size: 100, type: WidthType.PERCENTAGE },
          }),
        ] : [
          new Paragraph({ children: [new TextRun({ text: "[No composite scores available]", size: 22, italics: true })] }),
        ]),

        new Paragraph({ text: "", spacing: { after: 200 } }),
        
        new Paragraph({ 
          children: [new TextRun({ text: "Subtest Scores", bold: true, size: 24 })],
          spacing: { after: 150 },
        }),
        
        ...(data.scores.length > 0 ? [
          new Table({
            rows: subtestTableRows,
            width: { size: 100, type: WidthType.PERCENTAGE },
          }),
          new Paragraph({ text: "", spacing: { after: 60 } }),
          new Paragraph({ 
            children: [new TextRun({ text: "Note: Standard Scores have a mean of 100 and SD of 15. Scaled Scores have a mean of 10 and SD of 3.", size: 18, italics: true, color: "666666" })]
          }),
        ] : [
          new Paragraph({ children: [new TextRun({ text: "[No subtest scores available]", size: 22, italics: true })] }),
        ]),

        // Section: Interpretation
        new Paragraph({
          children: [new TextRun({ text: "INTERPRETATION OF RESULTS", bold: true, size: 26, color: "2596BE" })],
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400, after: 200 },
          border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: "2596BE" } },
        }),
        new Paragraph({ text: "", spacing: { after: 100 } }),
        
        ...(fsiq ? [
          new Paragraph({
            children: [
              new TextRun({ text: `${data.studentName} obtained a Full Scale IQ (FSIQ) of ${fsiq.standardScore}, which falls at the ${fsiq.percentileRank}th percentile and is classified in the ${fsiq.classification} range. This indicates that ${data.studentName}'s overall cognitive abilities are ${fsiq.classification.toLowerCase()} compared to same-age peers.`, size: 22 }),
            ],
            spacing: { after: 200 },
          }),
        ] : []),

        ...(data.compositeScores || []).filter(s => s.abbreviation !== 'FSIQ').map(s => new Paragraph({
          children: [
            new TextRun({ text: `${s.name} (${s.abbreviation}): `, bold: true, size: 22 }),
            new TextRun({ text: `${data.studentName}'s score of ${s.standardScore} (${s.percentileRank}th percentile) falls within the ${s.classification} range.`, size: 22 }),
          ],
          spacing: { after: 150 },
        })),

        // Section: Summary and Recommendations
        new Paragraph({
          children: [new TextRun({ text: "SUMMARY AND RECOMMENDATIONS", bold: true, size: 26, color: "2596BE" })],
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400, after: 200 },
          border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: "2596BE" } },
        }),
        new Paragraph({ text: "", spacing: { after: 100 } }),
        new Paragraph({ 
          children: [new TextRun({ text: `Based on the results of this evaluation, ${data.studentName} demonstrates cognitive abilities as measured by the WISC-V${fsiq ? `, with an overall FSIQ of ${fsiq.standardScore} (${fsiq.classification})` : ''}.`, size: 22 })]
        }),
        new Paragraph({ text: "", spacing: { after: 200 } }),
        new Paragraph({ children: [new TextRun({ text: "Recommendations:", bold: true, size: 22 })] }),
        new Paragraph({ text: "", spacing: { after: 100 } }),
        new Paragraph({ children: [new TextRun({ text: "1. [Insert specific recommendation based on assessment results]", size: 22 })], indent: { left: 360 } }),
        new Paragraph({ children: [new TextRun({ text: "2. [Insert specific recommendation based on assessment results]", size: 22 })], indent: { left: 360 } }),
        new Paragraph({ children: [new TextRun({ text: "3. [Insert specific recommendation based on assessment results]", size: 22 })], indent: { left: 360 } }),

        // Signature
        new Paragraph({ text: "", spacing: { before: 600 } }),
        new Paragraph({ children: [new TextRun({ text: "_________________________________", size: 22 })] }),
        new Paragraph({ children: [new TextRun({ text: data.examiner, bold: true, size: 22 })] }),
        new Paragraph({ children: [new TextRun({ text: "School Psychologist", size: 22 })] }),
        new Paragraph({ children: [new TextRun({ text: `Date: ${data.dateOfTesting}`, size: 22 })] }),
      ],
    }],
  });

  return await Packer.toBlob(doc);
}

export function generatePDF(data: AssessmentData): Blob {
  const doc = new jsPDF();
  const margin = 20;
  let y = margin;
  const lineHeight = 6;
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - margin * 2;

  const addSectionHeader = (text: string) => {
    checkNewPage(25);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(37, 150, 190);
    doc.text(text, margin, y);
    y += 2;
    doc.setDrawColor(37, 150, 190);
    doc.setLineWidth(0.8);
    doc.line(margin, y, pageWidth - margin, y);
    y += lineHeight * 1.5;
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
  };

  const addLabelValue = (label: string, value: string, x: number = margin + 5) => {
    doc.setFont('helvetica', 'bold');
    doc.text(label, x, y);
    doc.setFont('helvetica', 'normal');
    const labelWidth = doc.getTextWidth(label);
    doc.text(value, x + labelWidth + 2, y);
  };

  const addParagraph = (text: string, indent: number = 0) => {
    const lines = doc.splitTextToSize(text, contentWidth - indent);
    lines.forEach((line: string) => {
      checkNewPage();
      doc.text(line, margin + indent, y);
      y += lineHeight;
    });
  };

  const checkNewPage = (space: number = 15) => {
    if (y > 280 - space) {
      doc.addPage();
      y = margin;
    }
  };

  // Title
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('PSYCHOLOGICAL ASSESSMENT REPORT', pageWidth / 2, y, { align: 'center' });
  y += lineHeight * 1.5;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'italic');
  doc.text('Wechsler Intelligence Scale for Children - Fifth Edition (WISC-V)', pageWidth / 2, y, { align: 'center' });
  y += lineHeight * 2.5;

  // Identifying Information
  addSectionHeader('IDENTIFYING INFORMATION');
  
  addLabelValue('Student Name: ', data.studentName);
  doc.text('Date of Testing: ', pageWidth / 2, y);
  doc.setFont('helvetica', 'normal');
  doc.text(data.dateOfTesting, pageWidth / 2 + doc.getTextWidth('Date of Testing: ') + 2, y);
  y += lineHeight;
  
  addLabelValue('Date of Birth: ', data.dateOfBirth);
  doc.setFont('helvetica', 'bold');
  doc.text('Age: ', pageWidth / 2, y);
  doc.setFont('helvetica', 'normal');
  doc.text(data.chronologicalAge, pageWidth / 2 + doc.getTextWidth('Age: ') + 2, y);
  y += lineHeight;
  
  addLabelValue('Grade: ', data.grade);
  doc.setFont('helvetica', 'bold');
  doc.text('Examiner: ', pageWidth / 2, y);
  doc.setFont('helvetica', 'normal');
  doc.text(data.examiner, pageWidth / 2 + doc.getTextWidth('Examiner: ') + 2, y);
  y += lineHeight * 2;

  // Reason for Referral
  addSectionHeader('REASON FOR REFERRAL');
  addParagraph(`${data.studentName} was referred for a comprehensive psychological evaluation to assess cognitive functioning and identify areas of strength or weakness that may impact academic performance.`);
  y += lineHeight;

  // Background Information
  addSectionHeader('BACKGROUND INFORMATION');
  doc.setFont('helvetica', 'italic');
  addParagraph('[Insert relevant background information including developmental history, educational history, and any pertinent medical or social history.]');
  doc.setFont('helvetica', 'normal');
  y += lineHeight;

  // Test Results
  addSectionHeader('TEST RESULTS');

  // Composite Scores Table
  if (data.compositeScores && data.compositeScores.length > 0) {
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Composite/Index Scores', margin, y);
    y += lineHeight * 1.2;
    
    doc.setFontSize(9);
    
    // Table header
    doc.setFillColor(37, 150, 190);
    doc.rect(margin, y - 4, contentWidth, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text('Index', margin + 2, y);
    doc.text('Abbr', margin + 65, y);
    doc.text('SS', margin + 90, y);
    doc.text('PR', margin + 110, y);
    doc.text('Classification', margin + 130, y);
    y += lineHeight;
    
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    
    data.compositeScores.forEach((score, i) => {
      checkNewPage(8);
      if (i % 2 === 1) {
        doc.setFillColor(248, 249, 250);
        doc.rect(margin, y - 4, contentWidth, 6, 'F');
      }
      doc.text(score.name.substring(0, 35), margin + 2, y);
      doc.text(score.abbreviation, margin + 65, y);
      doc.text(score.standardScore?.toString() || 'N/A', margin + 90, y);
      doc.text(score.percentileRank?.toString() || 'N/A', margin + 110, y);
      doc.text(score.classification || 'N/A', margin + 130, y);
      y += lineHeight;
    });
    
    y += lineHeight;
  }

  // Subtest Scores Table
  if (data.scores.length > 0) {
    checkNewPage(30);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Subtest Scores', margin, y);
    y += lineHeight * 1.2;
    
    doc.setFontSize(9);
    
    // Table header
    doc.setFillColor(37, 150, 190);
    doc.rect(margin, y - 4, contentWidth, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text('Subtest', margin + 2, y);
    doc.text('Scaled Score', margin + 80, y);
    doc.text('Percentile', margin + 115, y);
    doc.text('Classification', margin + 145, y);
    y += lineHeight;
    
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    
    data.scores.forEach((score, i) => {
      checkNewPage(8);
      if (i % 2 === 1) {
        doc.setFillColor(248, 249, 250);
        doc.rect(margin, y - 4, contentWidth, 6, 'F');
      }
      doc.text(score.scaleName, margin + 2, y);
      doc.text(score.standardScore?.toString() || 'N/A', margin + 90, y);
      doc.text(score.percentileRank?.toString() || 'N/A', margin + 120, y);
      doc.text(score.classification || 'N/A', margin + 145, y);
      y += lineHeight;
    });
    
    y += lineHeight;
  }

  // Note
  doc.setFontSize(8);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(100, 100, 100);
  doc.text('Note: Standard Scores have a mean of 100 and SD of 15. Scaled Scores have a mean of 10 and SD of 3.', margin, y);
  doc.setTextColor(0, 0, 0);
  y += lineHeight * 2;

  // Interpretation
  addSectionHeader('INTERPRETATION OF RESULTS');
  
  const fsiq = data.compositeScores?.find(s => s.abbreviation === 'FSIQ');
  if (fsiq) {
    addParagraph(`${data.studentName} obtained a Full Scale IQ (FSIQ) of ${fsiq.standardScore}, which falls at the ${fsiq.percentileRank}th percentile and is classified in the ${fsiq.classification} range. This indicates that ${data.studentName}'s overall cognitive abilities are ${fsiq.classification.toLowerCase()} compared to same-age peers.`);
    y += lineHeight;
  }

  (data.compositeScores || []).filter(s => s.abbreviation !== 'FSIQ').forEach(s => {
    checkNewPage(15);
    doc.setFont('helvetica', 'bold');
    doc.text(`${s.name} (${s.abbreviation}): `, margin, y);
    doc.setFont('helvetica', 'normal');
    const prefix = doc.getTextWidth(`${s.name} (${s.abbreviation}): `);
    const remaining = contentWidth - prefix;
    const text = `${data.studentName}'s score of ${s.standardScore} (${s.percentileRank}th percentile) falls within the ${s.classification} range.`;
    const lines = doc.splitTextToSize(text, remaining);
    doc.text(lines[0], margin + prefix, y);
    if (lines.length > 1) {
      y += lineHeight;
      for (let i = 1; i < lines.length; i++) {
        doc.text(lines[i], margin, y);
        y += lineHeight;
      }
    } else {
      y += lineHeight;
    }
  });
  y += lineHeight;

  // Summary and Recommendations
  addSectionHeader('SUMMARY AND RECOMMENDATIONS');
  addParagraph(`Based on the results of this evaluation, ${data.studentName} demonstrates cognitive abilities as measured by the WISC-V${fsiq ? `, with an overall FSIQ of ${fsiq.standardScore} (${fsiq.classification})` : ''}.`);
  y += lineHeight;

  doc.setFont('helvetica', 'bold');
  doc.text('Recommendations:', margin, y);
  y += lineHeight;
  doc.setFont('helvetica', 'normal');
  
  doc.text('1. [Insert specific recommendation based on assessment results]', margin + 10, y);
  y += lineHeight;
  doc.text('2. [Insert specific recommendation based on assessment results]', margin + 10, y);
  y += lineHeight;
  doc.text('3. [Insert specific recommendation based on assessment results]', margin + 10, y);
  y += lineHeight * 3;

  // Signature
  checkNewPage(35);
  doc.text('_________________________________', margin, y);
  y += lineHeight;
  doc.setFont('helvetica', 'bold');
  doc.text(data.examiner, margin, y);
  y += lineHeight;
  doc.setFont('helvetica', 'normal');
  doc.text('School Psychologist', margin, y);
  y += lineHeight;
  doc.text(`Date: ${data.dateOfTesting}`, margin, y);

  return doc.output('blob');
}
