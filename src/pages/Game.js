import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getTriviaApi from '../services/triviaAPI';
import Questions from '../components/Questions';
import Header from '../components/Header';
import { assertionAction, scoreAction } from '../redux/actions';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      index: 0,
      assertions: 0,
      next: '',
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
    const { scoreDispatch, assertionDispatch } = this.props;
    const { assertions } = this.state;
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
      this.setState({
        assertions,
      });
      assertionDispatch(assertions);
    }
    this.setState({
      next: true,
    });
  }

  render() {
    const { questions, index, next } = this.state;
    const { gravatarEmail, name, score } = this.props;
    const hash = md5(gravatarEmail).toString();
    return (
      <section>
        <Header />
        {questions
          .length !== 0 ? <Questions
            question={ questions[index] }
            handleScore={ this.handleScore }
          />
          : <p>Carregando</p>}
        {
          (next) && (
            <button
              type="button"
              data-testid="btn-next"
            >
              Next
            </button>
          )
        }
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
  assertionDispatch: (payload) => dispatch(assertionAction(payload)),
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  scoreDispatch: PropTypes.func.isRequired,
  assertionDispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
