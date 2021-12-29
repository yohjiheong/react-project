import React from 'react';

function Homepage() {

    var i = 0;
    var txt = 'Welcome to Crossfit!';
    var speed = 50; /* The speed/duration of the effect in milliseconds */

    var textEffect = () => {
        if (i < txt.length) {
            document.getElementById("textEffect").innerHTML += txt.charAt(i);
            i++;
            setTimeout(textEffect, speed);
        }
    }

    var styles = {
        "display": "table-cell",
        "vertical-align": "middle"
    }
    
    return (
        <div style={styles}>
            <h1 id="textEffect" align="center" > </h1>
            <p> Your personal fitness tracker! </p>
        </div>
    );
}

export default Homepage;