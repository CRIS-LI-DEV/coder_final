import { Pressable, Text, TextInput, View,Image } from 'react-native'
import React, { useState } from 'react'

import { insertSession } from '../../db'
import { setUser } from '../../features/auth/authSlice'
import styles from './login.styles'
import { useDispatch } from 'react-redux'
import { useLoginMutation } from '../../services/authApi'

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [triggerLogin] = useLoginMutation()
  const dispatch = useDispatch()

  const onSubmit = () => {
    triggerLogin({
      email,
      password,
    })
      .unwrap()
      .then(result => {
        dispatch(setUser(result))
        insertSession({
          localId: result.localId,
          email: result.email,
          token: result.idToken,
        })
          .then(result => console.log(result))
          .catch(error => console.log(error.message))
      })
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 50,
          fontFamily: "Poppins",
          color: "white",
          textShadowColor: "rgba(0, 0, 0, 0.75)",
          textShadowOffset: { width: 2, height: 2 },
          textShadowRadius: 5,
        }}
      >
        RECETA-BOOK
      </Text>
      <View style={styles.loginContainer}>
        <Image
          source={require("../../../assets/cocinero.png")} // Ajusta la ruta de la imagen según la ubicación de tu archivo de imagen
          style={styles.image}
        />

        <Text style={{ fontFamily: "Poppins" }}>¡¡Ingresa!!</Text>
        <TextInput
          style={styles.inputEmail}
          value={email}
          onChangeText={setEmail}
          placeholder="email"
        />
        <TextInput
          style={styles.inputEmail}
          value={password}
          onChangeText={setPassword}
          placeholder="password"
        />
        <Pressable style={styles.loginButton} onPress={onSubmit}>
          <Text style={{ color: "white", fontFamily: "Poppins" }}>Login</Text>
        </Pressable>
        <Text style={{ fontFamily: "Poppins" }}>¡¡Registrate!!</Text>
        <Pressable
          style={styles.loginButton}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={{ color: "white", fontFamily: "Poppins" }}>Sign up</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default Login
