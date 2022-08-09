import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getTriviaApi from '../services/triviaAPI';
import Questions from '../components/Questions';
import Header from '../components/Header';
import { scoreAction } from '../redux/actions';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      index: 0,
    };
  }

  componentDidMount() {
    this.questionsExecute();
  }

  questionsExecute = async () => {
    const { history } = this.props;
    const result = await getTriviaApi(localStorage.getItem('token'));
    const error = 3;
    if (result.response_code === error) history.push('/');
    else this.setState({ questions: result.results });
  }

  handleScore = (difficulty, { target }) => {
    const { scoreDispatch } = this.props;
    const timer = Number(document.getElementById('timer').innerHTML);
    const summary = {
      hard: 3,
      medium: 2,
      easy: 1,
    };
    const CONSTANT = 10;
    const equation = CONSTANT + (timer * summary[difficulty]);
    if (target.className === 'correct') {
      scoreDispatch(equation);
    }
  }

  render() {
    const { questions, index } = this.state;

    return (
      <section>
        <Header />
        {questions
          .length !== 0 ? <Questions
            question={ questions[index] }
            handleScore={ this.handleScore }
          />
          : <p>Carregando</p>}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  scoreDispatch: (payload) => dispatch(scoreAction(payload)),
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  scoreDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
