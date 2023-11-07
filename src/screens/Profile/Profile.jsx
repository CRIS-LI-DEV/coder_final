import * as ImagePicker from 'expo-image-picker'

import { Image, Pressable, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import store from "../../store/index.js";
import { setCameraImage } from '../../features/auth/authSlice'
import styles from './Profile.styles'
import { usePostProfileImageMutation } from '../../services/shopApi'

const Profile = ({ navigation }) => {
    const [data, setData] = useState(null);
  const image = useSelector(state => state.auth.imageCamera)
  const { localId } = useSelector(state => state.auth)
  const [triggerSaveProfileImage, result] = usePostProfileImageMutation()
  const dispatch = useDispatch()

    useEffect(() => {
      const fetchData = () => {
        console.log(store.getState().auth.user);

        setData(store.getState().auth.user);
      };

      fetchData(); // Llamada a la función para obtener los datos

      // Puedes realizar limpieza o cancelación de suscripciones aquí si es necesario
      return () => {
        // Código de limpieza o cancelación de suscripciones
      };
    }, []);
  const verifyCameraPermissions = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync()
    if (!granted) {
      return false
    }
    return true
  }

  const pickImage = async () => {
    const isCameraOk = await verifyCameraPermissions()

    if (isCameraOk) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [9, 16],
        base64: true,
        quality: 0.4,
      })
      if (!result.canceled) {
        //console.log(result.assets)
        dispatch(
          setCameraImage(`data:image/jpeg;base64,${result.assets[0].base64}`)
        )
      }
    }
  }

  const confirmImage = () => {
    triggerSaveProfileImage({ image, localId })
    //(result)
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "white",
          backgroundColor: "#ff8a00",
          borderRadius: 50,

          fontSize: 40,
          padding: 10,
          marginBottom: 10,
        }}
      >
        <Image
          source={require("../../../assets/cocinero.png")} // Ajusta la ruta de la imagen según la ubicación de tu archivo de imagen
          style={{
            width: 50, // Ajusta el ancho de la imagen según tus necesidades
            height: 50, // Ajusta la altura de la imagen según tus necesidades
          }}
        />{" "}
        Hola {data ? data : "Cargando..."}
      </Text>
      {image ? (
        <Image
          source={{
            uri: image,
          }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <Image
          source={{
            uri: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <View style={styles.contenedor}>
        <Pressable style={styles.cameraButton} onPress={pickImage}>
          <Text style={{ color: "white", fontFamily: "Poppins" }}>
            Tomar Foto de perfil
          </Text>
        </Pressable>
        <Pressable style={styles.cameraButton} onPress={confirmImage}>
          <Text style={{ color: "white", fontFamily: "Poppins" }}>
            Confirmar
          </Text>
        </Pressable>
        <Pressable
          style={{ ...styles.cameraButton, marginTop: 20 }}
          onPress={() => navigation.navigate("Location")}
        >
          <Text style={{ color: "white", fontFamily: "Poppins" }}>
            Ir a mi ubiacion
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export default Profile
