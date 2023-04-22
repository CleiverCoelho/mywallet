import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import axios from "axios"
import { BASE_URL } from "../url/baseUrl"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import React from "react"
import { Link } from "react-router-dom"
import { ThreeDots } from "react-loader-spinner"

export default function HomePage({nome}) {

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
      setTransacoes([...res.data].reverse());
      // console.log((res.data));
    })
    .catch((err) => {
      alert(err.response.data);
    })

}, []);
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


if(transacoes.length === 0){
  return (
    <TelaCarregando>
      <div>
        <ThreeDots 
          height="60" 
          width="60"
          radius="9"
          color="white" 
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div>
      
    </TelaCarregando>
  )
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

              if(transacao.descricao === "saida"){
                soma -= transacao.valor;
              }else{
                soma += transacao.valor;
              }
            
              return (
                <ListItemContainer key={transacao._id}>
                  <div>
                    <span>{transacao.dia}</span>
                    <strong>{transacao.descricao}</strong>
                  </div>
                  <Value color={transacao.tipo}>{transacao.valor}</Value>
                </ListItemContainer>
              )
            })}
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
  color: ${(props) => (props.color === "entrada" ? "green" : "red")};
`
const ListItemContainer = styled.li`
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