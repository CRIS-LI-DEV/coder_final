import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { baseUrl } from "../firebase";

export const recipeApi = createApi({
  reducerPath: "recipeApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getRecipes: builder.query({
      query: () => "recipes.json",
    }),
    getRecipeById: builder.query({
      query: (id) => `recipes/${id}.json`,
    }),
    postRecipe: builder.mutation({
      query: (recipe) => ({
        url: "recipes.json",
        method: "POST",
        body: recipe,
      }),
    }),
    updateRecipe: builder.mutation({
      query: ({ id, ...changes }) => ({
        url: `recipes/${id}.json`,
        method: "PATCH",
        body: changes,
      }),
    }),
    deleteRecipe: builder.mutation({
      query: (id) => ({
        url: `recipes/${id}.json`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useGetRecipeByIdQuery,
  usePostRecipeMutation,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
} = recipeApi;
