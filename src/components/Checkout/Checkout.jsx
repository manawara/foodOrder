import React, { useContext } from "react";
import { ModalContext } from "../../store/ModalContext";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { CartContext } from "../../store/CartContext";
import "./Checkout.scss";
import useHttp from "../../hooks/useHttp";
import ErrorMessage from "../Error/Error";
const requestConfig = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
};

const Checkout = () => {
    const ctxCartCheckout = useContext(ModalContext);
    const ctxCart = useContext(CartContext);
    const { data, error, sendRequest, clearData } = useHttp("http://localhost:3000/orders", requestConfig);
    const totalPrice = ctxCart.items.reduce((totalPrice, nextPrice) => {
        return +totalPrice + +nextPrice.price * nextPrice.quantity;
    }, 0);

    const handleSubmit = (e) => {
        e.preventDefault();

        const fd = new FormData(e.target);
        const cd = Object.fromEntries(fd.entries()); // { email: test@example.com }

        sendRequest(
            JSON.stringify({
                order: {
                    items: ctxCart.items,
                    customer: cd,
                },
            })
        );
    };

    const handleFinish = () => {
        ctxCartCheckout.hideCheckout();
        ctxCart.clearMeal();
        clearData();
    };
    console.log(data && !error);
    if (data && !error) {
        return (
            <Modal isOpen={ctxCartCheckout.statusUser === "checkout"} onClose={handleFinish}>
                <div className="checkout">
                    <h2>Success!</h2>
                    <p>Your order was submitted successfully.</p>
                    <p>We will get back to you with more details via email within the next few minutes.</p>
                </div>
                <div>
                    <Button type="button" onAdd={handleFinish}>
                        Ok
                    </Button>
                </div>
            </Modal>
        );
    }
    return (
        <Modal isOpen={ctxCartCheckout.statusUser === "checkout"}>
            <div className="checkout">
                <h3>Checkout</h3>
                <p>Total Amount: $ {totalPrice}</p>
                <form onSubmit={handleSubmit}>
                    <div className="checkout__input">
                        <Input label="Full name" id="name" type="text" />
                    </div>
                    <div className="checkout__input">
                        <Input label="Email address" id="email" type="email" />
                    </div>
                    <div className="checkout__input">
                        <Input label="Street" id="street" type="text" />
                    </div>

                    <div className="checkout__columns">
                        <div className="checkout__input">
                            <Input label="Postal Code" id="postal-code" type="text" />
                        </div>
                        <div className="checkout__input">
                            <Input label="City" id="city" type="text" />
                        </div>
                    </div>
                    <div className="checkout__action">
                        <Button isFill>close</Button>

                        <Button type="submit">submit order</Button>
                    </div>
                </form>
                {error && <ErrorMessage title="Failed add order." message={error} />}
            </div>
        </Modal>
    );
};

export default Checkout;
