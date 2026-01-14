import React, { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { php } from '@codemirror/lang-php';
import { oneDark } from '@codemirror/theme-one-dark';
import { Language, ErrorLocation } from '../types';

interface CodeEditorProps {
  code: string;
  language: Language;
  onCodeChange: (code: string) => void;
  error?: ErrorLocation | null;
  readOnly?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  language,
  onCodeChange,
  error,
  readOnly = false
}) => {
  const [value, setValue] = useState(code);
  const [extensions, setExtensions] = useState<any[]>([oneDark]);
  
  useEffect(() => {
    let langExtension;
    switch (language) {
      case 'javascript':
        langExtension = javascript({ jsx: true });
        break;
      case 'python':
        langExtension = python();
        break;
      case 'php':
        langExtension = php();
        break;
      default:
        langExtension = javascript();
    }
    
    setExtensions([langExtension, oneDark]);
  }, [language]);
  
  useEffect(() => {
    setValue(code);
  }, [code]);
  
  const handleChange = (val: string) => {
    setValue(val);
    onCodeChange(val);
  };
  
  const getErrorMarker = () => {
    if (!error) return [];
    
    // Create error decoration
    return [
      // You can add error markers here
    ];
  };
  
  return (
    <div className="relative h-full border-4 border-[#1E1E1E]">
      <div className="absolute top-0 left-0 right-0 bg-[#252526] p-2 border-b-4 border-[#1E1E1E] z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="ml-2 text-[#9CDCFE] font-mono text-sm">
              {language.toUpperCase()}
            </span>
          </div>
          {error && (
            <div className="text-red-400 font-mono text-sm animate-pulse">
              Error at line {error.line}:{error.column}
            </div>
          )}
        </div>
      </div>
      
      <div className="pt-12 h-full">
        <CodeMirror
          value={value}
          height="100%"
          theme={oneDark}
          extensions={extensions}
          onChange={handleChange}
          readOnly={readOnly}
          className="h-full text-lg"
          style={{ 
            backgroundColor: '#1E1E1E',
            fontFamily: "'Fira Code', 'Consolas', monospace"
          }}
        />
      </div>
      
      {/* Grid overlay for hand-coded look */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(90deg, #007ACC 1px, transparent 1px),
            linear-gradient(#007ACC 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />
    </div>
  );
};

export default CodeEditor;