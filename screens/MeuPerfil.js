import React from 'react';
import {
    NativeBaseProvider,
    Box,
    FlatList,
    Avatar, VStack, Text, Spacer,  Center,
    Heading, 
    Divider, Flex, Image
  } from "native-base";

const MeuPerfilScreen = () => {

  const data = [{
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    fullName: "Aafreen Khan",
    timeStamp: "12:47 PM",
    recentText: "Good Day!",
    avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  }, {
    id: "3ac68afc-c605-48d3-a4f8-fbd94aa97f63",
    fullName: "Sujitha Mathur",
    timeStamp: "11:11 PM",
    recentText: "Cheer up, there!",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU"
  }, {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    fullName: "Anci Barroco",
    timeStamp: "6:22 PM",
    recentText: "Good Day!",
    avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg"
  }, {
    id: "68694a0f-3da1-431f-bd56-142351e29d72",
    fullName: "Aniket Kumar",
    timeStamp: "8:56 PM",
    recentText: "All the best",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU"
  }, {
    id: "28694a0f-3da1-471f-bd96-142456e29d72",
    fullName: "Kiara",
    timeStamp: "12:47 PM",
    recentText: "I will call today.",
    avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
  }];

  return (
    <NativeBaseProvider>
        <Box flex={1} width="100%">
          <VStack mt={3} justifyContent="center" alignItems={"center"}>
              <Avatar bg="white" alignSelf="center" size="xl" source={{
                  uri: "https://placeimg.com/200/200/people"
              }}>
                  AJ
              </Avatar>
              <Heading size={'lg'} mt={1}>Dieyson</Heading>
              <Divider my={2}/>
              
              <FlatList numColumns={3} data={data} renderItem={({
                  item
                }) => <Image source={{uri: "https://placeimg.com/150/150/animals"}} alt="Post" size="xl" m={1} shadow={1}/> } keyExtractor={item => item.id} />
          </VStack>
        </Box>
    </NativeBaseProvider>
  );
}

export default MeuPerfilScreen;