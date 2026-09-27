import "./LetterImage.css";

interface LetterImageProps {
    letter: string;
    imageURL: string;
    width: number;
    fontSize: number;
    x: number;
    y: number;
    rotation: number;
}

export function LetterImage(props: LetterImageProps) {
    return (
        <div
            className="letter-image"
            style={{
                width: `${props.width}px`,
                height: `${props.width}px`,
                top: `${props.y}px`,
                left: `${props.x}px`,
                transform: `rotate(${props.rotation}deg)`,
            }}
        >
            <img src={props.imageURL} alt="" />

            <p
                className="letter"
                style={{
                    fontSize: `${props.fontSize}px`,
                }}
            >
                {props.letter}
            </p>
        </div>
    );
}