import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Camera } from 'expo-camera';

import { Platform, StyleSheet, Text, TouchableOpacity, ImageBackground, View, KeyboardAvoidingView, Alert } from 'react-native';

import { Box, VStack, HStack, NativeBaseProvider, Image, Center, TextArea, Button} from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getDatabase, ref, set, push } from "firebase/database";
import { useAuthentication } from '../hooks/useAuthentication';


import { getStorage, ref as refStorage, uploadBytes } from "firebase/storage";

import { useIsFocused } from '@react-navigation/native';

let camera;

const db = getDatabase();
const storage = getStorage();

const PostarScreen = ({navigation}) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [descricao, setDescricao] = useState('');
  
  const iniciar = useIsFocused();

  const { user } = useAuthentication();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão negada para uso de GPS');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [foto, setFoto] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      const { status2 } = await Location.requestForegroundPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const tirarFoto = async () => {
    const photo = await camera.takePictureAsync();
    setFoto(photo)
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Sem Acesso a câmera</Text>;
  }

  const publicar = async () => {    
    const newPost = push(ref(db, 'timeline'));
    const newPostId = newPost.key;
    const newPost2 = ref(db, 'usuarios/' + user.uid + '/postagens/' + newPostId);
    

    set(newPost, {
      descricao: descricao,
      latitude: location?.coords?.latitude,
      longitude: location?.coords?.longitude,
      nome: user.displayName,
      postagemId: newPostId,
      userId: user.uid
    });

    set(newPost2, {
      descricao: descricao,
      latitude: location?.coords?.latitude,
      longitude: location?.coords?.longitude,
      nome: user.displayName,
      postagemId: newPostId,
      userId: user.uid
    });
    
    UploadFoto(newPostId);
    
  }

  const UploadFoto = async(postId) => {
    const storageRef = refStorage(storage, 'postagens/' + postId);
    const response = await fetch(foto.uri);
    const blob = await response.blob();

    uploadBytes(storageRef, blob).then((snapshot) => {
      Alert.alert("Postagem publicada com sucesso!");
      setMostrarFormulario(false);
      setFoto(null);
      setDescricao('');
      return navigation.navigate('Timeline');
    });
  }

  return (
    <SafeAreaView
      style={{ flex: 1, width: "100%"}}
    >
      <NativeBaseProvider>
          <Box flex={1}>
            {mostrarFormulario ? 
                  <Box mt={5}>
                    {/* <Center>
                      <Image source={{uri: foto && foto?.uri}} alt="Alternate Text" size="2xl"/>
                    </Center> */}
                    <VStack mt={5} px={5} space={5}>
                      {errorMsg != null ? <Text>{errorMsg}</Text> :               
                        <>
                          <Text key={"lat"}>Latitude: {location?.coords?.latitude}</Text>
                          <Text key={"long"}>Longitude: {location?.coords?.longitude}</Text>
                        </>
                      }
                      <TextArea h={100} placeholder="Descrição da foto" w="100%" maxW="450" onChangeText={setDescricao}/>
                      <Button onPress={publicar}>Postar</Button>
                    </VStack>
                  </Box> 
              : 
              <>
                {foto == null && iniciar ? 
                  
                    <Camera ref={(r) => {camera = r}} style={styles.camera} type={type} ratio={"4:3"}>
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
                    </Camera> 
                    : 
                    <CameraPreview  Foto={foto} Continuar={() => {setMostrarFormulario(true)}} TirarOutra={() => {setFoto(null)}}/> 
                  }
              </>}
              
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

export default PostarScreen;