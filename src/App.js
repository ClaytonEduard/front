
import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';

function App() {

  // * objeto produto
  const produto = {
    codigo: 0,
    nome: '',
    marca: ''
  }

  //* UseState criando um huk para pegar os estado do formulario
  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [produtos, setProdutos] = useState([]);
  const [objProduto, setObjProduto] = useState(produto)


  //* UseEffect = utilizado quando nosso componente é montado
  useEffect(() => {
    fetch("http://localhost:8080/listar")
      .then(retorno => retorno.json())
      .then(retorno_convertido => setProdutos(retorno_convertido));
  }, []);

  // * Obtendo os dados do formulario
  const aoDigitar = (event) => {
    setObjProduto({ ...objProduto, [event.target.name]: event.target.value })
  }

  //* cadastrar produto
  const cadastrar = () => {
    fetch("http://localhost:8080/cadastrar", {
      method: 'post',
      body: JSON.stringify(objProduto),
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        if (retorno_convertido.mensagem !== undefined) {
          alert(retorno_convertido.mensagem)
        } else {
          //* passa o produto cadastrado para a lista de produtos
          setProdutos([...produtos, retorno_convertido])
          alert('Produto cadastrado com sucesso!')
          limparFormulario();
        }
      })
  }


  //* Remover produto
  const remover = () => {
    fetch("http://localhost:8080/remover/" + objProduto.codigo, {
      method: 'delete',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        //mensagem
        alert(retorno_convertido.mensagem)
        // copia do vetor de produtos
        let vetorTemp = [...produtos]; // copia original dos produtos

        // indice = retorna a posicao que foi removida do vetor
        let indice = vetorTemp.findIndex((p) => {
          return p.codigo === objProduto.codigo;
        });

        // remover produto do vetor temp
        vetorTemp.splice(indice, 1);

        // atualizar o vetro de produtos
        setProdutos(vetorTemp);

        // limpar formulario
        limparFormulario();
      })
  }



  //* Limpar formulario

  const limparFormulario = () => {
    setObjProduto(produto);
    setBtnCadastrar(true);
  }

  //* selecionar produto
  const selecionarProduto = (indice) => {
    setObjProduto(produtos[indice]);
    setBtnCadastrar(false);
  }

  //* retorno
  return (
    <div>
      <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrar} obj={objProduto} cancelar={limparFormulario} remover={remover} />
      <Tabela vetor={produtos} selecionar={selecionarProduto} />
    </div>
  );
}

export default App;
