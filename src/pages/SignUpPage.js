import { Link } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import React from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../url/baseUrl"

export default function SignUpPage() {

  const [form, setForm] = React.useState({nome: "", email: "", senha: "", confirmaSenha: ""})
  const navigate = useNavigate();

  function atualizaForm(event){
    setForm({...form, [event.target.name]: event.target.value})
  }

  function efetuarCadastro(event){
    event.preventDefault();

    if(form.senha !== form.confirmaSenha) return alert("senhas diferentes!")

    const body = {
        email: form.email,
        nome: form.nome,
        senha: form.senha
    }

    axios.post(`${BASE_URL}/cadastro`, body)
    .then((res) => navigate("/"))
    .catch((err) => {
        alert(err.response);
        window.location.reload();
    })

}

  return (
    <SingUpContainer>
      <form onSubmit={efetuarCadastro}>
        <MyWalletLogo />
        <input 
            placeholder="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={(event) => atualizaForm(event)}
            required    
        ></input>
        <input 
            placeholder="Nome"
            type="text"
            name="nome"
            value={form.nome}
            onChange={(event) => atualizaForm(event)}
            required    
        ></input>
        <input 
            placeholder="Senha"
            type="password"
            name="senha"
            value={form.senha}
            onChange={(event) => atualizaForm(event)}
            required    
        ></input>
        <input
            placeholder="Confirme a senha"
            type="password"
            name="confirmaSenha"
            value={form.confirmaSenha}
            onChange={(event) => atualizaForm(event)}
            required    
        ></input>
        <button type="submit">Cadastrar</button>
      </form>

      <Link to={"/"}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
