import React, { useState } from 'react';
import { Play, Save, Trash2, Plus, X, Code, Terminal, ChevronRight, Wand2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

export const TerminalLogicView = () => {
  const [code, setCode] = useState(`/**
 * @param {Object} input - Incoming data
 * @return {Object} Transformed data
 */
function transform(input) {
  // Your logic here
  return {
    ...input,
    processed_at: new Date().toISOString(),
    status: 'TRANSFORMED'
  };
}`);

  const [testInput, setTestInput] = useState('{\n  "order_id": "ORD-123",\n  "amount": 150.00\n}');
  const [testOutput, setTestOutput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);

  const handleRun = () => {
    setIsExecuting(true);
    setTimeout(() => {
      try {
        const inputData = JSON.parse(testInput);
        // Simple mock execution
        const output = {
          ...inputData,
          processed_at: new Date().toISOString(),
          status: 'TRANSFORMED',
          _meta: { execution_time: '12ms' }
        };
        setTestOutput(JSON.stringify(output, null, 2));
      } catch (e) {
        setTestOutput('Error: Invalid JSON Input');
      }
      setIsExecuting(false);
    }, 600);
  };

  return (
    <div className="flex h-full flex-col bg-white overflow-hidden">
      {/* Header */}
      <div className="h-16 border-b border-gray-200 px-8 flex items-center justify-between bg-white shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-900 rounded-lg text-white">
            <Terminal size={18} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 leading-tight">Terminal Logic Module</h1>
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Custom JavaScript Transformation</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Save size={14} />
            Save Module
          </Button>
          <Button size="sm" className="bg-blue-600 gap-2">
            <Play size={14} fill="currentColor" />
            Deploy
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor Area */}
        <div className="flex-1 flex flex-col border-r border-gray-200 overflow-hidden">
          <div className="p-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
               <Code size={14} /> script.js
            </span>
            <div className="flex gap-1">
               <Button variant="ghost" size="icon" className="h-7 w-7"><Wand2 size={14} className="text-blue-600" /></Button>
            </div>
          </div>
          <div className="flex-1 relative font-mono text-sm group">
            <textarea
              className="absolute inset-0 w-full h-full p-6 bg-[#1e1e1e] text-gray-300 resize-none focus:outline-none"
              spellCheck={false}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
        </div>

        {/* Sandbox / Testing Area */}
        <div className="w-[450px] flex flex-col bg-gray-50 overflow-hidden shrink-0">
          <div className="p-4 border-b border-gray-200 bg-white">
            <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <FlaskConical size={16} className="text-blue-600" />
              Sandbox
            </h2>
          </div>

          <div className="flex-1 flex flex-col p-4 gap-4 overflow-y-auto">
            {/* Input */}
            <div className="space-y-2 flex-1 flex flex-col min-h-[200px]">
              <div className="flex justify-between items-center">
                <Label className="text-xs font-bold text-gray-600">TEST INPUT (JSON)</Label>
                <button className="text-[10px] text-blue-600 font-bold hover:underline">Format</button>
              </div>
              <textarea
                className="flex-1 w-full p-3 bg-white border border-gray-200 rounded-lg font-mono text-xs resize-none focus:ring-2 focus:ring-blue-100 focus:outline-none"
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
              />
            </div>

            {/* Run Button */}
            <Button
              onClick={handleRun}
              disabled={isExecuting}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white gap-2 h-10 shadow-md transition-all active:scale-95"
            >
              {isExecuting ? (
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Play size={16} fill="currentColor" />
              )}
              Run Transformation
            </Button>

            {/* Output */}
            <div className="space-y-2 flex-1 flex flex-col min-h-[200px]">
               <Label className="text-xs font-bold text-gray-600">TRANSFORMATION RESULT</Label>
               <div className="flex-1 w-full bg-slate-100 border border-gray-200 rounded-lg p-3 font-mono text-xs overflow-auto text-slate-800 whitespace-pre">
                 {testOutput || <span className="text-gray-400 italic">Run the transformation to see results...</span>}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Internal Import for FlaskConical because I missed it in the initial list
const FlaskConical = ({ size, className }: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M10 2v7.5" />
    <path d="M14 2v7.5" />
    <path d="M8.5 2h7" />
    <path d="M14 9.5c2.21 0 4 1.79 4 4v5.5a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3v-5.5c0-2.21 1.79-4 4-4Z" />
    <path d="M9 14.5h6" />
  </svg>
);
