import React from "react";

class CounterClass extends React.Component {
    constructor() {
        super();
        this.state = {
            number: 0
        }
    }

    render() {
        return(
            <div>
                <h1>Counter = {this.state.number}</h1>
            </div>
        )
    }
}