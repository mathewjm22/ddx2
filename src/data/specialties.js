export const specialties = [
  { name: 'General Principles', icon: 'GeneralPrinciplesIcon' },
  { name: 'Immunologic Disorders', icon: 'ImmunologyIcon' },
  { name: 'Diseases of the Blood', icon: 'HemeExpertIcon' },
  { name: 'Mental Disorders', icon: 'PsychIcon' },
  { name: 'Nervous System', icon: 'NeuroExpertIcon' },
  { name: 'Cardiovascular', icon: 'PulmonologyExpertIcon' },
  { name: 'Respiratory System', icon: 'PulmonologyExpertIcon' },
  { name: 'Nutritional & Digestive', icon: 'GIExpertIcon' },
  { name: 'Female Reproductive', icon: 'GynIcon' },
  { name: 'Renal & Urinary', icon: 'RenalExpertIcon' },
  { name: 'Diseases of the Skin', icon: 'DermIcon' },
  { name: 'Musculoskeletal', icon: 'RheumIcon' },
  { name: 'Endocrine & Metabolic', icon: 'EndocrineExpertIcon' },
  { name: 'Infectious Diseases', icon: 'InfectiousDiseaseIcon' },
  { name: 'Random Case', icon: 'GeneralPrinciplesIcon' }
];

export const diagnoses = [
  "Myocardial Infarction", "Pulmonary Embolism", "Pneumonia", "Congestive Heart Failure",
  "Acute Kidney Injury", "Diabetic Ketoacidosis", "Sepsis", "Cellulitis", "Appendicitis",
  "Cholecystitis", "Pancreatitis", "Gastroenteritis", "Stroke", "Seizure", "Meningitis"
];

export const CORE_DIAGNOSES = {
  'Cardiovascular': [
    "Acute Coronary Syndromes (STEMI, NSTEMI, Unstable Angina)", "Congestive Heart Failure (CHF)",
    "Aortic Stenosis", "Mitral Regurgitation", "Mitral Valve Prolapse", "Hypertrophic Obstructive Cardiomyopathy (HOCM)",
    "Atrial Fibrillation", "Supraventricular Tachycardia (SVT)", "Third-Degree Heart Block",
    "Acute Pericarditis", "Cardiac Tamponade", "Aortic Dissection", "Infective Endocarditis"
  ],
  'Respiratory System': [
    "COPD Exacerbation", "Asthma Exacerbation", "Community-Acquired Pneumonia (CAP)", "Pulmonary Embolism (PE)",
    "Pleural Effusion", "Sarcoidosis", "Asbestosis", "Silicosis", "Lung Cancer (Squamous, Small Cell, or Adenocarcinoma)",
    "Acute Respiratory Distress Syndrome (ARDS)"
  ],
  'Nutritional & Digestive': [
    "Upper GI Bleeding", "Lower GI Bleeding", "Crohn's Disease Flare", "Ulcerative Colitis Flare", "Acute Pancreatitis",
    "Acute Viral Hepatitis", "Alcoholic Hepatitis", "Decompensated Cirrhosis (e.g., SBP, HE)", "Acute Cholecystitis",
    "Ascending Cholangitis", "Infectious Diarrhea (e.g., C. difficile)"
  ],
  'Endocrine & Metabolic': [
    "Diabetic Ketoacidosis (DKA)", "Hyperosmolar Hyperglycemic State (HHS)", "Thyroid Storm", "Myxedema Coma",
    "Adrenal Crisis", "Cushing's Syndrome", "Primary Hyperparathyroidism", "SIADH", "Diabetes Insipidus"
  ],
  'Renal & Urinary': [
    "Acute Kidney Injury (Pre-renal, ATN, or AIN)", "Complications of Chronic Kidney Disease (requiring dialysis)",
    "Nephritic Syndrome (e.g., Post-strep GN, IgA nephropathy)", "Nephrotic Syndrome (e.g., Minimal Change Disease, FSGS)",
    "Severe Hyponatremia", "Severe Hyperkalemia", "Anion Gap Metabolic Acidosis", "Obstructive Uropathy / Nephrolithiasis"
  ],
  'Diseases of the Blood': [
    "Iron Deficiency Anemia", "B12 Deficiency Anemia", "Autoimmune Hemolytic Anemia", "Immune Thrombocytopenic Purpura (ITP)",
    "Thrombotic Thrombocytopenic Purpura (TTP)", "Disseminated Intravascular Coagulation (DIC)", "Acute Myeloid Leukemia (AML)",
    "Chronic Lymphocytic Leukemia (CLL)", "Hodgkin's Lymphoma", "Multiple Myeloma", "Neutropenic Fever", "Tumor Lysis Syndrome"
  ],
  'Nervous System': ["Ischemic Stroke", "Status Epilepticus", "Bacterial Meningitis"],
  'Musculoskeletal': ["Rheumatoid Arthritis Flare", "Septic Arthritis", "Gout Flare", "Pseudogout Flare", "Giant Cell Arteritis (GCA)"],
  'Infectious Diseases': ["Sepsis or Septic Shock", "Opportunistic Infection in HIV (e.g., PCP)"],
  'Diseases of the Skin': ["Dermatomyositis", "Systemic Lupus Erythematosus (SLE) with malar rash"]
};
