// WISC-V Q-Global CSV Parser
// Bulk report generation: read CSV → detect columns → merge with template → output reports
// Follows Pandas-like pattern for data processing

export interface AssessmentData {
  studentName: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  dateOfTesting: string;
  chronologicalAge: string;
  grade: string;
  school: string;
  examiner: string;
  gender: string;
  testName: string;
  scores: ScoreData[];
  compositeScores: CompositeScore[];
  placeholders: Record<string, string>;
}

export interface ScoreData {
  scaleName: string;
  standardScore: number;
  percentileRank: number;
  classification: string;
  confidenceInterval?: string;
}

export interface CompositeScore {
  name: string;
  abbreviation: string;
  standardScore: number;
  percentileRank: number;
  classification: string;
}

// WISC-V specific column mappings
const WISC_V_COMPOSITES = [
  { abbr: 'fsiq', name: 'Full Scale IQ', key: 'wisc5_fsiq_ss' },
  { abbr: 'vci', name: 'Verbal Comprehension Index', key: 'wisc5_vci_ss' },
  { abbr: 'vsi', name: 'Visual Spatial Index', key: 'wisc5_vsi_ss' },
  { abbr: 'fri', name: 'Fluid Reasoning Index', key: 'wisc5_fri_ss' },
  { abbr: 'wmi', name: 'Working Memory Index', key: 'wisc5_wmi_ss' },
  { abbr: 'psi', name: 'Processing Speed Index', key: 'wisc5_psi_ss' },
  { abbr: 'gai', name: 'General Ability Index', key: 'wisc5_gai_ss' },
  { abbr: 'cpi', name: 'Cognitive Proficiency Index', key: 'wisc5_cpi_ss' },
  { abbr: 'nvi', name: 'Nonverbal Index', key: 'wisc5_nvi_ss' },
  { abbr: 'qri', name: 'Quantitative Reasoning Index', key: 'wisc5_qri_ss' },
  { abbr: 'awmi', name: 'Auditory Working Memory Index', key: 'wisc5_awmi_ss' },
  { abbr: 'nsi', name: 'Naming Speed Index', key: 'wisc5_nsi_ss' },
  { abbr: 'sti', name: 'Symbol Translation Index', key: 'wisc5_sti_ss' },
  { abbr: 'sri', name: 'Storage and Retrieval Index', key: 'wisc5_sri_ss' },
];

const WISC_V_SUBTESTS = [
  { abbr: 'bd', name: 'Block Design', key: 'wisc5_bd_ss' },
  { abbr: 'si', name: 'Similarities', key: 'wisc5_si_ss' },
  { abbr: 'mr', name: 'Matrix Reasoning', key: 'wisc5_mr_ss' },
  { abbr: 'ds', name: 'Digit Span', key: 'wisc5_ds_ss' },
  { abbr: 'cd', name: 'Coding', key: 'wisc5_cd_ss' },
  { abbr: 'vc', name: 'Vocabulary', key: 'wisc5_vc_ss' },
  { abbr: 'fw', name: 'Figure Weights', key: 'wisc5_fw_ss' },
  { abbr: 'vp', name: 'Visual Puzzles', key: 'wisc5_vp_ss' },
  { abbr: 'ps', name: 'Picture Span', key: 'wisc5_ps_ss' },
  { abbr: 'ss', name: 'Symbol Search', key: 'wisc5_ss_ss' },
  { abbr: 'in', name: 'Information', key: 'wisc5_in_ss' },
  { abbr: 'pc', name: 'Picture Concepts', key: 'wisc5_pc_ss' },
  { abbr: 'ln', name: 'Letter-Number Sequencing', key: 'wisc5_ln_ss' },
  { abbr: 'ca', name: 'Cancellation', key: 'wisc5_ca_ss' },
  { abbr: 'co', name: 'Comprehension', key: 'wisc5_co_ss' },
  { abbr: 'ar', name: 'Arithmetic', key: 'wisc5_ar_ss' },
];

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}

export function getClassification(standardScore: number): string {
  if (standardScore >= 130) return "Very Superior";
  if (standardScore >= 120) return "Superior";
  if (standardScore >= 110) return "High Average";
  if (standardScore >= 90) return "Average";
  if (standardScore >= 80) return "Low Average";
  if (standardScore >= 70) return "Borderline";
  return "Extremely Low";
}

export function getPercentileRank(standardScore: number): number {
  const zScore = (standardScore - 100) / 15;
  const percentile = (1 + erf(zScore / Math.sqrt(2))) / 2 * 100;
  return Math.round(percentile);
}

function erf(x: number): number {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);

  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return sign * y;
}

function cleanValue(value: string): string {
  return value?.replace(/^\ufeff/, '').trim() || '';
}

function parseScore(value: string): number | null {
  const cleaned = cleanValue(value);
  if (!cleaned || cleaned === '' || cleaned.includes('%') || cleaned.includes('<')) {
    return null;
  }
  const num = parseInt(cleaned);
  return isNaN(num) ? null : num;
}

// Main parser function - processes WISC-V Q-Global CSV export
// Returns an array of AssessmentData, one per row in the CSV (bulk generation)
export function parseWISCVCSV(content: string): AssessmentData[] {
  const lines = content.split(/\r?\n/).filter(line => line.trim());
  
  if (lines.length < 2) {
    throw new Error('CSV must have at least a header row and one data row');
  }
  
  const headers = parseCSVLine(lines[0]).map(h => cleanValue(h).toLowerCase());
  const records: AssessmentData[] = [];
  
  // Create header index map for quick lookup
  const headerIndex: Record<string, number> = {};
  headers.forEach((h, i) => {
    headerIndex[h] = i;
  });
  
  // Process each data row (bulk generation - one report per row)
  for (let rowIdx = 1; rowIdx < lines.length; rowIdx++) {
    const row = parseCSVLine(lines[rowIdx]);
    
    if (row.length < 2 || row.every(cell => !cell.trim())) {
      continue; // Skip empty rows
    }
    
    const getValue = (key: string): string => {
      const idx = headerIndex[key];
      return idx !== undefined ? cleanValue(row[idx]) : '';
    };
    
    // Extract demographics
    const firstName = getValue('firstname') || getValue('first_name') || getValue('first name') || '';
    const lastName = getValue('lastname') || getValue('last_name') || getValue('last name') || '';
    const studentName = `${firstName} ${lastName}`.trim() || `Student ${rowIdx}`;
    
    // Extract scores - look for columns containing "ss" (standard scores)
    const scores: ScoreData[] = [];
    const compositeScores: CompositeScore[] = [];
    const placeholders: Record<string, string> = {};
    
    // Add demographic placeholders
    placeholders['{{FirstName}}'] = firstName || '[First Name]';
    placeholders['{{LastName}}'] = lastName || '[Last Name]';
    placeholders['{{StudentName}}'] = studentName;
    placeholders['{{DateOfBirth}}'] = getValue('birthdate') || getValue('dateofbirth') || getValue('dob') || '[DOB]';
    placeholders['{{DateOfTesting}}'] = getValue('administrationdate') || getValue('testdate') || '[Test Date]';
    placeholders['{{Age}}'] = getValue('ageatassessment') || getValue('age') || '[Age]';
    placeholders['{{Grade}}'] = getValue('grade') || '[Grade]';
    placeholders['{{Examiner}}'] = getValue('examiner') || '[Examiner]';
    placeholders['{{Gender}}'] = getValue('gender') === '1' ? 'Male' : getValue('gender') === '2' ? 'Female' : getValue('gender') || '[Gender]';
    
    // Process composite scores (Index scores)
    for (const composite of WISC_V_COMPOSITES) {
      const ss = parseScore(getValue(composite.key));
      if (ss !== null) {
        const pr = getPercentileRank(ss);
        const classification = getClassification(ss);
        
        compositeScores.push({
          name: composite.name,
          abbreviation: composite.abbr.toUpperCase(),
          standardScore: ss,
          percentileRank: pr,
          classification,
        });
        
        // Add to placeholders
        const prefix = composite.abbr.toUpperCase();
        placeholders[`{{${prefix}_SS}}`] = ss.toString();
        placeholders[`{{${prefix}_PR}}`] = pr.toString();
        placeholders[`{{${prefix}_CAT}}`] = classification;
      }
    }
    
    // Process subtest scores
    for (const subtest of WISC_V_SUBTESTS) {
      const ss = parseScore(getValue(subtest.key));
      if (ss !== null) {
        const pr = getPercentileRank(ss);
        const classification = getClassification(ss);
        
        scores.push({
          scaleName: subtest.name,
          standardScore: ss,
          percentileRank: pr,
          classification,
        });
        
        // Add to placeholders
        const prefix = subtest.abbr.toUpperCase();
        placeholders[`{{${prefix}_SS}}`] = ss.toString();
        placeholders[`{{${prefix}_PR}}`] = pr.toString();
        placeholders[`{{${prefix}_CAT}}`] = classification;
      }
    }
    
    // Also scan for any other SS columns (dynamic detection)
    headers.forEach((header, idx) => {
      if (header.includes('_ss') && !header.includes('_ssse') && !header.includes('_ssre')) {
        const ss = parseScore(row[idx]);
        if (ss !== null) {
          const baseName = header.replace(/_ss$/, '').replace(/^wisc5_/, '');
          const placeholderKey = baseName.toUpperCase();
          
          if (!placeholders[`{{${placeholderKey}_SS}}`]) {
            placeholders[`{{${placeholderKey}_SS}}`] = ss.toString();
            placeholders[`{{${placeholderKey}_PR}}`] = getPercentileRank(ss).toString();
            placeholders[`{{${placeholderKey}_CAT}}`] = getClassification(ss);
          }
        }
      }
    });
    
    records.push({
      studentName,
      firstName: firstName || '[First Name]',
      lastName: lastName || '[Last Name]',
      dateOfBirth: getValue('birthdate') || getValue('dateofbirth') || getValue('dob') || '[Date of Birth]',
      dateOfTesting: getValue('administrationdate') || getValue('testdate') || '[Date of Testing]',
      chronologicalAge: getValue('ageatassessment') || getValue('age') || '[Age]',
      grade: getValue('grade') || '[Grade]',
      school: getValue('school') || '[School]',
      examiner: getValue('examiner') || '[Examiner]',
      gender: getValue('gender') === '1' ? 'Male' : getValue('gender') === '2' ? 'Female' : '[Gender]',
      testName: 'WISC-V',
      scores,
      compositeScores,
      placeholders,
    });
  }
  
  return records;
}

// Legacy compatibility exports
export interface ExtractedData {
  demographics: Record<string, string>;
  scores: ScoreData[];
  assessmentName: string;
  rawHeaders: string[];
}

export interface ScoreRow {
  scaleName: string;
  standardScore?: number;
  percentileRank?: number;
  classification?: string;
  [key: string]: string | number | undefined;
}

export interface TemplateData {
  placeholders: Record<string, string>;
  scoreTable: ScoreRow[];
  assessmentName: string;
}

export interface ParsedFile {
  fileName: string;
  data: TemplateData;
}

export function parseCSV(content: string): AssessmentData {
  const records = parseWISCVCSV(content);
  return records[0] || {
    studentName: '[Student Name]',
    firstName: '[First Name]',
    lastName: '[Last Name]',
    dateOfBirth: '[Date of Birth]',
    dateOfTesting: '[Date of Testing]',
    chronologicalAge: '[Age]',
    grade: '[Grade]',
    school: '[School]',
    examiner: '[Examiner]',
    gender: '[Gender]',
    testName: 'WISC-V',
    scores: [],
    compositeScores: [],
    placeholders: {},
  };
}

export async function parsePDF(file: File): Promise<AssessmentData> {
  throw new Error('PDF parsing not supported. Please upload a CSV file exported from Q-Global.');
}
