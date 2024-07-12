import React, { Component } from 'react';
<<<<<<< HEAD
import propTypes from 'prop-types';
import Header from '../components/Header';
import { getQuestions } from '../services/api';
import Questions from '../components/Questions';

export default class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
=======
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getTriviaApi from '../services/triviaAPI';
import Questions from '../components/Questions';
import Header from '../components/Header';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      questions: [],
      index: 0,
>>>>>>> e80a25aaf03cceee5dd116bdbe0f808ffa0343d4
    };
  }

  componentDidMount() {
<<<<<<< HEAD
    this.lordHaveMercy();
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
        questions: returnedQuestions.results,
      });
    }
  }

  render() {
    const { questions } = this.state;
    return (
      <div>
        <Header />
        {questions.length > 0 && <Questions
          questions={ questions }
        />}
      </div>
=======
    this.questionsExecute();
  }

  questionsExecute = async () => {
    const { history } = this.props;
    const result = await getTriviaApi(localStorage.getItem('token'));
    const error = 3;
    if (result.response_code === error) history.push('/');
    else this.setState({ questions: result.results });
  }

  handleNext = () => {
    const { history } = this.props;
    const { index } = this.state;
    const endOfArray = 3;
    this.setState((prevState) => {
      if (index > endOfArray) history.push('/feedback');
      return { index: prevState.index + 1 };
    });
  }

  render() {
    const { questions, index } = this.state;
    const endOfArray = 4;
    return (
      <section>
        <Header />
        {(questions
          .length !== 0 && index <= endOfArray) ? <Questions
            question={ questions[index] }
            handleNext={ this.handleNext }
          />
          : <p data-testid="loading">Carregando</p>}
      </section>
>>>>>>> e80a25aaf03cceee5dd116bdbe0f808ffa0343d4
    );
  }
}

<<<<<<< HEAD
Game.propTypes = {
  history: propTypes.objectOf(propTypes.any).isRequired,
};
=======
const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Game);
>>>>>>> e80a25aaf03cceee5dd116bdbe0f808ffa0343d4
