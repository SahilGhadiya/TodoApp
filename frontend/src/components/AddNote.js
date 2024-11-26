import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import noteContext from '../context/notes/noteContext';

export const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", desc: "", tag: "" });

  const handleClick = (e) => {
    e.preventDefault();
    setNote({ title: "", desc: "", tag: "default" });
    addNote(note.title, note.desc, note.tag, "Pending");
    toast.success("Added Successfully!", {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }

  return (
    <>
      {(localStorage.getItem('role') === 'admin') ? <div></div> : <div className='container my-5 p-4 border rounded shadow-sm bg-light'>
        <h4 className='text-center mb-4'>Add a New Note</h4>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={note.title}
              placeholder="Enter title"
              onChange={onChange}
              minLength={3}
              required
            />
            <div className="form-text text-muted">Minimum 3 characters required.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="desc"
              name="desc"
              value={note.desc}
              placeholder="Enter description"
              onChange={onChange}
              minLength={5}
              required
              rows="3"
            ></textarea>
            <div className="form-text text-muted">Minimum 5 characters required.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              placeholder="Enter tag (optional)"
              onChange={onChange}
            />
          </div>
          <div className="text-center">
            <button
              disabled={note.title.length < 3 || note.desc.length < 5}
              type="submit"
              className="btn btn-dark btn-lg"
              onClick={handleClick}
            >
              Add Note
            </button>
          </div>
        </form>
      </div>}
    </>
  );
}
