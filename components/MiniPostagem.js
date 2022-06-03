import React, {useEffect, useState} from 'react';
import {
    Image
  } from "native-base";

  import { getStorage, ref, getDownloadURL } from "firebase/storage";

  const storage = getStorage();

const MiniPostagemComponent = ({postagemId}) => {
    const [fotoPostagem, setFotoPostagem] = useState(null);

    useEffect(() => {
        const baixarFoto = () => {
          getDownloadURL(ref(storage, 'postagens/' + postagemId))
          .then((url) => {
              setFotoPostagem(url);
          }).catch(e => {
            setTimeout(baixarFoto, 3000);
          });
        }

        baixarFoto();
      }, []);

    return (
        <Image source={{uri: fotoPostagem}} alt="Post" size="xl" m={1} />
        );
}

export default MiniPostagemComponent;