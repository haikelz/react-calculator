import { useReducer } from "react";
import DigitButton from "./components/DigitButton";
import OperationButton from "./components/OperationButton";

export const Actions = {
  Add_Digit: "add-digit",
  Choose_Operation: "choose-operation",
  Delete_Digit: "delete-digit",
  Clear: "clear",
  Evaluate: "evaluate",
};

function reducer(state: any, { type, payload }: { type: any; payload?: any }) {
  switch (type) {
    case Actions.Add_Digit:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      }

      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };

    case Actions.Choose_Operation:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };

    case Actions.Clear:
      return {};

    case Actions.Delete_Digit:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }

      if (state.currentOperannd == null) {
        return state;
      }

      if (state.Operand.length === 1) {
        return {
          ...state,
          currentOperand: null,
        };
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };

    case Actions.Evaluate:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };
  }
}

const evaluate = ({
  currentOperand,
  previousOperand,
  operation,
}: {
  currentOperand: any;
  previousOperand: any;
  operation: any;
}) => {
  const previous = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(previous) || isNaN(current)) {
    return "";
  }

  let computation: string | number = "";

  switch (operation) {
    case "+":
      computation = previous + current;
      break;

    case "-":
      computation = previous - current;
      break;

    case "*":
      computation = previous * current;
      break;

    case "÷":
      computation = previous / current;
      break;
  }

  return computation.toString();
};

const Integer_Formatter = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

const formatOperand = (operand: any) => {
  if (operand == null) {
    return;
  }

  const [integer, decimal] = operand.split(".");

  if (decimal == null) {
    return Integer_Formatter.format(integer);
  }

  return `${Integer_Formatter.format(integer)}.${decimal}`;
};

const App = () => {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {formatOperand(previousOperand)} {operation}
        </div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>

      <button
        className="span-two"
        onClick={() => dispatch({ type: Actions.Clear })}
      >
        AC
      </button>

      <button onClick={() => dispatch({ type: Actions.Delete_Digit })}>
        DEL
      </button>

      <OperationButton operation={":"} dispatch={dispatch} />

      <DigitButton digit={"1"} dispatch={dispatch} />
      <DigitButton digit={"2"} dispatch={dispatch} />
      <DigitButton digit={"3"} dispatch={dispatch} />

      <OperationButton operation={"*"} dispatch={dispatch} />

      <DigitButton digit={"4"} dispatch={dispatch} />
      <DigitButton digit={"5"} dispatch={dispatch} />
      <DigitButton digit={"6"} dispatch={dispatch} />

      <OperationButton operation={"+"} dispatch={dispatch} />

      <DigitButton digit={"7"} dispatch={dispatch} />
      <DigitButton digit={"8"} dispatch={dispatch} />
      <DigitButton digit={"9"} dispatch={dispatch} />

      <OperationButton operation={"-"} dispatch={dispatch} />

      <DigitButton digit={"."} dispatch={dispatch} />
      <DigitButton digit={"0"} dispatch={dispatch} />

      <button
        className="span-two"
        onClick={() => dispatch({ type: Actions.Evaluate })}
      >
        =
      </button>
    </div>
  );
};

export default App;
