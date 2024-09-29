import { useContext } from "react";
import { DbContext } from "../context/DbContext";

export const useDatabase = () => {
  const context = useContext(DbContext);

  if (context === undefined) {
    throw new Error("useDatabase must be used within a DbProvider");
  }

  return context;
};