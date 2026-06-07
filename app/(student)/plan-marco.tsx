import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePlanMarco } from "@/hooks/usePlanMarco";
import PlanMarcoComponent from "@/components/PlanMarco/PlanMarcoComponent";
import { useAuth } from "@/context/authContext/authContex";

export default function StudentPlanMarco() {
  const { usuario } = useAuth();
  
  // Asumiendo que el ID de la pasantía está asociado al estudiante (ej. 1)
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
        readOnly={true} // Vista de solo lectura para el estudiante

        // Propiedades de formulario vacías (no requeridas por ser readOnly)
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
