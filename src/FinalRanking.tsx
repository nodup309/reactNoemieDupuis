import React from 'react';
import { Dog } from './types/Dog';
import './FinalRanking.css';

type FinalRankingProps = {
    dogs: Dog[];
    winners: Dog[];
};

const FinalRanking: React.FC<FinalRankingProps> = ({ dogs, winners }) => {
    const dogsWithRanks = dogs.map((dog) => {
        if (winners.length === 1 && winners.includes(dog)) {
            dog.rank = 1;
        } else if (winners.length === 2 && winners.indexOf(dog) === 0) {
            dog.rank = 1;
        } else if (winners.length === 2 && winners.indexOf(dog) === 1) {
            dog.rank = 2;
        } else if (winners.length === 4 && winners.indexOf(dog) > 1) {
            dog.rank = 3;
        } else if (winners.length === 8 && winners.indexOf(dog) > 3) {
            dog.rank = 4;
        } else if (winners.length === 16 && winners.indexOf(dog) > 7) {
            dog.rank = 5;
        } else {
            dog.rank = 6;
        }
        return dog;
    });

    const sortedDogs = dogsWithRanks.sort((a, b) => (a.rank || 0) - (b.rank || 0));

    return (
        <div className="finalRankingContainer">
            <h2>Classement Final</h2>
            <table>
                <thead>
                <tr>
                    <th>Chien</th>
                    <th>Position</th>
                </tr>
                </thead>
                <tbody>
                {sortedDogs.map((dog) => (
                    <tr key={dog.id}>
                        <td>
                            <img src={dog.imageUrl} alt={`Dog ${dog.id}`} width={100} />
                        </td>
                        <td className={`position position-${dog.rank}`}>
                            {dog.rank === 1
                                ? 'Gagnant'
                                : dog.rank === 2
                                    ? 'Finaliste'
                                    : dog.rank === 3
                                        ? 'Demi-finaliste'
                                        : dog.rank === 4
                                            ? 'Quart de finaliste'
                                            : dog.rank === 5
                                                ? 'Huitième de finale'
                                                : 'Non classé'}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default FinalRanking;
