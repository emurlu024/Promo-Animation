import {makeProject} from '@motion-canvas/core';

import example from './scenes/example?scene';

import sceneOne  from './scenes/sceneOne?scene';
import sceneTwo from './scenes/sceneTwo?scene';
import sceneThree from './scenes/sceneThree?scene';
import sceneFour from './scenes/sceneFour?scene';

import projectLogo from './scenes/projectLogo?scene';

export default makeProject({
  scenes: [projectLogo]
});
