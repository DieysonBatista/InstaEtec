import React from 'react';
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider } from "native-base";
import { SafeAreaView } from 'react-native-safe-area-context';

const AutenticarScreen = ({navigation}) => {
  return (
    <SafeAreaView
      style={{ flex: 1, width: "100%"}}
    >
  <NativeBaseProvider>
    <Center flex={1} px="3">
      <Center w="100%" >
        <Box safeArea p="4" py="8" w="90%" maxW="425" backgroundColor={'white'} borderRadius={8}>
          <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
          color: "warmGray.50"
        }}>
            Bem vindo
          </Heading>
          <Heading mt="1" _dark={{
          color: "warmGray.200"
        }} color="coolGray.600" fontWeight="medium" size="xs">
            Autenticação necessária!
          </Heading>

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl>
              <FormControl.Label>Senha</FormControl.Label>
              <Input type="password" />
              <Link _text={{
              fontSize: "xs",
              fontWeight: "500",
              color: "indigo.500"
            }} alignSelf="flex-end" mt="1" onPress={() => navigation.navigate('ResetarSenha')}>
                Esqueceu sua senha?
              </Link>
            </FormControl>
            <Button mt="2" colorScheme="indigo">
              Entrar
            </Button>
            <HStack mt="6" justifyContent="center">
              <Text fontSize="sm" color="coolGray.600" _dark={{
              color: "warmGray.200"
            }}>
                Não possui cadastro? {" "}
              </Text>
              <Link _text={{
              color: "indigo.500",
              fontWeight: "medium",
              fontSize: "sm"
            }} onPress={() => navigation.navigate('Cadastro')}>
                Clique aqui
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </Center>
  </NativeBaseProvider></SafeAreaView>
);
}

export default AutenticarScreen;