import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const OnePirates = (props) => {

    const { id } = useParams();
    const [thisPirates, setThisPirates] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:8000/api/pirates/" + id)
        .then(res =>{
            console.log(res.data);
            setThisPirates(res.data);
        })
        .catch(err => console.log(err));
    }, [id]);

    return (
    <div>
        {/* {JSON.stringify(thisPirates)} */}
        {
            thisPirates ? (
                <>
                    <h1>{thisPirates.name}</h1>
                    <hr/>
                    <img src={thisPirates.image} width="100px" alt="" />
                    <h1>{thisPirates.catchPhrase}</h1>
                    <br></br>
                    <h2>About</h2>
                    <h2>Position: {thisPirates.crewPosition}</h2>
                    <h2>Treasures: {thisPirates.treasureChests}</h2>
                    <h2>Peg Leg:{thisPirates.pegLeg ? "Yes" : " No"}</h2>
                    <h2>Eye Patch:{thisPirates.eyePatch ? "Yes" : "No"}</h2>
                    <h2>Hook Hand:{thisPirates.hookHand ? "Yes" : "No"}</h2>
                </>
                ): <h3>Loading...</h3>
        }
    </div>
    );
};

export default OnePirates