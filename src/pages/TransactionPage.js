import styled from "styled-components"
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import axios from "axios";
import { BASE_URL } from "../url/baseUrl";
import { ThreeDots } from "react-loader-spinner";

export default function TransactionsPage() {

  const {tipo} = useParams();
  const navigate = useNavigate();
  const [carregando, setCarregando] = React.useState(false);
  const [form, setForm] = React.useState({valor: "", descricao: ""})

  function atualizaForm (event){
    setForm({ ...form, [event.target.name]: event.target.value})
  }

  function realizarTransacao(event){
    event.preventDefault();
    setCarregando(true);

    const config = {
      headers: { "Authorization": `Bearer ${localStorage.getItem("TOKEN")}`}
    }

    const body = {valor: form.valor, descricao: form.descricao}

    axios.post(`${BASE_URL}/nova-transacao/${tipo}`, body , config)
    .then((res) => {
      alert("transacao realizada com sucesso")
      navigate('/home');
      setCarregando(false);
    })
    .catch((err) => {
      console.log(err.response)
      setCarregando(false);
      alert(err.response.data);
    })
  }

  return (
    <TransactionsContainer>
      <h1>Nova {tipo}</h1>
      <form onSubmit={realizarTransacao}>
        <input 
          placeholder="Valor" 
          type="text" 
          name="valor" 
          value={form.valor}
          onChange={(event) => atualizaForm(event)}/>
        <input 
          placeholder="Descrição" 
          type="text" 
          name="descricao" 
          value={form.descricao}
          onChange={(event) => atualizaForm(event)}
          />
        <button disabled={carregando} type="submit">{carregando ? <ThreeDots 
                        height="40" 
                        width="40" 
                        radius="9"
                        color="white" 
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                    /> : `Salvar ${tipo}`}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
  button {
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
  }
`
