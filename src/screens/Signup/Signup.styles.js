import { StyleSheet } from 'react-native'
import { colors } from '../../constants/colors'

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1DD34",
  },
  loginContainer: {
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  inputEmail: {
    width: "95%",
    backgroundColor: "white",
    height: 30,
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#F15D02",
    borderWidth: 2,
    borderRadius: 50,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: "#F15D02",
    width: "50%",
    height: 50,
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  email: {
    width: "95%",
  },
  image: {
    width: 100,
    height: 100,
  },
});
