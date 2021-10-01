
import React, { Component } from 'react'

// everything timer related 
export default class Timer extends Component {
    //create stats for timer & hide button state
    state = {
        hours: 2,
        minutes: 0,
        seconds: 0,
        started: false
    }

    //technically not required but whatever
    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    //when button clicked, come here to start timer and hide button
    start() {
        this.setState({started: true})

        this.myInterval = setInterval(() => {
            const { seconds, minutes, hours } = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    if(hours === 0) {
                        this.props.stop(true)
                        clearInterval(this.myInterval)              
                        this.setState({
                            hours: 0,
                            minutes: 0,
                            seconds: 0
                        })  
                    }

                    this.setState(({hours}) => ({
                        hours: hours - 1,
                        minutes: 59,
                        seconds: 59
                    }))
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            } 
        }, 1000)
    }

    render() {
        const { minutes, seconds, hours, started } = this.state
        return (
            <div>
                <div>
                <h1  className={'timer'}>{hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
            </div>
            {!started ? <button onClick={this.start.bind(this)}>Start Timer</button> : ""}
            
            </div>
        )
    }
}