import React from 'react';
import { Button } from 'react-bootstrap';
import { useGame } from '../context/GameContext';

/**
 * ClassSelector Component
 * 
 * Simplified version for selecting Bootstrap classes.
 * 
 * Educational Objectives:
 * - Teach Bootstrap flexbox utility classes through hands-on practice
 * - Demonstrate the difference between horizontal and vertical alignment
 * 
 * Bootstrap Concepts Taught:
 * - justify-content utilities for horizontal alignment
 * - align-items utilities for vertical alignment  
 */
const ClassSelector: React.FC = () => {
  const { state, dispatch } = useGame();

  /**
   * Bootstrap Flexbox Classes for Game Mechanics
   * Each class serves both educational and gameplay purposes:
   * - Students learn the CSS property
   * - The class determines turret targeting behavior
   */
  const flexClasses = [
    // Horizontal Alignment Classes (justify-content)
    {
      name: 'justify-content-start',
      description: 'Align items to the start',
    },
    {
      name: 'justify-content-center',
      description: 'Center items horizontally',
    },
    {
      name: 'justify-content-end',
      description: 'Align items to the end',
    },
    
    // Vertical Alignment Classes (align-items)
    {
      name: 'align-items-start',
      description: 'Align items to the top',
    },
    {
      name: 'align-items-center',
      description: 'Center items vertically',
    },
    {
      name: 'align-items-end',
      description: 'Align items to the bottom',
    }
  ];

  /**
   * Handles flex class selection
   * Updates game state and prepares for turret placement
   * 
   * @param className - The Bootstrap flex class name to select
   */
  const handleClassSelect = (className: string) => {
    dispatch({ type: 'SELECT_FLEX_CLASS', payload: className });
  };

  return (
    <div>
      <h5>Selecciona una clase de Bootstrap:</h5>
      <div className="d-grid gap-2">
        {flexClasses.map((flexClass) => (
          <Button
            key={flexClass.name}
            variant={state.selectedFlexClass === flexClass.name ? 'primary' : 'outline-primary'}
            onClick={() => handleClassSelect(flexClass.name)}
            size="sm"
          >
            <code>{flexClass.name}</code> - {flexClass.description}
          </Button>
        ))}
      </div>
      {state.selectedFlexClass && (
        <div className="mt-3">
          <strong>Clase seleccionada:</strong> <code>{state.selectedFlexClass}</code>
        </div>
      )}
    </div>
  );
};

export default ClassSelector;
