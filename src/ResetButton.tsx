import React from 'react';

type ResetButtonProps = {
    onReset: () => void;
};

const ResetButton: React.FC<ResetButtonProps> = ({ onReset }) => {
    return (
        <button onClick={onReset} style={{ marginTop: '20px', padding: '10px', fontSize: '16px' }}>
            Nouveau tournoi
        </button>
    );
};

export default ResetButton;
