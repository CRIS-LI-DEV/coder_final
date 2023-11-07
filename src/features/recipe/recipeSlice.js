import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipes: [],
};

export const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    addRecipe: (state, action) => {
      state.recipes.push(action.payload);
    },
    deleteRecipe: (state, action) => {
      const index = state.recipes.findIndex(
        (recipe) => recipe.id === action.payload
      );
      if (index !== -1) {
        state.recipes.splice(index, 1);
      }
    },
  },
});

export const { addRecipe, deleteRecipe } = recipeSlice.actions;

export default recipeSlice.reducer;
