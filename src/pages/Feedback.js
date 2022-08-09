import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      score: 0,
      assertions: 0,
    };
    this.returnFeedback = this.returnFeedback.bind(this);
    this.setScoreAndAssertions = this.setScoreAndAssertions.bind(this);
  }

  componentDidMount() {
    this.setScoreAndAssertions();
  }

  setScoreAndAssertions() {
    const { score, assertions } = this.props;
    this.setState({
      score,
      assertions,
    });
  }

  returnFeedback(phrase) {
    const { score, assertions } = this.state;
    return (
      <div>
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
        {this.returnFeedback('Mandou bem!')}
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
