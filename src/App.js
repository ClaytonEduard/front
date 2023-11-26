
import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';

function App() {

  // criando um huk para pegar os estado do formulario
  const [btnCadastrar, setBtnCadastrar] = useState(true);

  const [produtos, setProdutos] = useState([]);

  //UseEffect = utilizado quando nosso componente é montado
  useEffect(() => {
    fetch("http://localhost:8080/listar")
      .then(retorno => retorno.json())
      .then(retorno_convertido => setProdutos(retorno_convertido));
  }, []);

  // retorno
  return (
    <div>
      <Formulario botao={btnCadastrar} />
      <Tabela vetor={produtos} />
    </div>
  );
}

export default App;
