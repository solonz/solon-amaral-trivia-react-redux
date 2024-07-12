<<<<<<< HEAD
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';

import Feedback from '../pages/Feedback';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';



describe('Testa a página de Feedback', () => { 
 it('Testa se os elementos da página são exibidos', () => {
  const initialState = { player: {
    nome: 'teste',
    assertions: 2,
    score: 100,
    gravatarEmail: 'teste@teste.com',
    }}; 
    renderWithRouterAndRedux(<Feedback />, initialState);
    const displayedScore = screen.getByTestId('feedback-total-score');
    const displayedAssertions = screen.getByTestId('feedback-total-question');
    const displayedText = screen.getByTestId('feedback-text');
    expect(displayedScore.textContent).toBe('100');
    expect(displayedAssertions.textContent).toBe('2');
    expect(displayedText.textContent).toBe('Could be better...');
  });
 it('Testa se recebe "Wll Done!" quando há 4 assertions', () => {
  const initialState = { player: {
    nome: 'teste',
    assertions: 4,
    score: 100,
    gravatarEmail: 'teste@teste.com',
    }}; 
    renderWithRouterAndRedux(<Feedback />, initialState);
    const displayedText = screen.getByTestId('feedback-text');
    expect(displayedText.textContent).toBe('Well Done!');
  });
  it('Testa se os botões "Play Again" e "Ranking" redirecionam a página', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');
    const playAgainBtn = screen.getByTestId('btn-play-again');
    userEvent.click(playAgainBtn);
    const route = history.location.pathname;
      expect(route).toBe('/');
   });

  it('Testa se os botões "Play Again" e "Ranking" redirecionam a página', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');
    const rankingBtn = screen.getByTestId('btn-ranking');
    userEvent.click(rankingBtn);
    const route = history.location.pathname;
      expect(route).toBe('/ranking');
   });
=======
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { screen, waitForElementToBeRemoved, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import App from "../App";

describe('Testes da pagina de Feedback', ()=> {
  test('testa se os componentes estão na tela.', async () => {
    const { history } = renderWithRouterAndRedux(<App/>);
    history.push('/feedback')
    const feedbackText = screen.getByTestId('feedback-text');
    const feedbackTotalQuestion = screen.getByTestId('feedback-total-question');
    const feedbackTotalScore = screen.getByTestId('feedback-total-score');
    expect(feedbackText).toBeInTheDocument();
    expect(feedbackTotalQuestion).toBeInTheDocument();
    expect(feedbackTotalScore).toBeInTheDocument();
  });
  test('ao clicar em play again, retorna para o ínicio.', async () => {
    const { history } = renderWithRouterAndRedux(<App/>);
    history.push('/feedback');
    const playAgainButton = screen.getByTestId('btn-play-again');
    expect(playAgainButton).toBeInTheDocument();
    userEvent.click(playAgainButton);
    await waitFor(() => expect(history.location.pathname).toBe('/'))

  })
  test('ao clicar em ranking, redireciona para a página de ranking', async () => {
    const { history } = renderWithRouterAndRedux(<App/>);
    history.push('/feedback');
    const rankingButton = screen.getByTestId('btn-ranking');
    expect(rankingButton).toBeInTheDocument();
    userEvent.click(rankingButton);
    await waitFor(() => expect(history.location.pathname).toBe('/ranking'))

  })
>>>>>>> e80a25aaf03cceee5dd116bdbe0f808ffa0343d4
});