import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OneAuthors = (props) => {

    const { id } = useParams();
    const [thisAuthors, setThisAuthors] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8000/api/authors/" + id)
        .then(res =>{
            console.log(res.data);
            setThisAuthors(res.data);
        })
        .catch(err => console.log(err));
    }, [id]);

    return (
    <div>
        {/* {JSON.stringify(thisAuthors)} */}
        {
            thisAuthors ? (
                <>
                    <h2>{thisAuthors.name}</h2>
                    {/* <h2>{thisAuthors.price}</h2>
                    <h2>{thisAuthors.description}</h2> */}
                </>
                ): <h3>Loading...</h3>
        }
    </div>
    );
};

export default OneAuthors