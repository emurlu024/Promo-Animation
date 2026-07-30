import {makeProject} from '@motion-canvas/core';

import example from './scenes/example?scene';
import sceneOne  from './scenes/sceneOne?scene';

export default makeProject({
  scenes: [example, sceneOne]
});
