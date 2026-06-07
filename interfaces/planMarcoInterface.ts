export interface LearningObjective {
  id: number;
  semester_id: number;
  description: string;
  level: number;
  created_at?: string;
  updated_at?: string;
}

export interface ExpectedAchievement {
  id: number;
  semester_id: number;
  description: string;
  created_at?: string;
  updated_at?: string;
}

export interface Week {
  id: number;
  internship_id: number;
  week_number: number;
  start_date: string;
  end_date: string;
  created_at?: string;
  updated_at?: string;
}

export interface LearningResult {
  id: number;
  internship_id: number;
  learning_objective_id: number;
  expected_achievement_id: number;
  result: string;
  week_id: number;
  created_at?: string;
  updated_at?: string;
  // Relaciones cargadas (opcionales)
  learning_objective?: LearningObjective;
  expected_achievement?: ExpectedAchievement;
  week?: Week;
}

export interface InternshipHeader {
  id: number;
  student_id: number;
  teacher_id: number;
  business_tutor_id: number;
  company_id: number;
  career_id: number;
  academic_period_id: number;
  internship_objective_text?: string;
  start_date: string;
  end_date: string;
  status: string;
  created_at?: string;
  updated_at?: string;
  // Nombres descriptivos para la UI
  student_name?: string;
  teacher_name?: string;
  business_tutor_name?: string;
  company_name?: string;
  career_name?: string;
  academic_period_name?: string;
}

export interface CreateLearningResultDto {
  internship_id: number;
  learning_objective_id: number;
  expected_achievement_id: number;
  result: string;
  week_id: number;
}
