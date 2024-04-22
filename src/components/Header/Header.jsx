import { useState, useContext } from "react";
import "./Header.scss";
import logo from "../../assets/logo.jpg";
import Cart from "../Cart/Cart.jsx";
import { CartContext } from "../../store/CartContext.jsx";
import { ModalContext } from "../../store/ModalContext.jsx";

const Header = ({ title }) => {
    const ctxCart = useContext(CartContext);
    const ctxCartModal = useContext(ModalContext);
    const cartQuantity = ctxCart.items.reduce((prevCart, nextCart) => {
        return prevCart + nextCart.quantity;
    }, 0);
    const handleClickShowCart = () => {
        ctxCartModal.showCart();
    };

    return (
        <>
            <header className="header">
                <div className="header__logo">
                    <img src={logo} alt="" />
                    <h1 className="header__logo-title">{title}</h1>
                </div>
                <button type="button" className="header__cart-button" onClick={handleClickShowCart}>
                    Cart ({cartQuantity})
                </button>
            </header>
            <Cart isOpen={ctxCartModal.statusUser === "cart"} />
        </>
    );
};

export default Header;
