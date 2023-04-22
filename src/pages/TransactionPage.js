import styled from "styled-components"
import { useParams } from "react-router-dom";
import React from "react";

export default function TransactionsPage() {

  const {tipo} = useParams();
  const [form, setForm] = React.useState({valor: "", descricao: ""})

  function atualizaForm (event){
    setForm({ ...form, [event.target.name]: event.target.value})
  }

  function realizarTransacao(event){
    event.preventDefault();

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
        <button type="submit">Salvar {tipo}</button>
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
`
