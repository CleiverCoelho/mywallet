import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { SlClose } from "react-icons/sl";
import axios from "axios"
import { BASE_URL } from "../url/baseUrl"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import React from "react"
import { Link } from "react-router-dom"

export default function HomePage({nome}) {

  const navigate = useNavigate();

  let soma = 0;
  const [useEFControl, setUseEFControl] = React.useState([])
  const [checkSoma, setCheckSoma] = React.useState(false);
  const [saldo, setSaldo] = React.useState("")
  const [transacoes, setTransacoes] = React.useState([])

  useEffect ( () => {
    // para fazer a requisicao é precisao que esteja no formato
    if(localStorage.getItem("TOKEN") === "") {
      alert("token nao tem acesso");
      navigate('/');
    }
    const config = {
      headers: { "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`}
    }

    axios.get(`${BASE_URL}/home`, config)
    .then((res) => {
      setTransacoes([...res.data].reverse());
      // console.log((res.data));
    })
    .catch((err) => {
      alert(err.response.data);
    })

}, [useEFControl]);
function efetuarLogout(){
  const config = {
    headers: { "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`}
  }

  axios.post(`${BASE_URL}/home`, {}, config)
  .then((res) => {
    alert("Logout realizado com sucesso!");
    localStorage.setItem("TOKEN", "");
    navigate('/');
  })
}


  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {localStorage.getItem("NOME")}</h1>
        <BiExit onClick={efetuarLogout}/>
      </Header>

      <TransactionsContainer>
        <ListaTransacoes>
          <ul>
            {transacoes.map((transacao, index) => {

              const valorNumero = Number(transacao.valor)
              if(transacao.tipo === "saida"){
                soma -= valorNumero;
              }else{
                soma += valorNumero;
              }

              if((index === transacoes.length - 1) && !checkSoma){
                setSaldo(soma.toFixed(2));
                setCheckSoma(true);
                console.log(soma.toFixed(2));
              }

              return (
                <ListItemContainer 
                  key={transacao._id} 
                  id={transacao._id}
                  dia={transacao.dia}
                  descricao={transacao.descricao}
                  tipo={transacao.tipo}
                  valor={transacao.valor}
                  setUseEFControl={setUseEFControl}
                  setSaldo={setSaldo}
                  saldo={saldo}
                  >
                </ListItemContainer>
              )
            })}

            {!transacoes.length > 0 ? <>Não há registros de entrada ou saida</> : ""}
          </ul> 
        </ListaTransacoes>

        <article>
          <strong>Saldo</strong>
          <Value color={saldo > 0? "entrada": "saida"}>${saldo}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
          <button>
          <AiOutlinePlusCircle />
            <Link to={'/nova-transacao/entrada'}>
              <p>Nova <br /> entrada</p>
            </Link>
          </button>
          
          <button>
            <AiOutlinePlusCircle />
              <Link to={'/nova-transacao/saida'}>
                <p>Nova <br /> saida</p>
              </Link>
          </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

function ListItemContainer({id, dia, valor, tipo, descricao, setUseEFControl, setSaldo, saldo}) {
  const [idTransacao, setIdTransacao] = React.useState(id);

  const navigate = useNavigate();

  function excluirTransacao() {
    const config = {
      headers: { "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`}
    }
    
    if(!window.confirm("Deseja deletar transacao?")){
      return 
    }

    const novaLista = [1];
    axios.delete(`${BASE_URL}/transacoes/${idTransacao}`, config)
    .then((res) => {
      console.log("Transacao deletada realizado com sucesso!");
      setUseEFControl([...novaLista]);
      if(tipo === "entrada"){
        setSaldo((Number(saldo) - Number(valor.replace(",", "."))).toFixed(2))
      }else{
        setSaldo((Number(saldo) + Number(valor.replace(",", "."))).toFixed(2))
      }
    })
    .catch("nao foi possivel excluir transacao");
  }
  return (
    <ListItem>
      <div>
        <span>{dia}</span>
        <strong>{descricao}</strong>
      </div>
      <ValorExlcuir>
        <Value color={tipo}>{valor}</Value>
        <SlClose onClick={excluirTransacao}/>
      </ValorExlcuir>
    </ListItem>
  )

}

const ValorExlcuir = styled.div`
  display: flex;
  justify-content: space-around;
`

const TelaCarregando = styled.div`
  display: flex;
  justify-content: center;
  margin: auto auto;
  margin-top: 200%;
  align-items: center;
  width: 100%;
  height: 100%;
  div{
    margin-bottom: 1000px;
  }
`

const ListaTransacoes = styled.div`
  width: 100%;
  height: 65vh;
  overflow-y: scroll;
`

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  margin-right: 8px;
  color: ${(props) => (props.color === "entrada" ? "green" : "red")};
`
const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`