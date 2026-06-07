import { useState } from "react";
import { Alert } from "react-native";
import { useAuth } from "../../context/authContext/authContex"; // Verifica esta ruta

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor ingresa tu correo y contraseña.");
      return;
    }

    const exito = login(email, password);
    
    if (!exito) {
      Alert.alert("Error", "Credenciales incorrectas.");
    }
  };

  // Exponemos solo lo que la vista necesita
  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
  };
};