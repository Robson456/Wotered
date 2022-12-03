const Card =({plant}) => {
return(
  <div className='container'>
    <ul>
      {plant.map(plant=>(
        <li key={plant.id}>
        <h1>{plant.data.name}</h1> 
          <h2>{plant.data.description}</h2>
        </li>
      ))}
    </ul>
  </div>

)}

export default Card