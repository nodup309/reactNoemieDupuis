import React, { useState, useEffect, useCallback } from 'react';
import { Dog } from './types/Dog';
import RoundHeader from './RoundHeader';
import ResetButton from './ResetButton';
import FinalRanking from './FinalRanking';
import Match from './Match'; // Importer Match
import styles from './Tournament.module.css';

const Tournament: React.FC = () => {
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [matches, setMatches] = useState<Dog[][]>([]);
    const [round, setRound] = useState(1);
    const [winners, setWinners] = useState<Dog[]>([]);
    const [losers, setLosers] = useState<Dog[]>([]);
    const [currentMatch, setCurrentMatch] = useState<Dog[]>([]);
    const [matchIndex, setMatchIndex] = useState(0);
    const [tournamentFinished, setTournamentFinished] = useState(false);

    const resetTournament = useCallback(async () => {
        const response = await fetch('https://dog.ceo/api/breeds/image/random/16');
        const data = await response.json();
        const dogs = data.message.map((url: string, index: number) => ({
            id: index,
            name: `Dog ${index + 1}`,
            imageUrl: url
        }));
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
        let rankCounter = 1;

        for (let i = 0; i < array.length; i += size) {
            const chunk = array.slice(i, i + size);

            const chunkWithRanks = chunk.map(dog => ({
                ...dog,
                rank: rankCounter++
            }));
            result.push(chunkWithRanks);
        }
        return result;
    };

    const handleVote = (winner: Dog, loser: Dog, loserRank: number) => {
        const updatedWinners = [...winners, winner];
        const updatedLosers = [...losers, { ...loser, rank: loserRank }];

        setWinners(updatedWinners);
        setLosers(updatedLosers);

        const nextMatchIndex = matchIndex + 1;

        if (nextMatchIndex < matches.length) {
            setCurrentMatch(matches[nextMatchIndex]);
            setMatchIndex(nextMatchIndex);
        } else {
            if (updatedWinners.length === 1) {
                setTournamentFinished(true);
                setDogs([...updatedWinners, ...updatedLosers]);
            } else {
                const nextRoundMatches = chunkArray(updatedWinners, 2);
                setMatches(nextRoundMatches);
                setRound(round + 1);
                setWinners([]);
                setMatchIndex(0);
                setCurrentMatch(nextRoundMatches[0]);
            }
        }
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
                    <FinalRanking dogs={dogs} />
                </div>
            ) : (
                <Match
                    matchIndex={matchIndex}
                    currentMatch={currentMatch}
                    round={round}
                    handleVote={handleVote}
                />
            )}
        </div>
    );
};

export default Tournament;
