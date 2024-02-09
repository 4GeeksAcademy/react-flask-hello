import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import '../../styles/createItinerary.css';
import avatar1 from "../../img/avatar1.png";
import { Context } from "../store/appContext";

const CreateItinerary = () => {
  {
    const initialQuestions =
    {
      "Location": 'We have 8 questions for you..Where do you want to go?',
      "Group size": 'How many people are there in your group?',
      "Time at disposal": 'How many days do you plan to stay?',
      "Time of the year": 'What time of the year would you like to go?',
      "Interests": 'What are your interests? Like food, history, nature, arts..',
      "Level of fitness": 'What is your level of fitness?',
      "Dietary requirement": 'Almost there, please indicate your dietary preferences?',
      "Budget": 'And finally.. your daily budget?',
    };

    const [questions, setQuestions] = useState(initialQuestions);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({
      "Location": "",
      "Group size": "",
      "Time at disposal": "",
      "Time of the year": "",
      "Interests": "",
      "Level of fitness": "",
      "Dietary requirement": "",
      "Budget": "",
    });

    const [generatedItinerary, setGeneratedItinerary] = useState(null);
    const [quizInProgress, setQuizInProgress] = useState(true);
    const { store, actions } = useContext(Context);
    const [itineraryName, setItineraryName] = useState("");

    const handleAnswerInput = (e) => {
      e.persist();

      const key = getKeyByIndex();
      setUserAnswers((oldValue) => ({
        ...oldValue,
        [key]: e.target.value,
      }));

      if (e.key === 'Enter') {
        askNextQuestion();
      }
    };

    const askNextQuestion = async () => {
      if (!quizInProgress) {
        return;
      }

      if (!userAnswers[getKeyByIndex()].trim()) {
        alert("Please provide an answer before moving to the next question.");
        return;
      }

      setUserAnswers((oldValue) => ({
        ...oldValue,
        [getKeyByIndex()]: userAnswers[getKeyByIndex()],
      }));
      setCurrentQuestionIndex(currentQuestionIndex + 1);

      if (currentQuestionIndex === 7) {
        const response = await fetch(process.env.BACKEND_URL + '/api/createItinerary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userAnswers),
        });

        const result = await response.json();

        if (response.ok) {
          setGeneratedItinerary(result.itinerary);
          setQuizInProgress(false);
        } else {
          console.error('Error generating itinerary:', result.error);
        }
      }
    };

    const getKeyByIndex = () => {
      const keys = Object.keys(questions);
      return keys[currentQuestionIndex];
    };

    const handleSaveItinerary = async () => {
      try {
        const accessToken = store.accessToken;
   
        const response = await fetch(process.env.BACKEND_URL + '/api/saveItinerary', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${store.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            itinerary: generatedItinerary,
            itineraryName: itineraryName,
          }),
        });
    
        console.log(response);
    
        if (!response.ok) {
          console.error('Error saving itinerary:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    const handleStartAgain = () => {
      setQuestions(initialQuestions);
      setCurrentQuestionIndex(0);
      setUserAnswers([]);
      setGeneratedItinerary(null);
      setQuizInProgress(true);
    };

    useEffect(() => {
      const handleKeyPress = (e) => {
        if (e.key === 'Enter' && currentQuestionIndex === 8) {
          handleStartAgain();
        }
      };

      if (currentQuestionIndex === 8) {
        document.addEventListener('keypress', handleKeyPress);
      }

      return () => {
        document.removeEventListener('keypress', handleKeyPress);
      };
    }, [currentQuestionIndex]);


    return (
      <>
        <div className="container">
          <div className="avatar-container" id='avatarcontainer'>
            <div className="card mb-5">
              <div className='avatar-box '>
                <div className='avatar me-5' id='avatar-placeholder'><img src={avatar1} alt="avatar" id='avatar' /> </div>
                <div className='box n1' id='question'>
                  {currentQuestionIndex === 8
                    ? 'Here is your itinerary, enjoy your holiday!'
                    : questions[getKeyByIndex()]}
                </div>
              </div>
              <div className="card-body">
                <p className="card-text" id='Dio'>Assistant DioDio</p>
                {currentQuestionIndex !== 8 && (
                  <div>
                    <input
                      type='text'
                      id='answerInput'
                      placeholder='Your answer'
                      value={userAnswers[getKeyByIndex()] || ''}
                      onChange={handleAnswerInput}
                      onKeyPress={handleAnswerInput}
                      required
                    />
                    <button id='nextbutton' onClick={askNextQuestion}>{currentQuestionIndex === 7 ? 'Generate Itinerary' : 'Next Question'}</button>
                  </div>
                )}
                {currentQuestionIndex === 8 && (
                  <button id='nextbutton' onClick={handleStartAgain}>Start Again</button>
                )}
              </div>
            </div>
            <div className='answer-box'>
              <div className='answer-item '>
                {generatedItinerary ? (
                  <div className='generated-itinerary' id='generated-itinerary'>
                    <h2>Generated Itinerary</h2>
                    {generatedItinerary.map((day, index) => (
                      <div className="mapped" key={index}>
                        <div className='days'> <h3>Day {index + 1}</h3> </div>
                        <div className='itinerary'>
                          <div className='object'><strong>Accomodation</strong> {day.accomodation}</div> <br />
                           <div className='object'><strong>Activities</strong></div>
                          <ul>
                            {day.activities.map((activity, i) => (
                              <li key={i}>{activity}</li>
                            ))}
                          </ul>
                          <div className='object'> <strong>Lunch</strong> {day.lunch}</div> <br />
                          <div className='object'> <strong>Dinner</strong> {day.dinner}</div> <br />
                          <div className='object'> <strong>Transportation</strong> {day.transportation}</div>
                        </div>
                        {index < generatedItinerary.length -1 && <hr className='day-divider'/>}
                      </div>
                    ))}
                    <input type="text" name="Itinerary Name" onChange={e => setItineraryName(e.target.value)}></input>
                    <Button className="save-button" onClick={handleSaveItinerary}>Save Itinerary</Button>
                  </div>
                ) : (
                  'AI Answer'
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );

  }
}
export default CreateItinerary;