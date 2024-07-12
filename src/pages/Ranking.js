<<<<<<< HEAD
import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class Ranking extends Component {
  state = {
    userRanking: [],
  }

  componentDidMount() {
    const teste = JSON.parse(localStorage.getItem('ranking'));
    this.setState({ userRanking: teste.sort((a, b) => b.score - a.score) });
  }

  render() {
    const { userRanking } = this.state;
    const { history } = this.props;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {
          userRanking.length > 0 && (
            <div>
              {
                userRanking.map((rank, index) => (
                  <div key={ index }>
                    <img
                      src={ rank.picture }
                      alt="gravatar"
                    />
                    <p
                      data-testid={ `player-name-${index}` }
                    >
                      { rank.name }
                    </p>
                    <p
                      data-testid={ `player-score-${index}` }
                    >
                      {rank.score}
                    </p>
                  </div>
                ))
              }
            </div>
          )
        }
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: propTypes.objectOf(propTypes.any),
}.isRequired;
=======
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Ranking extends Component {
    initialPageButton = () => {
      const { history } = this.props;
      history.push('/');
    }

    render() {
      return (
        <form>
          <h1 data-testid="ranking-title">Ranking</h1>
          <button
            data-testid="btn-go-home"
            type="submit"
            onClick={ this.initialPageButton }
          >
            Pagina inicial
          </button>
        </form>
      );
    }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
>>>>>>> e80a25aaf03cceee5dd116bdbe0f808ffa0343d4
