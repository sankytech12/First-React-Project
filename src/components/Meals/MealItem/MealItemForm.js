import classes from './MealItemForm.module.css'
import Input from '../../UI/Input';
import { useRef,useState } from 'react';

const MealItemForm =props=>{
    const [amountIsValid,setAmountValid]=useState(true);
    const amountInputRef=useRef();
    const submitHandler=event=>{
        event.preventDefault();
        const enteredAmount=amountInputRef.current.value;
        const enteredAmountNum=+enteredAmount;
        console.log(enteredAmount.trim.length);
        if( enteredAmountNum<1 || enteredAmountNum>5){
            setAmountValid(false);
            return;
        }
        props.onAddToCart(enteredAmountNum);
    }
    return(
        <form className={classes.form} onSubmit={submitHandler}>
            <Input ref={amountInputRef} label='Amount' input={{
                id: 'amount_' + props.id ,
                type:'number',
                step:'1',
                min:'1',
                max:'10',
                defaultValue:'1',
            }} />
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter valid number of items [1-5].</p>}
        </form>
    )
}

export default MealItemForm;