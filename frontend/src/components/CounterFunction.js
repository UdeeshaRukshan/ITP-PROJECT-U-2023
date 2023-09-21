import React, {useState } from "react";
import App from "../App";

function CounterFunction(){

    let [number, setNumber] = useState(0)

    function increment(){
        setNumber(++number)
    }

    return(
        <div>
            <h3>Functional Componenet</h3>
            <h1>Counter = {number}</h1>

            <button onClick={e => increment()}>Increment</button>
        </div>
    )
}

export default CounterFunction;