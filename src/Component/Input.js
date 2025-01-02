import React from 'react'

const Input = ({placeholder,value,setState}) => {
  return (
      <input
        className="input"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {setState(e.target.value)}}
      ></input>
  )
}

export default Input


    