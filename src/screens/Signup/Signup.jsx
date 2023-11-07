import { Pressable, Text, TextInput, View ,Image} from 'react-native'
import React, { useState } from 'react'

import { setUser } from '../../features/auth/authSlice'
import styles from './Signup.styles'
import { useDispatch } from 'react-redux'
import { useSignUpMutation } from '../../services/authApi'

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [triggerSignup] = useSignUpMutation()
  const dispatch = useDispatch()

  const onSubmit = () => {
    console.log('Login button')
    triggerSignup({
      email,
      password,
    })
      .unwrap()
      .then(result => {
        console.log(result)
        dispatch(setUser(result))
      })
      .catch(err => console.log(err))
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
        <Text style={{ fontFamily: "Poppins" }}>
          !!Registate y comparte tus recetas!!
        </Text>
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
        <TextInput
          style={styles.inputEmail}
          value={confirmPass}
          onChangeText={setConfirmPass}
          placeholder="password"
        />
        <Pressable style={styles.loginButton} onPress={onSubmit}>
          <Text style={{ color: "white", fontFamily: "Poppins" }}>Sign up</Text>
        </Pressable>
        <Text style={{ fontFamily: "Poppins" }}>¿Ya tienes una cuenta?</Text>
        <Pressable
          style={styles.loginButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={{ color: "white", fontFamily: "Poppins" }}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default Signup
