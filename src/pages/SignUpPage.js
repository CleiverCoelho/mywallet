import { Link } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import React from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../url/baseUrl"
import { ThreeDots } from "react-loader-spinner"

export default function SignUpPage() {

  const [form, setForm] = React.useState({nome: "", email: "", senha: "", confirmaSenha: ""})
  const navigate = useNavigate();
  const [carregando, setCarregando] = React.useState(false)

  function atualizaForm(event){
    setForm({...form, [event.target.name]: event.target.value})
  }

  function efetuarCadastro(event){
    event.preventDefault();
    setCarregando(true)

    if(form.senha !== form.confirmaSenha) return alert("senhas diferentes!")

    const body = {
        email: form.email,
        nome: form.nome,
        senha: form.senha
    }

    axios.post(`${BASE_URL}/cadastro`, body)
    .then((res) => {
      navigate("/")
      setCarregando(false);
    })
    .catch((err) => {
        alert(err.response.data);
        navigate('/');
        setCarregando(false);
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
        <button disabled={carregando} type="submit">{carregando ? <ThreeDots 
                        height="40" 
                        width="40" 
                        radius="9"
                        color="white" 
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                    /> : "Cadastrar"}</button>
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
  button {
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
  }
`
