import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Eventos from './Eventos';
import axios from 'axios';

jest.mock('axios');

describe('Componente de Eventos', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
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
  });

  it('renderiza sem falhas', () => {
    render(<Eventos />);
  });

  it('busca e exibe eventos', async () => {
    render(<Eventos />);

    // Aguarde a conclusão da chamada à API
    await waitFor(() => {
      expect(screen.getByText('Evento 1')).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.getByText('Evento 2')).toBeInTheDocument();
    });
  });

  it('abre e fecha o modal de adicionar evento', () => {
    render(<Eventos />);
    

    fireEvent.click(screen.getByText('Adicionar Novo Item'));
    
    expect(screen.getByText('Adicionar Evento')).toBeInTheDocument();
    

    fireEvent.click(screen.getByText('Fechar'));
    
    expect(screen.queryByText('Adicionar Evento')).toBeNull();
  });

});
