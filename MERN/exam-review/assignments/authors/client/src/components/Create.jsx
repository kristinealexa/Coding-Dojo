import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Create = (props) => {

    const navigate = useNavigate();
    const [errors, setErrors] = useState([]); 

    const [name, setName] = useState("");
    // const [price, setPrice] = useState(1);
    // const [description, setDescription] = useState("");

    const sumbitHandler = (e) => {
        e.preventDefault();
        console.log("hello");
        const tempObjToSendToDB = {
            name
            // price,
            // description
        };
        axios.post("http://localhost:8000/api/authors", tempObjToSendToDB )
            .then(res => {
                console.log("👍🏼👍🏼👍🏼👍🏼", res.data);
                navigate("/");
            })
            .catch(err => {
                
            console.log("👎🏼👎🏼👎🏼👎🏼", err);
            const errorResponse = err.response.data.errors;
            const errorArr = [];
            for (const key of Object.keys(errorResponse)) {
                errorArr.push(errorResponse[key].message)
            }
            // Set Errors
            setErrors(errorArr);
            }
            
                );
    };

    return (
        <div class="info">
            <form onSubmit={sumbitHandler}>
            {errors.map((err, index) => <p style={{color: "red"}}key={index}>{err}</p>)}
                <h2>Add new Author:</h2>
                <div>
                    Name: 
                    <input value={name} onChange={e => setName(e.target.value)} />
                </div>
                {/* <div>
                    price:
                    <input type="number" value={price} onChange={e => setPrice(e.target.value)}/>
                </div>
                <div>
                    description:
                    <input value={description} onChange={e => setDescription(e.target.value)}/>
                </div> */}
                <p class="buttons">
                <Link to="/">Cancel</Link>
                <button class="button">Submit</button>
                </p>
            </form>
        </div>
    )
}

export default Create