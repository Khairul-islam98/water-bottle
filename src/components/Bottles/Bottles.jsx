import { useEffect } from "react";
import { useState } from "react";
import { addToLS, getStoreCart, removeFromLS } from "../../utilities/localstorage";
import Bottle from "../Bottle/Bottle";
import Cart from "../Cart/Cart";
import './Bottles.css'

const Bottles = () => {
    const [bottles, setBottles] = useState([])
    const [cart, setCart] = useState([])
    useEffect(() => {
        fetch('bottles.json')
        .then(res => res.json())
        .then(data => setBottles(data))
    },[])

    useEffect(()=> {
        if(bottles.length){
            const storeCart = getStoreCart()
            const savedCart = []
            for(const id of storeCart){
                const bottle = bottles.find(bottle => bottle.id === id)
                if(bottle){
                    savedCart.push(bottle)
                }
            }
            setCart(savedCart)
        }

    },[bottles])

    const handleAddToCart = bottle => {
        const newCart = [...cart, bottle]
        setCart(newCart)
        addToLS(bottle.id)
    }

    const handleRemoveFromCart = id => {
        // visual cart remove
        const remainingCart = cart.filter(bottle => bottle.id !== id)
        setCart(remainingCart)
        // remove from Ls
        removeFromLS(id)
    }

    return (
        <div>
            <h2>Bootles Available: {bottles.length}</h2>
            <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart}></Cart>
            <div className="bottle-container">
            {
                bottles.map(bottle =><Bottle key={bottle.id} bottle={bottle} handleAddToCart={handleAddToCart}></Bottle>)
            }
            </div>
        </div>
    );
};

export default Bottles;