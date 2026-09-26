interface Position {
    x: number;
    y: number;
}

interface ImageData {
    path: string;
    width: number;
    height: number;
    letterPosition: Position;
}

interface WordImageProps {
    letter: string;
    imageData: ImageData
}

export function WordImage(props: WordImageProps) {
    return (
        <>
            <div className="word-image">
                <img src={props.imageData.path}></img>
                <p>{props.letter}</p>
                <p>{props.imageData.width}, {props.imageData.height}</p>
            </div>
        </>
    );
}