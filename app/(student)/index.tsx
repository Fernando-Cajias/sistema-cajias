import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "@/context/authContext/authContex";

export default function HomeStudent() {
  const router = useRouter();
  const { logout, usuario } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-[#F3F4F6]">
      <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 40 }}>
        {/* CABECERA BIENVENIDA */}
        <View className="mb-8 flex-row justify-between items-center">
          <View>
            <Text className="text-[#6B7280] text-[14px]">Panel del Estudiante</Text>
            <Text className="text-[#1F2937] text-[24px] font-black mt-1">¡Hola, {usuario?.email.split('@')[0]}!</Text>
          </View>
          <TouchableOpacity 
            onPress={logout}
            className="bg-red-50 border border-red-200 px-4 py-2 rounded-xl"
          >
            <Text className="text-red-500 font-bold text-[12px]">Salir</Text>
          </TouchableOpacity>
        </View>

        {/* CONTENEDOR DE TARJETAS */}
        <Text className="text-[#9CA3AF] text-[12px] font-bold uppercase tracking-wider mb-3">Mis Prácticas</Text>
        
        <TouchableOpacity
          onPress={() => router.push("/(student)/plan-marco")}
          className="bg-white p-6 rounded-3xl border border-[#E5E7EB] shadow-sm mb-4 active:scale-95 transition-all"
        >
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-[#FE7229] font-bold text-[12px] uppercase tracking-wide">Plan de Formación</Text>
            <View className="bg-[#FFF7ED] px-2.5 py-0.5 rounded-full">
              <Text className="text-[#EA580C] text-[10px] font-bold">Ver Plan</Text>
            </View>
          </View>
          <Text className="text-[#1F2937] text-[18px] font-bold">PLAN MARCO DE FORMACIÓN</Text>
          <Text className="text-[#6B7280] text-[14px] mt-2 leading-relaxed">
            Revisa los 13 Resultados de Aprendizaje programados, las tareas asignadas y el plan de rotación por semanas.
          </Text>
        </TouchableOpacity>

        {/* OTRAS MOCK CARDS PARA COMPAÑEROS */}
        <View className="bg-white/60 p-6 rounded-3xl border border-[#E5E7EB]/60 opacity-60">
          <Text className="text-[#9CA3AF] font-bold text-[12px] uppercase">Control Diario</Text>
          <Text className="text-[#1F2937] text-[18px] font-bold mt-2">REGISTRO DE ASISTENCIA</Text>
          <Text className="text-[#6B7280] text-[14px] mt-1">
            (Desarrollado por otro compañero)
          </Text>
        </View>
      </ScrollView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}