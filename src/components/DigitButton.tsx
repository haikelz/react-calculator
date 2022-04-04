import { Actions } from '../App'; 

const Button = ({dispatch, digit} : {dispatch: any, digit: any}) => {
          return (
        <>
          <button onClick={() => dispatch({type: Actions.Add_Digit, payload: {digit}})}>{digit}</button>
        </>
      )
    }


export default Button; 
