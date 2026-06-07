import{ScrollView} from "react-native";
import LoginComp from "../../components/Login/loginComponent";

export default function Login() {
  return (
     <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <LoginComp></LoginComp>
      </ScrollView>
  )
}
