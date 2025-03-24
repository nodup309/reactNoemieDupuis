import React from 'react';
import styles from './ResetButton.module.css';

type ResetButtonProps = {
    onReset: () => void;
};

const ResetButton: React.FC<ResetButtonProps> = ({ onReset }) => {
    return (
        <button onClick={onReset} className={styles.button}>
            🎉 Nouveau Tournoi 🎉
        </button>
    );
};

export default ResetButton;
