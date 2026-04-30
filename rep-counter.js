export function calculateAngle(a, b, c) {
  const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
  let angle = Math.abs((radians * 180) / Math.PI);
  if (angle > 180) angle = 360 - angle;
  return angle;
}

export function updateRepState(metrics, previous, config) {
  let stage = previous.stage;
  let reps = previous.reps;

  if (metrics.kneeAngle <= config.downKneeAngle && metrics.torsoLean <= config.maxTorsoLean) {
    stage = "down";
  }

  if (stage === "down" && metrics.kneeAngle >= config.upKneeAngle) {
    stage = "up";
    reps += 1;
  }

  return { reps, stage };
}
