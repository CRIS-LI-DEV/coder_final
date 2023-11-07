import * as React from "react";
import { Text, View,Button, FlatList, Image, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import personas from "./data.js";


const RenderItem = ({ item }) => (
  <View style={styles.item}>
    <View style={styles.profileContainer}>
      <Image source={{ uri: item.fotoPerfil }} style={styles.profileImage} />
      <View style={styles.profileTextContainer}>
        <Text style={styles.text}>
          Nombre: {item.nombre} {item.apellido}
        </Text>
        <Text style={styles.text}>Dirección: {item.direccion}</Text>
        <Text style={styles.text}>Email: {item.email}</Text>
        <Button
          title="Enviar mensaje"
          onPress={() => {
            Alert.alert("Mensaje enviado", `Mensaje enviado a ${item.nombre}`);
          }}
        />
      </View>
    </View>
    <Text style={styles.text}>Hobbies:</Text>
    <View style={styles.hobbiesContainer}>
      {item.hobbies.map((hobby, index) => (
        <Text style={styles.hobby} key={index}>
          {hobby}
        </Text>
      ))}
    </View>
  </View>
);

function HomeScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={personas}
        renderItem={({ item }) => <RenderItem item={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    backgroundColor: "#f9c2ff",
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
});
