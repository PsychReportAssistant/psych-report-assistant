// Q-Global Assessment Templates Configuration
export interface AssessmentTemplate {
  id: string;
  name: string;
  description: string;
  placeholders: string[];
}

// Pre-defined Q-Global assessments with ACTUAL Q-Global export column headers
export const ASSESSMENT_TEMPLATES: AssessmentTemplate[] = [
  {
    id: "wisc-v",
    name: "WISC-V",
    description: "Wechsler Intelligence Scale for Children - Fifth Edition",
    placeholders: [
      // Demographics
      "FirstName", "MiddleName", "LastName", "ExamineeID", "Gender", "BirthDate", 
      "AdministrationDate", "AgeAtAssessment", "Ethnicity", "Handedness", "Language", 
      "Grade", "Retest", "Examiner",
      // Composite Scores (Standard Scores)
      "wisc5_fsiq_ss", "wisc5_vci_ss", "wisc5_vsi_ss", "wisc5_fri_ss", "wisc5_wmi_ss", 
      "wisc5_psi_ss", "wisc5_gai_ss", "wisc5_cpi_ss", "wisc5_nvi_ss", "wisc5_qri_ss",
      "wisc5_awmi_ss", "wisc5_nsi_ss", "wisc5_sti_ss", "wisc5_sri_ss",
      // Subtest Scaled Scores
      "wisc5_bd_ss", "wisc5_si_ss", "wisc5_mr_ss", "wisc5_ds_ss", "wisc5_cd_ss",
      "wisc5_vc_ss", "wisc5_fw_ss", "wisc5_vp_ss", "wisc5_ps_ss", "wisc5_ss_ss",
      "wisc5_in_ss", "wisc5_pc_ss", "wisc5_ln_ss", "wisc5_ca_ss", "wisc5_co_ss", "wisc5_ar_ss",
      // Process Scores
      "wisc5_bdn_ss", "wisc5_bdp_ss", "wisc5_dsf_ss", "wisc5_dsb_ss", "wisc5_dss_ss",
      "wisc5_car_ss", "wisc5_cas_ss", "wisc5_nsco_ss", "wisc5_nssco_ss", "wisc5_nsln_ss",
      "wisc5_nsl_ss", "wisc5_nsq_ss", "wisc5_ist_ss", "wisc5_dst_ss", "wisc5_rst_ss"
    ]
  },
  {
    id: "wais-iv",
    name: "WAIS-IV",
    description: "Wechsler Adult Intelligence Scale - Fourth Edition",
    placeholders: [
      "FirstName", "MiddleName", "LastName", "ExamineeID", "Gender", "BirthDate",
      "AdministrationDate", "AgeAtAssessment", "Examiner",
      "wais4_fsiq_ss", "wais4_vci_ss", "wais4_pri_ss", "wais4_wmi_ss", "wais4_psi_ss",
      "wais4_gai_ss", "wais4_cpi_ss",
      "wais4_si_ss", "wais4_vc_ss", "wais4_in_ss", "wais4_co_ss",
      "wais4_bd_ss", "wais4_mr_ss", "wais4_vp_ss", "wais4_fw_ss", "wais4_pc_ss",
      "wais4_ds_ss", "wais4_ar_ss", "wais4_ln_ss",
      "wais4_ss_ss", "wais4_cd_ss", "wais4_ca_ss"
    ]
  },
  {
    id: "wiat-4",
    name: "WIAT-4",
    description: "Wechsler Individual Achievement Test - Fourth Edition",
    placeholders: [
      "FirstName", "MiddleName", "LastName", "ExamineeID", "Gender", "BirthDate",
      "AdministrationDate", "AgeAtAssessment", "Grade", "Examiner",
      "wiat4_wr_ss", "wiat4_rc_ss", "wiat4_pd_ss", "wiat4_orf_ss", "wiat4_sp_ss",
      "wiat4_sc_ss", "wiat4_ec_ss", "wiat4_no_ss", "wiat4_mps_ss", "wiat4_mfa_ss",
      "wiat4_mfs_ss", "wiat4_mfm_ss", "wiat4_lc_ss", "wiat4_oe_ss",
      "wiat4_read_ss", "wiat4_writ_ss", "wiat4_math_ss", "wiat4_oral_ss", "wiat4_total_ss"
    ]
  },
  {
    id: "basc-3",
    name: "BASC-3",
    description: "Behavior Assessment System for Children - Third Edition",
    placeholders: [
      "FirstName", "MiddleName", "LastName", "ExamineeID", "Gender", "BirthDate",
      "AdministrationDate", "AgeAtAssessment", "Grade", "Examiner", "RaterName",
      "basc3_ext_t", "basc3_int_t", "basc3_bsi_t", "basc3_ada_t",
      "basc3_hyp_t", "basc3_agg_t", "basc3_cp_t", "basc3_anx_t", "basc3_dep_t",
      "basc3_som_t", "basc3_aty_t", "basc3_wdl_t", "basc3_ap_t",
      "basc3_adp_t", "basc3_ss_t", "basc3_ldr_t", "basc3_fc_t", "basc3_adl_t"
    ]
  },
  {
    id: "vineland-3",
    name: "Vineland-3",
    description: "Vineland Adaptive Behavior Scales - Third Edition",
    placeholders: [
      "FirstName", "MiddleName", "LastName", "ExamineeID", "Gender", "BirthDate",
      "AdministrationDate", "AgeAtAssessment", "Grade", "Examiner", "RespondentName",
      "vin3_abc_ss", "vin3_comm_ss", "vin3_dls_ss", "vin3_soc_ss", "vin3_mot_ss",
      "vin3_rec_ss", "vin3_exp_ss", "vin3_wri_ss",
      "vin3_per_ss", "vin3_dom_ss", "vin3_com_ss",
      "vin3_ir_ss", "vin3_pl_ss", "vin3_cop_ss",
      "vin3_gm_ss", "vin3_fm_ss"
    ]
  },
  {
    id: "conners-4",
    name: "Conners 4",
    description: "Conners Fourth Edition",
    placeholders: [
      "FirstName", "MiddleName", "LastName", "ExamineeID", "Gender", "BirthDate",
      "AdministrationDate", "AgeAtAssessment", "Grade", "Examiner", "RaterName",
      "con4_in_t", "con4_hy_t", "con4_im_t", "con4_lp_t", "con4_ef_t",
      "con4_def_t", "con4_pr_t", "con4_adhd_t",
      "con4_dsm_in_t", "con4_dsm_hi_t", "con4_dsm_tot_t"
    ]
  },
  {
    id: "celf-5",
    name: "CELF-5",
    description: "Clinical Evaluation of Language Fundamentals - Fifth Edition",
    placeholders: [
      "FirstName", "MiddleName", "LastName", "ExamineeID", "Gender", "BirthDate",
      "AdministrationDate", "AgeAtAssessment", "Grade", "Examiner",
      "celf5_cli_ss", "celf5_rli_ss", "celf5_eli_ss", "celf5_lci_ss", "celf5_lsi_ss",
      "celf5_sc_ss", "celf5_lc_ss", "celf5_ws_ss", "celf5_wc_ss", "celf5_fd_ss",
      "celf5_fs_ss", "celf5_rs_ss", "celf5_usp_ss", "celf5_wd_ss", "celf5_sa_ss", "celf5_sr_ss"
    ]
  },
  {
    id: "ppvt-5",
    name: "PPVT-5",
    description: "Peabody Picture Vocabulary Test - Fifth Edition",
    placeholders: [
      "FirstName", "MiddleName", "LastName", "ExamineeID", "Gender", "BirthDate",
      "AdministrationDate", "AgeAtAssessment", "Grade", "Examiner",
      "ppvt5_ss", "ppvt5_pr", "ppvt5_ae", "ppvt5_ge", "ppvt5_gsv", "ppvt5_raw"
    ]
  },
  {
    id: "evt-3",
    name: "EVT-3",
    description: "Expressive Vocabulary Test - Third Edition",
    placeholders: [
      "FirstName", "MiddleName", "LastName", "ExamineeID", "Gender", "BirthDate",
      "AdministrationDate", "AgeAtAssessment", "Grade", "Examiner",
      "evt3_ss", "evt3_pr", "evt3_ae", "evt3_ge", "evt3_gsv", "evt3_raw"
    ]
  }
];

// Get template by ID
export const getTemplateById = (id: string): AssessmentTemplate | undefined => {
  return ASSESSMENT_TEMPLATES.find(t => t.id === id);
};
