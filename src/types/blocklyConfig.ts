export interface BlocklyTheme {
  name: string;
  base: any;
  componentStyles?: {
    workspaceBackgroundColour?: string;
    toolboxBackgroundColour?: string;
    toolboxForegroundColour?: string;
    flyoutBackgroundColour?: string;
    flyoutForegroundColour?: string;
    scrollbarColour?: string;
    insertionMarkerColour?: string;
  };
}

export interface ToolboxCategory {
  kind: 'category';
  name: string;
  colour: string;
  contents: Array<{
    kind: string;
    type: string;
  }>;
}

export interface Toolbox {
  kind: 'categoryToolbox';
  contents: ToolboxCategory[];
}

export const HAND_CODED_THEME: BlocklyTheme = {
  name: 'handCoded',
  base: 'zelos',
  componentStyles: {
    workspaceBackgroundColour: '#1E1E1E',
    toolboxBackgroundColour: '#252526',
    toolboxForegroundColour: '#9CDCFE',
    flyoutBackgroundColour: '#252526',
    flyoutForegroundColour: '#9CDCFE',
    scrollbarColour: '#C586C0',
    insertionMarkerColour: '#007ACC'
  }
};

export {};

// Add empty export to make it a module
export {};