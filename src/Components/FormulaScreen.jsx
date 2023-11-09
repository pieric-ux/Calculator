import { useEffect } from "react";
import { useCalculatorContext } from "./../CalculatorContextProvider";

export default function FormulaScreen() {
  const { formula } = useCalculatorContext();
  
  return (
    <div className="formulaScreen">
      {formula}
    </div>
  );
}