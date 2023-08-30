import { useState, useEffect } from "react"
import Formulario from "./components/Formulario"
import Header from "./components/Header"
import ListadoPacientes from "./components/ListadoPacientes"


function App() {
  const [pacientes, setPacientes] = useState(JSON.parse(localStorage.getItem('pacientes')) ?? [])
  const [paciente, setPaciente] = useState({})


  useEffect( () => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes))
  },[pacientes])

  const generarId = () => {
    const random = Math.random().toString(36).substring(2)
    const fecha = Date.now().toString(36)
  
    return fecha + random
  }

  const agregarPaciente = (nuevoPaciente) => {
    if(nuevoPaciente.id){
      const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === nuevoPaciente.id ? nuevoPaciente : pacienteState)
      setPacientes(pacientesActualizados)
    } else {
      nuevoPaciente.id = generarId()
      setPacientes([nuevoPaciente, ...pacientes])
    }
  }

  const eliminarPaciente = (id) => {
    const pacientesActualizados = pacientes.filter(pacienteState => pacienteState.id !== id)
    setPacientes(pacientesActualizados)
  }

  return (
    <div className="container mx-auto my-20">
      <Header />
      <div className="mt-12 md:flex">
        <Formulario
          agregarPaciente={agregarPaciente} 
          paciente={paciente}
        />
        <ListadoPacientes
          pacientes={pacientes}
          setPaciente={setPaciente}
          eliminarPaciente={eliminarPaciente}
        />
      </div>
    </div>
  )
}

export default App
