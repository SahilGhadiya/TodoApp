import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import noteContext from '../context/notes/noteContext';

export const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote, deleteAllNote } = context;
    const { note, updatenote } = props;

    return (
        <div className="col-md-4 my-3">
            <div className="card shadow-sm border-0 rounded">
                <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title mb-0 text-dark">{note.title}</h5>
                        <div className="icon">
                            {(localStorage.getItem('role') === 'admin') ? <i></i> : <i
                                className="fa-solid fa-pen-to-square mx-2 text-warning"
                                onClick={() => { updatenote(note); }}
                                title="Edit Note"
                                style={{ cursor: 'pointer' }}
                            ></i>}

                            {(localStorage.getItem('role') === 'admin') ? <i
                                className="fa-regular fa-trash-can text-danger"
                                onClick={() => {
                                    deleteAllNote(note._id);
                                    toast.success("Deleted Successfully!", {
                                        position: "bottom-left",
                                        autoClose: 2000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                    });
                                }}
                                title="Delete Note"
                                style={{ cursor: 'pointer' }}
                            ></i> : <i
                                className="fa-regular fa-trash-can text-danger"
                                onClick={() => {
                                    deleteNote(note._id);
                                    toast.success("Deleted Successfully!", {
                                        position: "bottom-left",
                                        autoClose: 2000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                    });
                                }}
                                title="Delete Note"
                                style={{ cursor: 'pointer' }}
                            ></i>}


                        </div>
                    </div>
                    <hr className="my-2" />
                    <p className="card-text text-secondary">{note.desc}</p>
                    {note.mark && note.mark === "Pending" && <span className="badge bg-warning text-dark">{note.mark}</span>}
                    {note.mark && note.mark === "Complete" && <span className="badge bg-success text-dark">{note.mark}</span>}
                </div>
            </div>
        </div>
    );
};
