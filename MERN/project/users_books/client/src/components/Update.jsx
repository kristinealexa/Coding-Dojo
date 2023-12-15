import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Update = (props) => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]); 

    const { id } = useParams();

    const [name, setName] = useState("");
    const [price, setPrice] = useState(1);
    const [description, setDescription] = useState("");
    const [genre, setGenre] = useState("");
    const [rating, setRating] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8000/api/books/" + id)
        .then(res =>{
            console.log(res.data);
            setName(res.data.name)
            setPrice(res.data.price)
            setDescription(res.data.description)
            setGenre(res.data.genre)
            setRating(res.data.rating)
        })
        .catch(err => console.log(err));
    }, [id]);

    const sumbitHandler = (e) => {
        e.preventDefault();
        console.log("hello");
        const tempObjToSendToDB = {
            name,
            price,
            description,
            genre,
            rating
        };

        axios.patch("http://localhost:8000/api/books/" + id, tempObjToSendToDB )
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
            <h2>Edit this Review</h2>
            <form onSubmit={sumbitHandler}>
            {errors.map((err, index) => <p style={{color: "red"}}key={index}>{err}</p>)}
                <div>
                    Title: 
                    <input value={name} onChange={e => setName(e.target.value)} />
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
                {/* <Link to="/">Cancel</Link> */}
                <button class="button">Submit</button>
                </p>
            </form>
        </div>
    )
}

export default Update