-- =========================================================================
-- SCRIPT DE CONFIGURACIÓN DEL PLAN MARCO - SUPABASE (POSTGRESQL)
-- Ejecutar en: Supabase Dashboard -> SQL Editor
-- =========================================================================

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TABLA: roles
CREATE TABLE IF NOT EXISTS roles (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    deleted_at TIMESTAMPTZ NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABLA: users
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    names VARCHAR(255) NOT NULL,
    lastnames VARCHAR(255) NOT NULL,
    cedula VARCHAR(15) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NULL,
    active BOOLEAN DEFAULT TRUE,
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABLA INTERMEDIA: role_user (Many-to-Many)
CREATE TABLE IF NOT EXISTS role_user (
    id BIGSERIAL PRIMARY KEY,
    role_id BIGINT REFERENCES roles(id) ON DELETE CASCADE,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_role_user UNIQUE(role_id, user_id)
);

-- 4. TABLA: careers (Carreras)
CREATE TABLE IF NOT EXISTS careers (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TABLA: academic_periods (Periodos Académicos)
CREATE TABLE IF NOT EXISTS academic_periods (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT check_dates CHECK (end_date >= start_date)
);

-- 6. TABLA: companies (Empresas)
CREATE TABLE IF NOT EXISTS companies (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    ruc VARCHAR(15) NOT NULL UNIQUE,
    address TEXT NULL,
    phone VARCHAR(20) NULL,
    email VARCHAR(255) NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. TABLA: semesters (Semestres)
CREATE TABLE IF NOT EXISTS semesters (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    level_integer INT NOT NULL,
    required_hours INT DEFAULT 360,
    structural_core VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. TABLA CENTRAL: internships (Pasantías)
CREATE TABLE IF NOT EXISTS internships (
    id BIGSERIAL PRIMARY KEY,
    student_id BIGINT REFERENCES users(id) ON DELETE RESTRICT,
    teacher_id BIGINT REFERENCES users(id) ON DELETE RESTRICT,
    business_tutor_id BIGINT REFERENCES users(id) ON DELETE RESTRICT,
    company_id BIGINT REFERENCES companies(id) ON DELETE RESTRICT,
    career_id BIGINT REFERENCES careers(id) ON DELETE RESTRICT,
    academic_period_id BIGINT REFERENCES academic_periods(id) ON DELETE RESTRICT,
    semester_id BIGINT REFERENCES semesters(id) ON DELETE RESTRICT, -- CORREGIDO (Vínculo de Semestre)
    internship_objective_text TEXT NULL,                             -- CORREGIDO (Objetivo Personalizado)
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'En Proceso',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT check_internship_dates CHECK (end_date >= start_date)
);

-- 9. TABLA: weeks (Semanas de la pasantía)
CREATE TABLE IF NOT EXISTS weeks (
    id BIGSERIAL PRIMARY KEY,
    internship_id BIGINT REFERENCES internships(id) ON DELETE CASCADE,
    week_number INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT check_week_dates CHECK (end_date >= start_date),
    CONSTRAINT unique_internship_week UNIQUE(internship_id, week_number)
);

-- 10. TABLA: learning_objectives (Objetivos Curriculares)
CREATE TABLE IF NOT EXISTS learning_objectives (
    id BIGSERIAL PRIMARY KEY,
    semester_id BIGINT REFERENCES semesters(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    level INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. TABLA: expected_achievements (Logros Esperados)
CREATE TABLE IF NOT EXISTS expected_achievements (
    id BIGSERIAL PRIMARY KEY,
    semester_id BIGINT REFERENCES semesters(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. TABLA: learning_results (Resultados de Aprendizaje - PLAN MARCO)
CREATE TABLE IF NOT EXISTS learning_results (
    id BIGSERIAL PRIMARY KEY,
    internship_id BIGINT REFERENCES internships(id) ON DELETE CASCADE,
    learning_objective_id BIGINT REFERENCES learning_objectives(id) ON DELETE RESTRICT,
    expected_achievement_id BIGINT REFERENCES expected_achievements(id) ON DELETE RESTRICT,
    result TEXT NOT NULL,
    week_id BIGINT REFERENCES weeks(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================
-- HABILITACIÓN DE ROW LEVEL SECURITY (RLS) - CONFIGURACIÓN PERMISIVA DE DEV
-- =========================================================================
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_user ENABLE ROW LEVEL SECURITY;
ALTER TABLE careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_periods ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE semesters ENABLE ROW LEVEL SECURITY;
ALTER TABLE internships ENABLE ROW LEVEL SECURITY;
ALTER TABLE weeks ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_objectives ENABLE ROW LEVEL SECURITY;
ALTER TABLE expected_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_results ENABLE ROW LEVEL SECURITY;

-- Crear políticas permisivas para desarrollo local/pruebas sin restricciones complejas de RLS
CREATE POLICY "Permitir todo a anon - roles" ON roles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir todo a anon - users" ON users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir todo a anon - role_user" ON role_user FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir todo a anon - careers" ON careers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir todo a anon - academic_periods" ON academic_periods FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir todo a anon - companies" ON companies FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir todo a anon - semesters" ON semesters FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir todo a anon - internships" ON internships FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir todo a anon - weeks" ON weeks FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir todo a anon - learning_objectives" ON learning_objectives FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir todo a anon - expected_achievements" ON expected_achievements FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir todo a anon - learning_results" ON learning_results FOR ALL USING (true) WITH CHECK (true);

-- =========================================================================
-- INSERCIÓN DE DATOS DE PRUEBA (SEEDS)
-- =========================================================================

-- Roles
INSERT INTO roles (name) VALUES 
('ESTUDIANTE'), 
('TUTOR_ACADEMICO'), 
('TUTOR_EMPRESARIAL'), 
('COORDINADOR')
ON CONFLICT (name) DO NOTHING;

-- Usuarios (Clave quemada en 1234 para pruebas)
INSERT INTO users (names, lastnames, cedula, email, password, phone, active) VALUES
('Fernando David', 'Cajías Vaca', '1725440539', 'student@app.com', '1234', '0984071320', true),
('Raúl Alejandro', 'Paz Mundial', '1711122233', 'teacher@app.com', '1234', '0999999999', true),
('Duther', 'López', '1744455566', 'business@app.com', '1234', '0988888888', true)
ON CONFLICT (cedula) DO NOTHING;

-- Asignar Roles
INSERT INTO role_user (role_id, user_id) VALUES
((SELECT id FROM roles WHERE name = 'ESTUDIANTE'), (SELECT id FROM users WHERE email = 'student@app.com')),
((SELECT id FROM roles WHERE name = 'TUTOR_ACADEMICO'), (SELECT id FROM users WHERE email = 'teacher@app.com')),
((SELECT id FROM roles WHERE name = 'TUTOR_EMPRESARIAL'), (SELECT id FROM users WHERE email = 'business@app.com'))
ON CONFLICT DO NOTHING;

-- Carrera
INSERT INTO careers (name) VALUES
('Tecnología en Desarrollo de Software')
ON CONFLICT (name) DO NOTHING;

-- Período Académico
INSERT INTO academic_periods (name, start_date, end_date) VALUES
('2025-II', '2025-12-01', '2026-03-31')
ON CONFLICT (name) DO NOTHING;

-- Empresa
INSERT INTO companies (name, ruc, address, phone, email) VALUES
('INIAP - Estación Experimental Santa Catalina', '1760001230001', 'Cutuglahua, Cantón Mejía', '022690691', 'contacto@iniap.gob.ec')
ON CONFLICT (ruc) DO NOTHING;

-- Semestre
INSERT INTO semesters (name, level_integer, required_hours, structural_core) VALUES
('Cuarto Nivel', 4, 360, 'Desarrollo Web - Back-End')
ON CONFLICT (name) DO NOTHING;

-- Objetivos Curriculares
INSERT INTO learning_objectives (semester_id, description, level) VALUES
((SELECT id FROM semesters WHERE name = 'Cuarto Nivel'), 'Diseñar un servicio web consumible por un cliente web o móvil aplicando estándares modernos de comunicación.', 4),
((SELECT id FROM semesters WHERE name = 'Cuarto Nivel'), 'Generar APIs REST funcionales y seguras, listas para la integración de datos.', 4),
((SELECT id FROM semesters WHERE name = 'Cuarto Nivel'), 'Implementar capas de protección, validación y autenticación robustas en los servicios backend.', 4),
((SELECT id FROM semesters WHERE name = 'Cuarto Nivel'), 'Desarrollar interfaces nativas o híbridas atractivas y totalmente adaptadas para dispositivos móviles.', 4);

-- Logros Esperados
INSERT INTO expected_achievements (semester_id, description) VALUES
((SELECT id FROM semesters WHERE name = 'Cuarto Nivel'), 'Estructura el flujo de datos y diseña esquemas JSON legibles y normalizados.'),
((SELECT id FROM semesters WHERE name = 'Cuarto Nivel'), 'Crea y despliega endpoints REST con validación de tokens y cifrado de datos.'),
((SELECT id FROM semesters WHERE name = 'Cuarto Nivel'), 'Configura middleware de seguridad y maneja cabeceras HTTP de protección.'),
((SELECT id FROM semesters WHERE name = 'Cuarto Nivel'), 'Construye vistas y componentes optimizados con NativeWind, gestionando transiciones suaves.');

-- Crear una Pasantía (Internship)
INSERT INTO internships (student_id, teacher_id, business_tutor_id, company_id, career_id, academic_period_id, semester_id, internship_objective_text, start_date, end_date, status) VALUES
(
  (SELECT id FROM users WHERE email = 'student@app.com'),
  (SELECT id FROM users WHERE email = 'teacher@app.com'),
  (SELECT id FROM users WHERE email = 'business@app.com'),
  (SELECT id FROM companies WHERE ruc = '1760001230001'),
  (SELECT id FROM careers WHERE name = 'Tecnología en Desarrollo de Software'),
  (SELECT id FROM academic_periods WHERE name = '2025-II'),
  (SELECT id FROM semesters WHERE name = 'Cuarto Nivel'),
  'Desarrollar prototipos de módulos interactivos 3D y simulaciones de realidad aumentada para la difusión de información científica en las estaciones experimentales del INIAP.',
  '2025-12-01',
  '2026-01-23',
  'En Proceso'
);

-- Semanas de Rotación asociadas a la pasantía
INSERT INTO weeks (internship_id, week_number, start_date, end_date) VALUES
(1, 1, '2025-12-01', '2025-12-05'),
(1, 2, '2025-12-08', '2025-12-12'),
(1, 3, '2025-12-15', '2025-12-19'),
(1, 4, '2025-12-22', '2025-12-26'),
(1, 5, '2025-12-29', '2026-01-02'),
(1, 6, '2026-01-05', '2026-01-09'),
(1, 7, '2026-01-12', '2026-01-16'),
(1, 8, '2026-01-19', '2026-01-23');

-- Resultados de Aprendizaje iniciales (Plan Marco de Formación)
INSERT INTO learning_results (internship_id, learning_objective_id, expected_achievement_id, result, week_id) VALUES
(1, 1, 1, 'Investigación e inicio del modelado 3D en Blender del monolito informativo. Configuración del flujo de llamadas REST para obtener datos dinámicos.', 1),
(1, 2, 2, 'Configuración del entorno de desarrollo. Conexión de la aplicación móvil React Native con la API local de Laravel para el consumo de datos de prueba.', 2);
