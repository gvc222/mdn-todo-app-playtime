import React, { useState } from 'react'

function Form(props) {
  
  const [name, setName] = useState("");
  
  function handleSubmit(e) {
    e.preventDefault();
    if (name === "") {
      alert("Please enter a task")
    } else {
    props.onSubmit(name);
    setName("")
    }
  }

  function handleChange(e) {
     setName(e.target.value);
  }

    return (
        <form>
          <h2 className="label-wrapper">
            <label htmlFor="new-todo-input" className="label__lg">
              What needs to be done?
            </label>
          </h2>
          <input 
            type="text" 
            name="text" 
            id="new-todo-input" 
            className="input input__lg" 
            autocomplete="off"
            value = {name}
            onChange= {handleChange}
          />
          <button onClick={handleSubmit} type="submit" className="btn btn__primary btn__lg">
            Add
          </button>
        </form>
    )
}
export default Form;