import PropTypes from 'prop-types';
import React from 'react';

class Ranking extends React.Component {
    initialPageButton = () => {
      const { history } = this.props;
      history.push('/');
    }

    render() {
      return (
        <form>
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
