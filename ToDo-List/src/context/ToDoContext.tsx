import { createContext } from "react";
import type { ContextType } from "./types";

export const ToDoContext = createContext<ContextType| null>(null)