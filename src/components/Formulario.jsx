import {useState, useEffect} from 'react'
import Error from './Error'

const Formulario = ({agregarPaciente, paciente}) => {
  const [ cliente, setCliente ] = useState({
    mascota:'',
    propietario:'',
    email:'',
    alta:'',
    sintomas:''
  })
  const [error, setError] = useState(false)

  useEffect( () => {
    if(Object.keys(paciente).length > 0){
      setCliente(paciente)
    }
  }, [paciente])

  const handleChange = (e) => {
    const clienteUpdate = {...cliente}
    clienteUpdate[e.target.id] = e.target.value
    setCliente(clienteUpdate)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validacion formulario
    if (Object.values(cliente).some( campo => campo == '')){
      console.log('Hay el menos un campo vacio')
      setError(true)
      return
    }
    setError(false)

    agregarPaciente(cliente)

    setCliente({
      mascota:'',
      propietario:'',
      email:'',
      alta:'',
      sintomas:''
    })

  }
  return (
    <div className="md:w-1/2 lg:w-2/5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {''}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>
      <form 
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
      >
        {error && <Error>Todos los campos son obligatorios</Error>}
        <div className="mb-5">
          <label
            htmlFor="mascota"
            className="block text-gray-700 uppercase font-bold"
          >Nombre Mascota</label>
          <input 
            id="mascota"
            type="text" 
            placeholder="Nombre de la mascota" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            onChange={(e) => handleChange(e)}
            value={cliente.mascota}
          />
        </div >
        <div className="mb-5">
          <label
            htmlFor="propietario"
            className="block text-gray-700 uppercase font-bold"
          >Nombre Propietario</label>
          <input 
            id="propietario"
            type="text" 
            placeholder="Nombre del propietario" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            onChange={(e) => handleChange(e)}
            value={cliente.propietario}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block text-gray-700 uppercase font-bold"
          >Email</label>
          <input 
            id="email"
            type="email" 
            placeholder="Email de Contacto propietario" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            onChange={(e) => handleChange(e)}
            value={cliente.email}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="alta"
            className="block text-gray-700 uppercase font-bold"
          >Alta</label>
          <input 
            id="alta"
            type="date" 
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            onChange={(e) => handleChange(e)}
            value={cliente.alta}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="sintomas"
            className="block text-gray-700 uppercase font-bold"
          >Sintomas</label>
          <textarea
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Describe los sintomas"
            onChange={(e) => handleChange(e)}
            value={cliente.sintomas}
          />
        </div>
        <input 
          type="submit" 
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors " 
          value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'} 
        />
      </form>
    </div>
  )
}

export default Formulario