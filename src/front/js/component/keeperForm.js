import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';


//Calendar use
const ValuePiece = Date | null;
const Value = ValuePiece | [ValuePiece, ValuePiece];

function getDate(){
  let today = new Date()
  return today
}

export const KeeperForm = () => {
  //Calendar use
  const [value, onChange] = useState([]);
  const [range, setRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  })

  return (
    <div className="container" id="calendar">
      <div className="row">
        <div className="col-auto">
          {/* Dos columnas principales */}
          <div style={{textAlign:"left"}}>
            <div className="d-block">
              <small>Service fee</small>
              <p>$15/hr</p>
            </div>
            <div>
              <form>
                <div class="accordion" id="accordionExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                      <button class="accordion-button gap-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Availability
                      </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                      <div class="accordion-body sample_container_content">
                        <div className="row">
                          <div className="col">
                            <Calendar onChange={onChange} minDate={getDate()} selectRange={true} returnValue="range" value={value}/>
                          </div>
                          <div className="col">
                            {value.map((date, index) => {
                            return(
                              <div index={index}>
                                {((index==0)?(`Start date: ${date.getDate().toString()+"/"+(date.getMonth()+1).toString()+"/"+date.getFullYear().toString()}`):(`End date: ${date.getDate().toString()+"/"+(date.getMonth()+1).toString()+"/"+date.getFullYear().toString()}`))}
                              </div>
                            )
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div>

          </div>
        </div>
      </div>
      <div className="ml-auto mt-4">
        <Link to="/">
          <button className="btn btn-dark btn-lg" role="button">Book this keeper</button>
        </Link>
      </div>
    </div>
  );
};
//console.log((index==0)?(`Start date: ${date.getDate().toString()+"/"+(date.getMonth()+1).toString()+"/"+date.getFullYear().toString()}`):(`End date: ${date.getDate().toString()+"/"+(date.getMonth()+1).toString()+"/"+date.getFullYear().toString()}`))
