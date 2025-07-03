import React, { useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import ClassSelector from '../components/ClassSelector';
import GameStats from '../components/GameStats';
import { useAuth } from '../hooks/useAuth';
import PhaserGame from '../components/PhaserGame';

const Game: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  ////////// PHASER START /////////////
  const phaserRef = useRef(null);
  ////////// PHASER END /////////////

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
    if (user) {
      import('../game/EventBus').then(({ EventBus, USER_EVENT }) => {
        EventBus.emit(USER_EVENT, user);
      });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <>
        <Navigation />
        <Container>
          <div className="text-center">Loading...</div>
        </Container>
      </>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <>
      <Navigation />
      <div className='container'>
        <div className='row'>
          <GameStats phaserRef={phaserRef} />
        </div>
        <div className='row justify-content-center'>
          <div className='col-8'>
            <PhaserGame ref={phaserRef} />
          </div>
          <div className='col-4'>
            <ClassSelector />
          </div>
        </div>
      </div>
    </>
  );
};

export default Game;
