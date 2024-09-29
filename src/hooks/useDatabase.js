import { useContext } from "react";
import { DbContext } from "../context/DbContext";

export const useDatabase = () => {
  const context = useContext(DbContext);
  return context;
};