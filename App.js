import React from "react";


import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TimelineScreen from "./screens/Timeline";
import { extendTheme } from "native-base";
import AutenticarScreen from "./screens/auth/AutenticarScreen";
import CadastroScreen from "./screens/auth/CadastroScreen";
import ResetarSenhaScreen from "./screens/auth/ResetarSenhaScreen";
import PostarScreen from "./screens/Postar";
import MeuPerfilScreen from "./screens/MeuPerfil";


// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {

  const autenticado = true;

  return (
    <NavigationContainer>
      {autenticado ? 
        <Tab.Navigator useLegacyImplementation initialRouteName="Meu Perfil" screenOptions={{headerStyle: {backgroundColor: '#fff'}, headerShadowVisible:false, headerTintColor: '#1f2937'}}>
          <Tab.Screen name="Timeline" component={TimelineScreen} />
          <Tab.Screen name="Postar" component={PostarScreen} />
          <Tab.Screen name="Meu Perfil" component={MeuPerfilScreen} />
        </Tab.Navigator>
        :
        <Stack.Navigator initialRouteName="SignIn" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Autenticar" component={AutenticarScreen} />
          <Stack.Screen name="Cadastro" component={CadastroScreen} />
          <Stack.Screen name="ResetarSenha" component={ResetarSenhaScreen} />
        </Stack.Navigator>
      }
    </NavigationContainer>
  );
}
