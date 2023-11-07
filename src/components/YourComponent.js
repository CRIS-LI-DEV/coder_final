import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';

const YourComponent = () => {
  useEffect(() => {
    const getUserName = async () => {
      try {
        const userName = await AsyncStorage.getItem('userName');
        if (userName !== null) {
          // El nombre de usuario existe en el almacenamiento
          console.log('Nombre de usuario:', userName);
        } else {
          // El nombre de usuario no existe en el almacenamiento
          console.log('No se ha encontrado ningún nombre de usuario en el almacenamiento.');
        }
      } catch (e) {
        // Manejo de errores
        console.error('Error al recuperar el nombre de usuario:', e);
      }
    };
    getUserName();
  }, []); // Asegúrate de pasar una matriz vacía como segundo argumento para que useEffect se ejecute solo una vez

  // Resto de tu código de componente

  return (
<View></View>
  );
};

export default YourComponent;
