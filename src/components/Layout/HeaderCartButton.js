import classes from './HeaderCartButton.module.css'
import CartIcon from '../Cart/CartIcon'
import { useContext, useState, useEffect } from 'react'
import CartContext from '../../store/cart-context'


const HeaderCartButton=(props)=>{
    const [btnIsHighlightd,setBntHighlight]=useState(false);
    const cartCtx=useContext(CartContext);
    const numberOfItemCart=cartCtx.items.reduce((currNumber,item)=>{
        return currNumber + item.amount;
    },0);

    const btnClasses=`${classes.button} ${btnIsHighlightd ? classes.bump : ''}`;

    const {items}=cartCtx;
    useEffect(()=>{
        if(items.length===0) return;
        setBntHighlight(true);
        const timer=setTimeout(()=>{
            setBntHighlight(false);
        },300);
        return ()=>{
            clearTimeout(timer);
        };
    },[items]);

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfItemCart}</span>
        </button>
    )
}
export default HeaderCartButton;