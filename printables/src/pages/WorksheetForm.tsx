import "./WorksheetForm.css";

interface WorksheetFormProps {
    sentence: string;
    setSentence: (sentence: string) => void;
}

export function WorksheetForm(props: WorksheetFormProps) {
    return (
        <div className="worksheet-form">
            <label htmlFor="sentence">
                Sentence
            </label>

            <input
                id="sentence"
                type="text"
                value={props.sentence}
                onChange={(event) =>
                    props.setSentence(event.target.value)
                }
            />
        </div>
    );
}
