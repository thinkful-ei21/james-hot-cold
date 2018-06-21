import React from 'react';

import Header from './header';
import GuessSection from './guess-section';
import GuessCount  from './guess-count';
import GuessList from './guess-list';

export default class Game extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            guesses: [],
            feedback: 'Take a guess!',
            // secretNum: Math.round(Math.random()*100)
            secretNum: 4
        }

        this.submit = this.submit.bind(this);
    }

    submit(e){
        e.preventDefault()
        const guess = (e.target.userGuess.value);

        if (!this.state.guesses.includes(guess)) {
            this.compareNumbers(guess);
            this.setState({
                guesses: this.state.guesses.concat(guess)
            })
        } else {
            alert('You\'ve already guessed that number!');
        }
    }

    compareNumbers(guess){
        if (guess < this.state.secretNum) {
            this.setState({ ...this.state, feedback: 'cold' });
        }
    }

    render() {
        return (
            <div>
                <Header />
                <GuessSection feedback={this.state.feedback} submit={this.submit}/>
                <GuessCount count={this.state.guesses.length} />
                <GuessList guesses={this.state.guesses} />
            </div>
        );
    };
}

