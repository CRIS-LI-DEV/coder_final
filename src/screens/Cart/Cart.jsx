import { Header } from "../../components";
import React, { useState } from "react";
import store from '../../store/index.js'
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,Image
} from "react-native";
import { usePostRecipeMutation } from "../../services/recipeApi";
const Cart = () => {
  const [postRecipe, { isLoading: isPosting }] = usePostRecipeMutation();
  const [nombreReceta, setNombreReceta] = useState("");
  const [nuevoIngrediente, setNuevoIngrediente] = useState("");
  const [nuevoPaso, setNuevoPaso] = useState("");
  const [ingredientes, setIngredientes] = useState([]);
  const [pasos, setPasos] = useState([]);
const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const agregarIngrediente = () => {
    if (nuevoIngrediente !== "") {
      setIngredientes([...ingredientes, nuevoIngrediente]);
      setNuevoIngrediente("");
    }
  };

  const agregarPaso = () => {
    if (nuevoPaso !== "") {
      setPasos([...pasos, nuevoPaso]);
      setNuevoPaso("");
    }
  };

  const enviarReceta = () => {

     console.log("largo" + nombreReceta.length);
    console.log("largo" + ingredientes.length);
    console.log("largo" + pasos.length);
   


    const receta = {
      nombre: nombreReceta,
      ingredientes: ingredientes,
      pasos: pasos,
      usuario: store.getState().auth.user,
    };
     console.log("receta");
    console.log(receta)
    if (nombreReceta.length > 0 && ingredientes.length > 0 && pasos.length) {
      postRecipe(receta)
        .unwrap()
        .then((data) => {
          console.log("Receta agregada con éxito:", data);
           setSuccessMessage("¡Receta agregada con éxito!");
          setSuccess(true);
           setError(false);
           setTimeout(() => {
             setSuccess(false);
           }, 3000);
        })
        .catch((error) => {
          console.error("Error al agregar la receta:", error);
        });
      
      setNombreReceta('');
      setIngredientes([]);
      setPasos([]);
      
    } else {
      console.log("Error", "Por favor ingresa un nombre para la receta.");
         setErrorMessage("Faltan datos. Por favor complete todos los campos.");
         setError(true);
         return;
     }


    
  };

  return (
    <View style={styles.container}>
      <Header title={"Agrega tu receta"} />

      <View style={{ flex: 1, paddingHorizontal: 4 }}>
        {success && <Text style={styles.successText}>{successMessage}</Text>}
        {error && <Text style={styles.errorText}>{errorMessage}</Text>}
        <Text style={styles.label}>Nombre de la Receta:</Text>
        <TextInput
          style={[styles.recipeInput]}
          value={nombreReceta}
          onChangeText={setNombreReceta}
          placeholder="Nombre de la receta..."
        />

        <Text style={styles.label}>Agregar Ingrediente:</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={nuevoIngrediente}
            onChangeText={setNuevoIngrediente}
            placeholder="Ingrediente..."
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={agregarIngrediente}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Agregar Paso:</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={nuevoPaso}
            onChangeText={setNuevoPaso}
            placeholder="Paso..."
          />
          <TouchableOpacity style={styles.addButton} onPress={agregarPaso}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Lista de Ingredientes:</Text>
        <ScrollView style={styles.scrollContainer}>
          {ingredientes.map((ingrediente, index) => (
            <Text key={index} style={styles.item}>
              {ingrediente}
            </Text>
          ))}
        </ScrollView>

        <Text style={styles.label}>Lista de Pasos:</Text>
        <ScrollView style={styles.scrollContainer}>
          {pasos.map((paso, index) => (
            <Text key={index} style={styles.item}>
              {paso}
            </Text>
          ))}
        </ScrollView>
        <View style={styles.container_enviarText}>
          <TouchableOpacity>
            <Text onPress={enviarReceta} style={styles.enviarText}>
              <Image
                source={require("../../../assets/comida.png")} // Ajusta la ruta de la imagen según la ubicación de tu archivo de imagen
                style={styles.image}
              />{" "}
              GUARDAR RECETA
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text>{"          "}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "white",
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    marginRight: 10,
    padding: 10,
  },
  addButton: {
    backgroundColor: "green",
    padding: 10,
    justifyContent: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  scrollContainer: {
    height: 150,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
  },
  item: {
    marginBottom: 10,
  },
  recipeInput: {
    fontSize: 18, // Ajusta el tamaño de la fuente según sea necesario
    width: "100%", // Ajusta el ancho según sea necesario
    height: 40,
    borderWidth: 1,
    paddingLeft: 5,

  },
  container_enviarText: {
    marginTop: 10,
    backgroundColor: "#d82b59",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  enviarText: {
    color: "white",
    fontSize: 30,
    fontFamily: "Poppins",
  },
  image: {
    width: 40, // Ajusta el ancho de la imagen según tus necesidades
    height: 40, // Ajusta la altura de la imagen según tus necesidades
  },
});

export default Cart;
