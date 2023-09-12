import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Eventos from './Eventos';
import axios from 'axios';

jest.mock('axios');

describe('Eventos Component', () => {
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

  it('renders without crashing', () => {
    render(<Eventos />);
  });

  it('fetches and displays eventos', async () => {
    render(<Eventos />);

    // Wait for the API call to complete
    await waitFor(() => {
      expect(screen.getByText('Evento 1')).toBeInTheDocument();
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(screen.getByText('Evento 2')).toBeInTheDocument();
    });
  });

  it('opens and closes the adicionar evento modal', () => {
    render(<Eventos />);
    
    // Open modal
    fireEvent.click(screen.getByText('Adicionar Novo Item'));
    
    // Check if modal is open
    expect(screen.getByText('Adicionar Evento')).toBeInTheDocument();
    
    // Close modal
    fireEvent.click(screen.getByText('Fechar'));
    
    // Check if modal is closed
    expect(screen.queryByText('Adicionar Evento')).toBeNull();
  });

  // Add more tests for other functionalities as needed
});
