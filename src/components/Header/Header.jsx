import { Text, View } from 'react-native'
import { useEffect ,useState} from 'react'
import Feather from '@expo/vector-icons/Feather'
import React from 'react'
import { clearUser } from '../../features/auth/authSlice'
import { deleteSession } from '../../db'
import styles from './Header.style'
import { useDispatch } from 'react-redux'
import userReducer from '../../features/userReducer.js'; // Importa el reducer
import UserComponent from '../userComponent.js'; // Importa el componente
import store from '../../store/index.js'
const Header = ({ title }) => {
  const [data, setData] = useState(null);

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
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(clearUser())
    deleteSession()
  }
  console.log('\n')

  return (
    <View style={{ backgroundColor: "#f6b200" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          marginTop: 30,
        }}
      >
        <Text style={styles.text}>{title}</Text>
        <View
          style={{ backgroundColor: "#ff8a00", padding: 5, borderRadius: 25 }}
        >
          <Feather
            style={{ margin: 4, color: "white" }}
            name="log-out"
            size={24}
            onPress={logout}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          marginLeft: 16,
        }}
      >
        <Text
          style={{
            marginBottom: 4,
            color: "white",
            backgroundColor: "#ff8a00",
            borderRadius: 50,
            paddingHorizontal: 5,
          }}
        >
          {" "}
          Hola {data ? data : "Cargando..."}
        </Text>
      </View>
    </View>
  );
}

export default Header
