import React from 'react'

const Animal = (props) => {
  const deleteAnimal = (theIndex) => {
    props.deleteAnimal(theIndex);
  }
  return (
    <div style={{textDecoration: props.eachAnimal.isHungry ? "line-through" : "" }}>
      <h2>
        {props.eachAnimal.name} - 
        {props.eachAnimal.isHungry ? "hungry" : "sleepy"}
        <input type="checkbox" 
          checked={props.eachAnimal.isHungry} 
          onChange={() => props.changeHunger(props.index)}
        />
        <button onClick={() => deleteAnimal(props.index)}>delete {props.index}</button>
      </h2>
    </div>
  )
}

export default Animal