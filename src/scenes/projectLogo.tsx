import { Circle, Img, Node, Rect, Video, makeScene2D } from "@motion-canvas/2d";
import {
  all,
  chain,
  createRef,
  easeInCubic,
  easeInOutCubic,
  easeInOutSine,
  easeOutBack,
  easeOutCubic,
  linear,
  waitFor,
} from "@motion-canvas/core";

import outroVideo from "../assets/outro.mp4";
import sakuraImage from "../assets/iGEMSakura.png";
import mountainImage from "../assets/iGEMMountain.png";

// The attached video is 4.337667 seconds long.
// The logo transition therefore starts two seconds before its end.
const VIDEO_DURATION = 4.337667;
const TRANSITION_AT = VIDEO_DURATION - 2;

const MATCHA_GREEN = "#0D5A2B";
const SAKURA_PINK = "#FFB0BB";

export default makeScene2D(function* (view) {
  const video = createRef<Video>();
  const greenFade = createRef<Rect>();
  const logo = createRef<Node>();
  const pinkCircle = createRef<Circle>();
  const mountain = createRef<Img>();
  const sakura = createRef<Img>();

  view.fill(MATCHA_GREEN);

  view.add(
    <>
      {/* Full-screen video. */}
      <Video
        ref={video}
        src={outroVideo}
        width={1920}
        height={1080}
        play={false}
      />

      {/* This becomes the final matcha-green background. */}
      <Rect
        ref={greenFade}
        width={1920}
        height={1080}
        fill={MATCHA_GREEN}
        opacity={0}
      />

      <Node ref={logo}>
        {/* Drawn behind the other logo pieces like a rainbow. */}
        <Circle
          ref={pinkCircle}
          x={0}
          y={-67.5}
          size={470}
          fill={SAKURA_PINK}
          startAngle={135}
          endAngle={135}
          closed
          opacity={0}
        />

        {/* The flower is deliberately behind the mountain in the final logo. */}
        <Img
          ref={sakura}
          src={sakuraImage}
          x={-360}
          y={-590}
          width={500}
          rotation={-18}
          scale={[0.34, 0.28]}
        />

        {/* Drawn after the flower so the peak overlaps its lower petals. */}
        <Img
          ref={mountain}
          src={mountainImage}
          x={0}
          y={25}
          width={875}
          opacity={0}
          scale={0.82}
        />
      </Node>
    </>,
  );

  video().play();

  // Preserve the original falling path exactly; the later transition time
  // simply gives this same route more time and therefore slows it down.
  yield* all(
    sakura().y(-175, TRANSITION_AT, easeInOutSine),

    chain(
      sakura().x(-220, 0.58, easeInOutSine),
      sakura().x(10, 0.64, easeInOutSine),
      sakura().x(-105, 0.58, easeInOutSine),
      sakura().x(35, TRANSITION_AT - 1.8, easeInOutSine),
    ),

    chain(
      sakura().rotation(22, 0.64, easeInOutSine),
      sakura().rotation(-24, 0.68, easeInOutSine),
      sakura().rotation(18, 0.6, easeInOutSine),
      sakura().rotation(-8, TRANSITION_AT - 1.92, easeInOutSine),
    ),

    chain(
      sakura().scale([0.31, 0.37], 0.62, easeInOutSine),
      sakura().scale([0.38, 0.31], 0.66, easeInOutSine),
      sakura().scale([0.33, 0.38], 0.62, easeInOutSine),
      sakura().scale([0.36, 0.33], TRANSITION_AT - 1.9, easeInOutSine),
    ),
  );

  // At 2 seconds before the video ends, begin the slow logo transformation.
  // The flower reaches its final horizontal center before it starts spinning.
  yield* all(
    greenFade().opacity(1, 0.8, easeInOutCubic),
    // Hide only the picture. The video keeps playing, so its audio continues.
    video().opacity(0, 0.8, easeInOutCubic),
    sakura().position([-2, -125], 0.8, linear),
    sakura().rotation(164, 0.8, linear),
    sakura().scale([0.5, 0.47], 0.8, easeInOutSine),
  );

  // Start the pink reveal as soon as the mountain appears. The sakura uses
  // one uninterrupted rotation here so it never pauses between stages.
  yield* all(
    chain(
      all(
        mountain().opacity(1, 0.55, easeOutCubic),
        mountain().scale(1, 0.8, easeOutBack),
      ),
      waitFor(1.45),
    ),

    chain(
      waitFor(0.45),
      all(
        pinkCircle().opacity(1, 0.12),
        pinkCircle().endAngle(495, 1.8, easeInOutCubic),
      ),
    ),

    all(
      sakura().y(-100, 2.25, linear),
      sakura().rotation(712, 2.25, linear),
      sakura().scale([0.86, 0.86], 2.25, easeInOutSine),
    ),
  );

  // Preserve the completed disk. An exact 360-degree animated arc can wrap
  // back to its starting angle and render as empty in some previews.
  pinkCircle().startAngle(0);
  pinkCircle().endAngle(360);
  pinkCircle().opacity(1);

  // 720 degrees is visually identical to zero; normalize it so the final
  // flower is perfectly straight and future edits remain easy to reason about.
  sakura().rotation(0);

  // A tiny landing motion makes the placement feel intentional.
  yield* sakura().scale([0.9, 0.82], 0.12, easeInCubic);
  yield* sakura().scale([0.86, 0.86], 0.24, easeOutBack);

  // Move the completed logo to the left as one assembled unit.
  yield* logo().x(-400, 1, easeInOutCubic);

  yield* waitFor(1.5);
});