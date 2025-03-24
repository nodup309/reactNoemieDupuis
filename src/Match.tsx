import React from 'react';
import { Dog } from './types/Dog';
import { getRoundName } from './RoundHeader';

type MatchProps = {
    matchIndex: number;
    round: number;
    currentMatch: Dog[];
    handleVote: (selectedDog: Dog) => void;
};

const Match: React.FC<MatchProps> = ({ matchIndex, round, currentMatch, handleVote }) => {
    return (
        <div>
            <h2>Match {matchIndex + 1} - {getRoundName(round)}</h2>
            <div>
                {currentMatch.map((dog) => (
                    <div key={dog.id}>
                        <img src={dog.imageUrl} alt={`Dog ${dog.id}`} width={150} />
                        <button onClick={() => handleVote(dog)}>Voter pour ce chien</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Match;
