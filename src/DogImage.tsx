import { useDrag } from "react-dnd";

const DogImage = ({ url }: { url: string }) => {
    const [{ isDragging }, drag] = useDrag({
        type: "IMAGE",
        item: { url },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (
        <img
            ref={drag as unknown as React.Ref<HTMLImageElement>}
            src={url}
            alt="dog"
            width={100}
            height={100}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: "grab",
            }}
        />
    );
};

export default DogImage;
