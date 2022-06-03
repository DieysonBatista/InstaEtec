import React, {useState, useEffect} from 'react';
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider } from "native-base";
import { SafeAreaView } from 'react-native-safe-area-context';

import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Alert } from 'react-native';

const auth = getAuth();

const CadastroScreen = ({navigation}) => {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const Cadastrar = async () => {
    if (email === '' || senha === '') {
      Alert.alert('E-mail e senha obrigatórios!');
      return;
    }
    if (senha !== confirmarSenha) {
      alert('Desculpe mas suas senhas não conferem.');
      return;
    }

    try {
      const {user} = await createUserWithEmailAndPassword(auth, email, senha);
      await updateProfile(user, {
        displayName: nome
      }) 
      navigation.navigate('Autenticar')
    } catch (error) {
      Alert.alert(error.message);
    }
  }

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
                Cadastro
              </Heading>
              <Heading mt="1" color="coolGray.600" _dark={{
              color: "warmGray.200"
            }} fontWeight="medium" size="xs">
                Obrigado por experimentar nosso aplicativo!
              </Heading>
              <VStack space={3} mt="5">
                <FormControl>
                  <FormControl.Label>Nome</FormControl.Label>
                  <Input name="name" value={nome} onChangeText={setNome} />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Email</FormControl.Label>
                  <Input value={email} onChangeText={setEmail} />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Senha</FormControl.Label>
                  <Input type="password" value={senha} onChangeText={setSenha} />
                </FormControl>
                <FormControl>
                  <FormControl.Label>Confirmação de Senha</FormControl.Label>
                  <Input type="password" value={confirmarSenha} onChangeText={setConfirmarSenha} />
                </FormControl>

                <Button mt="2" colorScheme="indigo" onPress={Cadastrar}>
                  Cadastrar-se
                </Button>
                <HStack mt="6" justifyContent="center">
                  <Text fontSize="sm" color="coolGray.600" _dark={{
                  color: "warmGray.200"
                }}>
                    Já possui cadastro? {" "}
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

export default CadastroScreen;