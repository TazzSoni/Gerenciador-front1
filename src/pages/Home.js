import React, { useState, useEffect } from 'react';
import { Row, Container } from 'react-bootstrap'
import CardsTop from '../components/CardsTop/CardsTop'
import CardsMid from '../components/CardsMid/CardsMid';
import Navbar from '../components/NavBar/Navbar'
import DataProvider from '../Services/DataProvider'


function Home() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    async function getUsuario() {
      const pageAdress = "/pessoa/" + localStorage.getItem('login')
      const newUsuario = await DataProvider.get(pageAdress)
      localStorage.setItem('user-name', newUsuario.data.nome)
      setUsuario(newUsuario.data);
    }
    getUsuario();
  }, []);

  if (!usuario) {
    return null
  }

  return (
    <>
      <Navbar nome={usuario.nome} />
      <div className="home" >
        <Container className="conatiner">
          <Row>
            <CardsTop usuario={usuario}></CardsTop>
          </Row>
          <Row>
            <CardsMid></CardsMid>
            <CardsMid></CardsMid>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Home;
