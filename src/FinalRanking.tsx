import React from 'react';
import { Dog } from './types/Dog';
import './FinalRanking.css';

type FinalRankingProps = {
    dogs: Dog[];
};

const FinalRanking: React.FC<FinalRankingProps> = ({ dogs }) => {
    const sortedDogs = [...dogs].sort((a, b) => (a.rank || 6) - (b.rank || 6));

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
                            {dog.rank === 1 ? '🏆 Gagnant'
                                : dog.rank === 2 ? '🥈 Finaliste'
                                    : dog.rank === 3 ? '🥉 Demi-finaliste'
                                        : dog.rank === 4 ? 'Quart de finale'
                                            : dog.rank === 5 ? 'Huitième de finale'
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
