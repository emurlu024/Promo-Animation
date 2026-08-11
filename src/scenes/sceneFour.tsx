import {
  Circle,
  Img,
  Node,
  Path,
  Rect,
  makeScene2D,
} from '@motion-canvas/2d';
import {
  all,
  chain,
  createRef,
  easeInOutCubic,
  easeOutBack,
  sequence,
  waitFor,
} from '@motion-canvas/core';

import bench1 from '../assets/bench1.png';
import bench2 from '../assets/bench2.png';

import emptyLeft from '../assets/emptyFacingLeft.png';
import emptyRight from '../assets/emptyFacingRight.png';

import pinkStandImage from '../assets/pink.png';
import greenStandImage from '../assets/green.png';
import pinkBeakerImage from '../assets/pinkbeaker.png';
import greenBeakerImage from '../assets/greenbeaker.png';

import teaPlateImage from '../assets/TeaLeavesPlate.png';
import sakuraPlateImage from '../assets/CherryBlossomPlate.png';

import closedClawImage from '../assets/claw.png';
import openClawImage from '../assets/clawOpen.png';

import hoodImage from '../assets/factoryHood.png';
import truckImage from '../assets/truckFlip.png';
import sakuranetinImage from '../assets/Sakuranetin.png';
import theanineImage from '../assets/theanine.png';

export default makeScene2D(function* (view) {
  const scene = createRef<Node>();

  const leftBench = createRef<Img>();
  const rightBench = createRef<Img>();

  const sakuraPlate = createRef<Img>();
  const teaPlate = createRef<Img>();

  const pinkEmpty = createRef<Img>();
  const greenEmpty = createRef<Img>();

  const pinkStand = createRef<Img>();
  const greenStand = createRef<Img>();

  const pinkBeaker = createRef<Img>();
  const greenBeaker = createRef<Img>();

  const pipette = createRef<Node>();
  const pipetteLiquid = createRef<Rect>();
  const pipetteDrop = createRef<Circle>();

  const pinkClaw = createRef<Node>();
  const pinkClawOpen = createRef<Img>();
  const pinkClawClosed = createRef<Img>();
  const pinkHoodDrop = createRef<Path>();

  const greenClaw = createRef<Node>();
  const greenClawOpen = createRef<Img>();
  const greenClawClosed = createRef<Img>();
  const greenHoodDrop = createRef<Path>();

  const pinkHood = createRef<Img>();
  const greenHood = createRef<Img>();
  const sakuranetinMolecule = createRef<Img>();
  const theanineMolecule = createRef<Img>();
  const truckOne = createRef<Img>();
  const truckTwo = createRef<Img>();

  view.fill('#F7F1E8');

  view.add(
    <Node ref={scene}>
      {/* TABLES */}
      <Img
        ref={leftBench}
        src={bench1}
        x={-350}
        y={50}
        width={750}
        opacity={0}
        scale={1.2}
      />

      <Img
        ref={rightBench}
        src={bench2}
        x={570}
        y={130}
        width={750}
        opacity={0}
        scale={1.2}
      />

      {/* ORIGINAL EMPTY PINK APPARATUS */}
      <Img
        ref={pinkEmpty}
        src={emptyLeft}
        x={-600}
        y={-200}
        height={400}
        opacity={0}
      />

      {/* COLORED PINK STAND */}
      <Img
        ref={pinkStand}
        src={pinkStandImage}
        x={-600}
        y={-200}
        height={400}
        opacity={0}
      />

      {/* SEPARATE PINK BEAKER */}
      <Img
        ref={pinkBeaker}
        src={pinkBeakerImage}
        x={-630}
        y={-65}
        height={400}
        opacity={0}
      />

      {/* ORIGINAL EMPTY GREEN APPARATUS */}
      <Img
        ref={greenEmpty}
        src={emptyRight}
        x={320}
        y={-200}
        height={400}
        opacity={0}
      />

      {/* COLORED GREEN STAND */}
      <Img
        ref={greenStand}
        src={greenStandImage}
        x={320}
        y={-200}
        height={400}
        opacity={0}
      />

      {/* SEPARATE GREEN BEAKER */}
      <Img
        ref={greenBeaker}
        src={greenBeakerImage}
        x={293}
        y={-60}
        height={400}
        opacity={0}
      />

      {/* INGREDIENT PLATES */}
      <Img
        ref={sakuraPlate}
        src={sakuraPlateImage}
        x={-300}
        y={-95}
        width={200}
        opacity={0}
        scale={0.75}
      />

      <Img
        ref={teaPlate}
        src={teaPlateImage}
        x={600}
        y={-95}
        width={200}
        opacity={0}
        scale={0.75}
      />

      {/* PIPETTE */}
      <Node
        ref={pipette}
        x={-300}
        y={-450}
        opacity={0}
        rotation={8}
      >
        <Rect
          width={42}
          height={185}
          radius={18}
          fill={'#DCEAF1'}
          stroke={'#718A96'}
          lineWidth={6}
        />

        <Rect
          ref={pipetteLiquid}
          y={40}
          width={22}
          height={86}
          radius={9}
          fill={'#F49AB7'}
          opacity={0}
        />

        <Rect
          y={116}
          width={14}
          height={78}
          radius={7}
          fill={'#DCEAF1'}
          stroke={'#718A96'}
          lineWidth={5}
        />

        <Circle
          ref={pipetteDrop}
          y={162}
          width={18}
          height={18}
          fill={'#F49AB7'}
          opacity={0}
          scale={0}
        />
      </Node>

      {/* ALIGNED PINK CLAW */}
      <Node
        ref={pinkClaw}
        x={-630}
        y={-610}
        opacity={0}
        scale={0.55}
      >
        <Rect
          x={0}
          y={-700}
          width={36}
          height={1200}
          radius={0}
          fill={'#90A76A'}
        />

        <Img
          ref={pinkClawOpen}
          src={openClawImage}
          height={700}
        />

        <Img
          ref={pinkClawClosed}
          src={closedClawImage}
          height={700}
          opacity={0}
        />
      </Node>

      {/* ALIGNED GREEN CLAW */}
      <Node
        ref={greenClaw}
        x={290}
        y={-610}
        opacity={0}
        scale={0.55}
      >
        <Rect
          x={0}
          y={-700}
          width={36}
          height={1200}
          radius={0}
          fill={'#90A76A'}
        />

        <Img
          ref={greenClawOpen}
          src={openClawImage}
          height={700}
        />

        <Img
          ref={greenClawClosed}
          src={closedClawImage}
          height={700}
          opacity={0}
        />
      </Node>

      {/* COLORED DROPS INTO THE HOODS */}
      <Path
        ref={pinkHoodDrop}
        data={'M 0 -24 C -5 -13 -16 -1 -16 10 C -16 20 -9 27 0 27 C 9 27 16 20 16 10 C 16 -1 5 -13 0 -24 Z'}
        x={-820}
        y={35}
        fill={'#F49AB7'}
        opacity={0}
        scale={0}
      />

      <Path
        ref={greenHoodDrop}
        data={'M 0 -24 C -5 -13 -16 -1 -16 10 C -16 20 -9 27 0 27 C 9 27 16 20 16 10 C 16 -1 5 -13 0 -24 Z'}
        x={100}
        y={35}
        fill={'#94C96B'}
        opacity={0}
        scale={0}
      />

      {/* MOLECULES BEHIND THE HOODS AND TRUCKS */}
      <Img
        ref={sakuranetinMolecule}
        src={sakuranetinImage}
        x={-820}
        y={125}
        width={230}
        opacity={0}
        scale={0.72}
      />

      <Img
        ref={theanineMolecule}
        src={theanineImage}
        x={100}
        y={125}
        width={280}
        opacity={0}
        scale={0.72}
      />

      {/* FACTORY HOODS */}
      <Img
        ref={pinkHood}
        src={hoodImage}
        x={-820}
        y={148}
        width={560}
        opacity={0}
        scale={0.9}
      />

      <Img
        ref={greenHood}
        src={hoodImage}
        x={100}
        y={148}
        width={560}
        opacity={0}
        scale={0.9}
      />

      {/* TRUCKS */}
      <Img
        ref={truckOne}
        src={truckImage}
        x={-1350}
        y={365}
        width={650}
        opacity={0}
      />

      <Img
        ref={truckTwo}
        src={truckImage}
        x={-1950}
        y={365}
        width={650}
        opacity={0}
      />
    </Node>,
  );

  // Reveal the workstations.
  yield* all(
    leftBench().opacity(1, 0.55),
    rightBench().opacity(1, 0.55),

    leftBench().y(10, 0.55, easeOutBack),
    rightBench().y(10, 0.55, easeOutBack),

    pinkHood().opacity(1, 0.55),
    pinkHood().scale(1, 0.55, easeOutBack),

    greenHood().opacity(1, 0.55),
    greenHood().scale(1, 0.55, easeOutBack),
  );

  yield* sequence(
    0.12,

    all(
      pinkEmpty().opacity(1, 0.35),
      pinkEmpty().scale(1, 0.35, easeOutBack),
    ),

    all(
      greenEmpty().opacity(1, 0.35),
      greenEmpty().scale(1, 0.35, easeOutBack),
    ),

    all(
      sakuraPlate().opacity(1, 0.35),
      sakuraPlate().scale(1.3, 0.35, easeOutBack),
    ),

    all(
      teaPlate().opacity(1, 0.35),
      teaPlate().scale(1.3, 0.35, easeOutBack),
    ),
  );

  yield* waitFor(0.3);

  // ---------------------------------------------------------
  // PINK / SAKURA SAMPLE
  // ---------------------------------------------------------

  yield* all(
    pipette().opacity(1, 0.2),
    pipette().position(
      [-300, -265],
      0.55,
      easeInOutCubic,
    ),
  );

  // Fill the pipette with pink liquid.
  yield* all(
    sakuraPlate().scale(
      1.36,
      0.16,
      easeInOutCubic,
    ),
    pipetteLiquid().opacity(1, 0.16),
  );

  yield* sakuraPlate().scale(
    1.3,
    0.16,
    easeInOutCubic,
  );

  // Move above the pink apparatus.
  yield* pipette().position(
    [-600, -440],
    0.55,
    easeInOutCubic,
  );

  yield* all(
    pipetteDrop().opacity(1, 0.12),
    pipetteDrop().scale(
      1,
      0.12,
      easeOutBack,
    ),
  );

  yield* pipetteDrop().y(
    205,
    0.22,
    easeInOutCubic,
  );

  // Switch to the colored pink stand and beaker.
  yield* all(
    pipetteDrop().opacity(0, 0.12),
    pipetteLiquid().opacity(0, 0.18),

    pinkEmpty().opacity(0, 0.25),
    pinkStand().opacity(1, 0.25),
    pinkBeaker().opacity(1, 0.25),
  );

  // Reset the pipette drop.
  pipetteDrop().y(162);
  pipetteDrop().scale(0);

  // Change the pipette liquid to green.
  pipetteLiquid().fill('#94C96B');
  pipetteDrop().fill('#94C96B');

  // ---------------------------------------------------------
  // GREEN / TEA SAMPLE
  // ---------------------------------------------------------

  yield* pipette().position(
    [600, -265],
    0.65,
    easeInOutCubic,
  );

  // Fill the pipette with green liquid.
  yield* all(
    teaPlate().scale(
      1.36,
      0.16,
      easeInOutCubic,
    ),
    pipetteLiquid().opacity(1, 0.16),
  );

  yield* teaPlate().scale(
    1.3,
    0.16,
    easeInOutCubic,
  );

  // Move above the green apparatus.
  yield* pipette().position(
    [320, -440],
    0.55,
    easeInOutCubic,
  );

  yield* all(
    pipetteDrop().opacity(1, 0.12),
    pipetteDrop().scale(
      1,
      0.12,
      easeOutBack,
    ),
  );

  yield* pipetteDrop().y(
    205,
    0.22,
    easeInOutCubic,
  );

  // Switch to the colored green stand and beaker.
  yield* all(
    pipetteDrop().opacity(0, 0.12),
    pipetteLiquid().opacity(0, 0.18),

    greenEmpty().opacity(0, 0.25),
    greenStand().opacity(1, 0.25),
    greenBeaker().opacity(1, 0.25),
  );

  yield* pipette().opacity(0, 0.25);

  yield* waitFor(0.25);

  // ---------------------------------------------------------
  // PINK CLAW
  // ---------------------------------------------------------

  // Start both trucks early and let them glide in slowly while the
  // pink claw completes its grab and transfer.
  yield* all(
    truckOne().opacity(1, 0.15),
    truckTwo().opacity(1, 0.15),
    truckOne().x(-820, 2.25, easeInOutCubic),
    truckTwo().x(100, 2.35, easeInOutCubic),

    chain(
      pinkClaw().opacity(1, 0.2),

      // Lower the aligned claw onto the pink beaker.
      pinkClaw().y(
        -250,
        0.45,
        easeInOutCubic,
      ),

      // Close the claw around the beaker.
      all(
        pinkClawOpen().opacity(0, 0.12),
        pinkClawClosed().opacity(1, 0.12),

        pinkBeaker().scale(
          0.94,
          0.18,
          easeInOutCubic,
        ),
      ),

      // Carry the pink beaker toward the hood.
      all(
        pinkClaw().position(
          [-820, -190],
          1.05,
          easeInOutCubic,
        ),

        pinkBeaker().position(
          [-820, 20],
          1.05,
          easeInOutCubic,
        ),

        pinkBeaker().scale(
          0.3,
          1.05,
          easeInOutCubic,
        ),
      ),
    ),
  );

  // Release the pink beaker into the hood.
  yield* all(
    pinkClawClosed().opacity(0, 0.12),
    pinkClawOpen().opacity(1, 0.12),

    pinkBeaker().position(
      [-820, 60],
      0.25,
      easeInOutCubic,
    ),
  );

  // Let a pink teardrop fall from the beaker into the hood.
  yield* all(
    pinkHoodDrop().opacity(1, 0.1),
    pinkHoodDrop().scale(1, 0.1, easeOutBack),
  );

  yield* all(
    pinkHoodDrop().y(145, 0.38, easeInOutCubic),
    pinkHoodDrop().opacity(0, 0.38),
  );

  // Sakuranetin moves continuously from behind the hood into the truck.
  sakuranetinMolecule().opacity(1);
  yield* all(
    sakuranetinMolecule().y(350, 0.72, easeInOutCubic),
    sakuranetinMolecule().scale(0.46, 0.72, easeInOutCubic),
  );
  sakuranetinMolecule().opacity(0);

  // Lift the pink claw straight up and fully out of frame.
  yield* pinkClaw().y(
    -900,
    0.75,
    easeInOutCubic,
  );

  pinkClaw().opacity(0);

  // ---------------------------------------------------------
  // GREEN CLAW
  // ---------------------------------------------------------

  yield* greenClaw().opacity(1, 0.2);

  // Lower the aligned claw onto the green beaker.
  yield* greenClaw().y(
    -240,
    0.45,
    easeInOutCubic,
  );

  // Close the claw around the beaker.
  yield* all(
    greenClawOpen().opacity(0, 0.12),
    greenClawClosed().opacity(1, 0.12),

    greenBeaker().scale(
      0.94,
      0.18,
      easeInOutCubic,
    ),
  );

  // Carry the green beaker toward the hood while keeping it
  // centered beneath the claw.
  yield* all(
    greenClaw().position(
      [110, -190],
      0.7,
      easeInOutCubic,
    ),

    greenBeaker().position(
      [140, 20],
      0.7,
      easeInOutCubic,
    ),

    greenBeaker().scale(
      0.3,
      0.7,
      easeInOutCubic,
    ),
  );

  // Release the green beaker into the hood.
  yield* all(
    greenClawClosed().opacity(0, 0.12),
    greenClawOpen().opacity(1, 0.12),

    greenBeaker().position(
      [140, 60],
      0.25,
      easeInOutCubic,
    ),
  );

  // Let a green teardrop fall from the beaker into the hood.
  yield* all(
    greenHoodDrop().opacity(1, 0.1),
    greenHoodDrop().scale(1, 0.1, easeOutBack),
  );

  yield* all(
    greenHoodDrop().y(145, 0.38, easeInOutCubic),
    greenHoodDrop().opacity(0, 0.38),
  );

  // Theanine moves continuously from behind the hood into the truck.
  theanineMolecule().opacity(1);
  yield* all(
    theanineMolecule().y(350, 0.72, easeInOutCubic),
    theanineMolecule().scale(0.46, 0.72, easeInOutCubic),
  );
  theanineMolecule().opacity(0);

  yield* greenClaw().opacity(0, 0.2);

  yield* waitFor(0.35);

  // Both loaded trucks drive away together to the right.
  yield* all(
    truckOne().x(1450, 1.45, easeInOutCubic),
    truckTwo().x(2100, 1.45, easeInOutCubic),
  );

  yield* waitFor(0.4);
}); 