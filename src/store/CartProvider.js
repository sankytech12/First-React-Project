import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState={
    items:[],
    totalAmount:0
};

const cartReducer=(state,action)=>{
    if(action.type==='ADD'){
        const updatedTotalAmount=state.totalAmount + action.item.price * action.item.amount;
        const exitingCartItemIndex=state.items.findIndex((item)=>item.id===action.item.id);
        const existingItem=state.items[exitingCartItemIndex];
        let updatedItems;
        if(existingItem){
            const udpatedItem={
                ...existingItem,
                amount:existingItem.amount+action.item.amount
            };
            updatedItems=[...state.items];
            updatedItems[exitingCartItemIndex]=udpatedItem;
        }else{
            updatedItems=state.items.concat(action.item);
        }
        
        return{
            items:updatedItems,
            totalAmount:updatedTotalAmount
        };
    }
    if(action.type==='REMOVE'){
        const existingItemIndex=state.items.findIndex((item)=> item.id===action.id);
        const existingItem=state.items[existingItemIndex];
        const updateTotalAmount=state.totalAmount-existingItem.price;
        let updatedItems;
        if(existingItem.amount===1){
            updatedItems=state.items.filter((item)=> item.id!==action.id);
        }else{
            const updateItem={...existingItem, amount:existingItem.amount-1};
            updatedItems=[...state.items];
            updatedItems[existingItemIndex]=updateItem;
        }

        return {
            items:updatedItems,
            totalAmount:updateTotalAmount
        };
    }
    return defaultCartState;
};

const CartProvider=props=>{

    const [cartSate,dispatchCartAction]=useReducer(cartReducer,defaultCartState);

    const addItemHandler=(item)=>{
        dispatchCartAction({type:'ADD',item:item})
    };
    const removeItemHandler=(id)=>{
        dispatchCartAction({type:'REMOVE',id:id})
    };
    const cartContext={
        items:cartSate.items,
        totalAmount:cartSate.totalAmount,
        addItem:addItemHandler,
        removeItem:removeItemHandler,
    }
    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider;
