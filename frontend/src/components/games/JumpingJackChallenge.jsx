// src/components/games/JumpingJackChallenge.jsx
import React, { useEffect } from 'react';
import p5 from 'p5';

function JumpingJackChallenge({ onComplete }) {
  useEffect(() => {
    const sketch = (p) => {
      let jumpingJacks = 0;
      let isJumping = false;
      let timer = 30; // 30 seconds challenge

      p.setup = () => {
        p.createCanvas(640, 480);
        p.textSize(32);
        p.textAlign(p.CENTER, p.CENTER);
      };

      p.draw = () => {
        p.background(200);
        p.fill(0);

        if (timer > 0) {
          p.text(`Jumping Jacks: ${jumpingJacks}`, p.width / 2, p.height / 2 - 50);
          p.text(`Time Left: ${timer}s`, p.width / 2, p.height / 2);
          if (isJumping) {
            p.text("Jump!", p.width / 2, p.height / 2 + 50);
          } else {
            p.text("Rest", p.width / 2, p.height / 2 + 50);
          }

          if (p.frameCount % 60 === 0 && timer > 0) {
            timer--;
          }
        } else {
          p.text(`Challenge Over! Total: ${jumpingJacks}`, p.width / 2, p.height / 2);
          p.noLoop();
          onComplete(jumpingJacks); // Trigger completion callback
        }
      };

      p.mousePressed = () => {
        if (timer > 0) {
          isJumping = !isJumping;
          if (isJumping) {
            jumpingJacks++;
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

export default JumpingJackChallenge;
