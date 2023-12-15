import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Main = (props) => {

    const [pirates,setPirates] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/pirates")
            .then(res => {
                console.log(res.data);
                setPirates(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    },[])

    const deleteThis= (deleteId) => {
        console.log("delete", deleteId);
        axios.delete("http://localhost:8000/api/pirates/" + deleteId)
        .then(res => {
            console.log(res.data);
            const filteredPirates = pirates.filter((eachPirates) => {
                return eachPirates._id !== deleteId;
            });
            setPirates(filteredPirates);
        })
        .catch(err => console.log(err));
    }


    return (
    <div>
        <p>
          {/* {JSON.stringify(pirates)} */}
        </p>
        {
            pirates == null ? 'loading':(
            pirates.map((onePirates) => {
                return (
                    <div key={onePirates._id}>
                        <h3 class="name">{onePirates.name}</h3>
                            <img src={onePirates.image} width="100px" alt="" />

                            <p class="buttons">
                            <Link to={"/pirates/" + onePirates._id}>
                            <button class="button">View Pirate</button>
                            </Link>
                            <br/>
                            <button class="button" onClick={() => deleteThis(onePirates._id)}>Walk the Plank</button>
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