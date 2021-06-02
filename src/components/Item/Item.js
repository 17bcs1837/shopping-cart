import React, {useEffect} from 'react';
import { products } from '../../data/products';

import './Item.css';
const Item = (props) => {
    useEffect(() => {
        if(!localStorage.getItem('cart')) {
            let newcart = products.map(pro => {
                pro.quantity = 1;
                return pro;
            })
            props.setCartState(newcart);
        } else {
            let productsLocal = JSON.parse(localStorage.getItem('cart'));
            props.setCartState(productsLocal);
        }
    }, []);

    useEffect(() => {
        let total = 0;
        let discount = 0;
        let typeDis = 0;
        props.cart.forEach(product => {
            let currPrice = (product.price*product.quantity);
            total += currPrice;
            discount += (product.discount*product.quantity);

            if(product.type === 'fiction') {
                let x = (0.15*product.price);
                typeDis += (x*product.quantity);
            }
        })
        props.setTotalPriceState(total);
        props.setDiscount(discount);
        props.setTypeDiscount(typeDis);
        localStorage.setItem('cart', JSON.stringify(props.cart));
    }, [props.cart, props.totalPrice]);

    const handleDelete = (product) => {
        let newCart = props.cart.filter(pro => {
            return pro.id !== product.id;
        })
        props.setCartState(newCart);
    }

    const handleDecrement = (product) => {
        let newCart = [...props.cart];
        let idx = newCart.findIndex((obj => obj.id === product.id));
        newCart[idx].quantity -= 1;

        if(newCart[idx].quantity <= 0) {
            newCart[idx].quantity = 1;
        }
        props.setCartState(newCart);

        // Discount
        if(product.discount !== 0) {
            props.setDiscount(props.discount-product.discount);
        }

        // Type Discount
        if(product.type === 'fiction') {
            let x = (0.15*product.price);
            props.setTypeDiscount(props.typeDiscount+x);
        }
    }

    const handleIncrement = (product) => {
        let newCart = [...props.cart];
        let idx = newCart.findIndex((obj => obj.id === product.id));
        newCart[idx].quantity += 1;
        props.setCartState(newCart);

        // Discount
        if(product.discount !== 0) {
            props.setDiscount(props.discount+product.discount);
        }

        // Type Discount
        if(product.type === 'fiction') {
            let x = (0.15*product.price);
            props.setTypeDiscount(props.typeDiscount+x);
        }
    }
    
    return props.cart.map(product => {
        return (
            <div className="item" key={product.id} id={product.id}>
                <div className="item-card">
                    <div className="item-name">
                        <img src={product.img_url} alt="img" />
                        <p className="item-title">{product.name}</p>
                    </div>
                    <div className="remove-icon">
                        <img id="image" onClick={() => handleDelete(product)} src="close.png" alt="item-pic" />
                    </div>
                </div>

                <div className="qty">
                    <div className="qty-align">
                        <img className="remove" onClick={() => handleDecrement(product)} src="remove.png" alt="remove-item" />
                        <input className="qty-num" type="text" value={product.quantity} readOnly/>
                        <img className="add-item" onClick={() => handleIncrement(product)} src="add.png" alt="add" />
                    </div>
                </div>

                <div className="price-container">
                    <p className="price">${product.price*product.quantity}</p>
                </div>
            </div>
            
        )
    })
}

export default Item;