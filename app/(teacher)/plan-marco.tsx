import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePlanMarco } from "@/hooks/usePlanMarco";
import PlanMarcoComponent from "@/components/PlanMarco/PlanMarcoComponent";

export default function TeacherPlanMarco() {
  // Inicialmente apunta a la pasantía con ID 1 y semestre ID 1
  const planMarco = usePlanMarco(1, 1);

  return (
    <SafeAreaView className="flex-1 bg-[#F3F4F6]" edges={["bottom"]}>
      <PlanMarcoComponent
        header={planMarco.header}
        results={planMarco.results}
        objectives={planMarco.objectives}
        achievements={planMarco.achievements}
        weeks={planMarco.weeks}
        loading={planMarco.loading}
        readOnly={false} // Habilita edición, creación y eliminación para el docente

        isModalOpen={planMarco.isModalOpen}
        openAddModal={planMarco.openAddModal}
        closeModal={planMarco.closeModal}
        startEdit={planMarco.startEdit}
        handleSave={planMarco.handleSave}
        handleDelete={planMarco.handleDelete}
        selectedObjectiveId={planMarco.selectedObjectiveId}
        setSelectedObjectiveId={planMarco.setSelectedObjectiveId}
        selectedAchievementId={planMarco.selectedAchievementId}
        setSelectedAchievementId={planMarco.setSelectedAchievementId}
        selectedWeekId={planMarco.selectedWeekId}
        setSelectedWeekId={planMarco.setSelectedWeekId}
        resultText={planMarco.resultText}
        setResultText={planMarco.setResultText}
        editingId={planMarco.editingId}
      />
    </SafeAreaView>
  );
}
