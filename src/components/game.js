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
            correctAnswer: Math.round(Math.random() * 100)
        }

        this.submit = this.submit.bind(this);
    }

    restartGame(){
        this.setState({
            guesses: [].sort(),
            feedback: 'Take a guess!',
            correctAnswer: Math.round(Math.random() * 100)
        })
    }

    submit(e){
        e.preventDefault()
        const guess = (e.target.userGuess.value);

        if (!this.state.guesses.includes(guess)) {
            const difference = Math.abs(guess - this.state.correctAnswer);

            var feedback;
            if (difference >= 50) {
                feedback = 'cold';
            } else if (difference >= 20) {
                feedback = 'Getting warmer';
            } else if (difference >= 10) {
                feedback = 'Getting hot';
            } else if (difference >= 1) {
                feedback = 'You\'re on fire!';
            } else {
                feedback = 'You got it! Click New Game to start again.'
            }
    
            this.setState({
                    feedback,
                    guesses: [...this.state.guesses, guess].sort(function(a, b){return a-b})
            })

        } 
        else {
            this.setState({...this.state, feedback: 'You already guessed that number!'})
        }

        if (isNaN(guess)) {
            this.setState({ ...this.state, feedback: 'Please enter a valid number'});
            return;
        }

        e.target.userGuess.value = '';
    }


    render() {
        return (
            <div>
                <Header onRestartGame={() => this.restartGame()}/>
                <GuessSection feedback={this.state.feedback} submit={this.submit}/>
                <GuessCount count={this.state.guesses.length} />
                <GuessList guesses={this.state.guesses} />
            </div>
        );
    };
}

