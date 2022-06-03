import React from "react";
import './config/firebase';


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
import AlterarFotoScreen from "./screens/AlterarFoto"

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useAuthentication } from './hooks/useAuthentication';


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
  const { user } = useAuthentication();

  const autenticado = user ? true : false;
  // const autenticado = false;

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {autenticado ? 
          <Tab.Navigator useLegacyImplementation initialRouteName="Meu Perfil" screenOptions={{ tabBarHideOnKeyboard: true, headerStyle: {backgroundColor: '#fff'}, headerShadowVisible:true, headerTintColor: '#1f2937'}}>
            <Tab.Screen name="Timeline" component={TimelineScreen} />
            <Tab.Screen name="Postar" component={PostarScreen} />
            <Tab.Screen name="Meu Perfil" component={MeuPerfilScreen} />
            <Tab.Screen name="Alterar Foto" component={AlterarFotoScreen} options={{
                  tabBarButton: () => null,
                  tabBarVisible:false
              }} />
          </Tab.Navigator>
          :
          <Stack.Navigator initialRouteName="SignIn" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Autenticar" component={AutenticarScreen} />
            <Stack.Screen name="Cadastro" component={CadastroScreen} />
            <Stack.Screen name="ResetarSenha" component={ResetarSenhaScreen} />
          </Stack.Navigator>
        }
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
