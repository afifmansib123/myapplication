import { useContext } from "react";
import { Store } from "./store";
import Layout from "@/components/Layout";
import Link from "next/link";
import Image from "next/image";

export default function Cartscreen () {
    const {state, dispatch} = useContext(Store)

    const {cart: {cartitems}} = state

    console.log('putkimari')
    console.log(JSON.stringify(cartitems))
}