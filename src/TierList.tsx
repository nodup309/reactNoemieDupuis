import { useState } from "react";
import { useDrop } from "react-dnd";
import DogImage from "./DogImage";
import { useEffect } from "react";

const levels = [1, 2, 3, 4, 5];

const TierList = () => {
    const [tierList, setTierList] = useState<{ [key: number]: string[] }>({
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
    });

    useEffect(() => {
        fetch("https://dog.ceo/api/breeds/image/random/10")
            .then((res) => res.json())
            .then((data) => {
                setTierList((prev) => ({ ...prev, 1: data.message }));
            });
    }, []);

    const moveImage = (photoUrl: string, targetTier: number) => {
        setTierList((prev) => {
            const updatedList = { ...prev };

            // Supprime l'image de son ancien tier
            for (const tier in updatedList) {
                updatedList[tier] = updatedList[tier].filter((url) => url !== photoUrl);
            }

            // Ajoute l'image au nouveau tier
            updatedList[targetTier].push(photoUrl);
            return updatedList;
        });
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {levels.map((tier) => (
                <TierRow key={tier} tier={tier} images={tierList[tier]} moveImage={moveImage} />
            ))}
        </div>
    );
};

const TierRow = ({ tier, images, moveImage }: { tier: number; images: string[]; moveImage: (url: string, tier: number) => void }) => {
    const [, drop] = useDrop({
        accept: "IMAGE",
        drop: (item: { url: string }) => moveImage(item.url, tier),
    });

    return (
        <div ref={drop as unknown as React.Ref<HTMLDivElement>}
             style={{border: "1px solid black", padding: "10px", minHeight: "100px"}}>
            <p>Tier {tier}</p>
            <div style={{ display: "flex", gap: "5px" }}>
                {images.map((url) => (
                    <DogImage key={url} url={url} />
                ))}
            </div>
        </div>
    );
};

export default TierList;
