import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "@/context/authContext/authContex";

export default function HomeTeacher() {
  const router = useRouter();
  const { logout, usuario } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-[#F3F4F6]">
      <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 40 }}>
        {/* CABECERA BIENVENIDA */}
        <View className="mb-8 flex-row justify-between items-center">
          <View>
            <Text className="text-[#6B7280] text-[14px]">Panel del Docente Tutor</Text>
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
        <Text className="text-[#9CA3AF] text-[12px] font-bold uppercase tracking-wider mb-3">Administración</Text>

        <TouchableOpacity
          onPress={() => router.push("/(teacher)/plan-marco")}
          className="bg-white p-6 rounded-3xl border border-[#E5E7EB] shadow-sm mb-4 active:scale-95 transition-all"
        >
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-[#FE7229] font-bold text-[12px] uppercase tracking-wide">Planificación Curricular</Text>
            <View className="bg-[#EFF6FF] px-2.5 py-0.5 rounded-full">
              <Text className="text-[#2563EB] text-[10px] font-bold">Gestionar</Text>
            </View>
          </View>
          <Text className="text-[#1F2937] text-[18px] font-bold">PLAN MARCO DE FORMACIÓN</Text>
          <Text className="text-[#6B7280] text-[14px] mt-2 leading-relaxed">
            Asigna y edita los Resultados de Aprendizaje para los estudiantes, define las tareas operativas y asócialas a semanas y logros.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(teacher)/parameter")}
          className="bg-white p-6 rounded-3xl border border-[#E5E7EB] shadow-sm mb-4 active:scale-95 transition-all"
        >
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-[#FE7229] font-bold text-[12px] uppercase tracking-wide">Configuración</Text>
            <View className="bg-[#F3F4F6] px-2.5 py-0.5 rounded-full">
              <Text className="text-[#4B5563] text-[10px] font-bold">Ajustes</Text>
            </View>
          </View>
          <Text className="text-[#1F2937] text-[18px] font-bold">PARAMETRIZACIÓN GLOBAL</Text>
          <Text className="text-[#6B7280] text-[14px] mt-2 leading-relaxed">
            Administra las carreras, roles de usuario, periodos académicos y variables generales de control del sistema.
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}