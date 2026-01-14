import Blockly from 'blockly';
import * as En from 'blockly/msg/en';
import { javascriptGenerator } from 'blockly/javascript';
import { pythonGenerator } from 'blockly/python';
import { phpGenerator } from 'blockly/php';
import { luaGenerator } from 'blockly/lua';
import { dartGenerator } from 'blockly/dart';
import { Language } from '../types';

// Set Blockly locale
Blockly.setLocale(En);

export class BlocklyAdapter {
  private workspace: any;
  private language: Language;
  
  constructor(container: HTMLElement, language: Language = 'javascript') {
    this.language = language;
    this.initializeWorkspace(container);
  }
  
  private initializeWorkspace(container: HTMLElement) {
    const customTheme = Blockly.Theme.defineTheme('handCoded', {
      'name': 'handCoded',
      'base': Blockly.Themes.Zelos,
      'componentStyles': {
        'workspaceBackgroundColour': '#1E1E1E',
        'toolboxBackgroundColour': '#252526',
        'toolboxForegroundColour': '#9CDCFE',
        'flyoutBackgroundColour': '#252526',
        'flyoutForegroundColour': '#9CDCFE',
        'scrollbarColour': '#C586C0',
        'insertionMarkerColour': '#007ACC'
      }
    });
    
    this.workspace = Blockly.inject(container, {
      toolbox: this.getToolbox(),
      theme: customTheme,
      zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2
      },
      grid: {
        spacing: 20,
        length: 3,
        colour: '#C586C0',
        snap: true
      },
      trashcan: true,
      renderer: 'zelos',
      move: {
        scrollbars: true,
        drag: true,
        wheel: true
      }
    });
    
    // Add custom blocks
    this.registerCustomBlocks();
  }
  
  private getToolbox() {
    return {
      kind: 'categoryToolbox',
      contents: [
        {
          kind: 'category',
          name: 'Logic',
          colour: '#5C81A6',
          contents: [
            { kind: 'block', type: 'controls_if' },
            { kind: 'block', type: 'logic_compare' },
            { kind: 'block', type: 'logic_operation' },
            { kind: 'block', type: 'logic_boolean' }
          ]
        },
        {
          kind: 'category',
          name: 'Loops',
          colour: '#5CA65C',
          contents: [
            { kind: 'block', type: 'controls_repeat_ext' },
            { kind: 'block', type: 'controls_whileUntil' },
            { kind: 'block', type: 'controls_for' }
          ]
        },
        {
          kind: 'category',
          name: 'Math',
          colour: '#5C68A6',
          contents: [
            { kind: 'block', type: 'math_number' },
            { kind: 'block', type: 'math_arithmetic' },
            { kind: 'block', type: 'math_single' }
          ]
        },
        {
          kind: 'category',
          name: 'Text',
          colour: '#A65C81',
          contents: [
            { kind: 'block', type: 'text' },
            { kind: 'block', type: 'text_print' },
            { kind: 'block', type: 'text_join' }
          ]
        },
        {
          kind: 'category',
          name: 'Variables',
          colour: '#A65C5C',
          custom: 'VARIABLE'
        },
        {
          kind: 'category',
          name: 'Functions',
          colour: '#A6815C',
          custom: 'PROCEDURE'
        }
      ]
    };
  }
  
  private registerCustomBlocks() {
    // Add console.log block
    Blockly.Blocks['console_log'] = {
      init: function() {
        this.appendValueInput('MESSAGE')
          .setCheck('String')
          .appendField('console.log');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(165);
        this.setTooltip('Log to console');
      }
    };
    
    // Use proper generator syntax
    const consoleLogGenerator = function(block: any) {
      const message = javascriptGenerator.valueToCode(block, 'MESSAGE', 0) || "''";
      return `console.log(${message});\n`;
    };
    
    // Register the generator
    (javascriptGenerator as any).forBlock['console_log'] = consoleLogGenerator;
  }
  
  getCode(): string {
    try {
      switch (this.language) {
        case 'javascript':
          return javascriptGenerator.workspaceToCode(this.workspace);
        case 'python':
          return pythonGenerator.workspaceToCode(this.workspace);
        case 'php':
          return phpGenerator.workspaceToCode(this.workspace);
        case 'lua':
          return luaGenerator.workspaceToCode(this.workspace);
        case 'dart':
          return dartGenerator.workspaceToCode(this.workspace);
        default:
          return javascriptGenerator.workspaceToCode(this.workspace);
      }
    } catch (error) {
      console.error('Error generating code:', error);
      return '';
    }
  }
  
  loadBlocksFromXml(xml: string) {
    try {
      const xmlDom = Blockly.utils.xml.textToDom(xml);
      Blockly.Xml.domToWorkspace(xmlDom, this.workspace);
    } catch (error) {
      console.error('Error loading blocks:', error);
    }
  }
  
  getXml(): string {
    try {
      const xml = Blockly.Xml.workspaceToDom(this.workspace);
      return Blockly.Xml.domToText(xml);
    } catch (error) {
      console.error('Error getting XML:', error);
      return '';
    }
  }
  
  highlightBlock(blockId: string) {
    const block = this.workspace.getBlockById(blockId);
    if (block) {
      block.setHighlighted(true);
      setTimeout(() => block.setHighlighted(false), 500);
    }
  }
  
  clearWorkspace() {
    this.workspace.clear();
  }
  
  resize() {
    Blockly.svgResize(this.workspace);
  }
}

export default BlocklyAdapter;