//1. Anti-neurodegenerative and anti-inflammatory 
import {
  Circle,
  Line,
  Node,
  Polygon,
  Rect,
  makeScene2D,
} from "@motion-canvas/2d";

import {
  all,
  createRef,
  createSignal,
  waitFor,
} from "@motion-canvas/core";

export default makeScene2D(function* (view) {

  view.fill("#FAFAFF");

  //---------------------------------------------------------
  // CAMERA
  //---------------------------------------------------------

  const world = createRef<Node>();

  view.add(
    <Node ref={world}/>
  );

  //---------------------------------------------------------
  // LEFT HEAD (NEUROPROTECTION)
  //---------------------------------------------------------

  const head1 = createRef<Circle>();
  const brain1 = createRef<Circle>();

  const lesion1 = createRef<Circle>();
  const lesion2 = createRef<Circle>();
  const lesion3 = createRef<Circle>();

  world().add(
    <>
      {/* Neck */}
      <Rect
        x={-520}
        y={150}
        width={120}
        height={180}
        radius={50}
        fill="#91A3FF"
      />

      {/* Head */}
      <Circle
        ref={head1}
        x={-520}
        y={0}
        size={260}
        fill="#91A3FF"
      />

      {/* Nose */}
      <Polygon
        x={-390}
        y={0}
        sides={3}
        size={18}
        rotation={90}
        fill="#91A3FF"
      />

      {/* Brain */}
      <Circle
        ref={brain1}
        x={-540}
        y={-30}
        size={150}
        fill="#F7BED8"
      />

      {/* Lesions */}
      <Circle
        ref={lesion1}
        x={-570}
        y={-60}
        size={28}
        fill="#454562"
      />

      <Circle
        ref={lesion2}
        x={-510}
        y={-10}
        size={24}
        fill="#454562"
      />

      <Circle
        ref={lesion3}
        x={-470}
        y={-70}
        size={22}
        fill="#454562"
      />
    </>
  );

  //---------------------------------------------------------
  // ARROW
  //---------------------------------------------------------

  const arrow = createRef<Polygon>();

  world().add(
    <Polygon
      ref={arrow}
      x={-220}
      y={0}
      sides={3}
      size={30}
      rotation={90}
      fill="#272760"
    />
  );

  //---------------------------------------------------------
  // RIGHT HEAD (ANTI-INFLAMMATORY)
  //---------------------------------------------------------

  const head2 = createRef<Circle>();
  const brain2 = createRef<Circle>();

  const spot1 = createRef<Circle>();
  const spot2 = createRef<Circle>();
  const spot3 = createRef<Circle>();
  const neckSpot = createRef<Circle>();

  world().add(
    <>
      {/* Neck */}
      <Rect
        x={420}
        y={150}
        width={120}
        height={180}
        radius={50}
        fill="#91A3FF"
      />

      {/* Head */}
      <Circle
        ref={head2}
        x={420}
        y={0}
        size={260}
        fill="#91A3FF"
      />

      {/* Nose facing LEFT */}
      <Polygon
        x={290}
        y={0}
        sides={3}
        size={18}
        rotation={270}
        fill="#91A3FF"
      />

      {/* Brain */}
      <Circle
        ref={brain2}
        x={440}
        y={-30}
        size={150}
        fill="#D9D7FF"
      />

      {/* Inflammation */}
      <Circle
        ref={spot1}
        x={390}
        y={-60}
        size={24}
        fill="#FF4A4A"
        shadowBlur={25}
        shadowColor="#FF4A4A"
      />

      <Circle
        ref={spot2}
        x={450}
        y={-10}
        size={24}
        fill="#FF4A4A"
        shadowBlur={25}
        shadowColor="#FF4A4A"
      />

      <Circle
        ref={spot3}
        x={510}
        y={-60}
        size={24}
        fill="#FF4A4A"
        shadowBlur={25}
        shadowColor="#FF4A4A"
      />

      <Circle
        ref={neckSpot}
        x={420}
        y={120}
        size={40}
        fill="#FF4A4A"
        shadowBlur={35}
        shadowColor="#FF4A4A"
      />
    </>
  );

  //---------------------------------------------------------
  // STARTING STATE
  //---------------------------------------------------------

  world().x(0);

  head2().opacity(0);
  brain2().opacity(0);

  spot1().opacity(0);
  spot2().opacity(0);
  spot3().opacity(0);
  neckSpot().opacity(0);

  //---------------------------------------------------------
  // ANIMATION
  //---------------------------------------------------------

  yield* waitFor(0.3);

  // Healthy brain appears
  yield* brain1().fill("#FFD5E8",1);

  // Degeneration disappears
  yield* all(
    lesion1().scale(0,1),
    lesion2().scale(0,1),
    lesion3().scale(0,1),

    lesion1().opacity(0,1),
    lesion2().opacity(0,1),
    lesion3().opacity(0,1),
  );

  yield* waitFor(.3);

  // Pan camera
  yield* world().x(-920,1.2);

  yield* all(
    head2().opacity(1,.6),
    brain2().opacity(1,.6),
    spot1().opacity(1,.6),
    spot2().opacity(1,.6),
    spot3().opacity(1,.6),
    neckSpot().opacity(1,.6),
  );

  // Pulse inflammation
  yield* all(
    spot1().scale(1.4,.4),
    spot2().scale(1.4,.4),
    spot3().scale(1.4,.4),
    neckSpot().scale(1.4,.4),
  );

  yield* all(
    spot1().scale(1,.3),
    spot2().scale(1,.3),
    spot3().scale(1,.3),
    neckSpot().scale(1,.3),
  );

  // Fade inflammation away
  yield* all(
    spot1().opacity(0,1),
    spot2().opacity(0,1),
    spot3().opacity(0,1),
    neckSpot().opacity(0,1),
  );

  yield* waitFor(0.5);

});