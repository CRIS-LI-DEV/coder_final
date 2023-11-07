import React from "react";
import { Text } from "react-native";
import { connect } from "react-redux";

const UserComponent = ({ username }) => {
  return (
    <Text>
      {username
        ? `Tu nombre de usuario es: ${username}`
        : "Nombre de usuario no encontrado"}
    </Text>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.userReducer && state.userReducer.username, // Asegúrate de reemplazar 'userReducer' con el nombre real de tu reducer
  };
};

export default connect(mapStateToProps)(UserComponent);
