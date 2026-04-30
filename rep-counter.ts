export interface RepCounterConfig {
  downKneeAngle: number;
  upKneeAngle: number;
  maxTorsoLean: number;
}

export interface RepCounterState {
  reps: number;
  stage: "up" | "down";
}

export interface PoseMetrics {
  kneeAngle: number;
  torsoLean: number;
}

export function calculateAngle(a: { x: number; y: number }, b: { x: number; y: number }, c: { x: number; y: number }): number {
  const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
  let angle = Math.abs((radians * 180) / Math.PI);
  if (angle > 180) angle = 360 - angle;
  return angle;
}

export function updateRepState(
  metrics: PoseMetrics,
  previous: RepCounterState,
  config: RepCounterConfig
): RepCounterState {
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
