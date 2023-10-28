import React from 'react'

export const ToggleDarkMode = ( {toggleDarkMode} ) => {
  return (
    <div>
        <button className="toggle-button" onClick={() => toggleDarkMode((prevState) => !prevState)}>Dark Mode On/Off</button>
    </div>
  )
}
