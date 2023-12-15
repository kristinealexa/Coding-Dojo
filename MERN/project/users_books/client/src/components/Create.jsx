import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Create = (props) => {

    const navigate = useNavigate();
    const [errors, setErrors] = useState([]); 

    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState(1);
    const [description, setDescription] = useState("");
    const [genre, setGenre] = useState("");
    const [rating, setRating] = useState("");

    const sumbitHandler = (e) => {
        e.preventDefault();
        console.log("hello");
        const tempObjToSendToDB = {
            name,
            image,
            price,
            description,
            genre,
            rating
        };
        axios.post("http://localhost:8000/api/books", tempObjToSendToDB )
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
                <h2>Add new Book:</h2>
                <div>
                    Title: 
                    <input value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    Image URL:
                    <input value={image} onChange={e => setImage(e.target.value)}/>
                </div>
                <div>
                    Price:
                    <input type="number" value={price} onChange={e => setPrice(e.target.value)}/>
                </div>
                <div>
                    Description:
                    <input value={description} onChange={e => setDescription(e.target.value)}/>
                </div>
                <div>
                    Overall Rating:
                    <input type="number" value={rating} onChange={e => setRating(e.target.value)}/>
                </div>
                <div>
                    Genre: 
                    <select onChange={e => setGenre(e.target.value)}>
                        <option>Fiction</option>
                        <option>Fantasy</option>
                        <option>Romance</option>
                        <option>Horror</option>
                        <option>Mystery</option>
                        <option>Poetry</option>
                        <option>Other</option>
                    </select>
                </div>
                <p class="buttons">
                <button class="button">Submit</button>
                </p>
                
            </form>
        </div>
    )
}

export default Create