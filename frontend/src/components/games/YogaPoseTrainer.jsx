// src/components/games/YogaPoseTrainer.jsx
import React, { useEffect } from 'react';
import p5 from 'p5';

function YogaPoseTrainer({ onComplete }) {
  useEffect(() => {
    const sketch = (p) => {
      const poses = ["Warrior", "Tree", "Downward Dog"];
      let currentPose = 0;
      let poseTimer = 10;
      let completedPoses = 0;

      p.setup = () => {
        p.createCanvas(640, 480);
        p.textSize(32);
        p.textAlign(p.CENTER, p.CENTER);
      };

      p.draw = () => {
        p.background(240);
        p.fill(0);

        if (poseTimer > 0) {
          p.text(`Pose: ${poses[currentPose]}`, p.width / 2, p.height / 2 - 50);
          p.text(`Hold for: ${poseTimer}s`, p.width / 2, p.height / 2);
          if (p.frameCount % 60 === 0 && poseTimer > 0) {
            poseTimer--;
          }
        } else {
          completedPoses++;
          currentPose = (currentPose + 1) % poses.length;
          poseTimer = 10;

          if (completedPoses === poses.length) {
            p.text(`Yoga Session Complete!`, p.width / 2, p.height / 2 + 50);
            p.noLoop();
            onComplete(completedPoses * 5); // Award 5 points per pose
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

export default YogaPoseTrainer;
