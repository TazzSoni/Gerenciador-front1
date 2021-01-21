import React, { useState, useEffect } from 'react';
import Navbar from '../../components/NavBar/Navbar'
import { Container, Row, Col, Button, Table, Form } from 'react-bootstrap'
import DataProvider from '../../Services/DataProvider'
import "./Contas.css"
import CrudContas from '../../components/ModalContas/CrudContas';
import { GiPayMoney } from "react-icons/gi";
import EditContas from '../../components/ModalContas/EditContas';

function Contas() {
  const [contas, setContas] = useState(null);
  const [evento, setEvento] = useState(null)

  useEffect(() => {
    async function getContas() {
      const newContas = await DataProvider.get("/conta/" + localStorage.getItem('login'))
      if (newContas) {
        setContas(newContas.data.map((d) => {
          return { select: false, id: d.id, valor: d.valor, descricao: d.descricao, data: d.data }
        }));
      }
    }
    getContas();
  }, [evento]);




  function callDeleteConta() {
    contas.forEach(deleteConta);
  }

  async function deleteConta(item) {
    if (item.select) {
      //implementar aqui a chamada no axios para exclusão
      const newContas = await DataProvider.excluir("/conta/" + localStorage.getItem('login') + "/" + item.id)
      if (newContas.status === 200) {
        setEvento(item)
        alert("excluido")
      } else {
        alert("Não excluido")
      }
    }
  }



  function renderContas() {
    if (!contas) {
      return null
    }
    return contas.map(conta =>
      <tr key={conta.id}>
        <td ><input
          onChange={event => {
            let checked = event.target.checked;
            setContas(
              contas.map(data => {
                if (conta.id === data.id) {
                  data.select = checked;
                }
                return data;
              })
            );
          }}
          type="checkbox"
          checked={conta.select} /></td>
        <td>{conta.descricao}</td>
        <td>{conta.data.split('T')[0]}</td>
        <td>{conta.valor}</td>
      </tr>
    )
  }

  return (
    <>
      <Navbar nome={localStorage.getItem('user-name')} />
      <Container fluid="sm" className="cont">
        <Row>
          <Col className="titulo">
            <label id="label">Contas</label>
            <GiPayMoney size={50} className="iconCard"></GiPayMoney>
          </Col>
          <Col ></Col>
          <Col ></Col>
          <Col >
            <Button variant="outline-info" id="bt3" onClick={callDeleteConta}>Excluir</Button>
            <EditContas conta={contas}></EditContas>
            <CrudContas ></CrudContas>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover variant="info">
              <thead>
                <tr>
                  <th><Form.Check disabled type="checkbox" /></th>
                  <th>Descrição</th>
                  <th>Data</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                {renderContas()}

              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Contas;
