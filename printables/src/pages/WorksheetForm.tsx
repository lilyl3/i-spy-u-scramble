interface WorksheetFormProps {
    sentence: string;
    setSentence: (sentence: string) => void
}

export function WorksheetForm(props: WorksheetFormProps) {
    return (
        <>
            <h1>Worksheet Form</h1>
            <input value={props.sentence} onChange={(event) => props.setSentence(event.target.value)}></input>
            <p>{props.sentence}</p>
        </>
    );
}