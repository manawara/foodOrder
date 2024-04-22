import React, { createContext, useCallback, useEffect, useState } from "react";

export const ModalContext = createContext({
    statusUser: "",
    showCart: () => {},
    hideCart: () => {},
    showCheckout: () => {},
    hideCheckout: () => {},
});

const ModalContextProvider = ({ children }) => {
    const [statusUser, setStatusUser] = useState("");
    const showCart = () => {
        setStatusUser("cart");
    };
    const hideCart = () => {
        setStatusUser("");
    };
    const showCheckout = () => {
        setStatusUser("checkout");
    };
    const hideCheckout = () => {
        setStatusUser("");
    };
    const showAddMeal = useCallback(() => {
        setStatusUser("meal");
    }, [statusUser]);
    const hideAddMeal = () => {
        setStatusUser("");
    };
    useEffect(() => {
        let timer;
        if (statusUser === "meal") {
            timer = setTimeout(() => {
                setStatusUser("");
            }, 2000);
        } else {
            return;
        }

        return () => {
            clearTimeout(timer);
        };
    }, [showAddMeal]);

    return (
        <ModalContext.Provider
            value={{ statusUser, showCart, hideCart, showCheckout, hideCheckout, showAddMeal, hideAddMeal }}
        >
            {children}
        </ModalContext.Provider>
    );
};

export default ModalContextProvider;
