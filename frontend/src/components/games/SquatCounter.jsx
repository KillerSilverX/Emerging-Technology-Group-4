// src/components/games/SquatCounter.jsx
import React, { useEffect } from 'react';
import p5 from 'p5';

function SquatCounter({ onComplete }) {
  useEffect(() => {
    const sketch = (p) => {
      let squats = 0;
      let isSquatting = false;
      let timer = 30; // 30 seconds challenge

      p.setup = () => {
        p.createCanvas(640, 480);
        p.textSize(32);
        p.textAlign(p.CENTER, p.CENTER);
      };

      p.draw = () => {
        p.background(150);
        p.fill(0);
        p.text(`Squats: ${squats}`, p.width / 2, p.height / 2 - 50);
        p.text(`Time Left: ${timer}s`, p.width / 2, p.height / 2);

        if (p.frameCount % 60 === 0 && timer > 0) {
          timer--;
        } else if (timer <= 0) {
          p.text(`Challenge Over! Total: ${squats}`, p.width / 2, p.height / 2 + 50);
          p.noLoop();
          onComplete(squats); // Trigger completion callback
        }
      };

      p.mousePressed = () => {
        if (timer > 0) {
          isSquatting = !isSquatting;
          if (isSquatting) {
            squats++;
          }
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

export default SquatCounter;
