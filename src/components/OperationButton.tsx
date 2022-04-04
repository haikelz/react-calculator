import { Actions } from '../App'; 

const OperationButton = ({dispatch, operation} : {dispatch: any, operation: any}) => {
          return (
        <>
          <button onClick={() => dispatch(
          {type: Actions.Choose_Operation, payload: {operation}
          })}>
          {operation}
          </button>
        </>
      )
    }


export default OperationButton; 
