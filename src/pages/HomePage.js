import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import axios from "axios"
import { BASE_URL } from "../url/baseUrl"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import React from "react"
import { Link } from "react-router-dom"

export default function HomePage() {

  const navigate = useNavigate();

  let soma = 0;
  const [saldo, setSaldo] = React.useState(0)
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
      setTransacoes([res.data]);
    })
    .catch((err) => {
      console.log(err)
    })

}, []);

if(transacoes.length === 0){
  return (
      <>Loading...</>
  )
}

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
        <h1>Olá, Fulano</h1>
        <BiExit onClick={efetuarLogout}/>
      </Header>

      <TransactionsContainer>
        <ListaTransacoes>
          
        {transacoes.map((transacao, index) => {

          if(transacao.descricao === "saida"){
            soma -= transacao.valor;
          }else{
            soma += transacao.valor;
          }

          // if(index === transacoes.length - 1){
          //   setSaldo(soma);
          // }

          return (
            <ListItemContainer key={transacao._id}>
              <div>
                <span>{transacao.data}</span>
                <strong>{transacao.descricao}</strong>
              </div>
              <Value color={transacao.tipo}>{transacao.valor}</Value>
            </ListItemContainer>
          )
        })}
          

        </ListaTransacoes>

        <article>
          <strong>Saldo</strong>
          <Value color={saldo > 0? "entrada": "saida"}>${saldo}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <Link to={'/nova-transacao/entrada'}>
          <button>
            <AiOutlinePlusCircle />
            <p>Nova <br /> entrada</p>
          </button>
        </Link>
          
        <Link to={'/nova-transacao/saida'}>
          <button>
            <AiOutlinePlusCircle />
            <p>Nova <br /> saida</p>
          </button>
        </Link>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const ListaTransacoes = styled.ul`
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
  color: ${(props) => (props.color === "entrada" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`