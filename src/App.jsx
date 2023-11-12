import { Buscador } from "./components/Buscador"
import { Lista } from "./components/Lista"
import { Logo } from "./components/Logo"
import { Title } from "./components/Title"
import "./styles/app.css"

function App() {


  return (
    <div className="container-main">      
      <Title></Title>
       <Buscador></Buscador>  
       <Logo></Logo>   
       <Lista></Lista>
    </div>
  )
}

export default App
