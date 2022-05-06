import React from 'react'

const Input = ({ onSubmit, value, setInputField }) => {
  return (
    <div className='input-wrapper'>
        <input className='input' type="text" value={value} onChange={(e) => setInputField(e.target.value)} placeholder='write a todo item...' onKeyDown={(e) => e.key === 'Enter' && onSubmit(e.target.value)}>
            </input>
    </div>
  )
}

export default Input