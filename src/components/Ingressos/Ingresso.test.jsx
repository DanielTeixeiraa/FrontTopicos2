import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Ingressos from './Ingressos';
import axios from 'axios';

jest.mock('axios');

describe('Componente Ingressos', () => {
  beforeEach(() => {
    axios.get.mockResolvedValueOnce({
      data: [
        {
          id: 1,
          nome: 'Evento 1',
          data: '2023-09-15',
          localizacao: 'Local 1',
        },
        {
          id: 2,
          nome: 'Evento 2',
          data: '2023-09-20',
          localizacao: 'Local 2',
        },
      ],
    });

    axios.get.mockResolvedValueOnce({
      data: [
        {
          id: 1,
          idEvento: 1,
          preco: 50,
        },
        {
          id: 2,
          idEvento: 2,
          preco: 60,
        },
      ],
    });
  });

  it('renderiza sem falhas', () => {
    render(<Ingressos />);
  });

  it('busca e exibe ingressos', async () => {
    render(<Ingressos />);

    // Aguarde a conclusão das chamadas à API
    await waitFor(() => {
      expect(screen.getByText('Evento 1')).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.getByText('Evento 2')).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.getByText('R$ 50.00')).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.getByText('R$ 60.00')).toBeInTheDocument();
    });
  });

  it('abre e fecha o modal de adicionar ingresso', () => {
    render(<Ingressos />);
    
    fireEvent.click(screen.getByText('Adicionar Novo Ingresso'));
    
    expect(screen.getByText('Adicionar Ingresso')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Fechar'));
    
    expect(screen.queryByText('Adicionar Ingresso')).toBeNull();
  });

  it('abre e fecha o modal de edição de ingresso', () => {
    render(<Ingressos />);
    
    fireEvent.click(screen.getByText('Atualizar'));
    
    expect(screen.getByText('Editar Ingresso')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Fechar'));
    
    expect(screen.queryByText('Editar Ingresso')).toBeNull();
  });

  it('abre e fecha o modal de exclusão de ingresso', () => {
    render(<Ingressos />);
    
    fireEvent.click(screen.getByText('Excluir'));
    
    expect(screen.getByText('Excluir Ingresso')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Cancelar'));
    
    expect(screen.queryByText('Excluir Ingresso')).toBeNull();
  });
});
