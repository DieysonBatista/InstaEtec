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
  return (
    <NativeBaseProvider>
        <VStack mt={3} justifyContent="center" alignItems={"center"}>
            <Avatar bg="white" alignSelf="center" size="xl" source={{
                uri: "https://placeimg.com/200/200/people"
            }}>
                AJ
            </Avatar>
            <Heading size={'lg'} mt={1}>Dieyson</Heading>
            <Divider my={2}/>
            <Flex direction="row" flexWrap="wrap" justifyContent="center" alignContent="center">
                <Image source={{uri: "https://placeimg.com/150/150/animals"}} alt="Alternate Text" size="2xl" maxWidth="30%" height="150px" m={1}/>
                <Image source={{uri: "https://placeimg.com/150/150/animals"}} alt="Alternate Text" size="2xl" maxWidth="30%" height="150px" m={1}/>
                <Image source={{uri: "https://placeimg.com/150/150/animals"}} alt="Alternate Text" size="2xl" maxWidth="30%" height="150px" m={1}/>
                <Image source={{uri: "https://placeimg.com/150/150/animals"}} alt="Alternate Text" size="2xl" maxWidth="30%" height="150px" m={1}/>
                <Image source={{uri: "https://placeimg.com/150/150/animals"}} alt="Alternate Text" size="2xl" maxWidth="30%" height="150px" m={1}/>
                <Image source={{uri: "https://placeimg.com/150/150/animals"}} alt="Alternate Text" size="2xl" maxWidth="30%" height="150px" m={1}/>
                <Image source={{uri: "https://placeimg.com/150/150/animals"}} alt="Alternate Text" size="2xl" maxWidth="30%" height="150px" m={1}/>
                <Image source={{uri: "https://placeimg.com/150/150/animals"}} alt="Alternate Text" size="2xl" maxWidth="30%" height="150px" m={1}/>
                <Image source={{uri: "https://placeimg.com/150/150/animals"}} alt="Alternate Text" size="2xl" maxWidth="30%" height="150px" m={1}/>
                <Image source={{uri: "https://placeimg.com/150/150/animals"}} alt="Alternate Text" size="2xl" maxWidth="30%" height="150px" m={1}/>
                <Image source={{uri: "https://placeimg.com/150/150/animals"}} alt="Alternate Text" size="2xl" maxWidth="30%" height="150px" m={1}/>
            </Flex>
        </VStack>
    </NativeBaseProvider>
  );
}

export default MeuPerfilScreen;