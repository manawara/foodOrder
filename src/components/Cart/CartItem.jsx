import React from "react";
import { ButtonRounded } from "../Button/Button";

const CartItem = ({ name, total, onIncrease, onDecrement }) => {
    console.log(onIncrease);
    return (
        <li className="cart__item">
            <div className="cart__list-content">
                <div className="cart__list-name">{name}</div>
                <div className="cart__list-action">
                    <ButtonRounded onAdd={onDecrement}>-</ButtonRounded>
                    <span>{total}</span>
                    <ButtonRounded onAdd={onIncrease}>+</ButtonRounded>
                </div>
            </div>
        </li>
    );
};

export default CartItem;
