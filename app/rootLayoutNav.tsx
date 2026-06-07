import { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { useAuth } from "../context/authContext/authContex";

export default function RootLayoutNav() {
  const { usuario } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const enGrupoAuth = segments[0] === "(auth)";

    if (!segments.length) return;

    if (!usuario && !enGrupoAuth) {
      router.replace("/(auth)");
    } else if (usuario) {
      if (usuario.rol === "teacher") {
        router.replace("/(teacher)");
      } else if (usuario.rol === "business") {
        router.replace("/(business)");
      } else if (usuario.rol === "student") {
        router.replace("/(student)");
      }
    }
  }, [usuario, segments]);

  return (
    <Stack>
      <Stack.Screen name="(auth)"     options={{ headerShown: false }} />
      <Stack.Screen name="(business)" options={{ headerShown: false }} />
      <Stack.Screen name="(student)"  options={{ headerShown: false }} />
      <Stack.Screen name="(teacher)"  options={{ headerShown: false }} />
    </Stack>
  );
}