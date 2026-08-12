import {
  Circle,
  Img,
  Line,
  Node,
  Path,
  Rect,
  makeScene2D,
} from '@motion-canvas/2d';

import {
  brightness,
  contrast,
  saturate,
} from '@motion-canvas/2d/lib/partials';

import {
  all,
  createRef,
  easeInOutCubic,
  easeOutBack,
  linear,
  loop,
  sequence,
  waitFor,
} from '@motion-canvas/core';

import conveyorBelt from '../assets/noBoxConvey.png';
import secondConveyorBelt from '../assets/noBoxConvey2.png';
import truckImage from '../assets/truck.png';

import dnaBoxImage from '../assets/DNABox.png';
import plantCellImage from '../assets/plantCell.png';
import moneyImage from '../assets/Money.png';
import chemistryImage from '../assets/chemistry.png';

import clawImage from '../assets/claw.png';
import clawOpenImage from '../assets/clawOpen.png';

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

  const closedClaw = createRef<Img>();
  const openClaw = createRef<Img>();
  const droppedDnaBox = createRef<Img>();

  const movingCell = createRef<Node>();
  const productContainer = createRef<Node>();
  const highCostsArrow = createRef<Line>();

  const beakerOne = createRef<Node>();
  const beakerTwo = createRef<Node>();
  const beakerThree = createRef<Node>();
  const beakerFour = createRef<Node>();

  const steamOne = createRef<Node>();
  const steamTwo = createRef<Node>();
  const steamThree = createRef<Node>();
  const steamFour = createRef<Node>();

  const rollers = Array.from(
    {length: 15},
    () => createRef<Node>(),
  );

  const products = Array.from(
    {length: 14},
    () => createRef<Node>(),
  );

  // ============================================================
  // LAYOUT
  // ============================================================

  const productionSystemX = 100;

  const clawDropX = 700;
  const clawScreenX = productionSystemX + clawDropX;

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
    {length: 121},
    (_, index) => -2400 + index * 40,
  );

  // ============================================================
  // PRODUCT DATA
  // ============================================================

  const productData = [
    {
      x: -31,
      y: -29,
      rotation: -18,
      scale: 0.34,
      color: '#FF8DA1',
      path:
        'M -46 -17 C -35 -52 5 -50 30 -35 C 57 -19 54 16 31 36 C 9 55 -28 47 -46 22 C -56 8 -53 -4 -46 -17 Z',
    },
    {
      x: 4,
      y: -39,
      rotation: 15,
      scale: 0.3,
      color: '#8FD5A6',
      path:
        'M -41 -30 C -18 -54 16 -43 42 -20 C 58 -4 43 28 18 43 C -7 58 -40 35 -48 10 C -54 -6 -51 -20 -41 -30 Z',
    },
    {
      x: 35,
      y: -24,
      rotation: -10,
      scale: 0.31,
      color: '#F7C96F',
      path:
        'M -52 -11 C -47 -38 -19 -55 9 -46 C 31 -60 58 -37 55 -10 C 62 18 37 47 8 42 C -15 58 -51 39 -48 10 C -57 3 -57 -4 -52 -11 Z',
    },
    {
      x: -42,
      y: 1,
      rotation: 28,
      scale: 0.28,
      color: '#B89BE8',
      path:
        'M -39 -37 C -9 -54 24 -45 42 -17 C 59 10 41 42 11 49 C -19 56 -49 31 -48 2 C -47 -16 -48 -28 -39 -37 Z',
    },
    {
      x: -12,
      y: -7,
      rotation: 7,
      scale: 0.35,
      color: '#7BCED3',
      path:
        'M -54 -22 C -35 -51 -2 -48 22 -37 C 49 -39 62 -9 50 16 C 41 43 8 55 -16 42 C -44 46 -62 17 -54 -9 C -57 -14 -57 -18 -54 -22 Z',
    },
    {
      x: 25,
      y: 6,
      rotation: -29,
      scale: 0.3,
      color: '#FFAC72',
      path:
        'M -43 -27 C -17 -50 12 -42 37 -26 C 57 -11 48 22 28 40 C 5 58 -26 43 -43 22 C -57 5 -55 -14 -43 -27 Z',
    },
    {
      x: 46,
      y: 18,
      rotation: 14,
      scale: 0.27,
      color: '#F47F96',
      path:
        'M -50 -13 C -42 -43 -7 -57 18 -41 C 45 -45 61 -15 51 13 C 44 42 9 54 -16 42 C -45 46 -62 14 -50 -13 Z',
    },
    {
      x: -34,
      y: 28,
      rotation: -13,
      scale: 0.29,
      color: '#9ACA78',
      path:
        'M -47 -31 C -21 -49 9 -40 32 -30 C 55 -19 57 12 40 34 C 19 56 -14 50 -37 31 C -56 15 -61 -13 -47 -31 Z',
    },
    {
      x: -2,
      y: 31,
      rotation: 20,
      scale: 0.31,
      color: '#E5A0D5',
      path:
        'M -52 -15 C -37 -46 -4 -49 22 -38 C 48 -30 61 -1 48 24 C 34 51 0 55 -26 42 C -53 29 -63 5 -52 -15 Z',
    },
    {
      x: 30,
      y: 36,
      rotation: -7,
      scale: 0.3,
      color: '#F4D35E',
      path:
        'M -49 -35 C -21 -51 12 -45 35 -23 C 57 -2 49 31 25 47 C -2 61 -34 43 -48 19 C -58 0 -60 -20 -49 -35 Z',
    },
    {
      x: -49,
      y: -19,
      rotation: 24,
      scale: 0.24,
      color: '#65C6B4',
      path:
        'M -42 -28 C -19 -49 12 -47 35 -27 C 56 -8 51 22 31 42 C 8 59 -22 47 -41 28 C -58 11 -57 -13 -42 -28 Z',
    },
    {
      x: 49,
      y: -9,
      rotation: -23,
      scale: 0.23,
      color: '#FF967E',
      path:
        'M -45 -21 C -30 -48 1 -51 28 -37 C 55 -25 60 4 45 27 C 28 51 -5 54 -30 40 C -55 25 -59 0 -45 -21 Z',
    },
    {
      x: -19,
      y: 49,
      rotation: 11,
      scale: 0.23,
      color: '#A6D97A',
      path:
        'M -41 -27 C -18 -47 10 -45 33 -28 C 53 -12 50 17 32 37 C 11 54 -20 45 -38 26 C -54 10 -55 -12 -41 -27 Z',
    },
    {
      x: 13,
      y: 3,
      rotation: 4,
      scale: 0.39,
      color: '#E87591',
      path:
        'M -55 -33 C -29 -58 9 -54 37 -32 C 63 -13 58 25 34 48 C 8 67 -32 55 -52 29 C -68 9 -69 -15 -55 -33 Z',
    },
  ];

  // ============================================================
  // MOVEMENT VALUES
  // ============================================================

  const movementDuration = 16;
  const objectTravelDistance = 4200;
  const rollerDiameter = 80;

  const matchedRollerRotation =
    -(objectTravelDistance / (rollerDiameter * Math.PI)) * 360;

  // ============================================================
  // PRODUCT BUILDUP
  // ============================================================

  function* animateProductBuildup() {
    // The cell is now the final production stage on the conveyor.
    yield* waitFor(6.3);

    yield* sequence(
      0.3,
      ...products.slice(0, 5).map((product, index) =>
        all(
          product().opacity(1, 0.12),
          product().scale(
            productData[index].scale,
            0.36,
            easeOutBack,
          ),
          product().rotation(
            productData[index].rotation,
            0.36,
            easeInOutCubic,
          ),
        ),
      ),
    );

    yield* sequence(
      0.19,
      ...products.slice(5, 10).map((product, localIndex) => {
        const index = localIndex + 5;

        return all(
          product().opacity(1, 0.1),
          product().scale(
            productData[index].scale,
            0.3,
            easeOutBack,
          ),
          product().rotation(
            productData[index].rotation,
            0.3,
            easeInOutCubic,
          ),
        );
      }),
    );

    yield* sequence(
      0.1,
      ...products.slice(10).map((product, localIndex) => {
        const index = localIndex + 10;

        return all(
          product().opacity(1, 0.08),
          product().scale(
            productData[index].scale,
            0.25,
            easeOutBack,
          ),
          product().rotation(
            productData[index].rotation,
            0.25,
            easeInOutCubic,
          ),
        );
      }),
    );

    // One small, gentle bobble after every product has appeared.
    yield* movingCell().y(
      -82,
      0.22,
      easeInOutCubic,
    );

    yield* movingCell().y(
      -69,
      0.26,
      easeInOutCubic,
    );

    yield* movingCell().y(
      -75,
      0.22,
      easeInOutCubic,
    );
  }

  // ============================================================
  // HIGH-COST ARROW
  // ============================================================

  function* animateHighCostsArrow() {
    yield* waitFor(5.75);

    highCostsArrow().opacity(1);

    yield* highCostsArrow().end(
      1,
      0.55,
      easeInOutCubic,
    );
  }

  // ============================================================
  // SYNCHRONIZED BEAKER SHAKE AND CONTINUOUS STEAM
  // ============================================================

  function* shakeBeaker(
    beaker: () => Node,
    direction: number,
  ) {
    // Shake briefly when the steam begins, then settle much earlier.
    // 12 cycles at 0.15 seconds each lasts about 1.8 seconds.
    yield* loop(12, function* () {
      yield* beaker().rotation(
        4 * direction,
        0.07,
        easeInOutCubic,
      );

      yield* beaker().rotation(
        -4 * direction,
        0.08,
        easeInOutCubic,
      );
    });

    yield* beaker().rotation(0, 0.1, easeInOutCubic);
  }

  function* riseSteamContinuously(
    steam: () => Node,
  ) {
    yield* loop(4, function* () {
      steam().y(-18);
      steam().scale(0.82);
      steam().opacity(0);

      yield* all(
        steam().y(-125, 1.15, easeInOutCubic),
        steam().scale(1.2, 1.15, easeInOutCubic),
        (function* () {
          // These must run one after another. Using sequence(0, ...)
          // made the fade-in and fade-out compete on the same frame.
          yield* steam().opacity(1, 0.16, easeInOutCubic);
          yield* waitFor(0.58);
          yield* steam().opacity(0, 0.41, easeInOutCubic);
        })(),
      );

      yield* waitFor(0.04);
    });

    // Make sure no plume remains visible as the beaker enters the truck.
    steam().opacity(0);
    steam().y(-18);
    steam().scale(0.82);
  }

  function* animateBeakerAndSteam(
    beaker: () => Node,
    steam: () => Node,
    delay: number,
    direction: number,
  ) {
    yield* waitFor(delay);

    // Both animations begin on this exact frame.
    yield* all(
      shakeBeaker(beaker, direction),
      riseSteamContinuously(steam),
    );
  }

  // ============================================================
  // SCENE
  // ============================================================

  view.add(
    <Node>
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

        {/* MOVING GRAY TREADS */}

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

        {/* ROLLERS */}

        {rollerPoints.map((point, index) => (
          <Node
            key={`roller-${index}`}
            ref={rollers[index]}
            x={point.x}
            y={point.y}
          >
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

            <Circle
              size={6}
              fill={'#C84850'}
            />
          </Node>
        ))}

        {/* MOVING OBJECTS */}

        <Node ref={objectFlow}>
          {/* FIRST DNA BOX */}

          <Img
            ref={droppedDnaBox}
            src={dnaBoxImage}
            width={170}
            height={127}
            x={clawDropX}
            y={-1150}
            shadowBlur={18}
            shadowColor={'rgba(35, 45, 55, 0.30)'}
            shadowOffsetY={10}
          />

          {/* SECOND DNA BOX */}

          <Img
            src={dnaBoxImage}
            width={170}
            height={127}
            x={1080}
            y={-78}
            shadowBlur={18}
            shadowColor={'rgba(35, 45, 55, 0.30)'}
            shadowOffsetY={10}
          />

          {/* THIRD DNA BOX */}

          <Img
            src={dnaBoxImage}
            width={170}
            height={127}
            x={1460}
            y={-78}
            shadowBlur={18}
            shadowColor={'rgba(35, 45, 55, 0.30)'}
            shadowOffsetY={10}
          />

          {/* MOVING CELL */}

          <Node ref={movingCell} x={2550} y={-75}>
            <Img
              src={plantCellImage}
              width={155}
              height={155}
              shadowBlur={20}
              shadowColor={'rgba(48, 80, 58, 0.30)'}
              shadowOffsetY={10}
            />

            <Circle
              size={126}
              fill={'rgba(255, 255, 255, 0)'}
              clip
            >
              <Node ref={productContainer}>
                {productData.map((product, index) => (
                  <Node
                    key={`product-${index}`}
                    ref={products[index]}
                    x={product.x}
                    y={product.y}
                    rotation={product.rotation - 20}
                    scale={0}
                    opacity={0}
                  >
                    <Path
                      data={product.path}
                      fill={product.color}
                      stroke={'rgba(92, 69, 81, 0.42)'}
                      lineWidth={4}
                      shadowBlur={5}
                      shadowColor={'rgba(62, 54, 70, 0.25)'}
                      shadowOffsetY={3}
                    />

                    <Circle
                      width={17}
                      height={9}
                      x={-14}
                      y={-16}
                      rotation={-25}
                      fill={'rgba(255, 255, 255, 0.48)'}
                    />
                  </Node>
                ))}
              </Node>
            </Circle>
          </Node>

          {/* THICK ZIGZAG RISING-COST ARROW */}

          <Line
            ref={highCostsArrow}
            points={[
              [-155, 68],
              [-88, 2],
              [-40, 45],
              [20, -24],
              [67, 20],
              [145, -83],
            ]}
            x={1840}
            y={-105}
            stroke={'#F01818'}
            lineWidth={29}
            lineCap={'square'}
            lineJoin={'miter'}
            endArrow
            arrowSize={52}
            end={0}
            opacity={0}
            shadowBlur={12}
            shadowColor={'rgba(145, 15, 18, 0.42)'}
            shadowOffsetX={8}
            shadowOffsetY={10}
          />

          {/* MONEY */}

          <Img
            src={moneyImage}
            width={185}
            height={200}
            x={1840}
            y={-62}
            filters={[
              saturate(2),
              contrast(1.08),
              brightness(1.15),
            ]}
            shadowBlur={18}
            shadowColor={'rgba(50, 90, 55, 0.36)'}
            shadowOffsetY={10}
          />

          {/* FOUR INDIVIDUAL BEAKER SECTIONS */}

          {/* BEAKER ONE */}

          <Node
            ref={beakerOne}
            x={2149}
            y={-60}
          >
            <Rect
              width={48}
              height={155}
              fill={'rgba(0, 0, 0, 0)'}
              clip
            >
              <Img
                src={chemistryImage}
                width={190}
                height={139}
                x={71}
                shadowBlur={20}
                shadowColor={'rgba(52, 63, 89, 0.30)'}
                shadowOffsetY={10}
              />
            </Rect>

            <Node
              ref={steamOne}
              x={0}
              y={-8}
              opacity={0}
            >
              <Circle
                size={38}
                x={-8}
                y={-19}
                fill={'rgba(255, 100, 137, 0.94)'}
                stroke={'rgba(255, 220, 229, 0.95)'}
                lineWidth={4}
              />

              <Circle
                size={49}
                x={7}
                y={-39}
                fill={'rgba(255, 127, 158, 0.90)'}
                stroke={'rgba(255, 220, 229, 0.95)'}
                lineWidth={4}
              />

              <Circle
                size={34}
                x={-5}
                y={-62}
                fill={'rgba(232, 72, 115, 0.88)'}
                stroke={'rgba(255, 220, 229, 0.95)'}
                lineWidth={4}
              />
            </Node>
          </Node>

          {/* BEAKER TWO */}

          <Node
            ref={beakerTwo}
            x={2196}
            y={-60}
          >
            <Rect
              width={48}
              height={155}
              fill={'rgba(0, 0, 0, 0)'}
              clip
            >
              <Img
                src={chemistryImage}
                width={190}
                height={139}
                x={24}
                shadowBlur={20}
                shadowColor={'rgba(52, 63, 89, 0.30)'}
                shadowOffsetY={10}
              />
            </Rect>

            <Node
              ref={steamTwo}
              x={0}
              y={-8}
              opacity={0}
            >
              <Circle
                size={34}
                x={7}
                y={-17}
                fill={'rgba(164, 117, 232, 0.94)'}
                stroke={'rgba(235, 220, 255, 0.95)'}
                lineWidth={4}
              />

              <Circle
                size={48}
                x={-6}
                y={-38}
                fill={'rgba(184, 143, 239, 0.90)'}
                stroke={'rgba(235, 220, 255, 0.95)'}
                lineWidth={4}
              />

              <Circle
                size={37}
                x={6}
                y={-62}
                fill={'rgba(137, 88, 213, 0.88)'}
                stroke={'rgba(235, 220, 255, 0.95)'}
                lineWidth={4}
              />
            </Node>
          </Node>

          {/* BEAKER THREE */}

          <Node
            ref={beakerThree}
            x={2244}
            y={-60}
          >
            <Rect
              width={48}
              height={155}
              fill={'rgba(0, 0, 0, 0)'}
              clip
            >
              <Img
                src={chemistryImage}
                width={190}
                height={139}
                x={-24}
                shadowBlur={20}
                shadowColor={'rgba(52, 63, 89, 0.30)'}
                shadowOffsetY={10}
              />
            </Rect>

            <Node
              ref={steamThree}
              x={0}
              y={-8}
              opacity={0}
            >
              <Circle
                size={37}
                x={-7}
                y={-18}
                fill={'rgba(75, 195, 225, 0.94)'}
                stroke={'rgba(216, 248, 255, 0.95)'}
                lineWidth={4}
              />

              <Circle
                size={51}
                x={5}
                y={-40}
                fill={'rgba(103, 211, 235, 0.90)'}
                stroke={'rgba(216, 248, 255, 0.95)'}
                lineWidth={4}
              />

              <Circle
                size={33}
                x={-5}
                y={-65}
                fill={'rgba(42, 168, 204, 0.88)'}
                stroke={'rgba(216, 248, 255, 0.95)'}
                lineWidth={4}
              />
            </Node>
          </Node>

          {/* BEAKER FOUR */}

          <Node
            ref={beakerFour}
            x={2291}
            y={-60}
          >
            <Rect
              width={48}
              height={155}
              fill={'rgba(0, 0, 0, 0)'}
              clip
            >
              <Img
                src={chemistryImage}
                width={190}
                height={139}
                x={-71}
                shadowBlur={20}
                shadowColor={'rgba(52, 63, 89, 0.30)'}
                shadowOffsetY={10}
              />
            </Rect>

            <Node
              ref={steamFour}
              x={0}
              y={-8}
              opacity={0}
            >
              <Circle
                size={35}
                x={6}
                y={-17}
                fill={'rgba(111, 205, 129, 0.94)'}
                stroke={'rgba(222, 255, 228, 0.95)'}
                lineWidth={4}
              />

              <Circle
                size={47}
                x={-7}
                y={-39}
                fill={'rgba(140, 220, 153, 0.90)'}
                stroke={'rgba(222, 255, 228, 0.95)'}
                lineWidth={4}
              />

              <Circle
                size={36}
                x={5}
                y={-63}
                fill={'rgba(76, 176, 98, 0.88)'}
                stroke={'rgba(222, 255, 228, 0.95)'}
                lineWidth={4}
              />
            </Node>
          </Node>
        </Node>
      </Node>

      {/* CLAW */}

      <Node x={clawScreenX}>
        <Img
          ref={closedClaw}
          src={clawImage}
          width={360}
          height={480}
          y={-532}
        />

        <Img
          ref={openClaw}
          src={clawOpenImage}
          width={360}
          height={480}
          y={-360}
          opacity={0}
        />
      </Node>

      {/* TRUCK */}

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

  truck().y(955);
  productionSystem().y(900);

  objectFlow().x(0);
  upperTracks().x(0);
  lowerTracks().x(0);

  closedClaw().y(-532);
  closedClaw().opacity(1);

  droppedDnaBox().y(-1150);

  openClaw().y(-360);
  openClaw().opacity(0);

  productContainer().scale(1);
  movingCell().rotation(0);

  products.forEach(product => {
    product().scale(0);
    product().opacity(0);
  });

  highCostsArrow().end(0);
  highCostsArrow().opacity(0);

  beakerOne().rotation(0);
  beakerTwo().rotation(0);
  beakerThree().rotation(0);
  beakerFour().rotation(0);

  steamOne().opacity(0);
  steamTwo().opacity(0);
  steamThree().opacity(0);
  steamFour().opacity(0);

  // ============================================================
  // OPENING
  // ============================================================

  yield* all(
    truck().y(
      55,
      1.5,
      easeInOutCubic,
    ),

    productionSystem().y(
      0,
      1.5,
      easeInOutCubic,
    ),

    closedClaw().y(
      -360,
      1.5,
      easeInOutCubic,
    ),

    droppedDnaBox().y(
      -78,
      1.5,
      easeInOutCubic,
    ),
  );

  // ============================================================
  // RELEASE THE BOX
  // ============================================================

  closedClaw().opacity(0);
  openClaw().opacity(1);

  yield* droppedDnaBox().y(
    -70,
    0.1,
    easeInOutCubic,
  );

  yield* droppedDnaBox().y(
    -78,
    0.12,
    easeInOutCubic,
  );

  yield* waitFor(0.25);

  // ============================================================
  // RETRACT THE CLAW
  // ============================================================

  yield* openClaw().y(
    -950,
    0.9,
    easeInOutCubic,
  );

  openClaw().opacity(0);

  yield* waitFor(0.2);

  // ============================================================
  // PRODUCTION MOVEMENT
  // ============================================================

  yield* all(
    objectFlow().x(
      -objectTravelDistance,
      movementDuration,
      linear,
    ),

    animateProductBuildup(),
    animateHighCostsArrow(),

    // The production section begins about 3.1 seconds into the full scene,
    // so these delays begin the steam and matching shakes around 11 seconds.
    animateBeakerAndSteam(beakerOne, steamOne, 6.4, -1),
    animateBeakerAndSteam(beakerTwo, steamTwo, 6.55, 1),
    animateBeakerAndSteam(beakerThree, steamThree, 6.7, -1),
    animateBeakerAndSteam(beakerFour, steamFour, 6.85, 1),

    loop(20, function* () {
      yield* upperTracks().x(
        -40,
        0.8,
        linear,
      );

      upperTracks().x(0);
    }),

    loop(20, function* () {
      yield* lowerTracks().x(
        40,
        0.8,
        linear,
      );

      lowerTracks().x(0);
    }),

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