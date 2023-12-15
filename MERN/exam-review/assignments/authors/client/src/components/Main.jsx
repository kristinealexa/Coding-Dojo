import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Main = (props) => {

    const [authors,setAuthors] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/authors")
            .then(res => {
                console.log(res.data);
                setAuthors(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    },[])

    const deleteThis= (deleteId) => {
        console.log("delete", deleteId);
        axios.delete("http://localhost:8000/api/authors/" + deleteId)
        .then(res => {
            console.log(res.data);
            const filteredAuthors = authors.filter((eachAuthors) => {
                return eachAuthors._id !== deleteId;
            });
            setAuthors(filteredAuthors);
        })
        .catch(err => console.log(err));
    }

    // const editThis= (editThis) => {
    //     console.log("edit", editThis);
    //     axios.patch("http://localhost:8000/api/authors/" + editThis)
    //     .then(res => {
    //         console.log(res.data);
    //         const filteredAuthors = authors.filter((eachAuthors) => {
    //             return eachAuthors.id == editThis;
    //         })
    //         setAuthors(filteredAuthors);
    //     })
    //     .catch(err=> console.log(err));
    // };

    return (
    <div>
        <p>
          {/* {JSON.stringify(authors)} */}
        <h3 class="title">We have quotes by:</h3>
        </p>
        {
            authors == null ? 'loading':(
            authors.map((oneAuthors) => {
                return (
                    <div key={oneAuthors._id}>
                        {/* <Link to={"/authors/" + oneAuthors._id}> */}
                        <h3 class="name">{oneAuthors.name}</h3>
                        {/* </Link> */}
                            {/* <h3>Price: {oneAuthors.price}</h3>
                            <h3>Description: {oneAuthors.description}</h3> */}
                            <p class="buttons">
                            <Link to={`/authors/${oneAuthors._id}/update`}>Edit</Link>
                            {/* <button onClick={(e) => {editThis(e, oneAuthors._id)}}>Edit</button> */}
                            <br/>
                            <button class="button" onClick={() => deleteThis(oneAuthors._id)}>Delete</button>
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