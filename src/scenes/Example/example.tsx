import {makeScene2D, Circle} from '@motion-canvas/2d';

export default makeScene2D(function* (view) {
  view.add(<Circle width={100} height={100} fill={'red'} />);
});
