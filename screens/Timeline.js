import React, {useEffect, useState} from 'react';
import {
  NativeBaseProvider,
  Box,
  FlatList,
  Avatar, HStack, VStack, Text, Spacer,  Center 
} from "native-base";

import { getDatabase, ref, child, get } from "firebase/database";

import NativeBaseIcon from "../components/NativeBaseIcon";
import { Platform } from "react-native";
import PostagemComponent from '../components/Postagem';

const database = getDatabase();

const TimelineScreen = ({navigation}) => {

  const [postagens, setPostagens] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const puxarDados = async () => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `timeline`)).then((snapshot) => {
          if (snapshot.exists()) {
            setPostagens(Object.entries(snapshot.val()).reverse());
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
      }
  
      puxarDados();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <NativeBaseProvider>
      <Box flex={1} mt={3}>
        {postagens && postagens.length >0 && <FlatList data={postagens} renderItem={({
        item
      }) => <PostagemComponent dados={item[1]}/> } keyExtractor={item => item[0]} /> }
      {postagens.length < 1 && <Text>Nenhuma postagem para exibir</Text>}
      </Box>
    </NativeBaseProvider>
  );
}

export default TimelineScreen;