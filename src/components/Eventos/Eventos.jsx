import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import Header2 from '../Header/Header2';
import axios from 'axios';
import { apiEventos, endpoint } from '../../API/SistemAPI';
import './Eventos.css';


const API_Url = endpoint + apiEventos;

function Eventos() {
    const [eventos, setEventos] = useState([]);
    const [eventoParaEditar, setEventoParaEditar] = useState(null);
    const [eventoParaExcluir, setEventoParaExcluir] = useState(null);
    const [showAdicionarEventoModal, setShowAdicionarEventoModal] = useState(false);
    const [novoEvento, setNovoEvento] = useState({
        nome: '',
        data: '',
        localizacao: '',
    });

    useEffect(() => {
        axios.get(API_Url)
            .then((response) => {
                setEventos(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const abrirModalEditar = (evento) => {
        setEventoParaEditar(evento);
    };

    const fecharModalEditar = () => {
        setEventoParaEditar(null);
    };

    const abrirModalExcluir = (evento) => {
        setEventoParaExcluir(evento);
    };

    const fecharModalExcluir = () => {
        setEventoParaExcluir(null);
    };

   const atualizarEvento = () => {
        if (!eventoParaEditar) {
            return;
        }

        axios.put(`${API_Url}/${eventoParaEditar.id}`, eventoParaEditar)
            .then((response) => {
                console.log('Evento atualizado com sucesso', response.data);
                fecharModalEditar();
            })
            .catch((error) => {
                console.error('Erro ao atualizar o evento', error);
            });
    };


    const excluirEvento = () => {
        if (!eventoParaExcluir) {
            return;
        }

        axios.delete(`${API_Url}/${eventoParaExcluir.id}`)
            .then((response) => {
                console.log('Evento excluído com sucesso', response.data);
                fecharModalExcluir();
            })
            .catch((error) => {
                console.error('Erro ao excluir o evento', error);
            });
    };

    const abrirModalAdicionarEvento = () => {
        setShowAdicionarEventoModal(true);
    };

    const fecharModalAdicionarEvento = () => {
        setShowAdicionarEventoModal(false);
    };

    const adicionarEvento = () => {
        axios.post(API_Url, novoEvento)
            .then((response) => {
                console.log('Evento adicionado com sucesso', response.data);
                fecharModalAdicionarEvento();
                // Você pode atualizar a lista de eventos aqui
            })
            .catch((error) => {
                console.error('Erro ao adicionar o evento', error);
            });
    };

    return (
        <div>
            <Header2 />
            <section className="eventos container">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Data</th>
                            <th>Localização</th>
                            <th>Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventos.map((evento) => (
                            <tr key={evento.id}>
                                <td>{evento.id}</td>
                                <td>{evento.nome}</td>
                                <td>{evento.data}</td>
                                <td>{evento.localizacao}</td>
                                <td>
                                    <Button
                                        variant='info'
                                        onClick={() => abrirModalEditar(evento)}>
                                        Atualizar
                                    </Button>
                                    <Button
                                        variant='danger'
                                        onClick={() => abrirModalExcluir(evento)}>
                                        Excluir
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Button className="add-button" onClick={abrirModalAdicionarEvento}>
                    Adicionar Novo Item
                </Button>
            </section>

            <Modal show={showAdicionarEventoModal} onHide={fecharModalAdicionarEvento}>
                <Modal.Header closeButton>
                    <Modal.Title>Adicionar Evento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="nome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                value={novoEvento.nome}
                                onChange={(e) => setNovoEvento({ ...novoEvento, nome: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="data">
                            <Form.Label>Data</Form.Label>
                            <Form.Control
                                type="text"
                                value={novoEvento.data}
                                onChange={(e) => setNovoEvento({ ...novoEvento, data: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="localizacao">
                            <Form.Label>Localização</Form.Label>
                            <Form.Control
                                type="text"
                                value={novoEvento.localizacao}
                                onChange={(e) => setNovoEvento({ ...novoEvento, localizacao: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={fecharModalAdicionarEvento}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={adicionarEvento}>
                        Adicionar Evento
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={!!eventoParaEditar} onHide={fecharModalEditar}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Evento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="nome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                value={eventoParaEditar?.nome}
                                onChange={(e) => setEventoParaEditar({ ...eventoParaEditar, nome: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="data">
                            <Form.Label>Data</Form.Label>
                            <Form.Control
                                type="text"
                                value={eventoParaEditar?.data}
                                onChange={(e) => setEventoParaEditar({ ...eventoParaEditar, data: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group controlId="localizacao">
                            <Form.Label>Localização</Form.Label>
                            <Form.Control
                                type="text"
                                value={eventoParaEditar?.localizacao}
                                onChange={(e) => setEventoParaEditar({ ...eventoParaEditar, localizacao: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={fecharModalEditar}>
                        Fechar
                    </Button>
                    <Button variant='primary' onClick={atualizarEvento}>
                        Salvar Alterações
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={!!eventoParaExcluir} onHide={fecharModalExcluir}>
                <Modal.Header closeButton>
                    <Modal.Title>Excluir Evento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Tem certeza de que deseja excluir este evento?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={fecharModalExcluir}>
                        Cancelar
                    </Button>
                    <Button variant='danger' onClick={excluirEvento}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Eventos;
