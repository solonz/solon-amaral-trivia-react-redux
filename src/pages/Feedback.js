<<<<<<< HEAD
import React, { Component } from 'react';
import propTypes from 'prop-types';
=======
import PropTypes from 'prop-types';
import React, { Component } from 'react';
>>>>>>> e80a25aaf03cceee5dd116bdbe0f808ffa0343d4
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
<<<<<<< HEAD
  resetGame = (path) => {
    const { history, dispatch } = this.props;
    const reset = {
      assertions: '',
      score: 0,
    };
    dispatch({ type: 'SCORE_ASSERTIONS_RESET', reset });
    history.push(path);
  }

  render() {
    const { assertions, score } = this.props;
    const MAGICTHREE = 3;
    return (
      <div>
        <Header />
        <h2 data-testid="feedback-total-question">{assertions}</h2>
        <h2 data-testid="feedback-total-score">{score}</h2>
        <h1 data-testid="feedback-text">
          {
            assertions < MAGICTHREE ? 'Could be better...' : 'Well Done!'
          }
        </h1>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => this.resetGame('/') }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => this.resetGame('/ranking') }
=======
  constructor() {
    super();
    this.returnFeedback = this.returnFeedback.bind(this);
  }

  playAgainBtn = () => {
    const { history } = this.props;
    history.push('/');
  };

  rankingPageBtn = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  returnFeedback() {
    const { score, assertions } = this.props;
    const THREE = 3;
    const caseWin = (

      <h1 data-testid="feedback-text">Well Done!</h1>

    );
    const caseLose = (

      <h1 data-testid="feedback-text">Could be better...</h1>

    );
    return (
      <div>
        <Header />
        <div>{ assertions >= THREE ? caseWin : caseLose }</div>
        <span>
          Você acertou
          <p data-testid="feedback-total-question">{ assertions }</p>
          questões.
        </span>
        <span>
          Com um total de
          <p data-testid="feedback-total-score">{ score }</p>
          pontos.
        </span>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.playAgainBtn }
        >

          Play again
        </button>
        <button
          data-testid="btn-ranking"
          type="button"
          onClick={ this.rankingPageBtn }
>>>>>>> e80a25aaf03cceee5dd116bdbe0f808ffa0343d4
        >
          Ranking
        </button>
      </div>
    );
  }
<<<<<<< HEAD
}

const mapStateToProps = ({ player: { assertions, score } }) => ({
  assertions,
  score,
});

Feedback.propTypes = {
  assertions: propTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
=======

  render() {
    return (
      <div>
        <h1>Feedback</h1>
        {this.returnFeedback()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
>>>>>>> e80a25aaf03cceee5dd116bdbe0f808ffa0343d4
