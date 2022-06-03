import React, {useState, useEffect} from 'react';
import {
    NativeBaseProvider,
    Box,
    FlatList,
    Avatar, VStack, HStack,
    Heading, 
    Divider, Button, Text
  } from "native-base";

import { getStorage, ref as refStorage, getDownloadURL } from "firebase/storage";
import { getDatabase, ref, child, get } from "firebase/database";
import { getAuth, signOut } from "firebase/auth";

import { useAuthentication } from '../hooks/useAuthentication';
import MiniPostagemComponent from '../components/MiniPostagem';

const MeuPerfilScreen = ({navigation}) => {

  const { user } = useAuthentication();
  const [foto, setFoto] = useState('https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-14.jpg');

  const [postagens, setPostagens] = useState([]);

  const storage = getStorage();
  const database = getDatabase();
  const auth = getAuth();
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const puxarDados = async () => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'usuarios/' + user?.uid + '/postagens')).then(snapshot => {
          if (snapshot.exists()) {
            setPostagens(Object.entries(snapshot.val()).reverse());
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
      }

      const baixarFotoPerfil = () => {
        getDownloadURL(refStorage(storage, 'perfil/' + user?.uid))
          .then((url) => {
            setFoto(url);
          }).catch((e) => {
            setTimeout(baixarFotoPerfil, 3000);
          });
      }
  
      if(user) baixarFotoPerfil();

      if(user) puxarDados();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation, user]);

  
  

  

  return (
    <NativeBaseProvider>
        <Box flex={1} width="100%">
          <VStack mt={3} justifyContent="center" alignItems={"center"} space={3}>
              <Avatar bg="white" alignSelf="center" size="xl" source={{
                  uri: foto
              }}>
                  AJ
              </Avatar>
              <Heading size={'lg'} mt={1}>{user?.displayName}</Heading>
              <HStack space={5}>
                <Button onPress={() => navigation.navigate("Alterar Foto")}>Trocar Foto</Button>
                <Button onPress={() => signOut(auth)}>Sair</Button>
              </HStack>
              <Divider my={2}/>
              
              {postagens && postagens.length < 1 && <Text>Nenhuma postagem para exibir</Text>}
              <FlatList numColumns={3} data={postagens} renderItem={({
                  item
                }) => <MiniPostagemComponent postagemId={item[0]}/> } keyExtractor={item => item[0]} />
          </VStack>
        </Box>
    </NativeBaseProvider>
  );
}

export default MeuPerfilScreen;