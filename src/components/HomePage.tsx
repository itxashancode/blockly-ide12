import React from 'react';
import { Link } from 'react-router-dom';
import WobblyText from './UI/WobblyText';
import AnimatedBlock from './UI/AnimatedBlock';
import BlockyButton from './UI/BlockyButton';

const HomePage: React.FC = () => {
  const handleGitHubClick = () => {
    window.open('https://github.com/google/blockly', '_blank');
  };
  
  const handleBlocklyDocsClick = () => {
    window.open('https://developers.google.com/blockly', '_blank');
  };
  
  return (
    <div className="min-h-screen bg-[#1E1E1E] overflow-x-hidden">
      {/* Animated Background Grid */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(90deg, #007ACC 1px, transparent 1px),
            linear-gradient(#007ACC 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Floating Blocks */}
      <div className="fixed top-10 left-10 w-8 h-8 bg-[#C586C0] animate-float" style={{animationDelay: '0s'}}></div>
      <div className="fixed top-20 right-20 w-6 h-6 bg-[#9CDCFE] animate-float" style={{animationDelay: '0.5s'}}></div>
      <div className="fixed bottom-20 left-1/4 w-10 h-10 bg-[#007ACC] animate-float" style={{animationDelay: '1s'}}></div>
      
      {/* Header */}
      <header className="relative p-6 border-b-4 border-[#007ACC]">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="text-[#9CDCFE] font-mono font-bold text-2xl tracking-tighter">
              BLOCKLY<span className="text-[#C586C0]">IDE</span>
            </div>
            <div className="flex gap-4">
              <BlockyButton
                onClick={handleGitHubClick}
                color="#252526"
                size="sm"
              >
                GitHub
              </BlockyButton>
              <Link to="/ide">
                <BlockyButton color="#007ACC" size="sm">
                  🚀 Launch IDE
                </BlockyButton>
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <WobblyText text="CODE ↔ BLOCKS" intensity={5} size="xl" />
            <WobblyText text="BIDIRECTIONAL IDE" intensity={3} size="lg" />
          </div>
          
          <p className="text-[#9CDCFE] font-mono text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            A <span className="text-[#C586C0] font-bold">hand-coded</span>, blocky-style IDE with 
            real-time bidirectional conversion between visual blocks and code. 
            <span className="block mt-2 text-lg">Play, learn, and create in multiple programming languages.</span>
          </p>
          
          <Link to="/ide">
            <BlockyButton color="#007ACC" size="lg" animated>
              🚀 START CODING NOW
            </BlockyButton>
          </Link>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center mb-12">
            <WobblyText text="FEATURES" intensity={2} size="lg" />
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatedBlock color="#007ACC" draggable>
              <div className="text-center p-4">
                <div className="text-4xl mb-3 mx-auto">📝</div>
                <h3 className="text-xl font-bold font-mono text-white mb-2">Code ↔ Blocks Sync</h3>
                <p className="text-white/80 font-mono text-sm">
                  Real-time bidirectional conversion between code and visual blocks
                </p>
              </div>
            </AnimatedBlock>
            
            <AnimatedBlock color="#C586C0" draggable>
              <div className="text-center p-4">
                <div className="text-4xl mb-3 mx-auto">▶️</div>
                <h3 className="text-xl font-bold font-mono text-white mb-2">Live Execution</h3>
                <p className="text-white/80 font-mono text-sm">
                  Step-by-step execution with variable watching and console output
                </p>
              </div>
            </AnimatedBlock>
            
            <AnimatedBlock color="#9CDCFE" draggable>
              <div className="text-center p-4">
                <div className="text-4xl mb-3 mx-auto">🧱</div>
                <h3 className="text-xl font-bold font-mono text-[#1E1E1E] mb-2">5 Languages</h3>
                <p className="text-[#1E1E1E]/80 font-mono text-sm">
                  JavaScript, Python, PHP, Lua, and Dart support
                </p>
              </div>
            </AnimatedBlock>
            
            <AnimatedBlock color="#5CA65C" draggable>
              <div className="text-center p-4">
                <div className="text-4xl mb-3 mx-auto">🔍</div>
                <h3 className="text-xl font-bold font-mono text-white mb-2">Block Highlighting</h3>
                <p className="text-white/80 font-mono text-sm">
                  Visual execution tracing with current block highlighting
                </p>
              </div>
            </AnimatedBlock>
            
            <AnimatedBlock color="#CE9178" draggable>
              <div className="text-center p-4">
                <div className="text-4xl mb-3 mx-auto">🔥</div>
                <h3 className="text-xl font-bold font-mono text-white mb-2">Firebase Save</h3>
                <p className="text-white/80 font-mono text-sm">
                  Save projects to cloud with Firebase Firestore integration
                </p>
              </div>
            </AnimatedBlock>
          </div>
        </div>
      </section>
      
      {/* Interactive Demo */}
      <section className="py-16 px-6 border-t-4 border-[#1E1E1E]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-8">
            <WobblyText text="TRY IT OUT" intensity={2} size="lg" />
          </h2>
          
          <div className="bg-[#252526] border-4 border-[#1E1E1E] p-8 mb-8">
            <div className="flex flex-col items-center justify-center min-h-[300px]">
              <div className="mb-6">
                <div className="text-[#9CDCFE] font-mono text-lg mb-4">
                  Drag and drop blocks to create your first program:
                </div>
                <div className="flex flex-wrap gap-3 justify-center">
                  {/* Sample blocks for demo */}
                  <div className="bg-[#007ACC] px-4 py-2 rounded font-mono text-white border-2 border-[#1E1E1E] cursor-move">
                    print()
                  </div>
                  <div className="bg-[#C586C0] px-4 py-2 rounded font-mono text-white border-2 border-[#1E1E1E] cursor-move">
                    for i in range()
                  </div>
                  <div className="bg-[#5CA65C] px-4 py-2 rounded font-mono text-white border-2 border-[#1E1E1E] cursor-move">
                    if condition
                  </div>
                  <div className="bg-[#CE9178] px-4 py-2 rounded font-mono text-white border-2 border-[#1E1E1E] cursor-move">
                    set variable
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-[#1E1E1E] border-2 border-[#007ACC] rounded font-mono text-left w-full max-w-md">
                <div className="text-[#9CDCFE] text-sm mb-2">// Generated Code Preview:</div>
                <pre className="text-white text-sm overflow-x-auto">
{`for i in range(5):
    print("Hello, Blockly!")
    if i % 2 == 0:
        print("Even iteration")`}
                </pre>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BlockyButton
              onClick={handleBlocklyDocsClick}
              color="#252526"
              size="md"
            >
              📚 Read Blockly Docs
            </BlockyButton>
            <Link to="/ide" className="w-full sm:w-auto">
              <BlockyButton color="#007ACC" size="md" animated>
                🧪 Open Full IDE
              </BlockyButton>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="relative py-8 px-6 border-t-4 border-[#007ACC] mt-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-[#9CDCFE] font-mono mb-4 md:mb-0">
              <div className="text-xl font-bold">BLOCKLY<span className="text-[#C586C0]">IDE</span></div>
              <div className="text-sm opacity-75">A visual programming playground</div>
            </div>
            
            <div className="flex gap-6">
              <button 
                onClick={handleGitHubClick}
                className="text-white/70 hover:text-[#9CDCFE] font-mono text-sm transition-colors"
              >
                GitHub
              </button>
              <Link to="/ide" className="text-white/70 hover:text-[#C586C0] font-mono text-sm transition-colors">
                Launch IDE
              </Link>
              <a 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleBlocklyDocsClick();
                }}
                className="text-white/70 hover:text-[#5CA65C] font-mono text-sm transition-colors"
              >
                Documentation
              </a>
            </div>
          </div>
          
          <div className="text-center mt-8 pt-6 border-t border-white/10">
            <div className="text-white/50 font-mono text-sm">
              Built with ❤️ using React, TypeScript, Tailwind CSS, and Google Blockly
            </div>
            <div className="text-white/30 font-mono text-xs mt-2">
              This is a demonstration project. Blockly is a Google project.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;