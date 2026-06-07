import { CreateLearningResultDto, LearningResult, LearningObjective, ExpectedAchievement, Week, InternshipHeader } from "@/interfaces/planMarcoInterface";

const url = 'http://localhost:8000/api';

// Obtener la cabecera de la pasantía actual
export const getInternshipHeader = async (internshipId: number): Promise<InternshipHeader> => {
  try {
    const response = await fetch(`${url}/internships/${internshipId}`);
    if (!response.ok) throw new Error("Error al obtener la cabecera de la pasantía");
    return response.json();
  } catch (error) {
    console.error(`Error en getInternshipHeader (${internshipId}):`, error);
    throw error;
  }
};

// Obtener los resultados de aprendizaje de la pasantía
export const getLearningResults = async (internshipId: number): Promise<LearningResult[]> => {
  try {
    const response = await fetch(`${url}/internships/${internshipId}/learning-results`);
    if (!response.ok) throw new Error("Error al obtener los resultados del Plan Marco");
    return response.json();
  } catch (error) {
    console.error(`Error en getLearningResults (${internshipId}):`, error);
    throw error;
  }
};

// Obtener los objetivos de aprendizaje por semestre
export const getLearningObjectives = async (semesterId: number): Promise<LearningObjective[]> => {
  try {
    const response = await fetch(`${url}/semesters/${semesterId}/learning-objectives`);
    if (!response.ok) throw new Error("Error al obtener los objetivos del semestre");
    return response.json();
  } catch (error) {
    console.error(`Error en getLearningObjectives (${semesterId}):`, error);
    throw error;
  }
};

// Obtener los logros esperados por semestre
export const getExpectedAchievements = async (semesterId: number): Promise<ExpectedAchievement[]> => {
  try {
    const response = await fetch(`${url}/semesters/${semesterId}/expected-achievements`);
    if (!response.ok) throw new Error("Error al obtener los logros esperados");
    return response.json();
  } catch (error) {
    console.error(`Error en getExpectedAchievements (${semesterId}):`, error);
    throw error;
  }
};

// Obtener las semanas de rotación de la pasantía
export const getWeeks = async (internshipId: number): Promise<Week[]> => {
  try {
    const response = await fetch(`${url}/internships/${internshipId}/weeks`);
    if (!response.ok) throw new Error("Error al obtener las semanas");
    return response.json();
  } catch (error) {
    console.error(`Error en getWeeks (${internshipId}):`, error);
    throw error;
  }
};

// Crear un resultado de aprendizaje en el Plan Marco
export const createLearningResult = async (result: CreateLearningResultDto): Promise<LearningResult> => {
  try {
    const response = await fetch(`${url}/learning-results`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result)
    });
    if (!response.ok) throw new Error("Error al crear resultado del Plan Marco");
    return response.json();
  } catch (error) {
    console.error("Error en createLearningResult:", error);
    throw error;
  }
};

// Actualizar un resultado de aprendizaje
export const updateLearningResult = async (result: CreateLearningResultDto, id: number): Promise<LearningResult> => {
  try {
    const response = await fetch(`${url}/learning-results/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result)
    });
    if (!response.ok) throw new Error("Error al actualizar resultado del Plan Marco");
    return response.json();
  } catch (error) {
    console.error(`Error en updateLearningResult (${id}):`, error);
    throw error;
  }
};

// Eliminar un resultado de aprendizaje
export const deleteLearningResult = async (id: number): Promise<{ success: boolean }> => {
  try {
    const response = await fetch(`${url}/learning-results/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      }
    });
    if (!response.ok) throw new Error("Error al eliminar el resultado del Plan Marco");
    return response.json();
  } catch (error) {
    console.error(`Error en deleteLearningResult (${id}):`, error);
    throw error;
  }
};
