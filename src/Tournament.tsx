import React, { useState, useEffect, useCallback } from 'react';
import { Dog } from './types/Dog';
import RoundHeader from './RoundHeader';
import ResetButton from './ResetButton';
import FinalRanking from './FinalRanking';
import styles from './Tournament.module.css';

const Tournament: React.FC = () => {
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [matches, setMatches] = useState<Dog[][]>([]);
    const [round, setRound] = useState(1);
    const [winners, setWinners] = useState<Dog[]>([]);
    const [currentMatch, setCurrentMatch] = useState<Dog[]>([]);
    const [matchIndex, setMatchIndex] = useState(0);
    const [tournamentFinished, setTournamentFinished] = useState(false);

    const resetTournament = useCallback(async () => {
        const response = await fetch('https://dog.ceo/api/breeds/image/random/16');
        const data = await response.json();
        const dogs = data.message.map((url: string, index: number) => ({ id: index, name: `Dog ${index + 1}`, imageUrl: url }));
        setDogs(dogs);
        const initialMatches = chunkArray(dogs, 2);
        setMatches(initialMatches);
        setCurrentMatch(initialMatches[0] || []);
        setRound(1);
        setWinners([]);
        setMatchIndex(0);
        setTournamentFinished(false);
    }, []);

    useEffect(() => {
        resetTournament();
    }, [resetTournament]);

    const chunkArray = (array: Dog[], size: number) => {
        const result: Dog[][] = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    };

    const handleVote = (selectedDog: Dog) => {
        const updatedWinners = [...winners, { ...selectedDog, rank: winners.length + 1 }];
        setWinners(updatedWinners);

        const nextMatchIndex = matchIndex + 1;

        if (nextMatchIndex < matches.length) {
            setCurrentMatch(matches[nextMatchIndex]);
            setMatchIndex(nextMatchIndex);
        } else {
            const nextRoundDogs = updatedWinners;

            if (nextRoundDogs.length === 1) {
                setTournamentFinished(true);
            } else {
                const nextRoundMatches = chunkArray(nextRoundDogs, 2);
                setMatches(nextRoundMatches);
                setRound(round + 1);
                setWinners([]);
                setMatchIndex(0);
                setCurrentMatch(nextRoundMatches[0]);
            }
        }
    };

    const renderMatchList = () => {
        return (
            <div className={styles.matchContainer}>
                <h2>Match {matchIndex + 1}</h2>
                <div>
                    {currentMatch.length > 0 && currentMatch.map((dog) => (
                        <div key={dog.id}>
                            <img className={styles.matchImage} src={dog.imageUrl} alt={`Dog ${dog.id}`} />
                            <button className={styles.voteButton} onClick={() => handleVote(dog)}>
                                🐶 Voter pour ce chien 🐶
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className={styles.container}>
            <ResetButton onReset={resetTournament} />
            <RoundHeader round={round} />
            {tournamentFinished ? (
                <div>
                    <h2>🎉 Le tournoi est terminé ! 🎉</h2>
                    <h3>🏆 Vainqueur :</h3>
                    {winners.length > 0 && <img className={styles.winnerImage} src={winners[0]?.imageUrl} alt="Vainqueur" />}
                    <FinalRanking dogs={dogs} winners={winners} />
                </div>
            ) : (
                renderMatchList()
            )}
        </div>
    );
};

export default Tournament;
