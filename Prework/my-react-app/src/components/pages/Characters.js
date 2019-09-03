import React from "react";

function Characters() {
    return (
        <div>
            <h2>Choose your Hero you would like to fight with!</h2>

            <h3 id="hp">HP: 200</h3>
            <h3 id="mp">MP: 100</h3>
            <button id="knight"></button>

            <h3 id="hp">HP: 100</h3>
            <h3 id="mp">MP: 200</h3>
            <button id="Mage"></button>

            <h3 id="hp">HP: 150</h3>
            <h3 id="mp">MP: 100</h3>
            <button id="Thief"></button>

            <h2>Choose your Enemy you would like to fight against!</h2>

            <h3 id="hp">HP: 100</h3>
            <h3 id="mp">MP: 100</h3>
            <button id="Bat"></button>

            <h3 id="hp">HP: 150</h3>
            <h3 id="mp">MP: 100</h3>
            <button id="Goblin"></button>

            <h3 id="hp">HP: 300</h3>
            <h3 id="mp">MP: 150</h3>
            <button id="Dragon"></button>
        </div>
    );
}

export default Characters;