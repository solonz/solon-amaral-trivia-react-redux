import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import App from '../App';
import Game from '../pages/Game';
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
  test('testa se uma pergunta é renderizada na tela', async () => {
    const initialState = { player: {
    nome: 'teste',
    assertions: '',
    score: 0,
    gravatarEmail: 'teste@teste.com',
    }};
    renderWithRouterAndRedux(<Game />, initialState);
    await waitFor(() => {
    const question = screen.queryByTestId('question-text');
    expect(question).toBeInTheDocument();
    })
  });
  test('testa se ao clicar na resposta uma className é setada', async () => {
    const initialState = { player: {
    nome: 'teste',
    assertions: '',
    score: 0,
    gravatarEmail: 'teste@teste.com',
    }};
    renderWithRouterAndRedux(<Game />, initialState);
    await waitFor(() => {
    const answer = screen.queryByTestId('correct-answer');
    userEvent.click(answer);
    expect(answer).toHaveClass('correct-answer')
    })
  });
  test('testa se ao clicar no botão de Next uma nova pergunta é renderizada', async () => {
    const initialState = { player: {
    nome: 'teste',
    assertions: '',
    score: 0,
    gravatarEmail: 'teste@teste.com',
    }};
    renderWithRouterAndRedux(<Game />, initialState);

    await waitFor(() => {
    const questionOld = screen.queryByTestId('question-text').textContent;
    const answer = screen.queryByTestId('correct-answer');
    userEvent.click(answer);
    const buttonNext = screen.getByText('Next');
    userEvent.click(buttonNext);
    const questionNew = screen.queryByTestId('question-text').textContent;
    expect(questionOld).not.toBe(questionNew);
    })
  });
  test('', () => {})
});