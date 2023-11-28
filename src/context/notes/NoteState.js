import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const notesInitial = [
        {
            "_id": "64d49d7e1f8eaa53a5f665e9",
            "userId": "64d36e3eac3ad5d55d80db9e",
            "title": "Test Title 2",
            "description": "Test Desc 2",
            "tag": "Test Tag 2",
            "date": "2023-08-10T08:19:10.708Z",
            "__v": 0
        },
        {
            "_id": "64e35d9315c51ffdd632f9f2",
            "userId": "64d36e3eac3ad5d55d80db9e",
            "title": "My First Note",
            "description": "Test Desc 1",
            "tag": "Test Tag 1",
            "date": "2023-08-21T12:50:27.021Z",
            "__v": 0
        }
    ]

    const [notes, setNote] = useState(notesInitial);

    return (
        <NoteContext.Provider value={{ notes, setNote }}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;