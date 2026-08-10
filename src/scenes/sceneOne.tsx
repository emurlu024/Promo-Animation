// Scene 1 — Anti-neurodegenerative + Anti-inflammatory

import {
  Circle,
  Img,
  Node,
  makeScene2D,
} from '@motion-canvas/2d';

import {
  all,
  createRef,
  easeInOutCubic,
  waitFor,
} from '@motion-canvas/core';

import rightFacingHead from '../assets/pastelGreen-head-profile-leftFacing.png';
import leftFacingHead from '../assets/pastelGreen-head-profile-rightFacing.png';

export default makeScene2D(function* (view) {
  // ============================================================
  // BACKGROUND
  // ============================================================

  view.fill('#FAFAFF');

  // ============================================================
  // REFERENCES
  // ============================================================

  const world = createRef<Node>();

  const rightHead = createRef<Img>();
  const leftHead = createRef<Img>();

  // Right-facing head — neurodegeneration
  const black1 = createRef<Circle>();
  const black2 = createRef<Circle>();
  const black3 = createRef<Circle>();
  const black4 = createRef<Circle>();
  const black5 = createRef<Circle>();

  // Left-facing head — inflammation
  const red1 = createRef<Circle>();
  const red2 = createRef<Circle>();
  const red3 = createRef<Circle>();
  const red4 = createRef<Circle>();
  const red5 = createRef<Circle>();

  // ============================================================
  // SCENE
  // ============================================================

  view.add(
    <Node ref={world}>
      {/* ====================================================== */}
      {/* HEAD 1 — RIGHT FACING */}
      {/* Entire head and dot arrangement scaled to 2× */}
      {/* ====================================================== */}

      <Node x={0} y={0} scale={2}>
        <Img
          ref={rightHead}
          src={rightFacingHead}
          width={520}
          height={520}
          x={0}
          y={20}
        />

        {/* Black dots moved inward toward the face */}

        <Circle
          ref={black1}
          x={-50}
          y={-115}
          size={41}
          fill="#343442"
          opacity={0}
        />

        <Circle
          ref={black2}
          x={45}
          y={-110}
          size={34}
          fill="#343442"
          opacity={0}
        />

        <Circle
          ref={black3}
          x={-30}
          y={-30}
          size={31}
          fill="#343442"
          opacity={0}
        />

        {/* Front-bottom brain dot */}

        <Circle
          ref={black4}
          x={80}
          y={-60}
          size={29}
          fill="#343442"
          opacity={0}
        />

        {/* Back-edge brain dot */}

        <Circle
          ref={black5}
          x={-130}
          y={-40}
          size={35}
          fill="#343442"
          opacity={0}
        />
      </Node>

      {/* ====================================================== */}
      {/* HEAD 2 — LEFT FACING */}
      {/* Entire head and dot arrangement scaled to 2× */}
      {/* ====================================================== */}

      <Node x={1800} y={0} scale={2}>
        <Img
          ref={leftHead}
          src={leftFacingHead}
          width={520}
          height={520}
          x={0}
          y={20}
        />

        {/* Red dots moved inward toward the face */}

        <Circle
          ref={red1}
          x={50}
          y={-115}
          size={41}
          fill="#FF6268"
          opacity={0}
          shadowBlur={30}
          shadowColor="#FF6268"
        />

        <Circle
          ref={red2}
          x={-45}
          y={-110}
          size={34}
          fill="#FF6268"
          opacity={0}
          shadowBlur={30}
          shadowColor="#FF6268"
        />

        <Circle
          ref={red3}
          x={30}
          y={-30}
          size={31}
          fill="#FF6268"
          opacity={0}
          shadowBlur={30}
          shadowColor="#FF6268"
        />

        {/* Front-bottom brain dot */}

        <Circle
          ref={red4}
          x={-80}
          y={-60}
          size={29}
          fill="#FF6268"
          opacity={0}
          shadowBlur={35}
          shadowColor="#FF6268"
        />

        {/* Back-edge brain dot */}

        <Circle
          ref={red5}
          x={130}
          y={-40}
          size={35}
          fill="#FF6268"
          opacity={0}
          shadowBlur={35}
          shadowColor="#FF6268"
        />
      </Node>
    </Node>,
  );

  // ============================================================
  // INITIAL STATE
  // ============================================================

  // Centers the first head.
  world().x(0);

  rightHead().opacity(1);
  leftHead().opacity(1);

  // ============================================================
  // 1 — HOLD FIRST HEAD
  // ============================================================

  yield* waitFor(0.5);

  // ============================================================
  // 2 — BLACK SPOTS APPEAR
  // ============================================================

  yield* all(
    black1().opacity(1, 0.35),
    black2().opacity(1, 0.45),
    black3().opacity(1, 0.55),
    black4().opacity(1, 0.65),
    black5().opacity(1, 0.75),
  );

  // ============================================================
  // 3 — BLACK SPOTS PULSE
  // ============================================================

  yield* all(
    black1().scale(1.25, 0.3),
    black2().scale(1.25, 0.3),
    black3().scale(1.25, 0.3),
    black4().scale(1.25, 0.3),
    black5().scale(1.25, 0.3),
  );

  yield* all(
    black1().scale(1, 0.25),
    black2().scale(1, 0.25),
    black3().scale(1, 0.25),
    black4().scale(1, 0.25),
    black5().scale(1, 0.25),
  );

  yield* waitFor(0.4);

  // ============================================================
  // 4 — ANTI-NEURODEGENERATIVE EFFECT
  // ============================================================

  yield* all(
    black1().scale(0, 0.7, easeInOutCubic),
    black2().scale(0, 0.7, easeInOutCubic),
    black3().scale(0, 0.7, easeInOutCubic),
    black4().scale(0, 0.7, easeInOutCubic),
    black5().scale(0, 0.7, easeInOutCubic),

    black1().opacity(0, 0.6),
    black2().opacity(0, 0.6),
    black3().opacity(0, 0.6),
    black4().opacity(0, 0.6),
    black5().opacity(0, 0.6),
  );

  yield* waitFor(0.3);

  // ============================================================
  // 5 — MOVE CAMERA RIGHT TO THE SECOND HEAD
  // ============================================================

  yield* world().x(-1800, 1.5, easeInOutCubic);

  yield* waitFor(0.3);

  // ============================================================
  // 6 — RED INFLAMMATION SPOTS APPEAR
  // ============================================================

  yield* all(
    red1().opacity(1, 0.35),
    red2().opacity(1, 0.45),
    red3().opacity(1, 0.55),
    red4().opacity(1, 0.65),
    red5().opacity(1, 0.75),
  );

  // ============================================================
  // 7 — FIRST RED-SPOT PULSE
  // ============================================================

  yield* all(
    red1().scale(1.4, 0.35),
    red2().scale(1.4, 0.35),
    red3().scale(1.4, 0.35),
    red4().scale(1.4, 0.35),
    red5().scale(1.4, 0.35),
  );

  yield* all(
    red1().scale(1, 0.3),
    red2().scale(1, 0.3),
    red3().scale(1, 0.3),
    red4().scale(1, 0.3),
    red5().scale(1, 0.3),
  );

  // ============================================================
  // 8 — SECOND RED-SPOT PULSE
  // ============================================================

  yield* all(
    red1().scale(1.3, 0.3),
    red2().scale(1.3, 0.3),
    red3().scale(1.3, 0.3),
    red4().scale(1.3, 0.3),
    red5().scale(1.3, 0.3),
  );

  yield* all(
    red1().scale(1, 0.25),
    red2().scale(1, 0.25),
    red3().scale(1, 0.25),
    red4().scale(1, 0.25),
    red5().scale(1, 0.25),
  );

  yield* waitFor(0.3);

  // ============================================================
  // 9 — ANTI-INFLAMMATORY EFFECT
  // ============================================================

  yield* all(
    red1().scale(0, 0.8, easeInOutCubic),
    red2().scale(0, 0.8, easeInOutCubic),
    red3().scale(0, 0.8, easeInOutCubic),
    red4().scale(0, 0.8, easeInOutCubic),
    red5().scale(0, 0.8, easeInOutCubic),

    red1().opacity(0, 0.7),
    red2().opacity(0, 0.7),
    red3().opacity(0, 0.7),
    red4().opacity(0, 0.7),
    red5().opacity(0, 0.7),
  );

  // ============================================================
  // END HOLD
  // ============================================================

  yield* waitFor(0.8);
});