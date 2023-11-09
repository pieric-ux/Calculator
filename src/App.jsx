import './App.css';
import CalculatorContextProvider from './CalculatorContextProvider';
import Calculator from './Calculator';

export default function App() {
  return (
    <CalculatorContextProvider>
      <Calculator />
    </CalculatorContextProvider>
  );
}
