import './App.css';
import {useState} from 'react';
import Animal from './components/Animal';
import { Form } from './components/Form';

function App() {
  const [animals, setAnimals] = useState([
    {
      name: "frog",
      isHungry: true
    },
    {
      name: "lion",
      isHungry: true
    },
    {
      name: "dog",
      isHungry: false
    },
  ]);

  // function to change isHungry
  const changeHunger = (index) => {
    // console.log("who is hungry?", index);
    // console.log(animals[index].isHungry);
    const copyState = [...animals];
    // if (copyState[index].isHungry === true) {
    //   copyState[index].isHungry = false;
    // } else {
    //   copyState[index].isHungry = true;
    // }
    copyState[index].isHungry = !copyState[index].isHungry;
    // console.log(copyState);
    setAnimals(copyState);
  }

  // function to change the real state
  const addAnimal = (theAnimalToAdd) => {
    console.log("hi", theAnimalToAdd);
    setAnimals([...animals, theAnimalToAdd]);
  };

  // delete function
  const deleteAnimal = (theIndex) => {
    const filteredAnimals = animals.filter((eachElem, idx) => {
      return idx !== theIndex;
    });
    // replace state
    setAnimals(filteredAnimals);
  }

  return (
    <div className="App">
      <h1>stuff to do</h1>
      {JSON.stringify(animals)}
      <hr />

      <Form addAnimal={addAnimal} />

      {
        animals.map((eachAnimal, index) => {
          return <Animal 
          eachAnimal={eachAnimal} 
          key={index} 
          index={index} 
          deleteAnimal={deleteAnimal}
          changeHunger={changeHunger}
          />;
        })
      }
    </div>
  );
}

export default App;
