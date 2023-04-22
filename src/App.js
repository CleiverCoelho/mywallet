import { BrowserRouter, Routes, Route } from "react-router-dom"
import React from "react"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionsPage from "./pages/TransactionPage"
import UserContext from "./contexts/userContext"

export default function App() {

  const [userInfo, setUserInfo] = React.useState({});

  return (
    <UserContext.Provider value={{userInfo}}>
      <PagesContainer>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignInPage setUserInfo={setUserInfo}/>} />
            <Route path="/cadastro" element={<SignUpPage/>} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/nova-transacao/:tipo" element={<TransactionsPage />} />
          </Routes>
        </BrowserRouter>
      </PagesContainer>
    </UserContext.Provider>
  )
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`
