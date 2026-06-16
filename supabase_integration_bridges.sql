-- =========================================================================
-- SCRIPT DE INTEGRACIÓN: VISTAS Y PUENTES PARA OTROS MÓDULOS (SUPABASE)
-- Ejecutar en: Supabase Dashboard -> SQL Editor
-- =========================================================================

-- -------------------------------------------------------------------------
-- 1. VISTA: v_weekly_plan_marco (Para el módulo de Bitácoras/Logs)
-- -------------------------------------------------------------------------
-- Esta vista une las semanas, objetivos, logros y actividades planificadas.
-- El desarrollador de las Bitácoras (Logs) puede consultar qué actividad tenía 
-- planificada el estudiante para una semana específica sin escribir JOINS complejos.
CREATE OR REPLACE VIEW v_weekly_plan_marco AS
SELECT 
    lr.id AS learning_result_id,
    lr.internship_id,
    w.id AS week_id,
    w.week_number,
    w.start_date AS week_start_date,
    w.end_date AS week_end_date,
    lo.id AS objective_id,
    lo.description AS objective_description,
    lo.level AS objective_level,
    ea.id AS achievement_id,
    ea.description AS achievement_description,
    lr.result AS planned_activity,
    lr.created_at,
    lr.updated_at
FROM learning_results lr
JOIN weeks w ON lr.week_id = w.id
JOIN learning_objectives lo ON lr.learning_objective_id = lo.id
JOIN expected_achievements ea ON lr.expected_achievement_id = ea.id;

COMMENT ON VIEW v_weekly_plan_marco IS 'Puente para el módulo de Bitácoras. Devuelve el Plan Marco desglosado por semanas.';

-- -------------------------------------------------------------------------
-- 2. VISTA: v_evaluation_details_helper (Para el módulo de Evaluaciones)
-- -------------------------------------------------------------------------
-- Ayuda al desarrollador del módulo de Evaluaciones a listar qué resultados 
-- específicos del Plan Marco del estudiante deben ser evaluados y calificados.
CREATE OR REPLACE VIEW v_evaluation_details_helper AS
SELECT 
    i.id AS internship_id,
    lr.id AS learning_result_id,
    w.week_number,
    lo.description AS objective_description,
    ea.description AS achievement_description,
    lr.result AS planned_activity
FROM internships i
JOIN learning_results lr ON lr.internship_id = i.id
JOIN weeks w ON lr.week_id = w.id
JOIN learning_objectives lo ON lr.learning_objective_id = lo.id
JOIN expected_achievements ea ON lr.expected_achievement_id = ea.id;

COMMENT ON VIEW v_evaluation_details_helper IS 'Puente para el módulo de Evaluaciones. Muestra qué actividades debe calificar el tutor.';

-- -------------------------------------------------------------------------
-- 3. ÍNDICES DE RENDIMIENTO (Optimización de búsquedas y JOINS)
-- -------------------------------------------------------------------------
-- Estos índices mejoran la velocidad de consulta en la base de datos a medida 
-- que se registran múltiples estudiantes y semanas.
CREATE INDEX IF NOT EXISTS idx_learning_results_internship ON learning_results(internship_id);
CREATE INDEX IF NOT EXISTS idx_learning_results_week ON learning_results(week_id);
CREATE INDEX IF NOT EXISTS idx_weeks_internship ON weeks(internship_id);
CREATE INDEX IF NOT EXISTS idx_internships_student ON internships(student_id);
CREATE INDEX IF NOT EXISTS idx_internships_teacher ON internships(teacher_id);
CREATE INDEX IF NOT EXISTS idx_internships_business ON internships(business_tutor_id);
