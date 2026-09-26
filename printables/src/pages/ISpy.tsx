import { WordImage } from "../components/WordImage";
import heroImage from "../assets/hero.png"

interface ISpyProps {
    words:  string[];
}

export function ISpy(props: ISpyProps) {
    const wordElements = props.words.map((word, index) => <p key={index}>{word}</p>)
    return (
        <>
            <h1>I Spy</h1>
            {wordElements}
            <WordImage letter="x" imageData={{path: heroImage, width: 500, height:500, letterPosition:{x: 250, y:250}}}></WordImage>
        </>
    );
}