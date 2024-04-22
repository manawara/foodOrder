import { useRef, useEffect } from "react";

import { createPortal } from "react-dom";
import "./Modal.scss";

const Modal = ({ isOpen, onClose, children }) => {
    const dialogRef = useRef();
    useEffect(() => {
        if (isOpen) {
            dialogRef.current.showModal();
        }
        return () => dialogRef.current.close();
    }, [isOpen]);

    return createPortal(
        <dialog ref={dialogRef} onClose={onClose} className="modal">
            {children}
        </dialog>,
        document.getElementById("modal")
    );
};

export default Modal;
