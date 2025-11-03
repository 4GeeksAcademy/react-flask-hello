import React, { createContext, useContext, useReducer, ReactNode } from 'react';


/**
 * Represents a user in the Bootstrap vs Zombies game
 * Simplified user information returned by the Flask backend
 */
interface GameUser {
  id: number;
  email: string;
  display_name?: string;
}

/**
 * Represents a zombie entity in the game
 * Zombies move upward through the Bootstrap grid columns
 */
interface Zombie {
  id: string;
  lane: number;      // Which Bootstrap column (0-11) the zombie is in
  position: number;  // Vertical position (0 = bottom, higher = closer to top)
  health: number;    // Hit points remaining
  speed: number;     // Movement speed per game tick
}

/**
 * Represents a projectile fired by flex turrets
 * Pellets travel toward zombies to defend the grid
 */
interface Pellet {
  id: string;
  lane: number;      // Which Bootstrap column the pellet is in
  position: number;  // Vertical position in the lane
  damage: number;    // Damage dealt to zombies on hit
}

/**
 * Main game state interface
 * Main game state used throughout the application
 */
interface GameState {
  // Game progression tracking
  score: number;           // Current player score
  lives: number;           // Remaining lives (game over at 0)
  level: number;           // Current difficulty level
  isPlaying: boolean;      // Whether a game session is active
  
  // Bootstrap learning integration
  selectedFlexClass: string | null;  // Currently selected Bootstrap flex utility class
  
  // Game entities (using arrays for efficient rendering)
  zombies: Zombie[];       // All active zombies on the board
  pellets: Pellet[];       // All active projectiles
  
  // User authentication
  isAuthenticated: boolean;
  user: GameUser | null;
}

/**
 * Action types for the game state reducer
 * Each action represents a specific state change in the game
 * This pattern ensures predictable state updates and easier debugging
 */
type GameAction =
  // Game flow actions
  | { type: 'START_GAME' }
  | { type: 'END_GAME' }
  | { type: 'UPDATE_SCORE'; payload: number }
  | { type: 'LOSE_LIFE' }
  
  // Bootstrap education actions
  | { type: 'SELECT_FLEX_CLASS'; payload: string }
  
  // Game entity management actions
  | { type: 'ADD_ZOMBIE'; payload: Zombie }
  | { type: 'REMOVE_ZOMBIE'; payload: string }
  | { type: 'ADD_PELLET'; payload: Pellet }
  | { type: 'REMOVE_PELLET'; payload: string }
  | { type: 'UPDATE_ZOMBIES'; payload: Zombie[] }
  | { type: 'UPDATE_PELLETS'; payload: Pellet[] }
  
  // Authentication actions
  | { type: 'LOGIN'; payload: GameUser }
  | { type: 'LOGOUT' };

/**
 * Initial game state
 * Represents a fresh game session with default values
 */
const initialState: GameState = {
  score: 0,
  lives: 3,              // Standard tower defense starting lives
  level: 1,
  isPlaying: false,
  selectedFlexClass: null,
  zombies: [],
  pellets: [],
  isAuthenticated: false,
  user: null,
};

/**
 * Game state reducer function
 * Implements the Redux pattern for predictable state management
 * Each case handles a specific game action and returns new state
 * 
 * @param state - Current game state
 * @param action - Action to perform on the state
 * @returns New game state after applying the action
 */
function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    // Game session management
    case 'START_GAME':
      // Reset game state for new session
      return { 
        ...state, 
        isPlaying: true, 
        score: 0, 
        lives: 3, 
        level: 1,
        zombies: [],
        pellets: []
      };
      
    case 'END_GAME':
      // Preserve score and user data, but stop game loop
      return { ...state, isPlaying: false };
      
    case 'UPDATE_SCORE':
      // Add points for destroyed zombies or completed waves
      return { ...state, score: state.score + action.payload };
      
    case 'LOSE_LIFE':
      // Decrement lives when zombies reach the top
      return { ...state, lives: Math.max(0, state.lives - 1) };
    
    // Bootstrap flex class selection (educational component)
    case 'SELECT_FLEX_CLASS':
      // Store the selected Bootstrap utility class for turret placement
      return { ...state, selectedFlexClass: action.payload };
    
    // Zombie management (immutable array operations)
    case 'ADD_ZOMBIE':
      // Spawn new zombie (typically at bottom of random lane)
      return { ...state, zombies: [...state.zombies, action.payload] };
      
    case 'REMOVE_ZOMBIE':
      // Remove zombie (when destroyed or reaches end)
      return { 
        ...state, 
        zombies: state.zombies.filter(zombie => zombie.id !== action.payload) 
      };
      
    case 'UPDATE_ZOMBIES':
      // Bulk update all zombie positions (called each game tick)
      return { ...state, zombies: action.payload };
    
    // Pellet/projectile management
    case 'ADD_PELLET':
      // Fire new projectile from turret
      return { ...state, pellets: [...state.pellets, action.payload] };
      
    case 'REMOVE_PELLET':
      // Remove projectile (when hits target or goes off-screen)
      return { 
        ...state, 
        pellets: state.pellets.filter(pellet => pellet.id !== action.payload) 
      };
      
    case 'UPDATE_PELLETS':
      // Bulk update all pellet positions (called each game tick)
      return { ...state, pellets: action.payload };
    
    // User authentication for leaderboard
    case 'LOGIN':
      return { ...state, isAuthenticated: true, user: action.payload };
      
    case 'LOGOUT':
      return { ...state, isAuthenticated: false, user: null };
      
    default:
      // Return unchanged state for unknown actions
      return state;
  }
}

/**
 * React Context for game state
 * Provides game state and dispatch function to all child components
 * This eliminates prop drilling and centralizes state management
 */
const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
} | null>(null);

/**
 * GameProvider Component
 * Wraps the entire application to provide game state context
 * Uses useReducer hook for complex state management
 * 
 * @param children - Child components that need access to game state
 */
export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

/**
 * Custom hook for accessing game context
 * Provides type-safe access to game state and dispatch function
 * Throws error if used outside of GameProvider (development safety)
 * 
 * @returns Object containing current game state and dispatch function
 * @throws Error if used outside GameProvider
 */
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
