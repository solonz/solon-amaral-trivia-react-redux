<<<<<<< HEAD
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
=======
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { screen, waitForElementToBeRemoved, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import App from "../App";

describe('Testes do game',  () => {
  test('testa se os itens estão na tela' +
  'e se o timer volta o countdown no 30', async () => {

   renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('input-gravatar-email');
    const nameInput = screen.getByTestId('input-player-name');
    const playButton = screen.getByTestId('btn-play');

    userEvent.type(emailInput, 'email@gmail.com');
    userEvent.type(nameInput, 'name');
    userEvent.click(playButton);

    await waitForElementToBeRemoved(nameInput);

    const loading = screen.getByTestId('loading');
    
    await waitForElementToBeRemoved(loading);

    const correct_answer = screen.getByTestId('correct-answer');
    const questionCategory = screen.getByTestId('question-category');
    const questionText = screen.getByTestId('question-text');
    const timer = screen.getByTestId('timer');
    expect(correct_answer).toBeInTheDocument();
    expect(questionCategory).toBeInTheDocument();
    expect(questionText).toBeInTheDocument();
    expect(timer).toBeInTheDocument();


    userEvent.click(correct_answer);
    const next = screen.getByTestId('btn-next');
    expect(next).toBeInTheDocument();
    expect(correct_answer).toHaveProperty('className', 'correct');
    userEvent.click(next);
    expect(timer.innerHTML).toBe('30');


    
});
test('', async ()=>{
    jest.useFakeTimers();

    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('input-gravatar-email');
    const nameInput = screen.getByTestId('input-player-name');
    const playButton = screen.getByTestId('btn-play');

    userEvent.type(emailInput, 'email@gmail.com');
    userEvent.type(nameInput, 'name');
    userEvent.click(playButton);

    await waitForElementToBeRemoved(nameInput);

    const loading = screen.getByTestId('loading');
    
    await waitForElementToBeRemoved(loading);
    const correct_answer = screen.getByTestId('correct-answer');

    await waitFor(()=>{
      jest.advanceTimersByTime(31000);
      expect(correct_answer).toBeDisabled();
    })


})
>>>>>>> e80a25aaf03cceee5dd116bdbe0f808ffa0343d4
});