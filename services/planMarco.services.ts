import { CreateLearningResultDto, LearningResult, LearningObjective, ExpectedAchievement, Week, InternshipHeader } from "@/interfaces/planMarcoInterface";
import { supabase } from "./supabaseClient";

// Obtener la cabecera de la pasantía actual (con JOINs relacionales)
export const getInternshipHeader = async (internshipId: number): Promise<InternshipHeader> => {
  try {
    const { data, error } = await supabase
      .from('internships')
      .select(`
        id, student_id, teacher_id, business_tutor_id, company_id, career_id, academic_period_id, semester_id, internship_objective_text, start_date, end_date, status,
        student:student_id(names, lastnames),
        teacher:teacher_id(names, lastnames),
        business_tutor:business_tutor_id(names, lastnames),
        company:company_id(name),
        career:career_id(name),
        academic_period:academic_period_id(name)
      `)
      .eq('id', internshipId)
      .single();

    if (error) throw error;
    if (!data) throw new Error("Pasantía no encontrada");

    // Mapear la respuesta a la interfaz esperada en la UI
    return {
      id: data.id,
      student_id: data.student_id,
      teacher_id: data.teacher_id,
      business_tutor_id: data.business_tutor_id,
      company_id: data.company_id,
      career_id: data.career_id,
      academic_period_id: data.academic_period_id,
      semester_id: data.semester_id,
      internship_objective_text: data.internship_objective_text || "",
      start_date: data.start_date,
      end_date: data.end_date,
      status: data.status,
      student_name: data.student ? `${(data.student as any).names} ${(data.student as any).lastnames}` : "",
      teacher_name: data.teacher ? `${(data.teacher as any).names} ${(data.teacher as any).lastnames}` : "",
      business_tutor_name: data.business_tutor ? `${(data.business_tutor as any).names} ${(data.business_tutor as any).lastnames}` : "",
      company_name: (data.company as any)?.name || "",
      career_name: (data.career as any)?.name || "",
      academic_period_name: (data.academic_period as any)?.name || ""
    };
  } catch (error) {
    console.error(`Error en getInternshipHeader (${internshipId}):`, error);
    throw error;
  }
};

// Obtener los resultados de aprendizaje de la pasantía (con JOINs relacionales)
export const getLearningResults = async (internshipId: number): Promise<LearningResult[]> => {
  try {
    const { data, error } = await supabase
      .from('learning_results')
      .select(`
        id, internship_id, learning_objective_id, expected_achievement_id, result, week_id,
        learning_objective:learning_objective_id(id, semester_id, description, level),
        expected_achievement:expected_achievement_id(id, semester_id, description),
        week:week_id(id, internship_id, week_number, start_date, end_date)
      `)
      .eq('internship_id', internshipId)
      .order('id', { ascending: true });

    if (error) throw error;
    return (data || []) as any as LearningResult[];
  } catch (error) {
    console.error(`Error en getLearningResults (${internshipId}):`, error);
    throw error;
  }
};

// Obtener los objetivos de aprendizaje por semestre
export const getLearningObjectives = async (semesterId: number): Promise<LearningObjective[]> => {
  try {
    const { data, error } = await supabase
      .from('learning_objectives')
      .select('*')
      .eq('semester_id', semesterId)
      .order('id', { ascending: true });

    if (error) throw error;
    return (data || []) as LearningObjective[];
  } catch (error) {
    console.error(`Error en getLearningObjectives (${semesterId}):`, error);
    throw error;
  }
};

// Obtener los logros esperados por semestre
export const getExpectedAchievements = async (semesterId: number): Promise<ExpectedAchievement[]> => {
  try {
    const { data, error } = await supabase
      .from('expected_achievements')
      .select('*')
      .eq('semester_id', semesterId)
      .order('id', { ascending: true });

    if (error) throw error;
    return (data || []) as ExpectedAchievement[];
  } catch (error) {
    console.error(`Error en getExpectedAchievements (${semesterId}):`, error);
    throw error;
  }
};

// Obtener las semanas de rotación de la pasantía
export const getWeeks = async (internshipId: number): Promise<Week[]> => {
  try {
    const { data, error } = await supabase
      .from('weeks')
      .select('*')
      .eq('internship_id', internshipId)
      .order('week_number', { ascending: true });

    if (error) throw error;
    return (data || []) as Week[];
  } catch (error) {
    console.error(`Error en getWeeks (${internshipId}):`, error);
    throw error;
  }
};

// Crear un resultado de aprendizaje en el Plan Marco
export const createLearningResult = async (result: CreateLearningResultDto): Promise<LearningResult> => {
  try {
    const { data, error } = await supabase
      .from('learning_results')
      .insert([result])
      .select()
      .single();

    if (error) throw error;
    return data as any as LearningResult;
  } catch (error) {
    console.error("Error en createLearningResult:", error);
    throw error;
  }
};

// Actualizar un resultado de aprendizaje
export const updateLearningResult = async (result: CreateLearningResultDto, id: number): Promise<LearningResult> => {
  try {
    const { data, error } = await supabase
      .from('learning_results')
      .update(result)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as any as LearningResult;
  } catch (error) {
    console.error(`Error en updateLearningResult (${id}):`, error);
    throw error;
  }
};

// Eliminar un resultado de aprendizaje
export const deleteLearningResult = async (id: number): Promise<{ success: boolean }> => {
  try {
    const { error } = await supabase
      .from('learning_results')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error(`Error en deleteLearningResult (${id}):`, error);
    throw error;
  }
};
