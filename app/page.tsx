'use client';

import React from 'react';

export default function Home() {
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
      </div>
    </div>
  );
}