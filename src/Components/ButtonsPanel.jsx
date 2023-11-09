import {useCalculatorContext} from "./../CalculatorContextProvider";

export default function ButtonsPanel({ onClick }) {
  const { data } = useCalculatorContext();

  const buttons = data.buttons.map((button) => {
    return (
      <button
        key={button.name}
        id={button.name}
        value={button.value}
        className={button.class}
        onClick={onClick}
      >
        {button.value === '*' ? 'X' : button.value}
      </button>
    )
  })
  
  return (
    <div>
      {buttons}
    </div>
  );
}