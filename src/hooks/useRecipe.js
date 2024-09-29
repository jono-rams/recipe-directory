import { useContext } from "react";
import { RecipesContext } from "../context/RecipeContext";

export const useRecipe = () => {
  const context = useContext(RecipesContext);

  if (context === undefined) {
    throw new Error("useRecipe must be used within a RecipeProvider");
  }

  return context;
};