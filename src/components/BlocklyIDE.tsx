import React, { useState, useEffect, useRef } from 'react';
import CodeEditor from './CodeEditor';
import ExecutionPanel from './ExecutionPanel';
import BlockyButton from './UI/BlockyButton';
import { BlocklyAdapter } from '../utils/blocklyAdapter';
import { CodeParser } from '../utils/parsers';
import { saveProject, loadProjects } from '../config/firebase';
import { Language, Project, VariableWatch, ExecutionState, ErrorLocation } from '../types';

const BlocklyIDE: React.FC = () => {
  // Refs
  const blocklyDivRef = useRef<HTMLDivElement>(null);
  const blocklyAdapterRef = useRef<BlocklyAdapter | null>(null);
  
  // State
  const [code, setCode] = useState<string>('// Write your code here\nconsole.log("Hello, Blockly!");');
  const [language, setLanguage] = useState<Language>('javascript');
  const [executionState, setExecutionState] = useState<ExecutionState>('idle');
  const [variables, setVariables] = useState<VariableWatch[]>([]);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([
    'Console initialized...',
    'Ready to execute code!'
  ]);
  const [errors, setErrors] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState<number | undefined>();
  const [currentError, setCurrentError] = useState<ErrorLocation | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [syncMode, setSyncMode] = useState<'manual' | 'auto'>('auto');
  const [parser, setParser] = useState<CodeParser>(new CodeParser('esprima'));
  
  // Initialize Blockly
  useEffect(() => {
    if (blocklyDivRef.current && !blocklyAdapterRef.current) {
      blocklyAdapterRef.current = new BlocklyAdapter(blocklyDivRef.current, language);
      
      // Listen for block changes
      if (blocklyAdapterRef.current) {
        const workspace = (blocklyAdapterRef.current as any).workspace;
        if (workspace) {
          workspace.addChangeListener(() => {
            if (syncMode === 'auto') {
              updateCodeFromBlocks();
            }
          });
        }
      }
    }
    
    loadSavedProjects();
    
    return () => {
      // Cleanup
      if (blocklyAdapterRef.current) {
        blocklyAdapterRef.current = null;
      }
    };
  }, []);
  
  const loadSavedProjects = async () => {
    const loadedProjects = await loadProjects();
    setProjects(loadedProjects);
  };
  
  const updateCodeFromBlocks = () => {
    if (blocklyAdapterRef.current) {
      const newCode = blocklyAdapterRef.current.getCode();
      setCode(newCode);
    }
  };
  
  const updateBlocksFromCode = () => {
    try {
      const ast = parser.parseToAST(code, language);
      const blocks = parser.astToBlockly(ast);
      // Here you would need to implement conversion from blocks to Blockly XML
      // For simplicity, we'll just update the code
      updateCodeFromBlocks();
    } catch (error: any) {
      const location = parser.findErrorLocation(error, code);
      setCurrentError({
        line: location.line,
        column: location.column,
        message: error.message
      });
      setErrors([...errors, `Parse error: ${error.message}`]);
    }
  };
  
  const executeCode = () => {
    setExecutionState('running');
    setConsoleOutput(prev => [...prev, '--- Execution started ---']);
    setVariables([]);
    setErrors([]);
    
    try {
      // Simplified execution for now
      setConsoleOutput(prev => [...prev, 'Executing code...']);
      
      // Simulate execution
      setTimeout(() => {
        setVariables([
          { name: 'message', value: 'Hello World!', type: 'string' },
          { name: 'count', value: 42, type: 'number' }
        ]);
        setConsoleOutput(prev => [...prev, 'Hello World!', 'Execution completed successfully!']);
        setExecutionState('finished');
      }, 1000);
      
    } catch (error: any) {
      setConsoleOutput(prev => [...prev, `[ERROR] ${error.message}`]);
      setErrors(prev => [...prev, error.message]);
      setExecutionState('finished');
    }
  };
  
  const stepExecution = () => {
    setConsoleOutput(prev => [...prev, 'Step executed']);
  };
  
  const stopExecution = () => {
    setExecutionState('idle');
    setConsoleOutput(prev => [...prev, '--- Execution stopped ---']);
  };
  
  const pauseExecution = () => {
    setExecutionState('paused');
    setConsoleOutput(prev => [...prev, '--- Execution paused ---']);
  };
  
  const saveCurrentProject = async () => {
    const projectName = prompt('Enter project name:') || 'Untitled';
    const blocklyXml = blocklyAdapterRef.current?.getXml() || '';
    
    const projectData = {
      name: projectName,
      code,
      blocklyXml,
      language
    };
    
    const projectId = await saveProject(projectData);
    if (projectId) {
      setConsoleOutput(prev => [...prev, `Project "${projectName}" saved successfully!`]);
      loadSavedProjects();
    }
  };
  
  const loadProject = (project: Project) => {
    setCode(project.code);
    setLanguage(project.language);
    if (blocklyAdapterRef.current && project.blocklyXml) {
      blocklyAdapterRef.current.loadBlocksFromXml(project.blocklyXml);
    }
    setConsoleOutput(prev => [...prev, `Loaded project: ${project.name}`]);
  };
  
  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setConsoleOutput(prev => [...prev, `Language changed to ${newLanguage.toUpperCase()}`]);
  };
  
  const handleSyncModeToggle = () => {
    setSyncMode(syncMode === 'auto' ? 'manual' : 'auto');
    setConsoleOutput(prev => [...prev, `Sync mode: ${syncMode === 'auto' ? 'Manual' : 'Auto'}`]);
  };

  return (
    <div className="h-screen flex flex-col bg-[#1E1E1E] overflow-hidden">
      {/* Header */}
      <header className="p-3 border-b-4 border-[#007ACC] bg-[#252526]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="text-[#9CDCFE] font-mono font-bold text-xl tracking-tighter">
              BLOCKLY<span className="text-[#C586C0]">IDE</span>
            </div>
            <div className="flex gap-2">
              {(['javascript', 'python', 'php', 'lua', 'dart'] as Language[]).map((lang) => (
                <BlockyButton
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  color={language === lang ? '#007ACC' : '#C586C0'}
                  size="sm"
                >
                  {lang.toUpperCase()}
                </BlockyButton>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <BlockyButton onClick={saveCurrentProject} color="#5CA65C" size="sm">
                💾 Save
              </BlockyButton>
              
              <BlockyButton 
                onClick={handleSyncModeToggle}
                color={syncMode === 'auto' ? '#007ACC' : '#C586C0'}
                size="sm"
              >
                🔄 {syncMode === 'auto' ? 'Auto Sync' : 'Manual Sync'}
              </BlockyButton>
              
              {syncMode === 'manual' && (
                <BlockyButton onClick={updateBlocksFromCode} color="#DCDCAA" size="sm">
                  🧱 Update Blocks
                </BlockyButton>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Panel - Blockly Workspace */}
        <div className="flex-1 flex flex-col border-r-4 border-[#1E1E1E]">
          <div className="p-2 border-b-4 border-[#1E1E1E] bg-[#252526]">
            <div className="flex items-center justify-between">
              <span className="text-[#9CDCFE] font-mono font-bold">
                🧱 Blockly Workspace
              </span>
              <div className="flex gap-2">
                <BlockyButton 
                  onClick={updateCodeFromBlocks}
                  color="#C586C0"
                  size="sm"
                >
                  📝 To Code
                </BlockyButton>
              </div>
            </div>
          </div>
          <div 
            ref={blocklyDivRef}
            className="flex-1"
            style={{ minHeight: '400px' }}
          />
        </div>
        
        {/* Right Panel - Code Editor & Execution */}
        <div className="flex-1 flex flex-col">
          {/* Code Editor */}
          <div className="flex-1 border-b-4 border-[#1E1E1E]">
            <CodeEditor
              code={code}
              language={language}
              onCodeChange={setCode}
              error={currentError}
            />
          </div>
          
          {/* Execution Panel */}
          <div className="h-1/3 min-h-[300px]">
            <ExecutionPanel
              onRun={executeCode}
              onStep={stepExecution}
              onStop={stopExecution}
              onPause={pauseExecution}
              executionState={executionState}
              variables={variables}
              consoleOutput={consoleOutput}
              currentLine={currentLine}
              errors={errors}
            />
          </div>
        </div>
      </div>
      
      {/* Project Loader Modal */}
      {projects.length > 0 && (
        <div className="absolute bottom-4 right-4">
          <div className="bg-[#252526] border-4 border-[#1E1E1E] p-3 max-h-64 overflow-y-auto">
            <h4 className="text-[#9CDCFE] font-mono font-bold mb-2">Saved Projects</h4>
            <div className="space-y-1">
              {projects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => loadProject(project)}
                  className="p-2 border-2 border-[#1E1E1E] hover:border-[#007ACC] cursor-pointer hover:bg-[#2D2D2D] transition-colors"
                >
                  <div className="text-[#9CDCFE] font-mono text-sm">{project.name}</div>
                  <div className="text-[#C586C0] font-mono text-xs">
                    {project.language} • {new Date(project.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlocklyIDE;