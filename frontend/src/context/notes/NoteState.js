import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = `${process.env.REACT_APP_BACKEND_HOST}`
    const notesinitial = [];
    const [notes, setnotes] = useState(notesinitial);

    //Get All  for Admin
    const getAllNote = async () => {
        // fetching notes google: fetch with header
        const response = await fetch(`${host}/api/notes/fetchadmin`, {
            method: 'GET'
        });
        const json = await response.json();
        setnotes(json);
    }

    //Delete from All note for Admin
    const deleteAllNote = async (id) => {
        // fetch with headers
        const response = await fetch(`${host}/api/notes/deletenoteadmin/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        console.log(json);
        const newNote = notes.filter((note) => { return note._id !== id })
        setnotes(newNote);
    }

    //Get All Notes
    const getNote = async () => {
        // fetching notes google: fetch with header
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setnotes(json);
    }

    //Add Note
    const addNote = async (title, desc, tag) => {
        // fetch with headers
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, desc, tag })
        });
        const note = await response.json();
        setnotes(notes.concat(note));
    }

    //Edit Note
    const editNote = async (id, title, desc, tag, mark) => {
        // fetch with headers
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, desc, tag, mark })
        });
        const json = await response.json();
        console.log(json);

        let newNote = JSON.parse(JSON.stringify(notes))
        // logic to edit note client
        for (let index = 0; index < newNote.length; index++) {
            const element = newNote[index];
            if (element._id === id) {
                element.title = title;
                element.desc = desc;
                element.tag = tag;
                element.mark = mark;
                break;
            }
        }
        setnotes(newNote);
    }

    //Delete Note
    const deleteNote = async (id) => {
        // fetch with headers
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log(json);
        const newNote = notes.filter((note) => { return note._id !== id })
        setnotes(newNote);
    }

    return (
        <NoteContext.Provider value={{ notes, getNote, addNote, editNote, deleteNote, getAllNote, deleteAllNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;