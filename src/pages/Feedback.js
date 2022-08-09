import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    const MAGICTHREE = 3;
    return (
      <div>
        <Header />
        <h1 data-testid="feedback-text">
          {
            assertions < MAGICTHREE ? 'Could be better...' : 'Well Done!'
          }
        </h1>
      </div>
    );
  }
}

const mapStateToProps = ({ player: { assertions } }) => ({
  assertions,
});

Feedback.propTypes = {
  assertions: propTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
