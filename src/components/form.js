import React, {useState} from 'react'

export default function Form() {
    const [name, setName] = useState("")

    const handleSubmit = (evt) => {
        evt.preventDefault();
        alert('submiting new name', {name})
        console.log(name)
    }
  return (
    <>
      <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
            
          </label>
          <label>
            description:
            <input type="text" name="description" />
          </label>
          <input type="submit" value="Submit" />
        </form>

      <form className='delete'>
          <label for="id">
            Plant id:
          
            <input type='text' name='id' required />
          </label>
          <button>delete plant</button>
      </form>
    </>
    
  )
}
