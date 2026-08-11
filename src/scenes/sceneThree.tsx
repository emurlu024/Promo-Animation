import {
  Circle,
  Line,
  Node,
  Rect,
  makeScene2D,
} from '@motion-canvas/2d';

import {
  all,
  createRef,
  easeInOutCubic,
  easeOutBack,
  linear,
  sequence,
  waitFor,
} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  view.fill('#F7FAF5');

  // ============================================================
  // REFERENCES
  // ============================================================

  const cell = createRef<Node>();
  const cellBody = createRef<Circle>();
  const innerCell = createRef<Circle>();
  const nucleus = createRef<Circle>();

  const topTransporter = createRef<Node>();
  const bottomTransporter = createRef<Node>();
  const topGlow = createRef<Circle>();
  const bottomGlow = createRef<Circle>();

  const divisionCellA = createRef<Node>();
  const divisionCellB = createRef<Node>();

  const daughterCell1 = createRef<Node>();
  const daughterCell2 = createRef<Node>();
  const daughterCell3 = createRef<Node>();
  const daughterCell4 = createRef<Node>();
  const daughterCell5 = createRef<Node>();
  const daughterCell6 = createRef<Node>();

  const particles = Array.from(
    {length: 12},
    () => createRef<Circle>(),
  );

  const fluxCylinders = Array.from(
  {length: 6},
  () => createRef<Node>(),
  );

  const fluxLightnings = Array.from(
    {length: 6},
    () => createRef<Line>(),
  );

  const fluxOrangeOrganelle = createRef<Circle>();

  // ============================================================
  // COLORS
  // ============================================================

  const membraneColor = '#4F8F6B';
  const cellColor = '#BDE8C8';
  const innerColor = '#DDF4DF';

  const nucleusColor = '#E5B9DE';
  const nucleusOutline = '#A96DA0';

  const transporterColor = '#75AEEA';
  const transporterOutline = '#3F78B3';

  const particleColor = '#75F2E3';
  const particleGlow = '#BFFFF6';

  // ============================================================
  // PARTICLE POSITIONS
  // ============================================================

  const particleData = [
    {x: -730, y: -320},
    {x: -650, y: -400},
    {x: -810, y: -230},
    {x: -690, y: -155},
    {x: -770, y: -85},
    {x: -600, y: -110},

    {x: 730, y: 320},
    {x: 650, y: 400},
    {x: 810, y: 230},
    {x: 690, y: 155},
    {x: 770, y: 85},
    {x: 600, y: 110},
  ];

  const nucleusTargets = [
    {x: 30, y: -35},
    {x: 75, y: -55},
    {x: 120, y: -40},
    {x: 165, y: -20},
    {x: 45, y: 10},
    {x: 95, y: 0},

    {x: 145, y: 20},
    {x: 185, y: 35},
    {x: 35, y: 55},
    {x: 80, y: 70},
    {x: 125, y: 60},
    {x: 165, y: 75},
  ];

  // ============================================================
  // REUSABLE DAUGHTER CELL
  // ============================================================

  type CellPartDesign = {
    x: number;
    y: number;
    width: number;
    height: number;
    rotation: number;
  };

  type OrganelleDesign = CellPartDesign & {
    color: string;
    outline: string;
  };

  type DaughterCellDesign = {
    rotation: number;
    body: string;
    inner: string;
    nucleus: CellPartDesign;
    organelles: OrganelleDesign[];
  };

  const DaughterCell = ({
    ref,
    x = 0,
    y = 0,
    scale = 0,
    variant = 0,
  }: {
    ref: any;
    x?: number;
    y?: number;
    scale?: number;
    variant?: number;
  }) => {
    const variants: DaughterCellDesign[] = [
      {
        rotation: -5,
        body: '#BDE8C8',
        inner: '#DDF4DF',
        nucleus: {x: 42, y: -10, width: 126, height: 96, rotation: 8},
        organelles: [
          {x: -105, y: 52, width: 68, height: 31, rotation: -20, color: '#F5C780', outline: '#C58B40'},
          {x: -42, y: -70, width: 55, height: 27, rotation: 24, color: '#F5C780', outline: '#C58B40'},
          {x: 142, y: -58, width: 58, height: 28, rotation: -12, color: '#9DD8A9', outline: '#57966A'},
          {x: 145, y: 68, width: 62, height: 29, rotation: 18, color: '#9DD8A9', outline: '#57966A'},
        ],
      },
      {
        rotation: 6,
        body: '#C6EBC2',
        inner: '#E5F6DE',
        nucleus: {x: -48, y: 18, width: 110, height: 124, rotation: -12},
        organelles: [
          {x: 110, y: 55, width: 74, height: 30, rotation: 15, color: '#F2B982', outline: '#BA7746'},
          {x: 72, y: -73, width: 52, height: 31, rotation: -28, color: '#F2B982', outline: '#BA7746'},
          {x: -145, y: -50, width: 64, height: 27, rotation: 20, color: '#93D5B7', outline: '#4C9074'},
          {x: -150, y: 68, width: 54, height: 34, rotation: -8, color: '#93D5B7', outline: '#4C9074'},
        ],
      },
      {
        rotation: 4,
        body: '#B8E4D1',
        inner: '#DCF3E8',
        nucleus: {x: 66, y: 28, width: 138, height: 88, rotation: -6},
        organelles: [
          {x: -125, y: -48, width: 72, height: 34, rotation: 12, color: '#F7CF77', outline: '#C59636'},
          {x: -82, y: 72, width: 48, height: 28, rotation: -18, color: '#F7CF77', outline: '#C59636'},
          {x: 118, y: -72, width: 50, height: 33, rotation: 28, color: '#A9D39A', outline: '#648F55'},
          {x: 158, y: 48, width: 67, height: 26, rotation: -15, color: '#A9D39A', outline: '#648F55'},
        ],
      },
      {
        rotation: -7,
        body: '#CBE7B9',
        inner: '#EAF4D9',
        nucleus: {x: -62, y: -24, width: 104, height: 132, rotation: 14},
        organelles: [
          {x: 122, y: -55, width: 63, height: 35, rotation: -24, color: '#EFBF8E', outline: '#B77E4D'},
          {x: 72, y: 76, width: 57, height: 27, rotation: 16, color: '#EFBF8E', outline: '#B77E4D'},
          {x: -142, y: 58, width: 70, height: 28, rotation: 9, color: '#88CEAD', outline: '#4F8D70'},
          {x: -122, y: -78, width: 48, height: 32, rotation: -17, color: '#88CEAD', outline: '#4F8D70'},
        ],
      },
      {
        rotation: 11,
        body: '#B9E6BF',
        inner: '#DFF3DC',
        nucleus: {x: 18, y: 34, width: 116, height: 106, rotation: 18},
        organelles: [
          {x: -138, y: -58, width: 61, height: 29, rotation: 31, color: '#F4C68B', outline: '#BD824A'},
          {x: -98, y: 72, width: 74, height: 32, rotation: -10, color: '#F4C68B', outline: '#BD824A'},
          {x: 128, y: -62, width: 54, height: 31, rotation: -26, color: '#94D7A7', outline: '#519065'},
          {x: 154, y: 55, width: 48, height: 35, rotation: 14, color: '#94D7A7', outline: '#519065'},
        ],
      },
      {
        rotation: -12,
        body: '#C4E8D8',
        inner: '#E3F5EC',
        nucleus: {x: -28, y: -38, width: 142, height: 92, rotation: -19},
        organelles: [
          {x: 126, y: 62, width: 69, height: 28, rotation: -21, color: '#F6CB72', outline: '#BF9138'},
          {x: 92, y: -72, width: 49, height: 35, rotation: 17, color: '#F6CB72', outline: '#BF9138'},
          {x: -148, y: -38, width: 58, height: 26, rotation: 8, color: '#86CEB5', outline: '#478A72'},
          {x: -118, y: 76, width: 66, height: 33, rotation: 27, color: '#86CEB5', outline: '#478A72'},
        ],
      },
    ];

    const design = variants[variant % variants.length];

    return (
    <Node
      ref={ref}
      x={x}
      y={y}
      scale={scale}
      opacity={0}
      rotation={design.rotation}
    >
      <Circle
        width={470}
        height={320}
        fill={design.body}
        stroke={membraneColor}
        lineWidth={14}
        shadowColor={'#7FAF8D55'}
        shadowBlur={25}
      />

      <Circle
        width={435}
        height={285}
        fill={design.inner}
        stroke={'#81BD91'}
        lineWidth={4}
        lineDash={[10, 9]}
        opacity={0.75}
      />

      <Circle
        x={design.nucleus.x}
        y={design.nucleus.y}
        width={design.nucleus.width}
        height={design.nucleus.height}
        rotation={design.nucleus.rotation}
        fill={nucleusColor}
        stroke={nucleusOutline}
        lineWidth={7}
      />

      <Circle
        x={design.nucleus.x - 16}
        y={design.nucleus.y - 10}
        width={31}
        height={25}
        fill={'#C987BE'}
        opacity={0.7}
      />

      <Circle
        x={design.nucleus.x + 22}
        y={design.nucleus.y + 20}
        width={20}
        height={17}
        fill={'#F1D5EC'}
      />

      {design.organelles.map(organelle => (
        <Circle
          x={organelle.x}
          y={organelle.y}
          width={organelle.width}
          height={organelle.height}
          fill={organelle.color}
          stroke={organelle.outline}
          lineWidth={5}
          rotation={organelle.rotation}
        />
      ))}
    </Node>
    );
  };

  // ============================================================
  // SCENE
  // ============================================================

  view.add(
    <>
      {/* Original active-transport cell */}
      <Node
        ref={cell}
        x={0}
        y={0}
        scale={0}
      >
        <Circle
          ref={cellBody}
          width={1050}
          height={690}
          fill={cellColor}
          stroke={membraneColor}
          lineWidth={24}
          shadowColor={'#7FAF8D55'}
          shadowBlur={35}
        />

        <Circle
          ref={innerCell}
          width={990}
          height={630}
          fill={innerColor}
          stroke={'#81BD91'}
          lineWidth={5}
          lineDash={[15, 12]}
          opacity={0.75}
        />

        <Circle
          ref={nucleus}
          x={100}
          y={20}
          width={270}
          height={220}
          fill={nucleusColor}
          stroke={nucleusOutline}
          lineWidth={12}
          shadowColor={'#C781BB55'}
          shadowBlur={25}
        />

        <Circle
          x={75}
          y={0}
          width={72}
          height={58}
          fill={'#C987BE'}
          opacity={0.7}
        />

        <Circle
          x={145}
          y={52}
          width={45}
          height={38}
          fill={'#F1D5EC'}
          opacity={0.9}
        />

        {/* Organelles */}
        <Circle
          ref={fluxOrangeOrganelle}
          x={-180}
          y={115}
          width={135}
          height={65}
          fill={'#F5C780'}
          stroke={'#C58B40'}
          lineWidth={8}
          rotation={-18}
        />

        <Circle
          x={-80}
          y={-145}
          width={115}
          height={55}
          fill={'#F5C780'}
          stroke={'#C58B40'}
          lineWidth={8}
          rotation={20}
        />

        <Circle
          x={285}
          y={-125}
          width={105}
          height={52}
          fill={'#9DD8A9'}
          stroke={'#57966A'}
          lineWidth={8}
          rotation={-15}
        />

        <Circle
          x={325}
          y={130}
          width={120}
          height={56}
          fill={'#9DD8A9'}
          stroke={'#57966A'}
          lineWidth={8}
          rotation={17}
        />

    {/* Matte-purple cylinders — top-left inside the green cytoplasm */}
    {fluxCylinders.map((cylinder, index) => (
      <Node
        ref={cylinder}
        x={
        -310 +
        (index % 3) * 58 +
        (Math.floor(index / 3) === 1 ? 30 : 0)
        }
        y={
          -90 +
          Math.floor(index / 3) * 55
        }
        opacity={0}
        scale={0}
        rotation={90}
      >
        <Rect
          width={72}
          height={34}
          radius={16}
          fill={'#9B78A5'}
          stroke={'#76517E'}
          lineWidth={5}
        />

        <Circle
          x={-27}
          width={20}
          height={27}
          fill={'#B99AC1'}
          opacity={0.75}
        />
      </Node>
    ))}

    {/* Yellow lightning products */}
    {fluxLightnings.map((lightning, index) => (
      <Line
        ref={lightning}
        x={-150}
        y={95}
        points={[
          [-10, -42],
          [20, -42],
          [3, -8],
          [30, -8],
          [-18, 48],
          [-5, 12],
          [-31, 12],
        ]}
        closed
        fill={'#FFD84D'}
        stroke={'#E5AC22'}
        lineWidth={5}
        lineJoin={'round'}
        opacity={0}
        scale={0}
        rotation={index % 2 === 0 ? -12 : 8}
        shadowColor={'#FFE978'}
        shadowBlur={25}
      />
    ))}

        {/* Top-left transporter */}
        <Node
          ref={topTransporter}
          x={-390}
          y={-250}
          rotation={-35}
        >
          <Circle
            ref={topGlow}
            width={150}
            height={150}
            fill={transporterColor}
            opacity={0}
            shadowColor={particleColor}
            shadowBlur={50}
          />

          <Rect
            width={85}
            height={150}
            radius={35}
            fill={transporterColor}
            stroke={transporterOutline}
            lineWidth={10}
          />

          <Rect
            width={25}
            height={105}
            radius={15}
            fill={'#D9F1FF'}
            stroke={transporterOutline}
            lineWidth={5}
          />
        </Node>

        {/* Bottom-right transporter */}
        <Node
          ref={bottomTransporter}
          x={390}
          y={250}
          rotation={-35}
        >
          <Circle
            ref={bottomGlow}
            width={150}
            height={150}
            fill={transporterColor}
            opacity={0}
            shadowColor={particleColor}
            shadowBlur={50}
          />

          <Rect
            width={85}
            height={150}
            radius={35}
            fill={transporterColor}
            stroke={transporterOutline}
            lineWidth={10}
          />

          <Rect
            width={25}
            height={105}
            radius={15}
            fill={'#D9F1FF'}
            stroke={transporterOutline}
            lineWidth={5}
          />
        </Node>
      </Node>

      {/* Luminescent molecules */}
      {particles.map((particle, index) => (
        <Circle
          ref={particle}
          x={particleData[index].x}
          y={particleData[index].y}
          width={30}
          height={30}
          fill={particleColor}
          stroke={particleGlow}
          lineWidth={5}
          opacity={0}
          scale={0}
          shadowColor={particleColor}
          shadowBlur={28}
        />
      ))}

      {/* First generation */}
      <DaughterCell ref={divisionCellA} variant={0} />
      <DaughterCell ref={divisionCellB} variant={1} />

      {/* Second generation */}
      <DaughterCell ref={daughterCell1} variant={0} />
      <DaughterCell ref={daughterCell2} variant={1} />
      <DaughterCell ref={daughterCell3} variant={2} />
      <DaughterCell ref={daughterCell4} variant={3} />

      {/* Third generation: two more cells for the final cluster of six */}
      <DaughterCell ref={daughterCell5} variant={4} />
      <DaughterCell ref={daughterCell6} variant={5} />
    </>,
  );

  // ============================================================
// FLUX CONTROL
// ============================================================

function* fluxControl() {
  // Purple cylinders appear in the top-left green cytoplasm.
  yield* sequence(
    0.08,
    ...fluxCylinders.map(cylinder =>
      all(
        cylinder().opacity(1, 0.18),
        cylinder().scale(1, 0.25, easeOutBack),
      ),
    ),
  );

  yield* waitFor(0.25);

  // Move the cylinders diagonally downward through
  // the existing bottom-left orange organelle.
  yield* sequence(
    0.1,
    ...fluxCylinders.map((cylinder, index) =>
      all(
        cylinder().x(
          -180 + (index % 2) * 10,
          0.75,
          easeInOutCubic,
        ),
        cylinder().y(
          115 + (index % 3 - 1) * 10,
          0.75,
          easeInOutCubic,
        ),
        cylinder().rotation(
          -18,
          0.75,
          easeInOutCubic,
        ),
      ),
    ),
  );

  // Activate the orange organelle.
  yield* all(
    fluxOrangeOrganelle().scale(
      1.18,
      0.2,
      easeInOutCubic,
    ),
    fluxOrangeOrganelle().fill(
      '#FFD182',
      0.2,
    ),
    fluxOrangeOrganelle().shadowColor(
      '#FFD84D',
      0.2,
    ),
    fluxOrangeOrganelle().shadowBlur(
      35,
      0.2,
    ),
  );

  yield* fluxOrangeOrganelle().scale(
    1,
    0.16,
    easeInOutCubic,
  );

  // Convert each cylinder into lightning.
  for (
    let index = 0;
    index < fluxCylinders.length;
    index++
  ) {
    // Pull the cylinder into the orange organelle.
    yield* all(
      fluxCylinders[index]().position(
        [-180, 115],
        0.16,
        easeInOutCubic,
      ),
      fluxCylinders[index]().scale(
        0.1,
        0.16,
        easeInOutCubic,
      ),
      fluxCylinders[index]().opacity(
        0,
        0.16,
      ),
      fluxOrangeOrganelle().scale(
        1.1,
        0.16,
        easeInOutCubic,
      ),
    );

    // Start the lightning at the bottom of the organelle.
    fluxLightnings[index]().position([
      -180,
      145,
    ]);

    yield* all(
      fluxLightnings[index]().opacity(
        1,
        0.14,
      ),
      fluxLightnings[index]().scale(
      0.65,
      0.38,
      easeInOutCubic,
      ),
      fluxOrangeOrganelle().scale(
        1,
        0.16,
        easeInOutCubic,
      ),
    );

    // Move each bolt into one horizontal row
    // directly underneath the orange organelle.
    yield* all(
      // Staggered 3-by-2 arrangement beneath the orange organelle.
      fluxLightnings[index]().x(
        -100 +
          (index % 3) * 70 +
          (Math.floor(index / 3) === 1 ? 35 : 0),
        0.38,
        easeInOutCubic,
      ),
      fluxLightnings[index]().y(
        190 + Math.floor(index / 3) * 65,
        0.38,
        easeInOutCubic,
      ),
      fluxLightnings[index]().rotation(
        index % 2 === 0 ? -5 : 5,
        0.38,
        easeInOutCubic,
      ),
    );
  }

  // Pulse the completed row of energy.
  yield* all(
    ...fluxLightnings.map(lightning =>
      // Pulse outward.
      lightning().scale(
        0.78,
        0.15,
        easeInOutCubic,
      ),
    ),
    cellBody().shadowBlur(55, 0.15),
  );

  yield* all(
    ...fluxLightnings.map(lightning =>
      // Return to the smaller size.
      lightning().scale(
        0.65,
        0.18,
        easeInOutCubic,
      ),
    ),
    cellBody().shadowBlur(35, 0.18),
  );

  yield* waitFor(0.45);

  // Hide the lightning before active transport.
  yield* all(
    ...fluxLightnings.map(lightning =>
      lightning().opacity(0, 0.3),
    ),
    fluxOrangeOrganelle().shadowBlur(
      0,
      0.3,
    ),
    fluxOrangeOrganelle().fill(
      '#F5C780',
      0.3,
    ),
  );
}

  // ============================================================
  // ACTIVE TRANSPORT
  // ============================================================

  function* transportFromTop(particleIndex: number) {
    const particle = particles[particleIndex];
    const target = nucleusTargets[particleIndex];

    yield* all(
      particle().x(-465, 0.7, easeInOutCubic),
      particle().y(-280, 0.7, easeInOutCubic),
    );

    yield* all(
      topGlow().opacity(0.4, 0.12),
      topGlow().scale(1.2, 0.12),
      topTransporter().scale(1.1, 0.12),
      particle().scale(1.35, 0.12),
    );

    yield* all(
      particle().x(-350, 0.35, linear),
      particle().y(-205, 0.35, linear),
      particle().scale(0.8, 0.35),
    );

    yield* all(
      topGlow().opacity(0, 0.18),
      topGlow().scale(1, 0.18),
      topTransporter().scale(1, 0.18),
    );

    yield* all(
      particle().x(target.x, 0.75, easeInOutCubic),
      particle().y(target.y, 0.75, easeInOutCubic),
      particle().scale(0.55, 0.75, easeInOutCubic),
    );

    // Stop briefly and fade away inside the nucleus.
    yield* waitFor(0.12);
    yield* particle().opacity(0, 0.35, easeInOutCubic);
  }

  function* transportFromBottom(particleIndex: number) {
    const particle = particles[particleIndex];
    const target = nucleusTargets[particleIndex];

    yield* all(
      particle().x(465, 0.7, easeInOutCubic),
      particle().y(280, 0.7, easeInOutCubic),
    );

    yield* all(
      bottomGlow().opacity(0.4, 0.12),
      bottomGlow().scale(1.2, 0.12),
      bottomTransporter().scale(1.1, 0.12),
      particle().scale(1.35, 0.12),
    );

    yield* all(
      particle().x(350, 0.35, linear),
      particle().y(205, 0.35, linear),
      particle().scale(0.8, 0.35),
    );

    yield* all(
      bottomGlow().opacity(0, 0.18),
      bottomGlow().scale(1, 0.18),
      bottomTransporter().scale(1, 0.18),
    );

    yield* all(
      particle().x(target.x, 0.75, easeInOutCubic),
      particle().y(target.y, 0.75, easeInOutCubic),
      particle().scale(0.55, 0.75, easeInOutCubic),
    );

    // Stop briefly and fade away inside the nucleus.
    yield* waitFor(0.12);
    yield* particle().opacity(0, 0.35, easeInOutCubic);
  }

  // ============================================================
  // RAPID OUTWARD MITOSIS
  // ============================================================

  function* rapidMitosis() {
    yield* waitFor(0.3);

    // Original cell expands before dividing.
    yield* all(
      cell().scale.x(1.12, 0.28, easeInOutCubic),
      cell().scale.y(1.05, 0.28, easeInOutCubic),
      nucleus().scale.x(1.3, 0.28, easeInOutCubic),
      nucleus().scale.y(0.82, 0.28, easeInOutCubic),
    );

    // Cell pinches inward.
    yield* all(
      cell().scale.x(0.88, 0.22, easeInOutCubic),
      cell().scale.y(1.08, 0.22, easeInOutCubic),
      cellBody().width(860, 0.22, easeInOutCubic),
      innerCell().width(800, 0.22, easeInOutCubic),
      nucleus().opacity(0, 0.18),
    );

    // The first two cells begin together at the center.
    divisionCellA().position([-40, 0]);
    divisionCellB().position([40, 0]);

    yield* all(
      cell().opacity(0, 0.1),

      divisionCellA().opacity(1, 0.1),
      divisionCellB().opacity(1, 0.1),

      divisionCellA().scale(1.28, 0.38, easeOutBack),
      divisionCellB().scale(1.28, 0.38, easeOutBack),

      // Expand outward while keeping the center filled.
      divisionCellA().x(-265, 0.4, easeInOutCubic),
      divisionCellB().x(265, 0.4, easeInOutCubic),
    );

    yield* waitFor(0.12);

    // Both cells stretch vertically before dividing again.
    yield* all(
      divisionCellA().scale.x(1.18, 0.18, easeInOutCubic),
      divisionCellA().scale.y(1.42, 0.18, easeInOutCubic),

      divisionCellB().scale.x(1.18, 0.18, easeInOutCubic),
      divisionCellB().scale.y(1.42, 0.18, easeInOutCubic),
    );

    // The four new cells start close to their parent cells.
    daughterCell1().position([-265, -25]);
    daughterCell2().position([-265, 25]);
    daughterCell3().position([265, -25]);
    daughterCell4().position([265, 25]);

    // Second rapid division expands outward.
    yield* all(
      divisionCellA().opacity(0, 0.1),
      divisionCellB().opacity(0, 0.1),

      daughterCell1().opacity(1, 0.1),
      daughterCell2().opacity(1, 0.1),
      daughterCell3().opacity(1, 0.1),
      daughterCell4().opacity(1, 0.1),

      // Keep the cells large so the frame remains full.
      daughterCell1().scale(1.3, 0.42, easeOutBack),
      daughterCell2().scale(1.3, 0.42, easeOutBack),
      daughterCell3().scale(1.3, 0.42, easeOutBack),
      daughterCell4().scale(1.3, 0.42, easeOutBack),

      daughterCell1().position(
        [-245, -120],
        0.42,
        easeInOutCubic,
      ),
      daughterCell2().position(
        [-245, 120],
        0.42,
        easeInOutCubic,
      ),
      daughterCell3().position(
        [245, -120],
        0.42,
        easeInOutCubic,
      ),
      daughterCell4().position(
        [245, 120],
        0.42,
        easeInOutCubic,
      ),
    );

    // Final growth fills the remaining gaps.
    yield* all(
      daughterCell1().scale(1.45, 0.28, easeInOutCubic),
      daughterCell2().scale(1.45, 0.28, easeInOutCubic),
      daughterCell3().scale(1.45, 0.28, easeInOutCubic),
      daughterCell4().scale(1.45, 0.28, easeInOutCubic),

      daughterCell1().position(
        [-270, -145],
        0.28,
        easeInOutCubic,
      ),
      daughterCell2().position(
        [-270, 145],
        0.28,
        easeInOutCubic,
      ),
      daughterCell3().position(
        [270, -145],
        0.28,
        easeInOutCubic,
      ),
      daughterCell4().position(
        [270, 145],
        0.28,
        easeInOutCubic,
      ),
    );

    // Gentle synchronized growth pulse.
    yield* all(
      daughterCell1().scale(1.5, 0.15, easeInOutCubic),
      daughterCell2().scale(1.5, 0.15, easeInOutCubic),
      daughterCell3().scale(1.5, 0.15, easeInOutCubic),
      daughterCell4().scale(1.5, 0.15, easeInOutCubic),
    );

    yield* all(
      daughterCell1().scale(1.45, 0.18, easeInOutCubic),
      daughterCell2().scale(1.45, 0.18, easeInOutCubic),
      daughterCell3().scale(1.45, 0.18, easeInOutCubic),
      daughterCell4().scale(1.45, 0.18, easeInOutCubic),
    );

    yield* waitFor(0.12);

    // Two cells divide once more, bringing the colony from four to six.
    // They pinch in different directions so the division feels organic.
    yield* all(
      daughterCell2().scale.x(1.18, 0.18, easeInOutCubic),
      daughterCell2().scale.y(1.62, 0.18, easeInOutCubic),
      daughterCell3().scale.x(1.62, 0.18, easeInOutCubic),
      daughterCell3().scale.y(1.18, 0.18, easeInOutCubic),
      daughterCell2().rotation(-3, 0.18, easeInOutCubic),
      daughterCell3().rotation(13, 0.18, easeInOutCubic),
    );

    // The two new cells begin almost on top of the cells that produced them.
    daughterCell5().position([-245, 135]);
    daughterCell6().position([245, -135]);

    yield* all(
      daughterCell5().opacity(1, 0.1),
      daughterCell6().opacity(1, 0.1),
      daughterCell5().scale(1.18, 0.34, easeOutBack),
      daughterCell6().scale(1.28, 0.34, easeOutBack),

      // All six move into a loose, uneven cluster with intentional overlap.
      daughterCell1().position([-430, -205], 0.46, easeInOutCubic),
      daughterCell2().position([-330, 185], 0.46, easeInOutCubic),
      daughterCell3().position([105, -225], 0.46, easeInOutCubic),
      daughterCell4().position([405, 145], 0.46, easeInOutCubic),
      daughterCell5().position([-20, 190], 0.46, easeInOutCubic),
      daughterCell6().position([425, -185], 0.46, easeInOutCubic),

      daughterCell1().scale(1.3, 0.46, easeInOutCubic),
      daughterCell2().scale(1.16, 0.46, easeInOutCubic),
      daughterCell3().scale(1.38, 0.46, easeInOutCubic),
      daughterCell4().scale(1.22, 0.46, easeInOutCubic),
    );

    // Small independent settling motions keep the result from looking arranged.
    yield* all(
      daughterCell1().rotation(-11, 0.22, easeInOutCubic),
      daughterCell2().rotation(4, 0.27, easeInOutCubic),
      daughterCell3().rotation(9, 0.19, easeInOutCubic),
      daughterCell4().rotation(-15, 0.25, easeInOutCubic),
      daughterCell5().rotation(14, 0.2, easeInOutCubic),
      daughterCell6().rotation(-7, 0.24, easeInOutCubic),
      daughterCell2().y(172, 0.27, easeInOutCubic),
      daughterCell5().x(-38, 0.2, easeInOutCubic),
      daughterCell6().y(-198, 0.24, easeInOutCubic),
    );
  }

  // ============================================================
  // MAIN ANIMATION
  // ============================================================

  // Introduce the original cell.
  yield* cell().scale(
    1,
    0.65,
    easeInOutCubic,
  );

  // Play flux control before active transport.
  yield* fluxControl();
  yield* waitFor(0.2);

  // Briefly highlight the transport proteins.
  yield* all(
    topTransporter().scale(1.08, 0.3),
    bottomTransporter().scale(1.08, 0.3),
  );

  yield* all(
    topTransporter().scale(1, 0.3),
    bottomTransporter().scale(1, 0.3),
  );

  // Show all luminescent molecules.
  yield* sequence(
    0.07,
    ...particles.map(particle =>
      all(
        particle().opacity(1, 0.25),
        particle().scale(
          1,
          0.35,
          easeOutBack,
        ),
      ),
    ),
  );

  yield* waitFor(0.4);

  // Alternate between the two transport proteins.
  yield* sequence(
    0.23,
    transportFromTop(0),
    transportFromBottom(6),
    transportFromTop(1),
    transportFromBottom(7),
    transportFromTop(2),
    transportFromBottom(8),
    transportFromTop(3),
    transportFromBottom(9),
    transportFromTop(4),
    transportFromBottom(10),
    transportFromTop(5),
    transportFromBottom(11),
  );

  // Active transport finishes.
  yield* all(
    cellBody().shadowBlur(60, 0.35),
    innerCell().opacity(1, 0.35),
    nucleus().scale(1.08, 0.35, easeInOutCubic),
  );

  yield* all(
    cellBody().shadowBlur(35, 0.35),
    innerCell().opacity(0.75, 0.35),
    nucleus().scale(1, 0.35, easeInOutCubic),
  );

  // Optimized growth conditions: rapid outward mitosis.
  yield* rapidMitosis();

  yield* waitFor(1);
});