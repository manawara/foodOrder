import { CartContextProvider } from "./store/CartContext.jsx";
import ModalContextProvider from "./store/ModalContext.jsx";
import React from "react";
import Header from "./components/Header/Header";
import Meal from "./components/Meal/Meal";
import Checkout from "./components/Checkout/Checkout.jsx";

function App() {
    return (
        <ModalContextProvider>
            <CartContextProvider>
                <Header title="reactfood" />
                <main>
                    <Meal />
                    <Checkout />
                </main>
            </CartContextProvider>
        </ModalContextProvider>
    );
}

export default App;
