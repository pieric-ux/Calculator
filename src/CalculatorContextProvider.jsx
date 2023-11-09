import { createContext, useContext, useState } from "react";
import data from "./Buttons.json";

const CalculatorContext = createContext();

export default function CalulatorContextProvider ({ children }) {
  const [formula, setFormula] = useState('');
  const [output, setOutput] = useState('');
  
  return (
    <CalculatorContext.Provider 
      value={
        { 
          data, 
          formula, 
          setFormula, 
          output, 
          setOutput 
        }
      }
    >
      {children}
    </CalculatorContext.Provider>
  );
};

export function useCalculatorContext() {
  return useContext(CalculatorContext);
};