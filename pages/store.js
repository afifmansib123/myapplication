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
            ?state.cart.cartitems.map((item)=>item.name==existitem.name?newitem:item)
            //if doesnt exist
            :[...state.cart.cartitems, newitem]
            
            return {...state, cart: {...state.cart, cartitems}}
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