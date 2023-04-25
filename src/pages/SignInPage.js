import styled from "styled-components"
import { Link } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useNavigate } from "react-router-dom"
import React from "react"
import axios from "axios"
import { useEffect } from "react"
import { ThreeDots } from "react-loader-spinner"

export default function SignInPage({setUserInfo}) {
  
  const navigate = useNavigate()
  const [carregando, setCarregando] = React.useState(false);
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
        setCarregando(true);
        
        const body = {"email": form.email, "senha": form.senha }
        axios.post(`${process.env.REACT_APP_API_URL}/`, body)
        .then((response) => {
            setUserInfo(response.data);
            (response);
            localStorage.setItem("TOKEN", response.data.token);
            localStorage.setItem("NOME", response.data.nome)
            navigate('/home');
            setCarregando(false);
        })
        .catch((err) => {
            alert(err.response.data);
            setCarregando(false);
            navigate('/');
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
        <button disabled={carregando} type="submit">{carregando ? <ThreeDots 
                        height="40" 
                        width="40" 
                        radius="9"
                        color="white" 
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                    /> : "Entrar"}</button>
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

  button {
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
  }
`
