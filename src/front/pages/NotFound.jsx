import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  const [mostrarJuego, setMostrarJuego] = useState(false);
  const [volumen, setVolumen] = useState(50);
  const [muted, setMuted] = useState(false);
  const iframeRef = useRef(null);

  const actualizarVolumen = useCallback((nuevoVolumen) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        const volumeValue = muted ? 0 : nuevoVolumen / 100;
        iframeRef.current.contentWindow.postMessage({
          type: 'setVolume',
          volume: volumeValue
        }, '*');
      } catch (error) {
        // Audio control not available
      }
    }
  }, [muted]);

  useEffect(() => {
    actualizarVolumen(volumen);
  }, [volumen, muted, actualizarVolumen]);

  const toggleJuego = () => {
    setMostrarJuego(!mostrarJuego);
  };

  const handleVolumeChange = (e) => {
    const newVolume = Math.round(parseFloat(e.target.value));
    setVolumen(newVolume);
    if (newVolume > 0) {
      setMuted(false);
    }
  };

  const toggleMute = () => {
    if (muted) {
      setMuted(false);
      if (volumen === 0) {
        setVolumen(50);
      }
    } else {
      setMuted(true);
    }
  };

  return (
    <div className="cyberpunk-arcade">
      <div className="matrix-background"></div>
      <div className="neon-particles"></div>
      <div className="hologram-grid"></div>

      <div className="arcade-terminal">
        <div className="terminal-header">
          <div className="status-bar">
            <div className="status-light active"></div>
            <div className="status-light active"></div>
            <div className="status-light warning"></div>
            <span className="system-text">ARCADE.SYS v2.077</span>
          </div>
        </div>

        <div className="glitch-title-container">
          <h1 className="cyber-title" data-text="404">404</h1>
          <div className="subtitle-glow">
            <span className="cyber-subtitle">SECTOR NOT FOUND</span>
          </div>
        </div>

        <div className="hologram-panel">
          <div className="data-stream">
            <div className="stream-line">
              <span className="prompt">❯</span>
              <span className="error-text">ERROR: Page does not exist in current reality matrix</span>
            </div>
            <div className="stream-line">
              <span className="prompt">❯</span>
              <span className="info-text">Initializing backup entertainment protocol...</span>
            </div>
            <div className="stream-line blinking">
              <span className="prompt">❯</span>
              <span className="success-text">Retro arcade module loaded successfully</span>
            </div>
          </div>
        </div>

        <div className="control-matrix">
          <button
            className={`neural-button ${mostrarJuego ? 'activated' : ''}`}
            onClick={toggleJuego}
          >
            <div className="button-core"></div>
            <div className="energy-rings">
              <div className="ring ring-1"></div>
              <div className="ring ring-2"></div>
              <div className="ring ring-3"></div>
            </div>
            <span className="button-text">
              {mostrarJuego ? 'DISCONNECT' : 'JACK IN'}
            </span>
            <div className="neural-pulse"></div>
          </button>
        </div>

        {mostrarJuego && (
          <div className="game-matrix">
            <div className="audio-interface">
              <div className="interface-header">
                <div className="header-glow"></div>
                <span className="interface-title">AUDIO NEURAL INTERFACE</span>
                <div className="bio-scanner">
                  <div className="scanner-line"></div>
                </div>
              </div>

              <div className="audio-controls">
                <button
                  className={`power-node ${muted ? 'offline' : 'online'}`}
                  onClick={toggleMute}
                >
                  <div className="node-core">
                    <div className="core-pulse"></div>
                  </div>
                  <span className="node-label">{muted ? 'OFFLINE' : 'ONLINE'}</span>
                </button>

                <div className="quantum-slider">
                  <div className="slider-label">VOLUME MATRIX</div>
                  <div className="slider-track-container">
                    <div className="track-glow"></div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={muted ? 0 : volumen}
                      onChange={handleVolumeChange}
                      className="volume-range-input"
                    />
                    <div className="frequency-markers">
                      {[0, 25, 50, 75, 100].map(mark => (
                        <div
                          key={mark}
                          className="frequency-mark"
                          style={{ left: `${mark}%` }}
                        >
                          <div className="mark-pulse"></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="neural-display">
                    <div className="display-frame">
                      <div className="scan-lines"></div>
                      <div className="volume-readout">
                        {muted ? '00' : volumen.toString().padStart(2, '0')}
                      </div>
                      <div className="unit-label">dB</div>
                    </div>
                    <div className="spectrum-analyzer">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className={`spectrum-bar ${i < (muted ? 0 : volumen / 12.5) ? 'active' : ''}`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="arcade-viewport">
              <div className="viewport-frame">
                <div className="frame-lights">
                  <div className="light-strip top"></div>
                  <div className="light-strip bottom"></div>
                  <div className="light-strip left"></div>
                  <div className="light-strip right"></div>
                </div>

                <div className="screen-matrix">
                  <iframe
                    ref={iframeRef}
                    src="./404_not_found/index.html"
                    width="640"
                    height="480"
                    title="Neural Arcade"
                    className="neural-screen"
                  />
                  <div className="holographic-overlay">
                    <div className="scan-grid"></div>
                    <div className="data-corruption"></div>
                  </div>
                  <div className="screen-reflection"></div>
                </div>

                <div className="viewport-label">
                  <span>NEURAL ARCADE MATRIX v2.077</span>
                  <div className="status-indicators">
                    <div className="indicator online"></div>
                    <div className="indicator online"></div>
                    <div className="indicator standby"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="control-interface">
              <div className="interface-section">
                <div className="section-title">NEURAL INPUTS</div>
                <div className="input-grid">
                  <div className="input-cluster">
                    <div className="virtual-joystick">
                      <div className="joystick-base">
                        <div className="base-ring"></div>
                        <div className="joystick-knob">
                          <div className="knob-glow"></div>
                        </div>
                      </div>
                      <div className="input-label">MOVEMENT MATRIX</div>
                    </div>
                  </div>

                  <div className="action-cluster">
                    <div className="cyber-buttons">
                      <div className="cyber-btn primary">
                        <div className="btn-glow"></div>
                        <span>ACTION</span>
                      </div>
                      <div className="cyber-btn secondary">
                        <div className="btn-glow"></div>
                        <span>PAUSE</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="interface-section">
                <div className="section-title">MISSION PARAMETERS</div>
                <div className="mission-data">
                  <div className="data-line">
                    <span className="param">OBJECTIVE:</span>
                    <span className="value">Consume all data nodes</span>
                  </div>
                  <div className="data-line">
                    <span className="param">THREAT:</span>
                    <span className="value">Hostile AI entities</span>
                  </div>
                  <div className="data-line">
                    <span className="param">POWER-UPS:</span>
                    <span className="value">Neural enhancement capsules</span>
                  </div>
                  <div className="data-line">
                    <span className="param">CONTROLS:</span>
                    <span className="value">Arrow keys for navigation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <button
          className="exit-portal"
          onClick={() => navigate("/")}
        >
          <div className="portal-ring">
            <div className="ring-energy"></div>
          </div>
          <div className="exit-content">
            <span className="exit-arrow">←</span>
            <span className="exit-text">RETURN TO MAIN REALITY</span>
          </div>
          <div className="dimensional-rift"></div>
        </button>
      </div>

      <style jsx>{`
        .cyberpunk-arcade {
          min-height: 90vh;
          background: radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
          overflow: hidden;
          font-family: 'Orbitron', 'Courier New', monospace;
        }

        .matrix-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            linear-gradient(90deg, transparent 98%, rgba(0, 255, 255, 0.1) 100%),
            linear-gradient(0deg, transparent 98%, rgba(255, 0, 255, 0.1) 100%);
          background-size: 60px 60px;
          animation: matrixFlow 15s linear infinite;
        }

        @keyframes matrixFlow {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }

        .neon-particles {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(2px 2px at 20px 30px, #00ffff, transparent),
            radial-gradient(2px 2px at 40px 70px, #ff00ff, transparent),
            radial-gradient(1px 1px at 90px 40px, #ffff00, transparent),
            radial-gradient(1px 1px at 130px 80px, #00ff00, transparent);
          background-repeat: repeat;
          background-size: 150px 100px;
          animation: particleDrift 25s linear infinite;
          opacity: 0.6;
        }

        @keyframes particleDrift {
          0% { transform: translateX(0); }
          100% { transform: translateX(-150px); }
        }

        .hologram-grid {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 30% 30%, rgba(0, 255, 255, 0.47) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(255, 0, 255, 0.47) 0%, transparent 50%);
          animation: hologramPulse 8s ease-in-out infinite;
        }

        @keyframes hologramPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        .arcade-terminal {
          background: linear-gradient(145deg, rgba(10, 10, 30, 0.95), rgba(5, 5, 15, 0.98));
          border: 2px solid rgba(0, 255, 255, 0.3);
          border-radius: 20px;
          padding: 2rem;
          position: relative;
          max-width: 1100px;
          width: 100%;
          backdrop-filter: blur(20px);
          box-shadow: 
            0 0 50px rgba(0, 255, 255, 0.2),
            inset 0 0 50px rgba(0, 255, 255, 0.05),
            0 25px 50px rgba(0, 0, 0, 0.5);
        }

        .terminal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 0;
          border-bottom: 1px solid rgba(0, 255, 255, 0.2);
          margin-bottom: 2rem;
        }

        .status-bar {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .status-light {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          animation: statusPulse 2s infinite;
        }

        .status-light.active {
          background: #00ff00;
          box-shadow: 0 0 10px #00ff00;
        }

        .status-light.warning {
          background: #ffff00;
          box-shadow: 0 0 10px #ffff00;
          animation-delay: 0.5s;
        }

        @keyframes statusPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .system-text {
          color: rgba(0, 255, 255, 0.8);
          font-size: 0.9rem;
          letter-spacing: 1px;
          margin-left: 1rem;
        }

        .glitch-title-container {
          text-align: center;
          margin: 3rem 0;
          position: relative;
        }

        .cyber-title {
          font-size: clamp(4rem, 15vw, 10rem);
          font-weight: 900;
          color: transparent;
          background: linear-gradient(45deg, #00ffff, #ff00ff, #ffff00, #00ffff);
          background-size: 400% 400%;
          background-clip: text;
          -webkit-background-clip: text;
          position: relative;
          display: inline-block;
          animation: rainbowShift 3s ease-in-out infinite, glitchEffect 0.3s infinite;
          text-shadow: 
            0 0 20px rgba(0, 255, 255, 0.5),
            0 0 40px rgba(255, 0, 255, 0.3),
            0 0 60px rgba(255, 255, 0, 0.2);
          margin: 0;
        }

        .cyber-title::before,
        .cyber-title::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, #ff00ff, #00ffff);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
        }

        .cyber-title::before {
          animation: glitch1 2s infinite;
          clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
        }

        .cyber-title::after {
          animation: glitch2 2s infinite;
          clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
        }

        @keyframes rainbowShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes glitchEffect {
          0%, 90%, 100% { transform: translateX(0); }
          10% { transform: translateX(-2px); }
          20% { transform: translateX(2px); }
        }

        @keyframes glitch1 {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-3px); }
        }

        @keyframes glitch2 {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(3px); }
        }

        .subtitle-glow {
          position: relative;
          margin-top: 1rem;
        }

        .cyber-subtitle {
          color: #ffff00;
          font-size: 1.5rem;
          font-weight: 600;
          letter-spacing: 0.5rem;
          text-transform: uppercase;
          text-shadow: 0 0 20px #ffff00;
          animation: subtitlePulse 2s ease-in-out infinite;
        }

        @keyframes subtitlePulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }

        .hologram-panel {
          position: relative;
          background: rgba(0, 20, 40, 0.6);
          border: 1px solid rgba(0, 255, 255, 0.4);
          border-radius: 15px;
          padding: 2rem;
          margin: 2rem 0;
          backdrop-filter: blur(10px);
        }

        .panel-glow {
          position: absolute;
          top: -1px;
          left: -1px;
          right: -1px;
          bottom: -1px;
          background: linear-gradient(45deg, 
            rgba(0, 255, 255, 0.3), 
            rgba(255, 0, 255, 0.3), 
            rgba(255, 255, 0, 0.3), 
            rgba(0, 255, 255, 0.3));
          border-radius: 15px;
          filter: blur(8px);
          z-index: -1;
          animation: panelGlow 4s linear infinite;
        }

        @keyframes panelGlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .data-stream {
          font-family: 'Courier New', monospace;
        }

        .stream-line {
          display: flex;
          align-items: center;
          margin: 0.8rem 0;
          font-size: 1rem;
        }

        .stream-line.blinking {
          animation: streamBlink 1s infinite;
        }

        @keyframes streamBlink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.5; }
        }

        .prompt {
          color: #00ff00;
          margin-right: 1rem;
          text-shadow: 0 0 5px #00ff00;
        }

        .error-text {
          color: #ff4444;
          text-shadow: 0 0 5px #ff4444;
        }

        .info-text {
          color: #ffaa00;
          text-shadow: 0 0 5px #ffaa00;
        }

        .success-text {
          color: #00ff88;
          text-shadow: 0 0 5px #00ff88;
        }

        .control-matrix {
          display: flex;
          justify-content: center;
          margin: 3rem 0;
        }

        .neural-button {
          position: relative;
          width: 180px;
          height: 180px;
          background: radial-gradient(circle, rgba(0, 100, 200, 0.8), rgba(0, 50, 100, 0.9));
          border: 3px solid rgba(0, 255, 255, 0.6);
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          overflow: hidden;
          box-shadow: 
            0 0 30px rgba(0, 255, 255, 0.3),
            inset 0 0 30px rgba(0, 255, 255, 0.1);
        }

        .neural-button.activated {
          background: radial-gradient(circle, rgba(255, 100, 0, 0.8), rgba(200, 50, 0, 0.9));
          border-color: rgba(255, 100, 0, 0.8);
          box-shadow: 
            0 0 40px rgba(255, 100, 0, 0.5),
            inset 0 0 30px rgba(255, 100, 0, 0.2);
        }

        .neural-button:hover {
          transform: scale(1.05);
          box-shadow: 
            0 0 50px rgba(0, 255, 255, 0.6),
            inset 0 0 40px rgba(0, 255, 255, 0.2);
        }

        .button-core {
          width: 60px;
          height: 60px;
          background: radial-gradient(circle, #00ffff, #0088cc);
          border-radius: 50%;
          margin-bottom: 1rem;
          animation: coreRotate 3s linear infinite;
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.8);
        }

        .neural-button.activated .button-core {
          background: radial-gradient(circle, #ff6600, #cc4400);
          box-shadow: 0 0 20px rgba(255, 102, 0, 0.8);
        }

        @keyframes coreRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .energy-rings {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .ring {
          position: absolute;
          border: 2px solid rgba(0, 255, 255, 0.3);
          border-radius: 50%;
          animation: ringPulse 2s infinite;
        }

        .ring-1 {
          width: 100px;
          height: 100px;
          top: -50px;
          left: -50px;
        }

        .ring-2 {
          width: 130px;
          height: 130px;
          top: -65px;
          left: -65px;
          animation-delay: 0.3s;
        }

        .ring-3 {
          width: 160px;
          height: 160px;
          top: -80px;
          left: -80px;
          animation-delay: 0.6s;
        }

        @keyframes ringPulse {
          0%, 100% { 
            opacity: 0.3; 
            transform: scale(1); 
          }
          50% { 
            opacity: 0.8; 
            transform: scale(1.1); 
          }
        }

        .button-text {
          color: white;
          font-weight: bold;
          font-size: 1rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
          z-index: 10;
        }

        .neural-pulse {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, transparent 30%, rgba(0, 255, 255, 0.1) 31%, rgba(0, 255, 255, 0.1) 32%, transparent 33%);
          animation: neuralPulse 3s linear infinite;
          border-radius: 50%;
        }

        @keyframes neuralPulse {
          0% { transform: rotate(0deg) scale(0.5); }
          100% { transform: rotate(360deg) scale(1.5); }
        }

        .game-matrix {
          background: rgba(0, 10, 20, 0.8);
          border: 1px solid rgba(0, 255, 255, 0.3);
          border-radius: 20px;
          padding: 2rem;
          margin: 2rem 0;
          animation: matrixEntry 0.8s ease-out;
          backdrop-filter: blur(10px);
        }

        @keyframes matrixEntry {
          from {
            opacity: 0;
            transform: translateY(50px) rotateX(10deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
          }
        }

        .audio-interface {
          background: linear-gradient(145deg, rgba(20, 20, 40, 0.8), rgba(10, 10, 20, 0.9));
          border: 1px solid rgba(0, 255, 255, 0.4);
          border-radius: 15px;
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .interface-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(0, 255, 255, 0.2);
          margin-bottom: 1.5rem;
          position: relative;
        }

        .header-glow {
          position: absolute;
          top: -5px;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #00ffff, transparent);
          animation: headerScan 3s linear infinite;
        }

        @keyframes headerScan {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        .interface-title {
          color: #00ffff;
          font-size: 2rem;
          font-weight: bold;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .bio-scanner {
          width: 60px;
          height: 20px;
          background: rgba(0, 255, 255, 0.1);
          border: 1px solid rgba(0, 255, 255, 0.3);
          border-radius: 10px;
          position: relative;
          overflow: hidden;
        }

        .scanner-line {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, #00ffff, transparent);
          animation: bioScan 2s linear infinite;
        }

        @keyframes bioScan {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        .audio-controls {
          display: flex;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .power-node {
          background: radial-gradient(circle, rgba(100, 100, 100, 0.8), rgba(50, 50, 50, 0.9));
          border: 2px solid rgba(100, 100, 100, 0.6);
          border-radius: 15px;
          padding: 1rem 1.5rem;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .power-node.online {
          background: radial-gradient(circle, rgba(0, 255, 100, 0.8), rgba(0, 150, 50, 0.9));
          border-color: rgba(0, 255, 100, 0.8);
          box-shadow: 0 0 20px rgba(0, 255, 100, 0.3);
        }

        .power-node.offline {
          background: radial-gradient(circle, rgba(255, 50, 50, 0.8), rgba(150, 25, 25, 0.9));
          border-color: rgba(255, 50, 50, 0.8);
          box-shadow: 0 0 20px rgba(255, 50, 50, 0.3);
        }

        .node-core {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          position: relative;
          background: radial-gradient(circle, currentColor, transparent);
        }

        .core-pulse {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          background: currentColor;
          border-radius: 50%;
          animation: corePulse 1.5s ease-in-out infinite;
        }

        @keyframes corePulse {
          0%, 100% { 
            opacity: 1; 
            transform: translate(-50%, -50%) scale(1); 
          }
          50% { 
            opacity: 0.5; 
            transform: translate(-50%, -50%) scale(1.2); 
          }
        }

        .node-label {
          color: currentColor;
          font-weight: bold;
          font-size: 0.9rem;
          letter-spacing: 1px;
        }

        .quantum-slider {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          min-width: 300px;
        }

        .slider-label {
          color: #ffff00;
          font-size: 0.9rem;
          font-weight: bold;
          letter-spacing: 1px;
          text-align: center;
          text-transform: uppercase;
        }

        .slider-track-container {
          position: relative;
          height: 40px;
          display: flex;
          align-items: center;
          overflow: visible;
        }

        .volume-range-input {
          width: 100%;
          height: 8px;
          background: transparent;
          outline: none;
          border-radius: 20px;
          cursor: pointer;
          -webkit-appearance: none;
          appearance: none;
          position: relative;
          z-index: 10;
        }

        .volume-range-input::-webkit-slider-track {
          height: 8px;
          background: linear-gradient(145deg, rgba(20, 20, 40, 0.9), rgba(10, 10, 20, 0.9));
          border: 2px solid rgba(0, 255, 255, 0.4);
          border-radius: 20px;
          box-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
        }

        .volume-range-input::-webkit-slider-thumb {
          width: 30px;
          height: 30px;
          background: radial-gradient(circle, #ffffff, #aaaaaa);
          border: 3px solid #00ffff;
          border-radius: 50%;
          cursor: grab;
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.8);
          -webkit-appearance: none;
          appearance: none;
          position: relative;
          top: -13px;
        }

        .volume-range-input::-webkit-slider-thumb:active {
          cursor: grabbing;
          transform: scale(1.2);
        }

        .volume-range-input::-moz-range-track {
          height: 8px;
          background: linear-gradient(145deg, rgba(20, 20, 40, 0.9), rgba(10, 10, 20, 0.9));
          border: 2px solid rgba(0, 255, 255, 0.4);
          border-radius: 20px;
          box-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
        }

        .volume-range-input::-moz-range-thumb {
          width: 30px;
          height: 30px;
          background: radial-gradient(circle, #ffffff, #aaaaaa);
          border: 3px solid #00ffff;
          border-radius: 50%;
          cursor: grab;
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.8);
          appearance: none;
          border: none;
        }

        .volume-range-input::-moz-range-thumb:active {
          cursor: grabbing;
          transform: scale(1.2);
        }

        .frequency-markers {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          height: 15px;
        }

        .frequency-mark {
          position: absolute;
          top: 3px;
          transform: translateX(-50%);
          width: 2px;
          height: 8px;
          background: rgba(0, 255, 255, 0.6);
        }

        .mark-pulse {
          position: absolute;
          top: -2px;
          left: -2px;
          width: 6px;
          height: 12px;
          background: rgba(0, 255, 255, 0.3);
          border-radius: 3px;
          animation: markPulse 2s linear infinite;
        }

        @keyframes markPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }

        .neural-display {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .display-frame {
          background: rgba(0, 0, 0, 0.8);
          border: 2px solid #00ff00;
          border-radius: 8px;
          padding: 0.8rem 1.2rem;
          position: relative;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 
            0 0 15px rgba(0, 255, 0, 0.3),
            inset 0 0 15px rgba(0, 255, 0, 0.1);
        }

        .scan-lines {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 0, 0.1) 2px,
            rgba(0, 255, 0, 0.1) 4px
          );
          pointer-events: none;
        }

        .volume-readout {
          font-family: 'Courier New', monospace;
          font-size: 1.8rem;
          font-weight: bold;
          color: #00ff00;
          text-shadow: 0 0 10px #00ff00;
          min-width: 50px;
          text-align: center;
        }

        .unit-label {
          color: rgba(0, 255, 0, 0.7);
          font-size: 0.8rem;
          font-weight: bold;
        }

        .spectrum-analyzer {
          display: flex;
          align-items: end;
          gap: 2px;
          height: 40px;
        }

        .spectrum-bar {
          width: 4px;
          height: 8px;
          background: rgba(0, 255, 0, 0.3);
          border-radius: 2px;
          transition: all 0.2s ease;
        }

        .spectrum-bar:nth-child(1) { height: 8px; }
        .spectrum-bar:nth-child(2) { height: 12px; }
        .spectrum-bar:nth-child(3) { height: 16px; }
        .spectrum-bar:nth-child(4) { height: 20px; }
        .spectrum-bar:nth-child(5) { height: 24px; }
        .spectrum-bar:nth-child(6) { height: 28px; }
        .spectrum-bar:nth-child(7) { height: 32px; }
        .spectrum-bar:nth-child(8) { height: 36px; }

        .spectrum-bar.active {
          background: linear-gradient(to top, #00ff00, #88ff00);
          box-shadow: 0 0 8px rgba(0, 255, 0, 0.8);
          animation: spectrumPulse 0.5s ease-in-out infinite alternate;
        }

        @keyframes spectrumPulse {
          0% { opacity: 0.8; }
          100% { opacity: 1; }
        }

        .arcade-viewport {
          display: flex;
          justify-content: center;
          margin: 2rem 0;
        }

        .viewport-frame {
          background: linear-gradient(145deg, #2a2a3a, #1a1a2a);
          padding: 2.5rem;
          border-radius: 25px;
          border: 3px solid rgba(0, 255, 255, 0.5);
          position: relative;
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.5),
            inset 0 0 30px rgba(0, 255, 255, 0.1);
        }

        .frame-lights {
          position: absolute;
        }

        .light-strip {
          position: absolute;
          background: linear-gradient(90deg, 
            rgba(0, 255, 255, 0.8), 
            rgba(255, 0, 255, 0.8), 
            rgba(255, 255, 0, 0.8));
          animation: lightStrip 2s linear infinite;
        }

        .light-strip.top {
          top: -3px;
          left: 20px;
          right: 20px;
          height: 3px;
        }

        .light-strip.bottom {
          bottom: -3px;
          left: 20px;
          right: 20px;
          height: 3px;
        }

        .light-strip.left {
          left: -3px;
          top: 20px;
          bottom: 20px;
          width: 3px;
        }

        .light-strip.right {
          right: -3px;
          top: 20px;
          bottom: 20px;
          width: 3px;
        }

        @keyframes lightStrip {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        .screen-matrix {
          position: relative;
          background: #000;
          border-radius: 15px;
          overflow: hidden;
          border: 3px solid rgba(0, 255, 255, 0.3);
          box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.8);
          width: 640px;
          height: 480px;
        }

        .neural-screen {
          display: block;
          width: 640px;
          height: 480px;
          background: #000;
          border: none;
          outline: none;
          position: relative;
          z-index: 1;
        }

        .holographic-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 2;
        }

        .scan-grid {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 4px,
              rgba(0, 255, 255, 0.02) 4px,
              rgba(0, 255, 255, 0.02) 8px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 4px,
              rgba(0, 255, 255, 0.02) 4px,
              rgba(0, 255, 255, 0.02) 8px
            );
          animation: scanGrid 0.2s linear infinite;
        }

        @keyframes scanGrid {
          0% { transform: translate(0, 0); }
          100% { transform: translate(8px, 8px); }
        }

        .data-corruption {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            linear-gradient(45deg, transparent 98%, rgba(255, 0, 255, 0.1) 99%, transparent 100%),
            linear-gradient(-45deg, transparent 98%, rgba(0, 255, 255, 0.1) 99%, transparent 100%);
          background-size: 100px 100px;
          animation: dataCorruption 5s linear infinite;
          opacity: 0.3;
        }

        @keyframes dataCorruption {
          0% { transform: translate(0, 0); }
          100% { transform: translate(100px, -100px); }
        }

        .screen-reflection {
          position: absolute;
          top: 15%;
          left: 15%;
          width: 25%;
          height: 30%;
          background: linear-gradient(
            135deg,
            rgba(255,255,255,0.15) 0%,
            rgba(255,255,255,0.05) 50%,
            transparent 100%
          );
          border-radius: 50%;
          pointer-events: none;
          z-index: 3;
        }

        .viewport-label {
          position: absolute;
          bottom: 15px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 1rem;
          color: rgba(0, 255, 255, 0.8);
          font-size: 0.8rem;
          font-weight: bold;
          letter-spacing: 1px;
        }

        .status-indicators {
          display: flex;
          gap: 5px;
        }

        .indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          animation: indicatorPulse 2s infinite;
        }

        .indicator.online {
          background: #00ff00;
          box-shadow: 0 0 10px #00ff00;
        }

        .indicator.standby {
          background: #ffff00;
          box-shadow: 0 0 10px #ffff00;
          animation-delay: 0.5s;
        }

        @keyframes indicatorPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .control-interface {
          background: linear-gradient(145deg, rgba(15, 15, 25, 0.9), rgba(8, 8, 15, 0.9));
          border: 1px solid rgba(0, 255, 255, 0.3);
          border-radius: 20px;
          padding: 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .interface-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .section-title {
          color: #00ffff;
          font-size: 1rem;
          font-weight: bold;
          letter-spacing: 2px;
          text-transform: uppercase;
          text-align: center;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(0, 255, 255, 0.3);
        }

        .input-grid {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .input-cluster {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .virtual-joystick {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .joystick-base {
          width: 70px;
          height: 70px;
          background: radial-gradient(circle, rgba(100, 100, 150, 0.8), rgba(50, 50, 75, 0.9));
          border: 3px solid rgba(0, 255, 255, 0.6);
          border-radius: 50%;
          position: relative;
          box-shadow: 
            0 0 20px rgba(0, 255, 255, 0.3),
            inset 0 0 20px rgba(0, 0, 0, 0.5);
        }

        .base-ring {
          position: absolute;
          top: 10px;
          left: 10px;
          right: 10px;
          bottom: 10px;
          border: 1px solid rgba(0, 255, 255, 0.4);
          border-radius: 50%;
        }

        .joystick-knob {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 25px;
          height: 35px;
          background: linear-gradient(145deg, #ff3333, #cc0000);
          border-radius: 12px 12px 50% 50%;
          border: 2px solid #ffffff;
          box-shadow: 0 0 15px rgba(255, 51, 51, 0.5);
        }

        .knob-glow {
          position: absolute;
          top: -3px;
          left: -3px;
          right: -3px;
          bottom: -3px;
          border: 1px solid rgba(255, 51, 51, 0.3);
          border-radius: 15px 15px 50% 50%;
          animation: knobGlow 2s linear infinite;
        }

        @keyframes knobGlow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .input-label {
          color: #ffff00;
          font-size: 0.7rem;
          font-weight: bold;
          text-align: center;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .action-cluster {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .cyber-buttons {
          display: flex;
          gap: 1rem;
        }

        .cyber-btn {
          width: 55px;
          height: 55px;
          border-radius: 50%;
          border: 3px solid #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: bold;
          color: white;
          text-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
          cursor: pointer;
          position: relative;
          transition: all 0.2s ease;
          box-shadow: 
            0 6px 0 rgba(0, 0, 0, 0.3),
            0 6px 20px rgba(0, 0, 0, 0.2);
        }

        .cyber-btn.primary {
          background: radial-gradient(circle, #ff3333, #cc0000);
        }

        .cyber-btn.secondary {
          background: radial-gradient(circle, #ffff33, #cccc00);
          color: black;
        }

        .cyber-btn:hover {
          transform: translateY(2px);
          box-shadow: 
            0 4px 0 rgba(0, 0, 0, 0.3),
            0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .btn-glow {
          position: absolute;
          top: -3px;
          left: -3px;
          right: -3px;
          bottom: -3px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          animation: btnGlow 2s linear infinite;
          
        }

        @keyframes btnGlow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .mission-data {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .data-line {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(0, 255, 255, 0.1);
        }

        .param {
          color: #ffff00;
          font-weight: bold;
          font-size: 1rem;
          letter-spacing: 1px;
        }

        .value {
          color: rgba(255, 255, 255, 0.8);
          font-size: 1rem;
          text-align: right;
          max-width: 60%;
        }

        .exit-portal {
          background: linear-gradient(145deg, rgba(255, 100, 0, 0.8), rgba(200, 50, 0, 0.9));
          border: 3px solid rgba(255, 200, 0, 0.8);
          border-radius: 30px;
          padding: 1.2rem 2.5rem;
          color: white;
          font-weight: bold;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin: 3rem auto 0;
          position: relative;
          overflow: hidden;
          transition: all 0.4s ease;
          font-family: 'Orbitron', 'Courier New', monospace;
          font-size: 1rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          box-shadow: 
            0 8px 0 rgba(200, 50, 0, 0.8),
            0 8px 30px rgba(0, 0, 0, 0.4),
            inset 0 0 30px rgba(255, 200, 0, 0.2);
        }

        .exit-portal:hover {
          transform: translateY(-4px);
          box-shadow: 
            0 12px 0 rgba(200, 50, 0, 0.8),
            0 12px 40px rgba(0, 0, 0, 0.5),
            inset 0 0 40px rgba(255, 200, 0, 0.3),
            0 0 60px rgba(255, 100, 0, 0.5);
        }

        .portal-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120%;
          height: 120%;
          border: 2px solid rgba(255, 200, 0, 0.3);
          border-radius: 50%;
          animation: portalRotate 6s linear infinite;
        }

        @keyframes portalRotate {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }

        .ring-energy {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: conic-gradient(
            from 0deg,
            transparent,
            rgba(255, 200, 0, 0.6),
            transparent,
            rgba(255, 100, 0, 0.4),
            transparent
          );
          animation: energyRotate 3s linear infinite;
        }

        @keyframes energyRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .exit-content {
          display: flex;
          align-items: center;
          gap: 1rem;
          position: relative;
          z-index: 10;
        }

        .exit-arrow {
          font-size: 1.8rem;
          transition: transform 0.4s ease;
        }

        .exit-portal:hover .exit-arrow {
          transform: translateX(-8px);
        }

        .exit-text {
          font-weight: bold;
          text-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
        }

        .dimensional-rift {
          position: absolute;
          top: -20%;
          left: -20%;
          right: -20%;
          bottom: -20%;
          background: 
            radial-gradient(ellipse at center, transparent 30%, rgba(255, 100, 0, 0.1) 40%, transparent 60%);
          animation: dimensionalRift 4s ease-in-out infinite;
          border-radius: 50%;
        }

        @keyframes dimensionalRift {
          0%, 100% { 
            opacity: 0.3; 
            transform: scale(1) rotate(0deg); 
          }
          50% { 
            opacity: 0.8; 
            transform: scale(1.2) rotate(180deg); 
          }
        }

        @media (max-width: 1024px) {
          .control-interface {
            grid-template-columns: 1fr;
            text-align: center;
          }
          
          .audio-controls {
            flex-direction: column;
            gap: 1.5rem;
          }
          
          .quantum-slider {
            min-width: 250px;
          }
        }

        @media (max-width: 768px) {
          .arcade-terminal {
            padding: 1rem;
          }
          
          .neural-button {
            width: 150px;
            height: 150px;
          }
          
          .viewport-frame {
            padding: 1rem;
            transform: scale(0.85);
            transform-origin: center;
          }
          
          .screen-matrix {
            width: 640px;
            height: 480px;
          }
          
          .neural-screen {
            width: 640px;
            height: 480px;
          }
          
          .input-grid {
            flex-direction: column;
            gap: 2rem;
          }
          
          .cyber-title {
            font-size: clamp(2.5rem, 12vw, 6rem);
          }
        }
      `}</style>
    </div>
  );
};