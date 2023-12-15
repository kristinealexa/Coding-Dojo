import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OneBooks = (props) => {

    const { id } = useParams();
    const [thisBooks, setThisBooks] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8000/api/books/" + id)
        .then(res =>{
            console.log(res.data);
            setThisBooks(res.data);
        })
        .catch(err => console.log(err));
    }, [id]);

    return (
    <div>
        {
            thisBooks ? (
                <>
                    <h2>{thisBooks.name}</h2>
                    <h2>{thisBooks.price}</h2>
                    <h2>{thisBooks.description}</h2>
                </>
                ): <h3>Loading...</h3>
        }
    </div>
    );
};

export default OneBooks