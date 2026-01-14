import React, { useState } from 'react';
import { VariableWatch, ExecutionState } from '../types';
import BlockyButton from './UI/BlockyButton';

interface ExecutionPanelProps {
  onRun: () => void;
  onStep: () => void;
  onStop: () => void;
  onPause: () => void;
  executionState: ExecutionState;
  variables: VariableWatch[];
  consoleOutput: string[];
  currentLine?: number;
  errors: string[];
}

const ExecutionPanel: React.FC<ExecutionPanelProps> = ({
  onRun,
  onStep,
  onStop,
  onPause,
  executionState,
  variables,
  consoleOutput,
  currentLine,
  errors
}) => {
  const [outputFilter, setOutputFilter] = useState<'all' | 'logs' | 'errors'>('all');
  
  const filteredOutput = consoleOutput.filter(line => {
    if (outputFilter === 'logs') return !line.startsWith('[ERROR]');
    if (outputFilter === 'errors') return line.startsWith('[ERROR]');
    return true;
  });
  
  return (
    <div className="h-full flex flex-col border-4 border-[#1E1E1E] bg-[#252526]">
      {/* Control Panel */}
      <div className="p-3 border-b-4 border-[#1E1E1E]">
        <div className="flex flex-wrap gap-2 items-center">
          <div className="flex gap-2 mr-4">
            <BlockyButton
              onClick={onRun}
              color={executionState === 'running' ? '#5CA65C' : '#007ACC'}
              size="sm"
              animated={executionState === 'running'}
            >
              ▶️ Run
            </BlockyButton>
            
            <BlockyButton
              onClick={onStep}
              color="#C586C0"
              size="sm"
            >
              ⏭️ Step
            </BlockyButton>
            
            <BlockyButton
              onClick={onPause}
              color="#DCDCAA"
              size="sm"
              animated={executionState === 'paused'}
            >
              ⏸️ Pause
            </BlockyButton>
            
            <BlockyButton
              onClick={onStop}
              color="#CE9178"
              size="sm"
            >
              ⏹️ Stop
            </BlockyButton>
          </div>
          
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${executionState === 'running' ? 'bg-green-500 animate-pulse' : 
              executionState === 'paused' ? 'bg-yellow-500' : 
              executionState === 'finished' ? 'bg-blue-500' : 'bg-gray-500'}`}
            />
            <span className="text-[#9CDCFE] font-mono text-sm">
              {executionState.toUpperCase()}
            </span>
          </div>
          
          {currentLine && (
            <div className="ml-auto px-3 py-1 bg-[#1E1E1E] border-2 border-[#007ACC]">
              <span className="text-[#9CDCFE] font-mono text-sm">
                Line: {currentLine}
              </span>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Variables Panel */}
        <div className="w-1/3 border-r-4 border-[#1E1E1E] p-3 overflow-y-auto">
          <div className="mb-3">
            <h3 className="text-[#9CDCFE] font-mono font-bold text-lg mb-2 border-b-2 border-[#C586C0] pb-1">
              Variables
            </h3>
            {variables.length === 0 ? (
              <div className="text-gray-500 font-mono text-sm italic">
                No variables defined
              </div>
            ) : (
              <div className="space-y-2">
                {variables.map((variable, index) => (
                  <div
                    key={index}
                    className="p-2 border-2 border-[#1E1E1E] bg-[#2D2D2D] animate-pulse"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[#9CDCFE] font-mono">{variable.name}</span>
                      <span className="text-[#DCDCAA] font-mono text-sm">
                        {typeof variable.value}
                      </span>
                    </div>
                    <div className="mt-1 p-2 bg-[#1E1E1E] border border-[#007ACC]">
                      <span className="text-[#CE9178] font-mono break-all">
                        {JSON.stringify(variable.value)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {errors.length > 0 && (
            <div className="mt-4">
              <h3 className="text-[#CE9178] font-mono font-bold text-lg mb-2 border-b-2 border-[#CE9178] pb-1">
                Errors
              </h3>
              <div className="space-y-1">
                {errors.map((error, index) => (
                  <div
                    key={index}
                    className="p-2 bg-red-900/30 border-2 border-red-700 animate-pulse"
                  >
                    <span className="text-red-400 font-mono text-sm">
                      {error}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Console Panel */}
        <div className="flex-1 flex flex-col p-3">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-[#9CDCFE] font-mono font-bold text-lg border-b-2 border-[#C586C0] pb-1">
              Console
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => setOutputFilter('all')}
                className={`px-3 py-1 font-mono text-sm border-2 ${outputFilter === 'all' ? 'border-[#007ACC] bg-[#007ACC]' : 'border-[#1E1E1E]'}`}
              >
                All
              </button>
              <button
                onClick={() => setOutputFilter('logs')}
                className={`px-3 py-1 font-mono text-sm border-2 ${outputFilter === 'logs' ? 'border-[#5CA65C] bg-[#5CA65C]' : 'border-[#1E1E1E]'}`}
              >
                Logs
              </button>
              <button
                onClick={() => setOutputFilter('errors')}
                className={`px-3 py-1 font-mono text-sm border-2 ${outputFilter === 'errors' ? 'border-[#CE9178] bg-[#CE9178]' : 'border-[#1E1E1E]'}`}
              >
                Errors
              </button>
            </div>
          </div>
          
          <div className="flex-1 bg-[#1E1E1E] border-2 border-[#1E1E1E] p-3 overflow-y-auto font-mono text-sm">
            {filteredOutput.length === 0 ? (
              <div className="text-gray-500 italic">
                Console output will appear here...
              </div>
            ) : (
              filteredOutput.map((line, index) => (
                <div
                  key={index}
                  className={`py-1 border-l-4 pl-2 mb-1 ${line.startsWith('[ERROR]') ? 'border-red-500 text-red-400' : 'border-[#007ACC] text-[#9CDCFE]'}`}
                >
                  <span className="text-gray-500 mr-2">{index + 1}</span>
                  {line}
                </div>
              ))
            )}
          </div>
          
          {/* Execution Stats */}
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="p-2 border-2 border-[#1E1E1E] bg-[#2D2D2D] text-center">
              <div className="text-[#9CDCFE] font-mono text-sm">Variables</div>
              <div className="text-2xl font-bold text-[#C586C0]">{variables.length}</div>
            </div>
            <div className="p-2 border-2 border-[#1E1E1E] bg-[#2D2D2D] text-center">
              <div className="text-[#9CDCFE] font-mono text-sm">Output Lines</div>
              <div className="text-2xl font-bold text-[#5CA65C]">{consoleOutput.length}</div>
            </div>
            <div className="p-2 border-2 border-[#1E1E1E] bg-[#2D2D2D] text-center">
              <div className="text-[#9CDCFE] font-mono text-sm">Errors</div>
              <div className="text-2xl font-bold text-[#CE9178]">{errors.length}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutionPanel;