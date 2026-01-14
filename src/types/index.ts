export type Language = 'javascript' | 'python' | 'php' | 'lua' | 'dart';
export type ExecutionState = 'idle' | 'running' | 'paused' | 'finished';

export interface Project {
  id: string;
  name: string;
  code: string;
  blocklyXml: string;
  language: Language;
  createdAt: Date;
  updatedAt: Date;
}

export interface VariableWatch {
  name: string;
  value: any;
  type: string;
}

export interface ErrorLocation {
  line: number;
  column: number;
  message: string;
}

// Add export to make it a module
export {};