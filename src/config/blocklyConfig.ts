import Blockly from 'blockly';

export const blocklyConfig = {
  theme: 'handCoded',
  toolbox: '',
  grid: {
    spacing: 20,
    length: 3,
    colour: '#C586C0',
    snap: true
  },
  zoom: {
    controls: true,
    wheel: true,
    startScale: 1.0,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.2
  },
  renderer: 'zelos',
  trashcan: true,
  move: {
    scrollbars: true,
    drag: true,
    wheel: true
  }
};

export default blocklyConfig;