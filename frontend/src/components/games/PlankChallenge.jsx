// src/components/games/PlankChallenge.jsx
import React, { useEffect } from 'react';
import p5 from 'p5';

function PlankChallenge({ onComplete }) {
  useEffect(() => {
    const sketch = (p) => {
      let plankTime = 0;
      let timer = 30; // 30 seconds challenge

      p.setup = () => {
        p.createCanvas(640, 480);
        p.textSize(32);
        p.textAlign(p.CENTER, p.CENTER);
        p.frameRate(1); // 1 frame per second
      };

      p.draw = () => {
        p.background(255);
        p.fill(0);

        if (timer > 0) {
          plankTime++;
          p.text(`Plank Time: ${plankTime}s`, p.width / 2, p.height / 2);
          timer--;
        } else {
          p.text(`Plank Challenge Complete!`, p.width / 2, p.height / 2 + 50);
          p.noLoop();
          onComplete(plankTime); // Award points based on plank time
        }
      };
    };

    const myP5 = new p5(sketch, document.getElementById('gameContainer'));

    return () => {
      myP5.remove();
    };
  }, [onComplete]);

  return <div id="gameContainer"></div>;
}

export default PlankChallenge;
