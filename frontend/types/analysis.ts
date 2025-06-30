export interface CVAnalysisRequest {
  cv_file: File;
  job_description: string;
}

export interface CVAnalysisResponse {
  score: number;
  why: string;
  improvements: string;
}