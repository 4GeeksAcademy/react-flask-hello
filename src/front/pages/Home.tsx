
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

/**
 * Home Page Component
 * 
 * The landing page for Bootstrap vs Zombies that introduces the educational game concept.
 * Demonstrates Bootstrap layout components and marketing page structure.
 * 
 * Educational Value:
 * - Showcases Bootstrap's responsive grid system
 * - Demonstrates proper use of containers, rows, and columns
 * - Shows Bootstrap card components for content organization
 * - Uses Bootstrap typography and spacing utilities
 * - Integrates navigation and routing concepts
 * 
 * Bootstrap Concepts Demonstrated:
 * - Container for responsive layout boundaries
 * - Row and Col for flexible grid layouts
 * - Card components with headers, bodies, and consistent styling
 * - Button variants and sizing
 * - Typography utilities (display, lead, text-center)
 * - Spacing utilities (mb-5, p-3, etc.)
 * - Color utilities for semantic meaning
 * 
 * Design Patterns:
 * - Hero section with centered content
 * - Feature cards with consistent layout
 * - Call-to-action buttons with clear hierarchy
 * - Instructional content with organized sections
 */
const Home: React.FC = () => {
  return (
    <>
      <Navigation />
      <Container>
        {/* Hero Section - Introduction to the Game */}
        <Row className="justify-content-center text-center mb-5">
          <Col lg={8}>
            {/* Main heading using Bootstrap display utility */}
            <h1 className="display-4 fw-bold mb-4">
              🧟‍♂️ Bootstrap vs Zombies
            </h1>
            {/* Subtitle using Bootstrap lead class for emphasis */}
            <p className="lead">
              Master Bootstrap flex utilities in an epic tower defense battle! 
              Use your CSS skills to position defenses and survive the zombie apocalypse.
            </p>
            <p className="text-muted">
              An educational game that makes learning Bootstrap flexbox fun and interactive.
            </p>
          </Col>
        </Row>

        {/* Feature Cards Section */}
        <Row className="justify-content-center mb-5">
          {/* Game Mode Card */}
          <Col md={4} className="mb-3">
            <Card className="h-100 shadow-sm border-success">
              <Card.Body className="text-center d-flex flex-column">
                <Card.Title className="text-success">🎮 Battle Mode</Card.Title>
                <Card.Text className="flex-grow-1">
                  Deploy Bootstrap flex classes strategically to create an impenetrable 
                  defense grid against the undead horde! Learn by doing in this 
                  interactive tower defense experience.
                </Card.Text>
                <Link to="/game" className="mt-auto">
                  <Button variant="success" size="lg" className="w-100">
                    ⚔️ Start Battle
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          
          {/* Leaderboard Card */}
          <Col md={4} className="mb-3">
            <Card className="h-100 shadow-sm border-info">
              <Card.Body className="text-center d-flex flex-column">
                <Card.Title className="text-info">🏆 Hall of Fame</Card.Title>
                <Card.Text className="flex-grow-1">
                  Check the leaderboard to see who are the ultimate Bootstrap warriors 
                  and zombie slayers. Compete with classmates and track your learning progress.
                </Card.Text>
                <Link to="/leaderboard" className="mt-auto">
                  <Button variant="info" size="lg" className="w-100">
                    👑 View Heroes
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* How to Play Section */}
        <Row className="justify-content-center">
          <Col lg={10}>
            <Card className="shadow">
              <Card.Header className="bg-dark text-white">
                <h3 className="mb-0">⚔️ How to Survive the Bootstrap Apocalypse</h3>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <h5 className="text-danger">🧟‍♂️ The Zombie Threat</h5>
                    <p>
                      Undead creatures spawn from the bottom of your 12-column Bootstrap grid 
                      and march relentlessly upward. Each zombie represents a layout challenge 
                      that must be solved with proper CSS positioning.
                    </p>
                    
                    <h5 className="text-primary">🛡️ Flex Defense System</h5>
                    <p>
                      Deploy flex containers as defensive turrets. Choose the right Bootstrap 
                      flex class to target zombies in their path. Your understanding of 
                      <code className="mx-1">justify-content</code> and <code>align-items</code> 
                      determines your survival!
                    </p>
                  </Col>
                  <Col md={6}>
                    <h5 className="text-success">🎯 Master Bootstrap Classes</h5>
                    <p>
                      Learn essential classes like <code>justify-content-center</code>, 
                      <code className="mx-1">align-items-start</code>, and more through combat! 
                      Each victory reinforces your understanding of flexbox properties.
                    </p>
                    
                    <h5 className="text-warning">🏆 Educational Objectives</h5>
                    <ul className="mb-0">
                      <li>Master Bootstrap's 12-column grid system</li>
                      <li>Understand flexbox alignment properties</li>
                      <li>Practice responsive design principles</li>
                      <li>Apply CSS knowledge in practical scenarios</li>
                    </ul>
                  </Col>
                </Row>
                
                {/* Quick Start Guide */}
                <Row className="mt-4 pt-4 border-top">
                  <Col>
                    <h5 className="text-info mb-3">🚀 Quick Start Guide</h5>
                    <Row>
                      <Col sm={6} md={3} className="mb-2">
                        <div className="text-center p-3 bg-light rounded">
                          <div className="fs-2 mb-2">1️⃣</div>
                          <strong>Choose Class</strong>
                          <br />
                          <small>Select a Bootstrap flex utility</small>
                        </div>
                      </Col>
                      <Col sm={6} md={3} className="mb-2">
                        <div className="text-center p-3 bg-light rounded">
                          <div className="fs-2 mb-2">2️⃣</div>
                          <strong>Place Turret</strong>
                          <br />
                          <small>Click grid column to deploy</small>
                        </div>
                      </Col>
                      <Col sm={6} md={3} className="mb-2">
                        <div className="text-center p-3 bg-light rounded">
                          <div className="fs-2 mb-2">3️⃣</div>
                          <strong>Watch Magic</strong>
                          <br />
                          <small>See flexbox in action</small>
                        </div>
                      </Col>
                      <Col sm={6} md={3} className="mb-2">
                        <div className="text-center p-3 bg-light rounded">
                          <div className="fs-2 mb-2">4️⃣</div>
                          <strong>Learn & Win</strong>
                          <br />
                          <small>Master CSS through gameplay</small>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
