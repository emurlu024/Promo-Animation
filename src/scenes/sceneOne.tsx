import {Circle, Img, Node, makeScene2D} from '@motion-canvas/2d';
import {
  all,
  createRef,
  easeInOutCubic,
  waitFor,
} from '@motion-canvas/core';

import rightFacingHead from '../assets/pastelGreen-head-profile-leftFacing.png';
import leftFacingHead from '../assets/pastelGreen-head-profile-rightFacing.png';

export default makeScene2D(function* (view) {
  view.fill('#FAFAFF');

  const world = createRef<Node>();
  const rightHead = createRef<Img>();
  const leftHead = createRef<Img>();
  const blackDots = Array.from({length: 5}, () => createRef<Circle>());
  const redDots = Array.from({length: 5}, () => createRef<Circle>());

  const blackDotData = [
    {x: -50, y: -115, size: 41},
    {x: 45, y: -110, size: 34},
    {x: -30, y: -30, size: 31},
    {x: 80, y: -60, size: 29},
    {x: -130, y: -40, size: 35},
  ];

  const redDotData = [
    {x: 50, y: -115, size: 41},
    {x: -45, y: -110, size: 34},
    {x: 30, y: -30, size: 31},
    {x: -80, y: -60, size: 29},
    {x: 130, y: -40, size: 35},
  ];

  view.add(
    <Node ref={world}>
      {/* First head sits on the left side of the first 1920px screen. */}
      <Node x={-460} y={0} scale={2}>
        <Img
          ref={rightHead}
          src={rightFacingHead}
          width={520}
          height={520}
          x={0}
          y={20}
        />

        {blackDotData.map((dot, index) => (
          <Circle
            key={`black-dot-${index}`}
            ref={blackDots[index]}
            x={dot.x}
            y={dot.y}
            size={dot.size}
            fill={'#343442'}
            opacity={0}
          />
        ))}
      </Node>

      {/* Second head sits on the right side of the next 1920px screen. */}
      <Node x={2380} y={0} scale={2}>
        <Img
          ref={leftHead}
          src={leftFacingHead}
          width={520}
          height={520}
          x={0}
          y={20}
        />

        {redDotData.map((dot, index) => (
          <Circle
            key={`red-dot-${index}`}
            ref={redDots[index]}
            x={dot.x}
            y={dot.y}
            size={dot.size}
            fill={'#FF6268'}
            opacity={0}
            shadowBlur={index >= 3 ? 35 : 30}
            shadowColor={'#FF6268'}
          />
        ))}
      </Node>
    </Node>,
  );

  rightHead().opacity(1);
  leftHead().opacity(1);
  world().x(0);

  yield* waitFor(0.5);

  yield* all(
    ...blackDots.map((dot, index) => dot().opacity(1, 0.35 + index * 0.1)),
  );

  yield* all(...blackDots.map(dot => dot().scale(1.25, 0.3)));
  yield* all(...blackDots.map(dot => dot().scale(1, 0.25)));
  yield* waitFor(0.4);

  yield* all(
    ...blackDots.map(dot => dot().scale(0, 0.7, easeInOutCubic)),
    ...blackDots.map(dot => dot().opacity(0, 0.6)),
  );

  // Pan to the next screen; the second head lands on its right side.
  yield* world().x(-1920, 1.5, easeInOutCubic);
  yield* waitFor(0.3);

  yield* all(
    ...redDots.map((dot, index) => dot().opacity(1, 0.35 + index * 0.1)),
  );

  yield* all(...redDots.map(dot => dot().scale(1.4, 0.35)));
  yield* all(...redDots.map(dot => dot().scale(1, 0.3)));
  yield* all(...redDots.map(dot => dot().scale(1.3, 0.3)));
  yield* all(...redDots.map(dot => dot().scale(1, 0.25)));
  yield* waitFor(0.3);

  yield* all(
    ...redDots.map(dot => dot().scale(0, 0.8, easeInOutCubic)),
    ...redDots.map(dot => dot().opacity(0, 0.7)),
  );

  yield* waitFor(0.8);
});