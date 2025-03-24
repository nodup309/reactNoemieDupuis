import React from 'react';

export const getRoundName = (round: number) => {
    switch (round) {
        case 1: return '8e de finale';
        case 2: return 'Quart de finale';
        case 3: return 'Demi-finale';
        case 4: return 'Finale';
        default: return '';
    }
};

type RoundHeaderProps = {
    round: number;
};

const RoundHeader: React.FC<RoundHeaderProps> = ({ round }) => {
    return (
        <h2>{getRoundName(round)}</h2>
    );
};

export default RoundHeader;
