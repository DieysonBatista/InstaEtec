import React from 'react';
import {
    Text,
    NativeBaseProvider,
    Box,
    Image,
    Avatar,
    HStack,
    Heading
  } from "native-base";

const PostagemComponent = () => {
  return (
    <Box mx={2} background="white" borderRadius={3} shadow={1} py={2} mb={3}>
        <HStack px={2} space={4} mb={2}>
            <Avatar bg="white" alignSelf="center" size="lg" source={{
                uri: "https://placeimg.com/640/480/people"
            }}>
                AJ
            </Avatar>
            <Box my={3}>
            <Heading size="sm">Dieyson</Heading>
            <Text>Olímpia-SP</Text>
            </Box>
        </HStack>
        <Image source={{uri: "https://placeimg.com/640/480/animals"}} alt="Alternate Text" size="2xl" flex={1} width="100%"/>
        <Text p={3}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a facilisis erat, at pellentesque enim. Vestibulum blandit felis eu euismod dapibus. Quisque pretium lacinia turpis, nec commodo urna malesuada vel. Mauris ac scelerisque lectus. Maecenas ac sodales justo. Curabitur faucibus sem justo, in pellentesque purus ultricies id. Praesent nunc nisl, dapibus eu justo in, euismod malesuada massa. Vestibulum elementum gravida nisl at volutpat. Maecenas imperdiet, risus a lobortis placerat, dui libero mattis nulla, quis sagittis quam augue sed est. Duis vulputate mi vel felis elementum molestie. Praesent nisi lacus, dignissim vel odio nec, pulvinar rutrum tortor. Morbi consectetur lacinia augue, id pretium elit.</Text>
    </Box>
    );
}

export default PostagemComponent;