// src/components/Modal.js
import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    max-width: 500px;
    width: 100%;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 15px;
    right: 20px;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
`;

const Modal = ({ children, onClose }) => {
    return (
        <Overlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                {children}
            </ModalContent>
        </Overlay>
    );
};

export default Modal;
