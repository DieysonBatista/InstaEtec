import React, {useEffect, useState} from 'react';
import {
    Text,
    NativeBaseProvider,
    Box,
    Image,
    Avatar,
    HStack,
    Heading
  } from "native-base";

  import { getStorage, ref, getDownloadURL } from "firebase/storage";

  const storage = getStorage();

const PostagemComponent = ({dados}) => {
    const {userId, postagemId, nome, latitude, foto, longitude, descricao} = dados;

    const [fotoPerfil, setFotoPerfil] = useState('https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-14.jpg');
    const [fotoPostagem, setFotoPostagem] = useState(null);

    useEffect(() => {
        getDownloadURL(ref(storage, 'perfil/' + userId))
        .then((url) => {
            setFotoPerfil(url);
        });

        const DownloadFotoPostagem = () => {
             getDownloadURL(ref(storage, 'postagens/' + postagemId))
                .then((url) => {
                    setFotoPostagem(url);
                }).catch(() => {
                    setTimeout(DownloadFotoPostagem, 3000);
                });
            }
        
        DownloadFotoPostagem();
      }, []);

    return (
        <Box mx={2} background="white" borderRadius={3} shadow={1} py={2} mb={3}>
            <HStack px={2} space={4} mb={2}>
                <Avatar bg="white" alignSelf="center" size="lg" source={{
                    uri: fotoPerfil
                }}>
                    AJ
                </Avatar>
                <Box my={3}>
                    <Heading size="sm">{nome}</Heading>
                    <Text>Latitude: {latitude}</Text>
                    <Text>Longitude: {longitude}</Text>
                </Box>
            </HStack>
            <Image source={{uri: fotoPostagem}} alt="Alternate Text" size="2xl" flex={1} width="100%"/>
            <Text p={3}>{descricao}</Text>
        </Box>
        );
}

export default PostagemComponent;