import styled from "styled-components"
import { Link } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useNavigate } from "react-router-dom"
import {BASE_URL} from "../url/baseUrl"
import React from "react"
import axios from "axios"
import { useEffect } from "react"

export default function SignInPage({setUserInfo}) {
  
  const navigate = useNavigate()
  const [form, setForm] = React.useState({email: "", senha: ""})
  
  useEffect ( () => {
    // para fazer a requisicao é precisao que esteja no formato
    localStorage.setItem("TOKEN", "");

}, []);

  function atualizaForm (event){
    setForm({ ...form, [event.target.name]: event.target.value})
  }

  function efetuarLogin(event){
        event.preventDefault();
        
        const body = {"email": form.email, "senha": form.senha }
        axios.post(`${BASE_URL}/`, body)
        .then((response) => {
            setUserInfo(response.data);
            console.log(response)
            localStorage.setItem("TOKEN", response.data.token);
            navigate('/home');
        })
        .catch((err) => {
            console.log(err);
            alert(err);
            // window.location.reload();
        })
    }

  return (
    <SingInContainer>
      <form onSubmit={efetuarLogin}>
        <MyWalletLogo />
        <input 
            placeholder="email"
            type="email"
            name="email"
            value={form.email}
            onChange={(event) => atualizaForm(event)}
            required    
        ></input>
        <input 
            placeholder="senha"
            type="password"
            name="senha"
            value={form.senha}
            onChange={(event) => atualizaForm(event)}
            required    
        ></input>
        <button type="submit">Entrar</button>
      </form>

      <Link to={"/cadastro"}>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
