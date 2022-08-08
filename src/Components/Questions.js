import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class Questions extends Component {
  answers = () => {
    const { questions: { results } } = this.props;
    /* const answers = [results.correct_answer, ...results.incorrect_answers]; */
    console.log(typeof results);
  }

  render() {
    const { questions } = this.props;
    this.answers();
    return (
      <div>
        <aside>
          <p>
            {/*         { questions.results.question } */}
          </p>
        </aside>
        <div />
        <aside />
      </div>
    );
  }
}
