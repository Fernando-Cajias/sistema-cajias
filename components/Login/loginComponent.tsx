import { Image, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { useLogin } from "../../hooks/loginHook/useLogin"; // Importa tu hook (ajusta la ruta si es necesario)

const isAndroid = Platform.OS === "android";

if (isAndroid) {
  NavigationBar.setBorderColorAsync("black");
}

export default function LoginComp() {
  // Consumimos toda la lógica desde el custom hook
  const { email, setEmail, password, setPassword, handleLogin } = useLogin();

  return (
    <View className="flex-1 bg-background px-container py-10">
      
      <View className="items-center mb-10">
        <Image
          source={require('../../assets/images/Login/LogoYavi.png')}
          className="w-28 h-28 mb-4"
          resizeMode="contain"
        />
        <Text className="text-title font-bold text-text text-center">
          INICIAR SESIÓN
        </Text>
        <Text className="text-body text-text-secondary mt-2 text-center">
          Bienvenido, ingresa tus credenciales para continuar
        </Text>
      </View>

      {/* FORM */}
      <View className="gap-4">
        <View>
          <Text className="text-small text-text-secondary mb-1">
            Correo electrónico
          </Text>
          <TextInput
            placeholder="ejemplo@correo.com"
            placeholderTextColor="#6B7280"
            className="bg-surface border border-border rounded-input px-inputX py-inputY text-text"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View>
          <Text className="text-small text-text-secondary mb-1">
            Contraseña
          </Text>
          <TextInput
            placeholder="********"
            placeholderTextColor="#6B7280"
            secureTextEntry
            className="bg-surface border border-border rounded-input px-inputX py-inputY text-text"
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>

      {/* BOTÓN */}
      <TouchableOpacity 
        className="bg-primary h-button rounded-button justify-center items-center mt-10"
        onPress={handleLogin}
      >
        <Text className="text-text-light text-body font-semibold">
          INGRESAR
        </Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}