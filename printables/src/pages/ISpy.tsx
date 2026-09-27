import { useEffect, useMemo, useState } from "react";
import { LetterImage } from "../components/LetterImage";
import "./ISpy.css";

interface ISpyProps {
    sentence: string;
}

interface WordData {
    word: string;
    imageURL: string;
}

interface Grid {
    rows: number;
    columns: number;
}

interface GridCell {
    row: number;
    column: number;
}

const PAGE_WIDTH = 8.5 * 96;
const PAGE_HEIGHT = 11 * 96;

const MARGIN = 0.25 * 96;

const PRINTABLE_WIDTH = PAGE_WIDTH - MARGIN * 2;
const PRINTABLE_HEIGHT = PAGE_HEIGHT - MARGIN * 2;

function getGrid(letterCount: number): Grid {
    const pageRatio = PRINTABLE_HEIGHT / PRINTABLE_WIDTH;

    let bestRows = 1;
    let bestColumns = letterCount;
    let bestDifference = Infinity;

    for (let columns = 1; columns <= letterCount; columns++) {
        const rows = Math.ceil(letterCount / columns);

        const ratio = rows / columns;
        const difference = Math.abs(ratio - pageRatio);

        if (difference < bestDifference) {
            bestDifference = difference;
            bestRows = rows;
            bestColumns = columns;
        }
    }

    return {
        rows: bestRows,
        columns: bestColumns,
    };
}

function createGridCells(rows: number, columns: number): GridCell[] {
    const cells: GridCell[] = [];

    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            cells.push({
                row,
                column,
            });
        }
    }

    return cells;
}

function shuffle<T>(array: T[]): T[] {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] = [
            shuffled[j],
            shuffled[i],
        ];
    }

    return shuffled;
}

export function ISpy(props: ISpyProps) {
    const [wordData, setWordData] = useState<WordData[]>([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/ispy", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sentence: props.sentence,
            }),
        })
            .then((response) => response.json())
            .then((data) => setWordData(data));
    }, [props.sentence]);

    const letterCount = wordData.reduce(
        (total, data) => total + data.word.length,
        0
    );

    const grid = useMemo(() => {
        if (letterCount === 0) {
            return null;
        }

        return getGrid(letterCount);
    }, [letterCount]);

    const shuffledCells = useMemo(() => {
        if (!grid) {
            return [];
        }

        return shuffle(
            createGridCells(grid.rows, grid.columns)
        );
    }, [grid]);

    if (!grid) {
        return <div className="page" />;
    }

    const cellWidth =
        PRINTABLE_WIDTH / grid.columns;

    const cellHeight =
        PRINTABLE_HEIGHT / grid.rows;

    // Make the LetterImage smaller than the cell.
    const imageSize =
        Math.min(cellWidth, cellHeight) * 0.75;

    const fontSize = imageSize * 0.3;

    let letterIndex = 0;

    const letters = wordData.flatMap(
        (data, wordIndex) =>
            data.word.split("").map((letter, index) => {
                const cell = shuffledCells[letterIndex++];

                const x =
                    MARGIN +
                    cell.column * cellWidth +
                    (cellWidth - imageSize) / 2;

                const y =
                    MARGIN +
                    cell.row * cellHeight +
                    (cellHeight - imageSize) / 2;

                const rotation = Math.random() * 40 - 20;

                return (
                    <LetterImage
                        key={`${wordIndex}-${index}`}
                        letter={letter}
                        imageURL={data.imageURL}
                        width={imageSize}
                        fontSize={fontSize}
                        x={x}
                        y={y}
                        rotation={rotation}
                    />
                );
            })
    );

    return (
        <div className="ispy-container">
            <button
                className="print-button"
                onClick={() => window.print()}
            >
                Print Worksheet
            </button>
    
            <div className="page">
                {letters}
            </div>
        </div>
    );
    
}