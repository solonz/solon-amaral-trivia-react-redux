import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Requisito "(5-11)" GAME ', () => {
  test('testa se ao logar o usuario é redirecionado para página de game', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId('input-gravatar-email');
    const nameInput = screen.getByTestId('input-player-name');
    const buttonInput = screen.getByTestId('btn-play');
    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(nameInput, 'qualquer nome');
    userEvent.click(buttonInput);
    await waitFor( () => {
      const rota = history.location.pathname;
      const userName = screen.queryByTestId("header-player-name");
      expect(rota).toBe('/game');
      expect(userName).toBeInTheDocument();
    });
  });
});
