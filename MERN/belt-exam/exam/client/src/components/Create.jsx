import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Create = (props) => {

    const navigate = useNavigate();
    const [errors, setErrors] = useState([]); 

    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [treasureChests, setTreasureChests] = useState("");
    const [catchPhrase, setCatchPhrase] = useState("");
    const [crewPosition, setCrewPosition] = useState("");
    const [pegLeg, setPegLeg] = useState(true);
    const [eyePatch, setEyePatch] = useState(true);
    const [hookHand, setHookHand] = useState(true);


    const sumbitHandler = (e) => {
        e.preventDefault();
        console.log("hello");
        const tempObjToSendToDB = {
            name,
            image,
            treasureChests,
            catchPhrase,
            crewPosition,
            pegLeg,
            eyePatch,
            hookHand
        };
        axios.post("http://localhost:8000/api/pirates", tempObjToSendToDB )
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
                <h2>Add Pirate:</h2>
                <div>
                    Pirate Name: 
                    <input value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    Image URL:
                </div>
                    <input value={image} onChange={e => setImage(e.target.value)}/>
                <div>
                    # of Treasure Chests:
                    <input type="number" value={treasureChests} onChange={e => setTreasureChests(e.target.value)}/>
                </div>
                <div>
                    Pirate Catch Phrase: 
                    <input value={catchPhrase} onChange={e => setCatchPhrase(e.target.value)} />
                </div>
                <div>
                    Crew Position: 
                    <select onChange={e => setCrewPosition(e.target.value)}>
                        <option>Captain</option>
                        <option>First Mate</option>
                        <option>Quarter Master</option>
                        <option>Boatswain</option>
                        <option>Powder Monkey</option>
                    </select>
                </div>
                <div>
                    Peg Leg: 
                    <input type="checkbox" checked={pegLeg} onChange={e => setPegLeg(e.target.checked)}/>
                </div>
                <div>
                    Eye Patch: 
                    <input type="checkbox" checked={eyePatch} onChange={e => setEyePatch(e.target.checked)}/>
                </div>
                <div>
                    Hook Hand: 
                    <input type="checkbox" checked={hookHand} onChange={e => setHookHand(e.target.checked)}/>
                </div>
                <button class="button">Add Pirate</button>
            </form>
        </div>
    )
}

export default Create