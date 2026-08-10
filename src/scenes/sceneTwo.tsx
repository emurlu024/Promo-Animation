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
  loop,
  waitFor,
} from '@motion-canvas/core';

import conveyorBelt from '../assets/noBoxConvey.png';
import secondConveyorBelt from '../assets/noBoxConvey2.png';
import truckImage from '../assets/truck.png';

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

  const productionSystem = createRef<Node>();
  const truck = createRef<Img>();
  const objectFlow = createRef<Node>();

  const upperTracks = createRef<Node>();
  const lowerTracks = createRef<Node>();

  const rollers = Array.from({length: 15}, () => createRef<Node>());

  // ============================================================
  // LAYOUT
  // ============================================================

  const productionSystemX = 100;

  // Your individually adjusted coordinates — unchanged.
  const rollerPoints = [
    {x: -755, y: 54},
    {x: -637, y: 54},
    {x: -520, y: 54},
    {x: -403, y: 54},
    {x: -287, y: 54},
    {x: -172, y: 54},
    {x: -57, y: 54},
    {x: 58, y: 54},
    {x: 175, y: 54},
    {x: 289, y: 54},
    {x: 397, y: 54},
    {x: 513, y: 54},
    {x: 627, y: 54},
    {x: 743, y: 54},
    {x: 860, y: 54},
  ];

  const trackPositions = Array.from(
    {length: 101},
    (_, index) => -2000 + index * 40,
  );

  // ============================================================
  // MATCHED MOVEMENT VALUES
  // ============================================================

  const movementDuration = 16;
  const objectTravelDistance = 4200;
  const rollerDiameter = 80;

  // Matches the rollers' edge speed to the objects' movement speed.
  const matchedRollerRotation =
    -(objectTravelDistance / (rollerDiameter * Math.PI)) * 360;

  // ============================================================
  // ROTATING ROLLER
  // ============================================================

  const rotatingRoller = (
    ref: ReturnType<typeof createRef<Node>>,
    point: {x: number; y: number},
  ) => (
    <Node ref={ref} x={point.x} y={point.y}>
      <Circle
        size={80}
        fill={'rgba(0, 0, 0, 0)'}
        stroke={'#FF626A'}
        lineWidth={10}
      />

      <Line
        points={[
          [-10, 0],
          [10, 0],
        ]}
        stroke={'#C84850'}
        lineWidth={3}
        lineCap={'round'}
      />

      <Line
        points={[
          [0, -10],
          [0, 10],
        ]}
        stroke={'#C84850'}
        lineWidth={3}
        lineCap={'round'}
      />

      <Circle size={6} fill={'#C84850'} />
    </Node>
  );

  // ============================================================
  // SCENE
  // ============================================================

  view.add(
    <Node>
      {/* ====================================================== */}
      {/* COMPLETE CONVEYOR SYSTEM */}
      {/* ====================================================== */}

      <Node ref={productionSystem} x={productionSystemX}>
        {/* MAIN CONVEYOR */}

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

        {/* SECOND CONVEYOR */}

        <Img
          src={secondConveyorBelt}
          width={1800}
          height={1200}
          x={800}
          y={80}
        />

        {/* MOVING GREY TREADS */}

        <Rect
          width={3200}
          height={108}
          x={770}
          y={55}
          radius={54}
          fill={'rgba(0, 0, 0, 0)'}
          clip
        >
          <Node ref={upperTracks}>
            {trackPositions.map((x, index) => (
              <Line
                key={`upper-track-${index}`}
                points={[
                  [x, -50],
                  [x, -38],
                ]}
                stroke={'rgba(61, 70, 76, 0.72)'}
                lineWidth={3}
                lineCap={'round'}
              />
            ))}
          </Node>

          <Node ref={lowerTracks}>
            {trackPositions.map((x, index) => (
              <Line
                key={`lower-track-${index}`}
                points={[
                  [x, 38],
                  [x, 50],
                ]}
                stroke={'rgba(61, 70, 76, 0.72)'}
                lineWidth={3}
                lineCap={'round'}
              />
            ))}
          </Node>
        </Rect>

        {/* FIFTEEN INDIVIDUALLY POSITIONED ROLLERS */}

        {rollerPoints.map((point, index) =>
          rotatingRoller(rollers[index], point),
        )}

        {/* MOVING OBJECTS */}

        <Node ref={objectFlow}>
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

          <Img
            src={moneyImage}
            width={185}
            height={200}
            x={2620}
            y={-71}
            shadowBlur={18}
            shadowColor={'rgba(50, 70, 55, 0.30)'}
            shadowOffsetY={10}
          />

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
      </Node>

      {/* ====================================================== */}
      {/* TRUCK */}
      {/* ====================================================== */}

      <Img
        ref={truck}
        src={truckImage}
        width={2050}
        height={1507}
        x={-1180}
        y={55}
      />
    </Node>,
  );

  // ============================================================
  // INITIAL VALUES
  // ============================================================

  // Start the truck and conveyor below the screen.
  truck().y(955);
  productionSystem().y(900);

  objectFlow().x(0);
  upperTracks().x(0);
  lowerTracks().x(0);

  // ============================================================
  // SLIDE IN FROM THE BOTTOM
  // ============================================================

  yield* all(
    truck().y(55, 1.2, easeInOutCubic),
    productionSystem().y(0, 1.2, easeInOutCubic),
  );

  yield* waitFor(0.4);

  // ============================================================
  // PRODUCTION MOVEMENT
  // ============================================================

  yield* all(
    objectFlow().x(
      -objectTravelDistance,
      movementDuration,
      linear,
    ),

    loop(20, () =>
      upperTracks().x(
        upperTracks().x() - 40,
        0.8,
        linear,
      ),
    ),

    loop(20, () =>
      lowerTracks().x(
        lowerTracks().x() + 40,
        0.8,
        linear,
      ),
    ),

    ...rollers.map(roller =>
      roller().rotation(
        matchedRollerRotation,
        movementDuration,
        linear,
      ),
    ),
  );

  // ============================================================
  // END HOLD
  // ============================================================

  yield* waitFor(0.8);
});