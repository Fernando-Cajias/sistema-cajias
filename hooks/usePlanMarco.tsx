import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { InternshipHeader, LearningResult, LearningObjective, ExpectedAchievement, Week, CreateLearningResultDto } from "@/interfaces/planMarcoInterface";
import * as api from "@/services/planMarco.services";

// Datos de prueba (mock data) de respaldo por si la API local no responde
const MOCK_HEADER: InternshipHeader = {
  id: 1,
  student_id: 3,
  teacher_id: 1,
  business_tutor_id: 2,
  company_id: 1,
  career_id: 1,
  academic_period_id: 1,
  internship_objective_text: "Desarrollar prototipos de módulos interactivos 3D y simulaciones de realidad aumentada para la difusión de información científica en las estaciones experimentales del INIAP.",
  start_date: "2025-12-01",
  end_date: "2026-01-23",
  status: "En Proceso",
  student_name: "Fernando David Cajías Vaca",
  teacher_name: "Raúl Alejandro Paz Mundial",
  business_tutor_name: "Duther López",
  company_name: "INIAP - Estación Experimental Santa Catalina",
  career_name: "Tecnología en Desarrollo de Software",
  academic_period_name: "2025-II"
};

const MOCK_WEEKS: Week[] = [
  { id: 1, internship_id: 1, week_number: 1, start_date: "2025-12-01", end_date: "2025-12-05" },
  { id: 2, internship_id: 1, week_number: 2, start_date: "2025-12-08", end_date: "2025-12-12" },
  { id: 3, internship_id: 1, week_number: 3, start_date: "2025-12-15", end_date: "2025-12-19" },
  { id: 4, internship_id: 1, week_number: 4, start_date: "2025-12-22", end_date: "2025-12-26" },
  { id: 5, internship_id: 1, week_number: 5, start_date: "2025-12-29", end_date: "2026-01-02" },
  { id: 6, internship_id: 1, week_number: 6, start_date: "2026-01-05", end_date: "2026-01-09" },
  { id: 7, internship_id: 1, week_number: 7, start_date: "2026-01-12", end_date: "2026-01-16" },
  { id: 8, internship_id: 1, week_number: 8, start_date: "2026-01-19", end_date: "2026-01-23" }
];

const MOCK_OBJECTIVES: LearningObjective[] = [
  { id: 1, semester_id: 1, level: 4, description: "Diseñar un servicio web consumible por un cliente web o móvil aplicando estándares modernos de comunicación." },
  { id: 2, semester_id: 1, level: 4, description: "Generar APIs REST funcionales y seguras, listas para la integración de datos." },
  { id: 3, semester_id: 1, level: 4, description: "Implementar capas de protección, validación y autenticación robustas en los servicios backend." },
  { id: 4, semester_id: 1, level: 4, description: "Desarrollar interfaces nativas o híbridas atractivas y totalmente adaptadas para dispositivos móviles." }
];

const MOCK_ACHIEVEMENTS: ExpectedAchievement[] = [
  { id: 1, semester_id: 1, description: "Estructura el flujo de datos y diseña esquemas JSON legibles y normalizados." },
  { id: 2, semester_id: 1, description: "Crea y despliega endpoints REST con validación de tokens y cifrado de datos." },
  { id: 3, semester_id: 1, description: "Configura middleware de seguridad y maneja cabeceras HTTP de protección." },
  { id: 4, semester_id: 1, description: "Construye vistas y componentes optimizados con NativeWind, gestionando transiciones suaves." }
];

const MOCK_RESULTS: LearningResult[] = [
  {
    id: 1,
    internship_id: 1,
    learning_objective_id: 1,
    expected_achievement_id: 1,
    result: "Investigación e inicio del modelado 3D en Blender del monolito informativo. Configuración del flujo de llamadas REST para obtener datos dinámicos.",
    week_id: 1,
    learning_objective: MOCK_OBJECTIVES[0],
    expected_achievement: MOCK_ACHIEVEMENTS[0],
    week: MOCK_WEEKS[0]
  },
  {
    id: 2,
    internship_id: 1,
    learning_objective_id: 2,
    expected_achievement_id: 2,
    result: "Configuración del entorno de desarrollo. Conexión de la aplicación móvil React Native con la API local de Laravel para el consumo de datos de prueba.",
    week_id: 2,
    learning_objective: MOCK_OBJECTIVES[1],
    expected_achievement: MOCK_ACHIEVEMENTS[1],
    week: MOCK_WEEKS[1]
  }
];

export const usePlanMarco = (internshipId: number = 1, semesterId: number = 1) => {
  const [header, setHeader] = useState<InternshipHeader | null>(null);
  const [results, setResults] = useState<LearningResult[]>([]);
  const [objectives, setObjectives] = useState<LearningObjective[]>([]);
  const [achievements, setAchievements] = useState<ExpectedAchievement[]>([]);
  const [weeks, setWeeks] = useState<Week[]>([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Estados del Formulario (Crear / Editar)
  const [selectedObjectiveId, setSelectedObjectiveId] = useState<number | null>(null);
  const [selectedAchievementId, setSelectedAchievementId] = useState<number | null>(null);
  const [selectedWeekId, setSelectedWeekId] = useState<number | null>(null);
  const [resultText, setResultText] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadData = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      // Intentar cargar desde el Backend API
      const [headerData, resultsData, objectivesData, achievementsData, weeksData] = await Promise.all([
        api.getInternshipHeader(internshipId),
        api.getLearningResults(internshipId),
        api.getLearningObjectives(semesterId),
        api.getExpectedAchievements(semesterId),
        api.getWeeks(internshipId)
      ]);

      setHeader(headerData);
      setResults(resultsData);
      setObjectives(objectivesData);
      setAchievements(achievementsData);
      setWeeks(weeksData);
    } catch (error) {
      console.log("No se pudo conectar a la API local de Laravel. Utilizando Mock Data de respaldo.");
      
      // Fallback a Mock Data si la API no responde
      setHeader(MOCK_HEADER);
      setResults(MOCK_RESULTS);
      setObjectives(MOCK_OBJECTIVES);
      setAchievements(MOCK_ACHIEVEMENTS);
      setWeeks(MOCK_WEEKS);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [internshipId, semesterId]);

  const handleSave = async () => {
    if (!selectedObjectiveId || !selectedAchievementId || !selectedWeekId || !resultText.trim()) {
      Alert.alert("Campos incompletos", "Por favor completa todos los campos del resultado de aprendizaje.");
      return;
    }

    const payload: CreateLearningResultDto = {
      internship_id: internshipId,
      learning_objective_id: selectedObjectiveId,
      expected_achievement_id: selectedAchievementId,
      week_id: selectedWeekId,
      result: resultText.trim()
    };

    setLoading(true);
    try {
      if (editingId) {
        // Actualizar
        const updated = await api.updateLearningResult(payload, editingId);
        
        // Enlazar relaciones localmente si el backend no las devuelve completas
        updated.learning_objective = objectives.find(o => o.id === selectedObjectiveId);
        updated.expected_achievement = achievements.find(a => a.id === selectedAchievementId);
        updated.week = weeks.find(w => w.id === selectedWeekId);

        setResults(prev => prev.map(r => r.id === editingId ? updated : r));
        Alert.alert("Éxito", "Resultado de aprendizaje actualizado correctamente.");
      } else {
        // Crear
        const created = await api.createLearningResult(payload);
        
        created.learning_objective = objectives.find(o => o.id === selectedObjectiveId);
        created.expected_achievement = achievements.find(a => a.id === selectedAchievementId);
        created.week = weeks.find(w => w.id === selectedWeekId);

        setResults(prev => [...prev, created]);
        Alert.alert("Éxito", "Resultado de aprendizaje añadido al Plan Marco.");
      }
      closeModal();
    } catch (error) {
      // Simular guardado localmente si falla la API
      const fakeResult: LearningResult = {
        id: editingId || Math.floor(Math.random() * 1000) + 10,
        ...payload,
        learning_objective: objectives.find(o => o.id === selectedObjectiveId),
        expected_achievement: achievements.find(a => a.id === selectedAchievementId),
        week: weeks.find(w => w.id === selectedWeekId)
      };

      if (editingId) {
        setResults(prev => prev.map(r => r.id === editingId ? fakeResult : r));
        Alert.alert("Guardado Local", "Actualizado en caché local.");
      } else {
        setResults(prev => [...prev, fakeResult]);
        Alert.alert("Guardado Local", "Añadido en caché local.");
      }
      closeModal();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: number) => {
    Alert.alert(
      "Eliminar resultado",
      "¿Estás seguro de que deseas eliminar este resultado de aprendizaje del Plan Marco?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            setLoading(true);
            try {
              await api.deleteLearningResult(id);
              setResults(prev => prev.filter(r => r.id !== id));
              Alert.alert("Eliminar", "Eliminado correctamente.");
            } catch (error) {
              // Simular eliminación local
              setResults(prev => prev.filter(r => r.id !== id));
              Alert.alert("Eliminación Local", "Eliminado de la caché local.");
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  const startEdit = (res: LearningResult) => {
    setEditingId(res.id);
    setSelectedObjectiveId(res.learning_objective_id);
    setSelectedAchievementId(res.expected_achievement_id);
    setSelectedWeekId(res.week_id);
    setResultText(res.result);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingId(null);
    setSelectedObjectiveId(objectives[0]?.id || null);
    setSelectedAchievementId(achievements[0]?.id || null);
    setSelectedWeekId(weeks[0]?.id || null);
    setResultText("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setResultText("");
  };

  return {
    header,
    results,
    objectives,
    achievements,
    weeks,
    loading,
    refreshing,
    loadData,

    // Estados del formulario
    selectedObjectiveId,
    setSelectedObjectiveId,
    selectedAchievementId,
    setSelectedAchievementId,
    selectedWeekId,
    setSelectedWeekId,
    resultText,
    setResultText,
    editingId,
    isModalOpen,

    // Acciones
    openAddModal,
    closeModal,
    startEdit,
    handleSave,
    handleDelete
  };
};
