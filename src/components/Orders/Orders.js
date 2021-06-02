import React, { useState } from 'react';

import Item from '../Item/Item';
import './Orders.css';
const Orders = () => {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [typeDiscount, setTypeDiscount] = useState(0);

    const setCartState = (cart) => {
        setCart(cart);
    }

    const setTotalPriceState = (total) => {
        setTotalPrice(total);
    }

    const handleCartReload = () => {
        localStorage.removeItem('cart');
        window.location.reload();
    }

    return (
        <div className="container">
            <div className="title-bar">
                    <div className="back-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                            <path d="M0 0h24v24H0V0z" fill="none"/>
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"/>
                        </svg>
                    </div>
                    <div className="title">
                        <h3>Order Summary</h3>
                    </div>
                </div>
            <div className="orders-container">
            <div>
                <hr />

                <div className="items-bar">
                    <p className="item-bar-a">Items(7)</p>
                    <p className="item-bar-b item-bar-align">Qty</p>
                    <p className="item-bar-c item-bar-align">Price</p>
                </div>

                < hr />

                <Item cart={cart} setCartState={setCartState} totalPrice={totalPrice}
                    setTotalPriceState={setTotalPriceState} setDiscount={setDiscount} discount={discount} 
                    typeDiscount={typeDiscount} setTypeDiscount={setTypeDiscount} />
            </div>
            
                <div className="final-cart">
                    <div className="pre-total">
                        <div className="cart-title title-align">
                            Total
                        </div>
                        <div className="item-total-qty">
                            <div className="item-total-title title-align">
                                Item({cart.length})
                            </div>
                            <div className="cart-final colon">
                                :
                            </div>
                            <div className="cart-final">
                                ${totalPrice}
                            </div>
                        </div>
                        <div className="discount-section">
                            <div className="discount-one">
                                <div className="item-total-title title-align">
                                    Discount
                                </div>
                                <div className="cart-final colon">
                                    :
                                </div>
                                <div className="cart-final">
                                    -${discount}
                                </div>
                            </div>
                            <div className="discount-two">
                                <div className="item-total-title title-align">
                                    Type Discount
                                </div>
                                <div className="cart-final colon">
                                    :
                                </div>
                                <div className="cart-final">
                                    -${typeDiscount}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="order-total">
                        <div className="payout-title title-align">
                                Order Total
                        </div>
                        <div className="payout-total">
                            ${totalPrice-discount-typeDiscount}
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={handleCartReload}>Reload Cart</button>
        </div>
    )
}

export default Orders;