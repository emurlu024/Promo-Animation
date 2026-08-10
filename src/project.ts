import {makeProject} from '@motion-canvas/core';

import example from './scenes/example?scene';
import sceneOne  from './scenes/sceneOne?scene';
import sceneTwo from './scenes/sceneTwo?scene';

export default makeProject({
  scenes: [sceneTwo]
});
