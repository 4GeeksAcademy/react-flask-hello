import React from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useGame } from '../context/GameContext';

/**
 * GameStats Component
 * 
 * Displays current game statistics and provides game control functionality.
 * Demonstrates Bootstrap layout components and state-driven UI updates.
 * 
 * Educational Value:
 * - Shows Bootstrap grid system for organizing information
 * - Demonstrates conditional rendering based on game state
 * - Uses Bootstrap card component for content organization
 * - Integrates emoji and visual elements for engaging UI
 * 
 * Bootstrap Concepts Demonstrated:
 * - Responsive column layout with Col component
 * - Card component for content containers
 * - Button variants and states
 * - Utility classes for spacing and alignment
 * - Text color utilities (text-warning, text-danger, text-info)
 * 
 * Game Integration:
 * - Real-time score updates through React Context
 * - Lives display with visual heart emoji representation
 * - Game state management (start/stop functionality)
 * - Level progression tracking
 */
// Recibe phaserRef como prop
const GameStats: React.FC<{ phaserRef?: React.RefObject<any> }> = ({ phaserRef }) => {
  // Access global game state and dispatch function from Context
  const { state, dispatch } = useGame();

  /**
   * Initiates a new game session
   * Resets all game statistics and starts the game loop
   */
  const handleStartGame = () => {
    dispatch({ type: 'START_GAME' });
    // Cambia de escena si la referencia existe
    if (phaserRef && phaserRef.current && phaserRef.current.scene && phaserRef.current.scene.changeScene) {
      phaserRef.current.scene.changeScene();
    }
  };

  /**
   * Ends the current game session
   * Preserves final score but stops game mechanics
   */
  const handleEndGame = () => {
    dispatch({ type: 'END_GAME' });
  };

  return (
    <Row className="mb-3">
      <Col>
        {/* Bootstrap Card for organized stats display */}
        <Card className="game-stats shadow-sm">
          <Card.Body>
            {/* Responsive row layout for game statistics */}
            <Row className="align-items-center">
              {/* Score Display */}
              <Col md={3}>
                <h5 className="mb-0">
                  🏆 Score: <span className="text-warning fw-bold">{state.score.toLocaleString()}</span>
                </h5>
                <small className="text-muted">Bootstrap Master Points</small>
              </Col>
              
              {/* Lives Display with Visual Hearts */}
              <Col md={3}>
                <h5 className="mb-0">
                  💗 Lives: <span className="text-danger">
                    {/* Dynamic heart display based on remaining lives */}
                    {'❤️'.repeat(state.lives)}
                    {/* Show empty hearts for lost lives */}
                    {'🤍'.repeat(Math.max(0, 3 - state.lives))}
                  </span>
                </h5>
                <small className="text-muted">Grid Defense Health</small>
              </Col>
              
              {/* Level Display */}
              <Col md={3}>
                <h5 className="mb-0">
                  🎯 Level: <span className="text-info fw-bold">{state.level}</span>
                </h5>
                <small className="text-muted">Zombie Wave Intensity</small>
              </Col>
              
              {/* Game Control Button */}
              <Col md={3} className="text-end">
                {/* Conditional button rendering based on game state */}
                {!state.isPlaying ? (
                  <Button 
                    variant="success" 
                    size="lg"
                    onClick={handleStartGame}
                    className="px-4"
                  >
                    ⚔️ Start Battle
                  </Button>
                ) : (
                  <Button 
                    variant="danger" 
                    size="lg"
                    onClick={handleEndGame}
                    className="px-4"
                  >
                    🛑 Retreat
                  </Button>
                )}
              </Col>
            </Row>
            
            {/* Game Over State Display */}
            {state.lives === 0 && (
              <Row className="mt-3">
                <Col>
                  <div className="alert alert-danger text-center mb-0">
                    <h4>💀 Game Over! 💀</h4>
                    <p className="mb-0">
                      The zombies have overrun your Bootstrap grid! 
                      Final Score: <strong>{state.score.toLocaleString()}</strong>
                    </p>
                  </div>
                </Col>
              </Row>
            )}
            
            {/* Current Selection Display */}
            {state.selectedFlexClass && state.isPlaying && (
              <Row className="mt-2">
                <Col>
                  <div className="alert alert-info mb-0 py-2">
                    <small>
                      🎯 <strong>Armed with:</strong> <code>{state.selectedFlexClass}</code> - 
                      Click on a grid column to deploy your flex turret!
                    </small>
                  </div>
                </Col>
              </Row>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default GameStats;
