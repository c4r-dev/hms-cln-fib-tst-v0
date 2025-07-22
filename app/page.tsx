'use client';

import React, { useState } from 'react';

export default function Home() {
  const [testData, setTestData] = useState([
    { parameter: '', outcome: '', type: '' },
    { parameter: '', outcome: '', type: '' },
    { parameter: '', outcome: '', type: '' }
  ]);

  const determineDataType = (value: string): string => {
    if (value === '') return '';
    
    // Check if it's a number (int or float)
    if (!isNaN(Number(value)) && value.trim() !== '') {
      // Check if it's an integer
      if (Number.isInteger(Number(value))) {
        return 'int';
      } else {
        return 'float';
      }
    }
    
    // Check if it's a boolean (True/False in Python style)
    if (value === 'True' || value === 'False') {
      return 'bool';
    }
    
    // Check if it's a list (Python array syntax)
    if (value.startsWith('[') && value.endsWith(']')) {
      try {
        // Try parsing as JSON first
        JSON.parse(value);
        return 'list';
      } catch (e) {
        // If JSON parsing fails, check if it looks like a Python list with single quotes
        const pythonListPattern = /^\[\s*'[^']*'(\s*,\s*'[^']*')*\s*\]$/;
        if (pythonListPattern.test(value)) {
          return 'list';
        }
        // Also check for mixed quotes or numbers
        const content = value.slice(1, -1).trim();
        if (content === '' || content.split(',').every(item => {
          const trimmed = item.trim();
          return (trimmed.startsWith("'") && trimmed.endsWith("'")) ||
                 (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
                 !isNaN(Number(trimmed));
        })) {
          return 'list';
        }
      }
    }
    
    // Check if it's a dictionary (Python dict syntax)
    if (value.startsWith('{') && value.endsWith('}')) {
      try {
        JSON.parse(value);
        return 'dict';
      } catch (e) {
        // Invalid dict syntax, treat as string
      }
    }
    
    // Check if it's a tuple (Python tuple syntax)
    if (value.startsWith('(') && value.endsWith(')')) {
      return 'tuple';
    }
    
    // Check if it's None
    if (value === 'None') {
      return 'NoneType';
    }
    
    // Default to string
    return 'str';
  };

  const handleParameterChange = (index: number, value: string) => {
    const newTestData = [...testData];
    newTestData[index].parameter = value;
    newTestData[index].type = determineDataType(value);
    setTestData(newTestData);
  };

  const handleOutcomeChange = (index: number, value: string) => {
    const newTestData = [...testData];
    newTestData[index].outcome = value;
    setTestData(newTestData);
  };
  const fibonacciCode = `def fibonacci(n):
    """
    Returns the nth Fibonacci number.
    
    Args:
        n (int): The position in the Fibonacci sequence (0-indexed)
    
    Returns:
        int: The Fibonacci number at position n
    """
    if n <= 1:
        return n
    
    a, b = 0, 1
    for i in range(2, n + 1):
        a, b = b, a + b
    
    return b`;

  return (
    <div className="main-container">
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#333',
          marginBottom: '15px',
          textAlign: 'left',
          padding: '0',
          fontFamily: 'General Sans, sans-serif'
        }}>
          Test a Function
        </h2>
        
        <div style={{
          width: '100%',
          minHeight: '300px',
          padding: '15px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '14px',
          lineHeight: '1.5',
          backgroundColor: '#f8f8f8',
          whiteSpace: 'pre',
          overflow: 'auto',
          color: '#333',
          resize: 'none',
          cursor: 'default',
          userSelect: 'text'
        }}>
          {fibonacciCode}
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '20px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          {/* Header Row */}
          <div style={{
            display: 'flex',
            backgroundColor: '#f5f5f5',
            fontWeight: 'bold',
            fontFamily: 'General Sans, sans-serif'
          }}>
            <div style={{
              flex: '1',
              padding: '12px',
              borderRight: '1px solid #ddd',
              textAlign: 'center'
            }}>
              Type
            </div>
            <div style={{
              flex: '1',
              padding: '12px',
              borderRight: '1px solid #ddd',
              textAlign: 'center'
            }}>
              Parameter
            </div>
            <div style={{
              flex: '1',
              padding: '12px',
              textAlign: 'center'
            }}>
              Outcome
            </div>
          </div>

          {/* Data Rows */}
          {testData.map((row, index) => (
            <div key={index} style={{
              display: 'flex',
              borderBottom: index < testData.length - 1 ? '1px solid #ddd' : 'none',
              fontFamily: 'General Sans, sans-serif'
            }}>
              <div style={{
                flex: '1',
                padding: '12px',
                borderRight: '1px solid #ddd',
                textAlign: 'center'
              }}>
                {row.type}
              </div>
              <div style={{
                flex: '1',
                padding: '8px',
                borderRight: '1px solid #ddd',
                textAlign: 'center'
              }}>
                <input
                  type="text"
                  value={row.parameter}
                  onChange={(e) => handleParameterChange(index, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '4px 8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    textAlign: 'center',
                    fontFamily: 'General Sans, sans-serif'
                  }}
                />
              </div>
              <div style={{
                flex: '1',
                padding: '8px',
                textAlign: 'center'
              }}>
                <select
                  value={row.outcome}
                  onChange={(e) => handleOutcomeChange(index, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '4px 8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    textAlign: 'center',
                    fontFamily: 'General Sans, sans-serif',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="">Select outcome</option>
                  <option value="Correct">Correct</option>
                  <option value="Incorrect">Incorrect</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}