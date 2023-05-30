import { useReducer, createContext } from "react";


export const Store = createContext()

const initialstate = {
    cart : {
        cartitems : [],
    }
}

export const reducer = (state,action) => {
    switch(action.type){
        case "ADD_TO_CART":
            const newitem = action.payload
            const existitem = state.cart.cartitems.find((item)=>item.slug==newitem.slug)

            const cartitems = existitem
            //if it does exist
            ?state.cart.cartitems.map((item)=>item.slug==existitem.slug?newitem:item)
            //if doesnt exist
            :[...state.cart.cartitems, newitem]
            
            return {...state, cart: {...state.cart, cartitems}}

            case "DELETE_FROM_CART":
                const deletedItem = action.payload;
                const updatedCartItems = state.cart.cartitems.filter(
                  (item) => item.slug !== deletedItem.slug
                );
                return { ...state, cart: { ...state.cart, cartitems: updatedCartItems } };

    default : 
        return state
            
    }
}

export function Storeprovider({children}){
    const [state, dispatch] = useReducer(reducer,initialstate)
    

    return(
        <Store.Provider value={{state,dispatch}}>{children}</Store.Provider>
    )
}