import {useState} from 'react'

export const Form = (props) => {

    const [emoji, setEmoji] = useState("");
    const [animalStatus, setAnimalStatus] = useState(false);

    // function to submit
    const createAnimal = (e) => {
        e.preventDefault();
        // create the animal AS IT IS IN STATE
        const tempAnimal = {
            name: emoji,
            isHungry: animalStatus
        };
        console.log(tempAnimal);

        props.addAnimal(tempAnimal);
        setEmoji("");
        setAnimalStatus(true);
    };

  return (
    <fieldset>
        emoji: {JSON.stringify(emoji)} <br />
        animalStatus: {JSON.stringify(animalStatus)} <br />

        <form onSubmit={createAnimal}>
            <input value={emoji} onChange={ (e) => setEmoji(e.target.value)}/> <br />
            hungry? <input 
                type='checkbox' 
                checked={animalStatus}
                onChange={ (e) => setAnimalStatus(e.target.checked)}
                /> <br />
            <button>create</button>
        </form>
    </fieldset>
  )
}
