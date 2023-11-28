import { useContext } from "react"
import noteContext from "../context/notes/noteContext";

const Home = () => {
  const {notes,setNote} = useContext(noteContext);
  return (
    <div>
      <div className="container">
          <h1  style={{margin:'35px 0px', marginTop:'65px'}}>Add a note</h1>
          <form className="my-3">
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" id="exampleInputPassword1" />
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1" />
              <label className="form-check-label">Check me out</label>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
      </div>
      <div className="container my-3">
        <h2>Your Notes</h2>
        {notes.map((note)=> {
          return note.title;
        })

        }
      </div>
    </div>
  )
}

export default Home
