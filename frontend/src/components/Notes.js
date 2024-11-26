import React, { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import noteContext from '../context/notes/noteContext';
import { AddNote } from './AddNote';
import { Noteitem } from './Noteitem';
import { useNavigate } from 'react-router-dom';

export const Notes = (props) => {
    const navigate = useNavigate();
    const context = useContext(noteContext);
    const { notes, getNote, getAllNote, editNote } = context;

    useEffect(() => {
        if (localStorage.getItem('role') === 'admin' && localStorage.getItem('token')) {
            getAllNote();
        } else if (localStorage.getItem('role') === 'user' && localStorage.getItem('token')) {
            getNote();
        } else {
            navigate('/login');
        }
        // eslint-disable-next-line
    }, []);

    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({ etitle: "", edesc: "", etag: "default", emark: "" });

    const updatenote = (currentnote) => {
        ref.current.click();
        setNote({ id: currentnote._id, etitle: currentnote.title, edesc: currentnote.desc, etag: currentnote.tag, emark: currentnote.mark });
    };

    const handleClick = (e) => {
        refClose.current.click();
        editNote(note.id, note.etitle, note.edesc, note.etag, note.emark);
        toast.success("Updated Successfully!", {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const handleChange = (e) => {
        setNote({ ...note, emark: e.target.value });
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <div className='container my-5'>
            <AddNote />
            <button
                type="button"
                className="btn btn-primary d-none"
                ref={ref}
                data-bs-toggle="modal"
                data-bs-target="#editNoteModal"
            >
                Launch Edit Note Modal
            </button>

            {/* Modal */}
            <div className="modal fade" id="editNoteModal" tabIndex="-1" aria-labelledby="editNoteModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-dark text-white">
                            <h5 className="modal-title" id="editNoteModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="etitle"
                                        name="etitle"
                                        value={note.etitle}
                                        onChange={onChange}
                                        minLength={3}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edesc" className="form-label">Description</label>
                                    <textarea
                                        className="form-control"
                                        id="edesc"
                                        name="edesc"
                                        rows="3"
                                        value={note.edesc}
                                        onChange={onChange}
                                        minLength={5}
                                        required
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="etag"
                                        name="etag"
                                        value={note.etag}
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="emark" className="form-label">Mark</label>
                                    <select
                                        className="form-select"
                                        id="emark"
                                        value={note.emark}
                                        onChange={handleChange}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Complete">Complete</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-dark" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            {(localStorage.getItem('role') === 'admin') ? <h4 className="mt-5">All Notes</h4> : <h4 className="mt-5">Your Notes</h4>}
            {notes.length === 0 ? (
                <div className="alert alert-warning" role="alert">
                    No Notes to Display.
                </div>
            ) : (
                <div className="row">
                    {notes.map((note) => (
                        <Noteitem key={note._id} updatenote={updatenote} note={note} />
                    ))}
                </div>
            )}
        </div>
    );
};
