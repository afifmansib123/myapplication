import { useReducer, createContext } from "react";
import Cookies from "js-cookie";


export const Store = createContext()

const initialstate = {
    cart : Cookies.get('cart')? JSON.parse(Cookies.get('cart')):
    {cartitems: [], shippingadress: {}}
}

export const reducer = (state,action) => {
    switch(action.type){
        case "ADD_TO_CART":
            const newitem = action.payload
            const existitem = state.cart.cartitems.find((item)=>item.slug==newitem.slug)   ///we find only here, dont add

            const cartitems = existitem
            //if it does exist 
            ?state.cart.cartitems.map((item)=>item.slug==existitem.slug?newitem:item)    //we add now
            //if doesnt exist
            :[...state.cart.cartitems, newitem]
            
            Cookies.set('cart', JSON.stringify({...state.cart, cartitems}))
            return {...state, cart: {...state.cart, cartitems}}

            case "DELETE_FROM_CART":
                const deletedItem = action.payload;
                const updatedCartItems = state.cart.cartitems.filter(
                  (item) => item.slug !== deletedItem.slug
                );
                Cookies.set('cart', JSON.stringify({ ...state.cart, cartitems: updatedCartItems }))
                return { ...state, cart: { ...state.cart, cartitems: updatedCartItems } };
            case "CART_CLEAR_ITEMS":
                return { ...state, cart: { ...state.cart, cartitems: [] } };
            case "CART_RESET":
                return{
                    ...state,
                    cart : {
                        cartitems: [],
                        shippingadress : {location: {}},
                        paymentMethod : '', 

                    }
                }
            case "SAVE_ADRESS":
                return{
                    ...state,
                    cart: {
                        ...state.cart,
                        shippingadress: {
                            ...state.cart.shippingadress,
                            ...action.payload
                        }
                    }
                }
                case "SAVE_PAYMENT_METHOD":
                    return{
                        ...state,
                        cart: {
                            ...state.cart,
                            paymentMethod: action.payload
                        }
                    }

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