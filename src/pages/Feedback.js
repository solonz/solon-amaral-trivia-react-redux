import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
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
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ player: { assertions, score } }) => ({
  assertions,
  score,
});

Feedback.propTypes = {
  assertions: propTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
