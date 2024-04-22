import React, { useContext } from "react";
import Modal from "../Modal/Modal";
import Button, { ButtonRounded } from "../Button/Button";
import "./Cart.scss";
import CartItem from "./CartItem";
import { CartContext } from "../../store/CartContext";
import { ModalContext } from "../../store/ModalContext";
const Cart = ({ isOpen, onClose }) => {
    const ctxCart = useContext(CartContext);
    const ctxCartModal = useContext(ModalContext);

    const meals = ctxCart.items;
    const handleClickCheckout = () => {
        ctxCartModal.showCheckout();
    };

    const handleClickCloseCart = () => {
        ctxCartModal.hideCart();
    };

    const totalPrice = ctxCart.items.reduce((totalPrice, nextPrice) => {
        return +totalPrice + +nextPrice.price * nextPrice.quantity;
    }, 0);
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <div className="cart">
                    <h3>Your Cart</h3>
                    <ul className="cart__list">
                        {meals && meals.length === 0 && <p>No add items...</p>}
                        {meals &&
                            meals.map((item) => (
                                <CartItem
                                    key={item.id}
                                    name={item.name}
                                    total={item.quantity}
                                    onDecrement={() => ctxCart.removeMeal(item.id)}
                                    onIncrease={() => ctxCart.addMeal(item)}
                                />
                            ))}
                    </ul>
                    <div className="cart__price">${totalPrice.toFixed(2)}</div>
                    <div className="cart__buttons">
                        <div>
                            <Button type="button" isFill onAdd={handleClickCloseCart}>
                                close
                            </Button>
                        </div>
                        <div>
                            <Button type="button" onAdd={handleClickCheckout}>
                                go to checkout
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Cart;
