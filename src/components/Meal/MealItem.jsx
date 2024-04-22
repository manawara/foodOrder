import "./MealItem.scss";
import { useContext } from "react";

import Button from "../Button/Button.jsx";
import { CartContext } from "../../store/CartContext.jsx";
import { ModalContext } from "../../store/ModalContext.jsx";
const MealItem = ({ data }) => {
    const { image, name, price, description } = data;
    const ctxCart = useContext(CartContext);
    const ctxModal = useContext(ModalContext);
    const handleAddMeal = () => {
        ctxCart.addMeal(data);
        ctxModal.showAddMeal();
    };

    return (
        <div className="meal-item">
            <img className="meal-item__image" src={"http://localhost:3000/" + image} alt={name} />
            <div className="meal-item__content">
                <h2 className="meal-item__title">{name}</h2>
                <div className="meal-item__price">$ {price}</div>
                <p className="meal-item__description">{description}</p>
                <Button type="button" onAdd={handleAddMeal}>
                    Add to Cart
                </Button>
            </div>
        </div>
    );
};

export default MealItem;
