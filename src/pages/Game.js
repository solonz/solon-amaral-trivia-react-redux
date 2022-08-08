import React, { Component } from 'react';
import propTypes from 'prop-types';
import { getQuestions } from '../services/api';
import Questions from '../Components/Questions';

export default class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      id: '',
    };
  }

  lordHaveMercy = async () => {
    const FAILED_CODE = 3;
    const returnedQuestions = await getQuestions();
    const { history } = this.props;
    if (returnedQuestions.response_code === FAILED_CODE) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      this.setState({
        questions: returnedQuestions,
      });
    }
  }

  render() {
    const { questions } = this.state;
    return (
      <div>
        <Questions questions={ questions.length === 0 ? 'não estou aqui' : questions } />
      </div>

    );
  }
}

Game.propTypes = {
  history: propTypes.objectOf(propTypes.any).isRequired,
};
