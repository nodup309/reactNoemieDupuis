import React from 'react';
import { Dog } from './types/Dog';
import { getRoundName } from './RoundHeader';
import styles from './Match.module.css';

type MatchProps = {
    matchIndex: number;
    round: number;
    currentMatch: Dog[];
    handleVote: (winner: Dog, loser: Dog, loserRank: number) => void;
};

const Match: React.FC<MatchProps> = ({ matchIndex, round, currentMatch, handleVote }) => {
    if (currentMatch.length < 2) return <p>En attente de joueurs...</p>;

    const handleVoteClick = (selectedDog: Dog) => {
        const loser = currentMatch.find(dog => dog.id !== selectedDog.id);
        let loserRank;

        switch (round) {
            case 1:
                loserRank = 5; // 8e de finale
                break;
            case 2:
                loserRank = 4; // Quart de finale
                break;
            case 3:
                loserRank = 3; // Demi-finale
                break;
            case 4:
                loserRank = 2; // Finaliste
                break;
            default:
                loserRank = 6; // Non classé
        }

        handleVote(selectedDog, loser!, loserRank);
    };

    return (
        <div className={styles.matchContainer}>
            <h2>Match {matchIndex + 1} - {getRoundName(round)}</h2>
            <div className={styles.match}>
                {currentMatch.map((dog) => (
                    <div key={dog.id} className={styles.dogContainer}>
                        <img className={styles.matchImage} src={dog.imageUrl} alt={`Dog ${dog.id}`} width={150} />
                        <button
                            className={styles.voteButton}
                            onClick={() => handleVoteClick(dog)}
                        >
                            🐶 Voter pour ce chien 🐶
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Match;
