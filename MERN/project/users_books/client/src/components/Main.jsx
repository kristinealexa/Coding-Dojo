import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Main = (props) => {

    const [books,setBooks] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/books")
            .then(res => {
                console.log(res.data);
                setBooks(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    },[])

    const deleteThis= (deleteId) => {
        console.log("delete", deleteId);
        axios.delete("http://localhost:8000/api/books/" + deleteId)
        .then(res => {
            console.log(res.data);
            const filteredBooks = books.filter((eachBooks) => {
                return eachBooks._id !== deleteId;
            });
            setBooks(filteredBooks);
        })
        .catch(err => console.log(err));
    }


    return (
    <div>
        {
            books == null ? 'loading':(
            books.map((oneBooks) => {
                return (
                    <div class="books" key={oneBooks._id}>
                        {/* <Link to={"/books/" + oneBooks._id}> */}
                        <h2>{oneBooks.name}</h2>
                        {/* </Link> */}
                        <img src={oneBooks.image} width="100px" alt="" />
                            <h3>Price: {oneBooks.price}</h3>
                            <h3>Description: {oneBooks.description}</h3>
                            <h3>Overall Rating: {oneBooks.rating}</h3>
                            <h3>Genre: {oneBooks.genre}</h3>
                            <p class="buttons">
                            <Link to={`/books/${oneBooks._id}/update`}><button>Edit</button></Link>
                            <button class="button" onClick={() => deleteThis(oneBooks._id)}>Delete</button>
                            </p>
                            <hr />
                        </div>
                    );
                }))
        }

    </div>
    )
}

export default Main