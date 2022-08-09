import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();
    this.returnFeedback = this.returnFeedback.bind(this);
  }

  returnFeedback(phrase) {
    const { score, assertions } = this.props;
    return (
      <div>
        <Header />
        <p
          data-testid="feedback-text"
        >
          {phrase}
        </p>
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
        {this.returnFeedback('Well done!')}
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
