import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import getTriviaApi from '../services/triviaAPI';
import Questions from '../components/Questions';

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

  render() {
    const { questions, index } = this.state;
    const { gravatarEmail, name } = this.props;
    const hash = md5(gravatarEmail).toString();
    return (
      <section>
        <header>
          <img
            src={ `https://www.gravatar.com/avatar/${hash}` }
            data-testid="header-profile-picture"
            alt="avatar do usuário"
          />
          <span
            data-testid="header-player-name"
          >
            { name }
          </span>
          <span
            data-testid="header-score"
          >
            { 0 }
          </span>
        </header>
        {questions
          .length !== 0 ? <Questions question={ questions[index] } /> : <p>Carregando</p>}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
