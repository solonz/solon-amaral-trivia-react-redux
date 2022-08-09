import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();
    this.returnFeedback = this.returnFeedback.bind(this);
  }

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
      </div>
    );
  }

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
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,

};

export default connect(mapStateToProps, null)(Feedback);
