import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal, FlatList, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { InternshipHeader, LearningResult, LearningObjective, ExpectedAchievement, Week } from "@/interfaces/planMarcoInterface";

interface PlanMarcoComponentProps {
  header: InternshipHeader | null;
  results: LearningResult[];
  objectives: LearningObjective[];
  achievements: ExpectedAchievement[];
  weeks: Week[];
  loading: boolean;
  readOnly?: boolean;

  // Form states and methods
  isModalOpen: boolean;
  openAddModal: () => void;
  closeModal: () => void;
  startEdit: (res: LearningResult) => void;
  handleSave: () => void;
  handleDelete: (id: number) => void;

  selectedObjectiveId: number | null;
  setSelectedObjectiveId: (id: number | null) => void;
  selectedAchievementId: number | null;
  setSelectedAchievementId: (id: number | null) => void;
  selectedWeekId: number | null;
  setSelectedWeekId: (id: number | null) => void;
  resultText: string;
  setResultText: (text: string) => void;
  editingId: number | null;
}

export default function PlanMarcoComponent({
  header,
  results,
  objectives,
  achievements,
  weeks,
  loading,
  readOnly = false,

  isModalOpen,
  openAddModal,
  closeModal,
  startEdit,
  handleSave,
  handleDelete,

  selectedObjectiveId,
  setSelectedObjectiveId,
  selectedAchievementId,
  setSelectedAchievementId,
  selectedWeekId,
  setSelectedWeekId,
  resultText,
  setResultText,
  editingId
}: PlanMarcoComponentProps) {
  const [activeTab, setActiveTab] = useState<"details" | "results">("results");
  const [pickerType, setPickerType] = useState<"objective" | "achievement" | "week" | null>(null);

  if (loading && results.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-[#F9FAFB]">
        <ActivityIndicator size="large" color="#FE7229" />
        <Text className="mt-4 text-[#6B7280] font-medium">Cargando Plan Marco de Formación...</Text>
      </View>
    );
  }

  // Helper para buscar nombres en los catálogos
  const getObjectiveText = (id: number) => objectives.find((o) => o.id === id)?.description || "";
  const getAchievementText = (id: number) => achievements.find((a) => a.id === id)?.description || "";
  const getWeekText = (id: number) => {
    const w = weeks.find((wk) => wk.id === id);
    return w ? `Semana ${w.week_number} (${w.start_date} a ${w.end_date})` : "";
  };

  return (
    <View className="flex-1 bg-[#F3F4F6]">
      {/* HEADER BANNER */}
      <View className="bg-[#1E293B] pt-12 pb-6 px-4 rounded-b-[24px] shadow-lg">
        <Text className="text-[#94A3B8] text-[12px] font-bold tracking-wider uppercase">Fase Práctica Dual</Text>
        <Text className="text-white text-[24px] font-black mt-1">PLAN MARCO</Text>
        <Text className="text-[#38BDF8] text-[14px] font-semibold mt-1">
          {header?.career_name || "Tecnología en Desarrollo de Software"}
        </Text>

        {/* TABS NAVEGACIÓN INTERNA */}
        <View className="flex-row mt-6 bg-[#0F172A] p-1 rounded-xl">
          <TouchableOpacity
            onPress={() => setActiveTab("results")}
            className={`flex-1 py-3 items-center rounded-lg ${activeTab === "results" ? "bg-[#FE7229]" : ""}`}
          >
            <Text className={`font-bold text-[14px] ${activeTab === "results" ? "text-white" : "text-[#94A3B8]"}`}>
              Resultados ({results.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("details")}
            className={`flex-1 py-3 items-center rounded-lg ${activeTab === "details" ? "bg-[#FE7229]" : ""}`}
          >
            <Text className={`font-bold text-[14px] ${activeTab === "details" ? "text-white" : "text-[#94A3B8]"}`}>
              Información General
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* CONTENIDO PRINCIPAL */}
      {activeTab === "details" ? (
        <ScrollView className="flex-1 px-4 py-4" showsVerticalScrollIndicator={false}>
          {/* TARJETA DE ESTUDIANTE Y TUTORES */}
          <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-[#E5E7EB]">
            <Text className="text-[#FE7229] font-bold text-[16px] mb-4 uppercase tracking-wide">Participantes</Text>

            <View className="mb-4">
              <Text className="text-[#9CA3AF] text-[12px] uppercase">Estudiante</Text>
              <Text className="text-[#1F2937] text-[16px] font-bold mt-0.5">{header?.student_name || "Cargando..."}</Text>
            </View>

            <View className="mb-4">
              <Text className="text-[#9CA3AF] text-[12px] uppercase">Tutor Académico</Text>
              <Text className="text-[#1F2937] text-[15px] font-medium mt-0.5">{header?.teacher_name || "Cargando..."}</Text>
            </View>

            <View className="mb-4">
              <Text className="text-[#9CA3AF] text-[12px] uppercase">Tutor Empresarial</Text>
              <Text className="text-[#1F2937] text-[15px] font-medium mt-0.5">{header?.business_tutor_name || "Cargando..."}</Text>
            </View>

            <View>
              <Text className="text-[#9CA3AF] text-[12px] uppercase">Empresa Formadora</Text>
              <Text className="text-[#1F2937] text-[15px] font-bold mt-0.5">{header?.company_name || "Cargando..."}</Text>
            </View>
          </View>

          {/* TARJETA DE OBJETIVOS GENERALES */}
          <View className="bg-white rounded-2xl p-5 mb-8 shadow-sm border border-[#E5E7EB]">
            <Text className="text-[#FE7229] font-bold text-[16px] mb-3 uppercase tracking-wide">Objetivo de la Pasantía</Text>
            <View className="border-l-4 border-[#38BDF8] pl-3 py-1">
              <Text className="text-[#374151] text-[14px] leading-relaxed italic font-medium">
                "{header?.internship_objective_text || "Sin objetivo específico configurado."}"
              </Text>
            </View>

            <View className="flex-row justify-between mt-6 pt-4 border-t border-[#F3F4F6]">
              <View>
                <Text className="text-[#9CA3AF] text-[11px] uppercase">Periodo</Text>
                <Text className="text-[#4B5563] text-[14px] font-bold mt-0.5">{header?.academic_period_name || "N/A"}</Text>
              </View>
              <View className="items-end">
                <Text className="text-[#9CA3AF] text-[11px] uppercase">Estado Plan</Text>
                <Text className="text-[#10B981] text-[14px] font-bold mt-0.5 uppercase">{header?.status || "Activo"}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View className="flex-1 px-4 py-4">
          <FlatList
            data={results}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-[#E5E7EB]">
                {/* CABECERA CARD */}
                <View className="flex-row justify-between items-center mb-3 pb-3 border-b border-[#F3F4F6]">
                  <View className="bg-[#EFF6FF] px-3 py-1 rounded-full border border-[#DBEAFE]">
                    <Text className="text-[#2563EB] text-[12px] font-bold">
                      Semana {item.week?.week_number || item.week_id}
                    </Text>
                  </View>
                  <Text className="text-[#9CA3AF] text-[11px] font-medium">
                    {item.week ? `${item.week.start_date} al ${item.week.end_date}` : ""}
                  </Text>
                </View>

                {/* OBJETIVO DE APRENDIZAJE */}
                <View className="mb-3">
                  <Text className="text-[#4B5563] text-[11px] font-bold uppercase tracking-wider">Criterio / Objetivo Académico</Text>
                  <Text className="text-[#1F2937] text-[14px] mt-0.5 font-medium">
                    {item.learning_objective?.description || `Objetivo #${item.learning_objective_id}`}
                  </Text>
                </View>

                {/* LOGRO ESPERADO */}
                <View className="mb-3">
                  <Text className="text-[#4B5563] text-[11px] font-bold uppercase tracking-wider">Logro Esperado</Text>
                  <Text className="text-[#4B5563] text-[13px] mt-0.5">
                    {item.expected_achievement?.description || `Logro #${item.expected_achievement_id}`}
                  </Text>
                </View>

                {/* RESULTADO / ACTIVIDAD ESPECÍFICA */}
                <View className="bg-[#FAF9F6] p-3.5 rounded-xl border border-[#F3F4F6] mb-4">
                  <Text className="text-[#FE7229] text-[10px] font-bold uppercase tracking-widest">Actividad Asignada</Text>
                  <Text className="text-[#1F2937] text-[14px] mt-1 font-medium leading-relaxed">
                    {item.result}
                  </Text>
                </View>

                {/* BOTONES DE ACCIÓN (Si no es lectura) */}
                {!readOnly && (
                  <View className="flex-row justify-end gap-3 pt-2">
                    <TouchableOpacity
                      onPress={() => startEdit(item)}
                      className="px-4 py-2 bg-[#F3F4F6] rounded-lg border border-[#E5E7EB] flex-row items-center"
                    >
                      <Text className="text-[#4B5563] text-[13px] font-bold">Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDelete(item.id)}
                      className="px-4 py-2 bg-[#FEE2E2] rounded-lg border border-[#FCA5A5] flex-row items-center"
                    >
                      <Text className="text-[#EF4444] text-[13px] font-bold">Eliminar</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
            ListEmptyComponent={
              <View className="py-20 items-center">
                <Text className="text-[#9CA3AF] text-[16px] text-center font-medium px-6">
                  No se han registrado resultados de aprendizaje en este Plan Marco aún.
                </Text>
                {!readOnly && (
                  <TouchableOpacity
                    onPress={openAddModal}
                    className="mt-6 bg-[#FE7229] px-6 py-3 rounded-xl shadow-md"
                  >
                    <Text className="text-white font-bold text-[14px]">Agregar Primer Resultado</Text>
                  </TouchableOpacity>
                )}
              </View>
            }
          />

          {/* BOTÓN FLOTANTE AGREGAR */}
          {!readOnly && results.length > 0 && (
            <TouchableOpacity
              onPress={openAddModal}
              className="absolute bottom-6 right-6 bg-[#FE7229] w-14 h-14 rounded-full justify-center items-center shadow-xl border border-white"
            >
              <Text className="text-white text-[28px] font-light">+</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* MODAL DE EDICIÓN / CREACIÓN */}
      <Modal visible={isModalOpen} animationType="slide" transparent>
        <View className="flex-1 bg-black/60 justify-end">
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="bg-white rounded-t-[28px] max-h-[90%]">
            <View className="p-6">
              {/* CABECERA MODAL */}
              <View className="flex-row justify-between items-center mb-6 pb-2 border-b border-[#F3F4F6]">
                <Text className="text-[#1F2937] text-[18px] font-black">
                  {editingId ? "Editar Resultado" : "Añadir al Plan Marco"}
                </Text>
                <TouchableOpacity onPress={closeModal} className="p-2">
                  <Text className="text-[#9CA3AF] text-[16px] font-bold">Cerrar</Text>
                </TouchableOpacity>
              </View>

              <ScrollView className="space-y-4 mb-6" showsVerticalScrollIndicator={false}>
                {/* SELECTOR: SEMANA */}
                <View className="mb-4">
                  <Text className="text-[#4B5563] text-[12px] font-bold uppercase mb-1">Semana de Rotación</Text>
                  <TouchableOpacity
                    onPress={() => setPickerType("week")}
                    className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-3 flex-row justify-between items-center"
                  >
                    <Text className="text-[#1F2937] text-[14px]">
                      {selectedWeekId ? getWeekText(selectedWeekId) : "Seleccionar Semana..."}
                    </Text>
                    <Text className="text-[#9CA3AF] font-bold">▼</Text>
                  </TouchableOpacity>
                </View>

                {/* SELECTOR: OBJETIVO */}
                <View className="mb-4">
                  <Text className="text-[#4B5563] text-[12px] font-bold uppercase mb-1">Criterio / Objetivo Académico</Text>
                  <TouchableOpacity
                    onPress={() => setPickerType("objective")}
                    className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-3 flex-row justify-between items-center"
                  >
                    <Text className="text-[#1F2937] text-[14px] flex-1 mr-2" numberOfLines={2}>
                      {selectedObjectiveId ? getObjectiveText(selectedObjectiveId) : "Seleccionar Objetivo..."}
                    </Text>
                    <Text className="text-[#9CA3AF] font-bold">▼</Text>
                  </TouchableOpacity>
                </View>

                {/* SELECTOR: LOGRO ESPERADO */}
                <View className="mb-4">
                  <Text className="text-[#4B5563] text-[12px] font-bold uppercase mb-1">Logro Esperado</Text>
                  <TouchableOpacity
                    onPress={() => setPickerType("achievement")}
                    className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-3 flex-row justify-between items-center"
                  >
                    <Text className="text-[#1F2937] text-[14px] flex-1 mr-2" numberOfLines={2}>
                      {selectedAchievementId ? getAchievementText(selectedAchievementId) : "Seleccionar Logro..."}
                    </Text>
                    <Text className="text-[#9CA3AF] font-bold">▼</Text>
                  </TouchableOpacity>
                </View>

                {/* INPUT: ACTIVIDAD */}
                <View className="mb-4">
                  <Text className="text-[#4B5563] text-[12px] font-bold uppercase mb-1">Actividad Específica a realizar</Text>
                  <TextInput
                    placeholder="Describe la tarea operativa detallada, herramientas y responsables..."
                    placeholderTextColor="#9CA3AF"
                    multiline
                    numberOfLines={4}
                    value={resultText}
                    onChangeText={setResultText}
                    className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-3 text-[#1F2937] text-[14px] h-28"
                    style={{ textAlignVertical: "top" }}
                  />
                </View>
              </ScrollView>

              {/* BOTÓN GUARDAR */}
              <TouchableOpacity
                onPress={handleSave}
                className="bg-[#FE7229] h-[54px] rounded-2xl justify-center items-center shadow-lg mb-6"
              >
                <Text className="text-white text-[16px] font-bold uppercase">
                  {editingId ? "Actualizar Plan" : "Guardar en Plan Marco"}
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>

        {/* CUSTOM SUB-PICKER MODAL */}
        <Modal visible={pickerType !== null} transparent animationType="fade">
          <View className="flex-1 bg-black/40 justify-center items-center px-6">
            <View className="bg-white rounded-2xl w-full max-h-[70%] p-5 shadow-2xl">
              <Text className="text-[16px] font-black text-[#1F2937] mb-4 uppercase tracking-wider">
                {pickerType === "week" ? "Selecciona Semana" : pickerType === "objective" ? "Selecciona Objetivo" : "Selecciona Logro"}
              </Text>

              <FlatList
                data={pickerType === "week" ? weeks : pickerType === "objective" ? objectives : achievements}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      if (pickerType === "week") setSelectedWeekId(item.id);
                      else if (pickerType === "objective") setSelectedObjectiveId(item.id);
                      else setSelectedAchievementId(item.id);
                      setPickerType(null);
                    }}
                    className="py-4 border-b border-[#F3F4F6] px-2 active:bg-[#F9FAFB]"
                  >
                    <Text className="text-[#374151] text-[14px] leading-relaxed">
                      {pickerType === "week"
                        ? `Semana ${item.week_number} (${item.start_date} al ${item.end_date})`
                        : item.description}
                    </Text>
                  </TouchableOpacity>
                )}
              />

              <TouchableOpacity
                onPress={() => setPickerType(null)}
                className="mt-4 bg-[#F3F4F6] py-3 rounded-xl items-center border border-[#E5E7EB]"
              >
                <Text className="text-[#4B5563] font-bold text-[14px]">Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </Modal>
    </View>
  );
}
