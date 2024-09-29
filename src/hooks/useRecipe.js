import { useContext } from "react";
import { RecipesContext } from "../context/RecipeContext";

export const useRecipe = () => {
  const context = useContext(RecipesContext);
  return context;
};