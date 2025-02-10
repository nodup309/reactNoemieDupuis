import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
    const [dogPhotos, setDogPhotos] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [tierList, setTierList] = useState<{ [key: number]: string[] }>({
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
    });

    useEffect(() => {
        const fetchDogPhotos = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://api.thedogapi.com/v1/images/search?limit=10');
                const data = await response.json();
                const photos = data.map((photo: { url: string }) => photo.url);
                setDogPhotos(photos);
            } catch (error) {
                console.error('Error fetching dog photos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDogPhotos();
    }, []);

    const handleClassify = (photoUrl: string, tier: number) => {
        setTierList((prevTierList) => {
            const updatedTierList = { ...prevTierList };
            Object.keys(updatedTierList).forEach((key) => {
                updatedTierList[parseInt(key)].filter((url) => url !== photoUrl);
            });
            updatedTierList[tier].push(photoUrl);
            return updatedTierList;
        });
    };


    return (
        <div>
            <h1>Dog Tierlist</h1>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <h2>Photos</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {dogPhotos.map((photo, index) => (
                            <div key={index} style={{ margin: '10px' }}>
                                <img
                                    src={photo}
                                    alt={`Dog ${index + 1}`}
                                    width="150"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleClassify(photo, 1)} // Ajouter par défaut à la catégorie 1
                                />
                            </div>
                        ))}
                    </div>

                    <h2>Tierlist</h2>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {[1, 2, 3, 4, 5].map((tier) => (
                            <div
                                key={tier}
                                style={{
                                    width: '150px',
                                    height: '200px',
                                    border: '2px solid #000',
                                    padding: '10px',
                                    textAlign: 'center',
                                    margin: '5px',
                                    overflowY: 'auto',
                                    borderRadius: '5px',
                                }}
                            >
                                <h3>Tier {tier}</h3>
                                <div>
                                    {tierList[tier].map((photoUrl, index) => (
                                        <img
                                            key={index}
                                            src={photoUrl}
                                            alt={`Dog ${index + 1}`}
                                            width="100"
                                            style={{ margin: '5px', cursor: 'pointer' }}
                                            onClick={() => handleClassify(photoUrl, tier === 5 ? 1 : tier + 1)} // Rotation entre les niveaux
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
