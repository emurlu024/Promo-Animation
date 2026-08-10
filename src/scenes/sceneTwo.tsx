// Scene 2 — Current Production Limitations

import {
  Circle,
  Img,
  Line,
  Node,
  Rect,
  makeScene2D,
} from '@motion-canvas/2d';

import {
  all,
  createRef,
  easeInOutCubic,
  linear,
  waitFor,
} from '@motion-canvas/core';

import conveyorBelt from '../assets/noBoxConvey.png';
import dnaBoxImage from '../assets/DNABox.png';
import plantCellImage from '../assets/plantCell.png';
import moneyImage from '../assets/Money.png';
import chemistryImage from '../assets/chemistry.png';

export default makeScene2D(function* (view) {
  // ============================================================
  // BACKGROUND
  // ============================================================

  view.fill('#FAFAFF');

  // ============================================================
  // REFERENCES
  // ============================================================

  const conveyorGroup = createRef<Node>();
  const objectFlow = createRef<Node>();
  const tankTracks = createRef<Node>();

  const rollers = Array.from(
    {length: 14},
    () => createRef<Node>(),
  );

  /*
   * Shifted 16px left to match the centers of the original
   * coral rollers shown in the screenshot.
   */
  const rollerPositions = [
    -772,
    -655,
    -538,
    -421,
    -304,
    -187,
    -70,
    47,
    164,
    281,
    398,
    515,
    632,
    749,
  ];

  /*
   * Vertical tank-track lines.
   * Extra lines are included outside the visible belt so they
   * continue moving through the clipped area.
   */
  const trackLinePositions = Array.from(
    {length: 49},
    (_, index) => -960 + index * 40,
  );

  // ============================================================
  // ROTATING RED ROLLER
  // ============================================================

  const rotatingRoller = (
    ref: ReturnType<typeof createRef<Node>>,
    x: number,
  ) => (
    <Node ref={ref} x={x} y={55}>
      {/* Thicker ring matching the original coral color */}

      <Circle
        size={78}
        fill={'rgba(0, 0, 0, 0)'}
        stroke={'#F2656B'}
        lineWidth={9}
      />

      {/* Smaller rotating cross */}

      <Line
        points={[
          [-10, 0],
          [10, 0],
        ]}
        stroke={'#C84750'}
        lineWidth={3}
        lineCap="round"
      />

      <Line
        points={[
          [0, -10],
          [0, 10],
        ]}
        stroke={'#C84750'}
        lineWidth={3}
        lineCap="round"
      />

      <Circle
        size={6}
        fill={'#C84750'}
      />
    </Node>
  );

  // ============================================================
  // SCENE
  // ============================================================

  view.add(
    <Node>
      {/* ====================================================== */}
      {/* CONVEYOR */}
      {/* ====================================================== */}

      <Node ref={conveyorGroup}>
        <Img
          src={conveyorBelt}
          width={1800}
          height={1200}
          x={0}
          y={80}
          shadowBlur={24}
          shadowColor={'rgba(49, 58, 67, 0.20)'}
          shadowOffsetY={14}
        />

        {/* ==================================================== */}
        {/* VERTICAL TANK-TRACK LINES */}
        {/* ==================================================== */}

        <Rect
          width={1740}
          height={112}
          x={0}
          y={55}
          radius={55}
          fill={'rgba(0, 0, 0, 0)'}
          clip
        >
          <Node ref={tankTracks}>
            {trackLinePositions.map((x, index) => (
              <Line
                key={`tank-track-${index}`}
                points={[
                  [x, -50],
                  [x, 50],
                ]}
                stroke={'rgba(89, 98, 104, 0.56)'}
                lineWidth={3}
                lineCap="round"
              />
            ))}
          </Node>
        </Rect>

        {/* ==================================================== */}
        {/* ALIGNED RED ROLLER OVERLAYS */}
        {/* ==================================================== */}

        {rollerPositions.map((x, index) =>
          rotatingRoller(rollers[index], x),
        )}
      </Node>

      {/* ====================================================== */}
      {/* MOVING OBJECTS */}
      {/* ====================================================== */}

      <Node ref={objectFlow}>
        {/* DNA box 1 */}

        <Img
          src={dnaBoxImage}
          width={170}
          height={127}
          x={1100}
          y={-78}
          shadowBlur={18}
          shadowColor={'rgba(35, 45, 55, 0.30)'}
          shadowOffsetY={10}
        />

        {/* DNA box 2 */}

        <Img
          src={dnaBoxImage}
          width={170}
          height={127}
          x={1480}
          y={-78}
          shadowBlur={18}
          shadowColor={'rgba(35, 45, 55, 0.30)'}
          shadowOffsetY={10}
        />

        {/* DNA box 3 */}

        <Img
          src={dnaBoxImage}
          width={170}
          height={127}
          x={1860}
          y={-78}
          shadowBlur={18}
          shadowColor={'rgba(35, 45, 55, 0.30)'}
          shadowOffsetY={10}
        />

        {/* Plant cell — lowered */}

        <Img
          src={plantCellImage}
          width={155}
          height={155}
          x={2240}
          y={-58}
          shadowBlur={20}
          shadowColor={'rgba(48, 80, 58, 0.30)'}
          shadowOffsetY={10}
        />

        {/* Money stack */}

        <Img
          src={moneyImage}
          width={185}
          height={112}
          x={2620}
          y={-71}
          shadowBlur={18}
          shadowColor={'rgba(50, 70, 55, 0.30)'}
          shadowOffsetY={10}
        />

        {/* Beakers — lowered */}

        <Img
          src={chemistryImage}
          width={190}
          height={139}
          x={3000}
          y={-50}
          shadowBlur={20}
          shadowColor={'rgba(52, 63, 89, 0.30)'}
          shadowOffsetY={10}
        />
      </Node>
    </Node>,
  );

  // ============================================================
  // CONVEYOR ENTRANCE
  // ============================================================

  conveyorGroup().opacity(0);
  conveyorGroup().scale(0.94);

  yield* all(
    conveyorGroup().opacity(1, 0.8),
    conveyorGroup().scale(1, 1, easeInOutCubic),
  );

  yield* waitFor(0.4);

  // ============================================================
  // SLOW RIGHT-TO-LEFT MOVEMENT
  // ============================================================

  objectFlow().x(0);
  tankTracks().x(0);

  yield* all(
    /*
     * Objects now take 16 seconds instead of 10 seconds.
     */

    objectFlow().x(-4200, 16, linear),

    /*
     * Vertical track lines travel slowly from right to left.
     */

    tankTracks().x(-480, 16, linear),

    /*
     * Each roller completes two rotations over 16 seconds.
     * The previous version completed four rotations in 10 seconds.
     */

    ...rollers.map(roller =>
      roller().rotation(-720, 16, linear),
    ),
  );

  // ============================================================
  // END HOLD
  // ============================================================

  yield* waitFor(0.8);
});