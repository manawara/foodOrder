import React, { useEffect, useState, useContext } from "react";
import MealItem from "./MealItem";
import "./Meal.scss";
import Loader from "../Loader/Loader";
import useHttp from "../../hooks/useHttp";
import ErrorMessage from "../Error/Error";
import { ModalContext } from "../../store/ModalContext";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
const cfg = {};
const Meal = () => {
    const { data: meals, isLoading, error } = useHttp("http://localhost:3000/meals", cfg, []);
    const ctxModal = useContext(ModalContext);
    const handleHideModal = () => {
        ctxModal.hideAddMeal();
    };
    return (
        <>
            {error && <ErrorMessage title="Failed fetch..." message={error} />}
            {isLoading && <Loader />}
            <div className="meal">
                {meals &&
                    !isLoading &&
                    meals.map((meal) => {
                        return <MealItem key={meal.id + meal.name} data={meal} />;
                    })}
            </div>
            <Modal isOpen={ctxModal.statusUser === "meal"} onClose={handleHideModal}>
                <div>Meal has been added!.</div>
            </Modal>
        </>
    );
};

export default Meal;
