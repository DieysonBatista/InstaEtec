import React from 'react';
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider } from "native-base";
import { SafeAreaView } from 'react-native-safe-area-context';

const ResetarSenhaScreen = ({navigation}) => {
  return (
    <SafeAreaView
      style={{ flex: 1, width: "100%"}}
    >
      <NativeBaseProvider>
        <Center flex={1} px="3">
          <Center w="100%">
            <Box safeArea p="4" py="8" w="90%" maxW="425" backgroundColor={'white'} borderRadius={8}>
              <Heading size="lg" color="coolGray.800" _dark={{
              color: "warmGray.50"
            }} fontWeight="semibold">
                Recuperar Conta
              </Heading>
              <Heading mt="1" color="coolGray.600" _dark={{
              color: "warmGray.200"
            }} fontWeight="medium" size="xs">
                Esqueceu sua senha? Não se preocupe.
              </Heading>
              <VStack space={3} mt="5">
                <FormControl>
                  <FormControl.Label>Email</FormControl.Label>
                  <Input />
                </FormControl>
                <Button mt="2" colorScheme="indigo">
                  Enviar link de recuperação
                </Button>
                <HStack mt="6" justifyContent="center">
                  <Text fontSize="sm" color="coolGray.600" _dark={{
                  color: "warmGray.200"
                }}>
                    Lembrou sua senha? {" "}
                  </Text>
                  <Link _text={{
                  color: "indigo.500",
                  fontWeight: "medium",
                  fontSize: "sm"
                }} onPress={() => navigation.navigate('Autenticar')}>
                    Clique aqui
                  </Link>
                </HStack>
              </VStack>
            </Box>
          </Center>
        </Center>
      </NativeBaseProvider>
    </SafeAreaView>
  );
}

export default ResetarSenhaScreen;