import FormulaScreen from "./Components/FormulaScreen";
import OutputScreen from "./Components/OutputScreen";
import ButtonsPanel from "./Components/ButtonsPanel";
import { useCalculatorContext } from "./CalculatorContextProvider";

export default function Calculator() {
  const { formula, setFormula, output, setOutput } = useCalculatorContext();
  const OPERATORS = /[+\-*/]/;
  const DIGITS = /[0-9]/; 
  
  const lastChar = formula[formula.length - 1];
  const secondLastChar = formula[formula.length - 2];
  
  const formulaIsEmpty = formula === '';
  const isEqualsNotPresent = formula.search('=') == -1;

  const isDigits = (char) => {
    return DIGITS.test(char);
  }

  const isOperators = (char) => {
    return OPERATORS.test(char);
  }

  const handleButton = (event) => {
    const value = event.target.value;

    if (value === 'AC') {
      handleClear();
    } else if (isOperators(value)) {
      handleOperator(value);
    } else if (isDigits(value)) {
      handleDigit(value);
    } else if (value === '.') {
      handleDecimal();
    } else {
      handleEquals();
    }
  }

  const handleClear = () => {
    setFormula('');
    setOutput('');
  }

  const handleOperator = (operator) => {
    if (isEqualsNotPresent) {
      if (formulaIsEmpty && (operator === '/' || operator === '*')) {
        return;
      } else {
        setFormula(formula + operator);
        setOutput(operator);
        controlConsecutiveOpertors(operator);
      }
    } else {
      setFormula(output + operator);
      setOutput(operator);
    }
  }

  const handleDigit = (digit) => {
    if (isEqualsNotPresent) {
      if (formulaIsEmpty && digit === '0') {
        return;
      } else if (isOperators(lastChar)) {
        setFormula(formula + digit);
        setOutput(digit);
      } else if (isOperators(secondLastChar) && lastChar === '0') {
        const newFormula = formula.slice(0, -1) + digit;
        setFormula(newFormula);
        setOutput(digit);
      } else {
        setFormula(formula + digit);
        setOutput(output + digit);
      }
    } else {
      setFormula(digit);
      setOutput(digit);
    }
  }

  const handleDecimal = () => {
    const newFormula = formula.split(OPERATORS);
    const lastElement = newFormula[newFormula.length - 1];
    if (isEqualsNotPresent) {
      if (lastElement === '') {
        setFormula(formula + '0.');
        setOutput('0.');
      } 
      else if (!lastElement.includes('.')) {
        setFormula(formula + '.');
        setOutput(output + '.');
      }
    }
  }

  const handleEquals = () => {
    if (isEqualsNotPresent) {
      setFormula(formula + '=' + eval(formula));
      setOutput(eval(formula));
    } 
  }

  const controlConsecutiveOpertors = (operator) => {
    if (lastChar === '-' && isOperators(secondLastChar)) {
      const newFormula = formula.slice(0, -2) + operator;
      setFormula(newFormula);
    }
    else if (isOperators(lastChar) && operator != '-') {
        const newFormula = formula.slice(0, -1) + operator;
        setFormula(newFormula);
    }
  }

  return (
    <div className="calculator">
      <FormulaScreen />
      <OutputScreen />
      <ButtonsPanel onClick={handleButton}/>
    </div>
  );
}