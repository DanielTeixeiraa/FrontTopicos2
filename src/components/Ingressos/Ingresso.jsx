import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Dropdown } from 'react-bootstrap'; 
import Header2 from '../Header/Header2';
import axios from 'axios';
import { apiEventos, apiIngressos, endpoint } from '../../API/SistemAPI'; 
import './Ingresso.css'; 

const API_Eventos_Url = endpoint + apiEventos; 
const API_Ingressos_Url = endpoint + apiIngressos; 

function Ingressos() {
    const [eventos, setEventos] = useState([]); 
    const [ingressos, setIngressos] = useState([]); 
    const [ingressoParaEditar, setIngressoParaEditar] = useState(null);
    const [ingressoParaExcluir, setIngressoParaExcluir] = useState(null);
    const [showAdicionarIngressoModal, setShowAdicionarIngressoModal] = useState(false);
    const [novoIngresso, setNovoIngresso] = useState({
        idEvento: null, // Alterado para null, você pode definir como o valor de um evento selecionado
        preco: 0,
    });

    useEffect(() => {
        axios.get(API_Eventos_Url)
            .then((response) => {
                setEventos(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        axios.get(API_Ingressos_Url)
            .then((response) => {
                setIngressos(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const abrirModalEditar = (ingresso) => {
        setIngressoParaEditar(ingresso);
    };

    const fecharModalEditar = () => {
        setIngressoParaEditar(null);
    };

    const abrirModalExcluir = (ingresso) => {
        setIngressoParaExcluir(ingresso);
    };

    const fecharModalExcluir = () => {
        setIngressoParaExcluir(null);
    };

    const buscarNomeDoEvento = (idEvento) => {
      const eventoEncontrado = eventos.find((evento) => evento.id === idEvento);
      return eventoEncontrado ? eventoEncontrado.nome : 'Evento não encontrado';
    };

    const atualizarIngresso = () => {
        if (!ingressoParaEditar) {
            return;
        }

        axios.put(`${API_Ingressos_Url}/${ingressoParaEditar.id}`, ingressoParaEditar)
            .then((response) => {
                console.log('Ingresso atualizado com sucesso', response.data);
                fecharModalEditar();
            })
            .catch((error) => {
                console.error('Erro ao atualizar o ingresso', error);
            });
    };

    const excluirIngresso = () => {
        if (!ingressoParaExcluir) {
            return;
        }

        axios.delete(`${API_Ingressos_Url}/${ingressoParaExcluir.id}`)
            .then((response) => {
                console.log('Ingresso excluído com sucesso', response.data);
                fecharModalExcluir();
            })
            .catch((error) => {
                console.error('Erro ao excluir o ingresso', error);
            });
    };

    const abrirModalAdicionarIngresso = () => {
        setShowAdicionarIngressoModal(true);
    };

    const fecharModalAdicionarIngresso = () => {
        setShowAdicionarIngressoModal(false);
    };

    const adicionarIngresso = () => {
        axios.post(API_Ingressos_Url, novoIngresso)
            .then((response) => {
                console.log('Ingresso adicionado com sucesso', response.data);
                fecharModalAdicionarIngresso();
                // Você pode atualizar a lista de ingressos aqui
            })
            .catch((error) => {
                console.error('Erro ao adicionar o ingresso', error);
            });
    };

    return (
        <div>
            <Header2 />
            <section className="ingressos container">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Evento</th>
                            <th>Preço</th>
                            <th>Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ingressos.map((ingresso) => (
                            <tr key={ingresso.id}>
                                <td>{ingresso.id}</td>
                                <td>{buscarNomeDoEvento(ingresso.idEvento)}</td>
                                <td>{ingresso.preco}</td>
                                <td>
                                    <Button
                                        variant='info'
                                        onClick={() => abrirModalEditar(ingresso)}>
                                        Atualizar
                                    </Button>
                                    <Button
                                        variant='danger'
                                        onClick={() => abrirModalExcluir(ingresso)}>
                                        Excluir
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Button className="add-button" onClick={abrirModalAdicionarIngresso}>
                    Adicionar Novo Ingresso
                </Button>
            </section>

            <Modal show={showAdicionarIngressoModal} onHide={fecharModalAdicionarIngresso}>
                <Modal.Header closeButton>
                    <Modal.Title>Adicionar Ingresso</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="evento">
                            <Form.Label>Evento</Form.Label>
                            <Dropdown> {/* Dropdown para selecionar o evento */}
                                <Dropdown.Toggle variant="success" id="dropdown-evento">
                                    {novoIngresso.idEvento === null ? 'Selecione um Evento' : eventos.find((evento) => evento.id === novoIngresso.idEvento)?.nome}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {eventos.map((evento) => (
                                        <Dropdown.Item
                                            key={evento.id}
                                            onClick={() => setNovoIngresso({ ...novoIngresso, idEvento: evento.id })}
                                        >
                                            {evento.nome}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Form.Group>
                        <Form.Group controlId="preco">
                            <Form.Label>Preço</Form.Label>
                            <Form.Control
                                type="number"
                                value={novoIngresso.preco}
                                onChange={(e) => setNovoIngresso({ ...novoIngresso, preco: parseFloat(e.target.value) })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={fecharModalAdicionarIngresso}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={adicionarIngresso}>
                        Adicionar Ingresso
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={!!ingressoParaEditar} onHide={fecharModalEditar}>
  <Modal.Header closeButton>
    <Modal.Title>Editar Ingresso</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group controlId="evento">
        <Form.Label>Evento</Form.Label>
        <Dropdown>
          {/* Dropdown para selecionar o evento */}
          <Dropdown.Toggle variant="success" id="dropdown-evento">
            {ingressoParaEditar && eventos.find((evento) => evento.id === ingressoParaEditar.idEvento)?.nome}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {eventos.map((evento) => (
              <Dropdown.Item
                key={evento.id}
                onClick={() => setIngressoParaEditar({ ...ingressoParaEditar, idEvento: evento.id })}
              >
                {evento.nome}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Form.Group>
      <Form.Group controlId="preco">
        <Form.Label>Preço</Form.Label>
        <Form.Control
          type="number"
          value={ingressoParaEditar?.preco || 0}
          onChange={(e) => setIngressoParaEditar({ ...ingressoParaEditar, preco: parseFloat(e.target.value) })}
        />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant='secondary' onClick={fecharModalEditar}>
      Fechar
    </Button>
    <Button variant='primary' onClick={atualizarIngresso}>
      Salvar Alterações
    </Button>
  </Modal.Footer>
</Modal>

            <Modal show={!!ingressoParaExcluir} onHide={fecharModalExcluir}>
                <Modal.Header closeButton>
                    <Modal.Title>Excluir Ingresso</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Tem certeza de que deseja excluir este ingresso?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={fecharModalExcluir}>
                        Cancelar
                    </Button>
                    <Button variant='danger' onClick={excluirIngresso}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Ingressos;