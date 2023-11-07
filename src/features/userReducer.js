// userReducer.js

const initialState = {
  username: "usuarioEjemplo",
  // otros campos de usuario si los hay
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // casos de acciones si los hay
    default:
      return state;
  }
};

export default userReducer;
