import React, { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';

import { StyleSheet, Text, TouchableOpacity, ImageBackground, View, Alert } from 'react-native';

import { Box, HStack, NativeBaseProvider } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthentication } from '../hooks/useAuthentication';

import { getStorage, ref, uploadBytes } from "firebase/storage";

import { useIsFocused } from '@react-navigation/native';

const storage = getStorage();

let camera;

const AlterarFotoScreen = ({navigation}) => {
  const { user } = useAuthentication();

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [foto, setFoto] = useState(null);

  const iniciar = useIsFocused();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const tirarFoto = async () => {
    const photo = await camera.takePictureAsync();
    setFoto(photo)
  }

  const UploadFoto = async() => {
    const storageRef = ref(storage, 'perfil/' + user.uid);
    const response = await fetch(foto.uri);
    const blob = await response.blob();

    uploadBytes(storageRef, blob).then((snapshot) => {
      Alert.alert("Foto alterada com sucesso!");
      setFoto(null);
      return navigation.navigate('Meu Perfil');
    });
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Sem Acesso a câmera</Text>;
  }
  return (
    <SafeAreaView
      style={{ flex: 1, width: "100%"}}
    >
      <NativeBaseProvider>
          <Box flex={1}>
              {foto == null && iniciar ? <Camera ref={(r) => {camera = r}} style={styles.camera} type={type} ratio={"1:1"} pictureSize={"1080x1080"}>
                    <Box flex={1} justifyContent="flex-end" pb={5} px={5} backgroundColor={"transparent"}>
                      <HStack width="100%" justifyContent="space-between" alignContent={"flex-end"} alignSelf="flex-end" backgroundColor={"transparent"}>

                        <Text onPress={() => {
                            setType(
                              type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                            );
                          }} style={styles.text}>Flip</Text>
                        <Text style={styles.text} onPress={() => tirarFoto()}>Tirar Foto</Text>
                      </HStack>
                    </Box>
                    
              </Camera> : <CameraPreview  Foto={foto} Continuar={UploadFoto} TirarOutra={() => {setFoto(null)}}/> }
          </Box>
      </NativeBaseProvider>
    </SafeAreaView>
  );
}


const CameraPreview = ({Foto, TirarOutra, Continuar}) => {
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%'
      }}
    >
      <ImageBackground
        source={{uri: Foto && Foto.uri}}
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            padding: 15,
            justifyContent: 'flex-end'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <TouchableOpacity
              onPress={TirarOutra}
              style={{
                width: 130,
                height: 40,

                alignItems: 'center',
                borderRadius: 4
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20
                }}
              >
                Tirar Outra
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={Continuar}
              style={{
                width: 130,
                height: 40,

                alignItems: 'center',
                borderRadius: 4
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20
                }}
              >
                Usar esta foto
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});

export default AlterarFotoScreen;