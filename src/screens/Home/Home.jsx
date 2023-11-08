import { FlatList,Modal, SafeAreaView, StatusBar, View,Text, StyleSheet ,Button, Image,TouchableOpacity} from 'react-native'
import recetas from '../../../data'
import { CategoryItem } from './components'
import { Header } from '../../components'
import React from 'react'
import { useState } from 'react'
// import styles from './Home.style'
import { useGetCategoriesQuery } from '../../services/shopApi'
import { useGetRecipesQuery } from "../../services/recipeApi";
import { useEffect } from 'react'
const RenderItem = ({ item }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.item}>
      <Text style={styles.title}>
        {" "}
        <Image
          source={require("../../../assets/comida.png")} // Ajusta la ruta de la imagen según la ubicación de tu archivo de imagen
          style={styles.image}
        />{" "}
        {item.nombre}
      </Text>

      {/* ... (otros componentes de la receta) */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.buttonText}>Ver detalle</Text>
      </TouchableOpacity>
      <Text style={[styles.title, {}]}>
        <Image
          source={require("../../../assets/cocinero.png")} // Ajusta la ruta de la imagen según la ubicación de tu archivo de imagen
          style={styles.image}
        />{" "}
        {item.usuario}
      </Text>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={[styles.centeredView, {}]}>
          <View style={styles.modalView}>
            <View style={styles.item}>
              <Text style={[styles.title, { fontSize: 30 }]}>
                <Image
                  source={require("../../../assets/comida.png")} // Ajusta la ruta de la imagen según la ubicación de tu archivo de imagen
                  style={styles.image}
                />{" "}
                {item.nombre}
              </Text>
              <Text style={[styles.title, { fontSize: 20,marginBottom:10 }]}>
                <Image
                  source={require("../../../assets/cocinero.png")} // Ajusta la ruta de la imagen según la ubicación de tu archivo de imagen
                  style={styles.image}
                />{" "}
                {item.usuario}
              </Text>
              <Text style={[styles.title, { fontSize: 15 }]}>
                Ingredientes:
              </Text>
              <View
                style={{
                  borderRadius: 25,
                  alignItems: "center",
                  borderColor: "#F15D02",
                  borderWidth: 3,
                  backgroundColor: "white",
                }}
              >
                {item.ingredientes.map((ingrediente, index) => (
                  <View style={styles.caja_text_ing}>
                    <Text style={styles.ingredient} key={index}>
                      - {ingrediente}
                    </Text>
                  </View>
                ))}
              </View>
              <Text style={[styles.title, { fontSize: 15 }]}>Pasos:</Text>
              <Text style={styles.step}>{"    "} </Text>
              <View
                style={{
                  borderRadius: 25,
                  alignItems: "center",
                  borderColor: "#F15D02",
                  borderWidth: 3,
                  backgroundColor: "white",
                }}
              >
                {item.pasos.map((paso, index) => (
                  <View style={styles.caja_text_ing}>
                    <Text style={styles.step} key={index}>
                      - {paso}
                    </Text>
                    <Text style={styles.step}>{"    "} </Text>
                  </View>
                ))}
              </View>
            </View>
            {/* ... (otros detalles de la receta) */}

            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 25,
                  alignItems: "center",
                  borderColor: "#F15D02",
                  borderWidth: 3,
                }}
              >
                <Text
                  style={{
                    fontSize: 25,
                    color: "#F15D02",
                    fontFamily: "Poppins",
                  }}
                >
                  Cerrar
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const Home = ({ navigation }) => {
  const { data, isLoading, refetch } = useGetRecipesQuery(); // Agrega 'refetch' para volver a obtener los datos
  const [update, setUpdate] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
 
  useEffect(() => {
    const interval = setInterval(() => {
      setUpdate((prev) => !prev);
    }, 1000); // Establece el intervalo de actualización en 5 segundos (5000 milisegundos)

    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonte o vuelva a renderizarse
  }, []);


 

  useEffect(() => {
    // Aquí puedes agregar la lógica para actualizar tus datos
    // Por ejemplo, volver a obtener los datos cuando 'update' cambie
    if (!isLoading) {
      refetch(); // Vuelve a obtener los datos cuando 'update' cambie
    }
  }, [update, isLoading, refetch]); // Asegúrate de pasar 'update', 'isLoading' y 'refetch' en la matriz de dependencias

  
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }
  const handleUpdate = () => {
    setUpdate((prev) => !prev);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} barStyle={"dark-content"} />
      <Header title={"Recetas"} />

      <View style={styles.listContainer}>
        <FlatList
          data={Object.values(data)}
          renderItem={({ item }) => <RenderItem item={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    backgroundColor: "#FACF7A",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  hobbiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  hobby: {
    marginRight: 5,
    marginBottom: 5,
    backgroundColor: "#a8d8ea",
    padding: 5,
    borderRadius: 5,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileTextContainer: {
    flex: 1,
  },
  caja_text_ing: {
   
  },
  listContainer: {
    backgroundColor: "white",
  },
  image: {
    width: 20, // Ajusta el ancho de la imagen según tus necesidades
    height: 20, // Ajusta la altura de la imagen según tus necesidades
  },
  title: {
    color: "white",

    fontWeight: "bold",
    textShadowColor: "black",
    textShadowColor: "rgba(0, 0, 0, 0.3)", // Ajusta el color de la sombra según tus preferencias
    textShadowOffset: { width: 2, height: 2 }, // Ajusta el desplazamiento de la sombra en x e y según tus necesidades
    textShadowRadius: 5, // Ajusta
    fontSize: 20,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#F15D02",
    padding: 10,
    marginTop: 16,
    borderRadius:50
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontFamily: "Poppins"
  },
});

export default Home
