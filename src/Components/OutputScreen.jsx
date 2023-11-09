import { useEffect } from "react";
import { useCalculatorContext } from "./../CalculatorContextProvider";

export default function OutputScreen() {
  const { output } = useCalculatorContext();
  
  return (
    <div className="outputScreen" id="display">
      {output === '' ? '0' : output}
    </div>
  );
}