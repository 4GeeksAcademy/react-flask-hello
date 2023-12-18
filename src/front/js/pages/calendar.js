import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/calendar.css";
import ModalComponent from "../component/modal";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

let hourArray = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
];

let bgColor = "rgb(72 177 186 / 63%)";

function Calendar(props) {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const { store, actions } = useContext(Context);
  const [modalData, setModalData] = useState({});
console.log(store)
  let trHeight = Math.floor(100 / store.programs.length);

  return (
    <div>
 
      <Modal 
      open={open} 
      onClose={onCloseModal} 
      center
      classNames={{
        modal: 'customModal',
      }}
      >
      <div className="content">
            <span className="header">
              <h5 className="title fw-bold  border-bottom" >
                {modalData.name}
              </h5>
             
            </span>
            <div className="body">{modalData.description}</div>
            <div className="footer">
              
            </div>
          </div>
      </Modal>
      {/* mobile start */}
  
      <div 
      className="d-block d-md-none d-lg-none  m-auto px-3 py-1 rounded text-start"
      style={{ 
        backgroundColor: "rgba(72, 177, 186, 0.63)",
        width:"86%"
    }}
      >
        {store.programs.map((program,i)=>{
          return(
            <div 
            className={`${program[`${props.days}_start`] != null ? "d-block" : "d-none"} d-md-none d-lg-none my-3 p-2 ` }
            key={i}
            style={{backgroundColor: "rgb(72 177 186)"}}
            onClick={() => {
              onOpenModal()
              setModalData(program)}}
            >
                {program[`${props.days}_start`] && program[`${props.days}_start`] != null ? 
                <>
                  <span 
                  className="fw-bold text-white p-1 rounded  "
                  style={{backgroundColor:"#ea6f36",
                  fontSize:" 5vw"
                }}
                  >
                      {program.name}
                  </span>
                  <div className=" mt-2 align-items-center justify-content-between ">
                  <p 
                  className="mb-0   mobileInfoText"  
                  >
                  {program[`${props.days}_start`]
                    ? program[`${props.days}_start`] +
                      "-" +
                      program[`${props.days}_end`]
                    : " "}
                </p>
                <div
                className=" text-decoration-underline text-end"
                style={{fontSize:"4vw"}}
                >*Click for more info</div>

                  </div>
                
                </>
                
                :
                ""
              }

            </div>
          );
        })}
      </div>
          {/* mobile end */}
      <table className="table d-none d-md-table d-lg-table table-bordered ">
        <thead>
          <tr>
            {hourArray.map((hour, i) => {
              let firstHour = hour.split(":")[0];
              let secondHour =
                hourArray[(i < hourArray.length - 1 ? i : "") + 1].split(
                  ":"
                )[0] + " ";
              let amOrPm = hour.split(":")[1].replace("00 ", "");
              return (
                <>
                  {i < hourArray.length - 1 ? (
                    <th className="timeFont" scope="col">
                      {firstHour}-{secondHour}
                      {amOrPm}
                    </th>
                  ) : (
                    ""
                  )}
                </>
              );
            })}
          </tr>
        </thead>
        <tbody style={{ height: "58vh" }}>
          {store.programs.map((program, index) => {
            return (
              <tr
                style={{
                  height: `${trHeight}%`,
                }}
              >
                {hourArray.map((hour, i) => {
                  // set up conditions in variables
                  let programTotalHours =
                    store.totalHours[index]?.[`${props.days}_hours`];

                  let programHour =
                    store.programs[index]?.[`${props.days}_start`] != null
                      ? store.programs[index]?.[`${props.days}_start`]
                      : false;

                  let numOfTd = 11 - programTotalHours;

                  let halfHourMargin =
                    (1 / ((parseInt(programTotalHours) + 1) * 2)) * 100;

                  let startTime =
                    store.programs[index]?.[`${props.days}_start`];

                  let startTime30 =
                    store.programs[index]?.[`${props.days}_start`] != null
                      ? store.programs[index]?.[`${props.days}_start`].includes(
                          "30"
                        )
                      : false;

                  let endTime30 =
                    store.programs[index]?.[`${props.days}_end`] != null
                      ? store.programs[index]?.[`${props.days}_end`].includes(
                          "30"
                        )
                      : false;

                  let firstAndLastTextMatch =
                    programHour.length > 1 &&
                    hour.length > 1 &&
                    programHour[0] != null &&
                    hour[0] != null &&
                    store.programs[index]?.[`${props.days}_start`] != null
                      ? programHour[0] == hour[0] &&
                        programHour[
                          store.programs[index]?.[`${props.days}_start`]
                            .length - 2
                        ] ==
                          hour[
                            store.programs[index]?.[`${props.days}_start`]
                              .length - 2
                          ]
                      : false;

                  let halfHourTxt = hour.replace("00", "30");

                  // conditions to determine if tooltip will be displayed to left of right

                  // take start/end time of program and put it in time object format
                  let progStartTimeObj = new Date(
                    "01/01/2022 " + store.programs[index][`${props.days}_start`]
                  );
                  let progEndTimeObj = new Date(
                    "01/01/2022 " + store.programs[index][`${props.days}_end`]
                  );
                  // set time object at 2pm and 6pm
                  let twoPMTimeObj = new Date(`01/01/2022 2:00 PM`);
                  let sixPMTimeObj = new Date(`01/01/2022 6:00 PM`);

                  // now we can compare program start/end time being before or after 2pm/6pm
                  // to determine if tooltip should be displayed to left or right
                  let left =
                    progStartTimeObj >= twoPMTimeObj ||
                    progEndTimeObj > sixPMTimeObj;

                  return (
                    <>
                      {/* render program if the start and end time don't include "30" */}
                      {props.days &&
                      programTotalHours &&
                      programHour == hour &&
                      !startTime30 &&
                      !endTime30 ? (
                        <td
                          key={i}
                          colSpan={programTotalHours}
                          data-program-name={store.programs[index].name}
                          className={`p-0 ${
                            left ? "titleLeft" : "titleRight"
                          } `}
                          onClick={() => {
                            onOpenModal()
                            setModalData(store.programs[index])}}
                          style={{
                            height: "1px",
                            overflow: "visible",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: "50px",
                          }}
                        >
                          <div
                            className={`p-0 ${
                              left ? "arrowRight" : "arrowLeft"
                            }`}
                          ></div>
                          <div
                            className="scroller p-2 z-2 modalTD "
                          
                            style={{
                              backgroundColor: bgColor,
                              fontSize: "87%",
                              overflowX: "scroll",
                              overflowY: "hidden",
                            }}
                          >
                            <div className="row ">
                              <p className="mb-0  ">
                                {program[`${props.days}_start`]
                                  ? program[`${props.days}_start`] +
                                    "-" +
                                    program[`${props.days}_end`]
                                  : " "}
                              </p>
                            </div>
                            <div className="row">
                              <span className="clickFont">
                                * Click for more info
                              </span>
                            </div>
                          </div>
                        </td>
                      ) : /* render program if the start  time  includes "30" */

                      props.days &&
                        programTotalHours &&
                        programHour == halfHourTxt &&
                        startTime30 &&
                        !endTime30 ? (
                        <td
                          key={i}
                          colSpan={parseInt(programTotalHours) + 1}
                          onClick={() => {
                            onOpenModal()
                            setModalData(store.programs[index])}}
                          data-program-name={store.programs[index].name}
                          className={`p-0 ${
                            left ? "titleLeft" : "titleRight"
                          } `}
                          style={{
                            height: "1px",
                            overflow: "visible",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: "73px",
                          }}
                        >
                          <div
                            className={`p-0 ${
                              left ? "arrowRight" : "arrowLeft"
                            }`}
                          ></div>
                          <div
                            className="scroller p-2 z-2 modalTD "
                            
                            style={{
                              backgroundColor: bgColor,
                              fontSize: "87%",
                              overflowX: "scroll",
                              overflowY: "hidden",
                              marginLeft: `${halfHourMargin}%`,
                            }}
                          >
                            <div className="row">
                              <p className="mb-0 ">
                                {program[`${props.days}_start`]
                                  ? program[`${props.days}_start`] +
                                    "-" +
                                    program[`${props.days}_end`]
                                  : " "}
                              </p>
                            </div>
                            <div className="row">
                              <span className="clickFont">
                                * Click for more info
                              </span>
                            </div>
                          </div>
                        </td>
                      ) : /* render program if the end time  includes "30" */

                      props.days &&
                        programTotalHours &&
                        !startTime30 &&
                        endTime30 &&
                        firstAndLastTextMatch ? (
                        <td
                          key={i}
                          colSpan={parseInt(programTotalHours) + 1}
                          onClick={() => {
                            onOpenModal()
                            setModalData(store.programs[index])}}
                          data-program-name={store.programs[index].name}
                          className={`p-0 ${
                            left ? "titleLeft" : "titleRight"
                          } `}
                          style={{
                            height: "1px",
                            overflow: "visible",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: "73px",
                          }}
                        >
                          <div
                            className={`p-0 ${
                              left ? "arrowRight" : "arrowLeft"
                            }`}
                          ></div>
                          <div
                            className="scroller p-2 z-2 modalTD "
                            style={{
                              backgroundColor: bgColor,
                              fontSize: "87%",
                              overflowX: "scroll",
                              overflowY: "hidden",
                              marginRight: `${halfHourMargin}%`,
                            }}
                          >
                            <div className="row">
                              <p className="mb-0 ">
                                {program[`${props.days}_start`]
                                  ? program[`${props.days}_start`] +
                                    "-" +
                                    program[`${props.days}_end`]
                                  : " "}
                              </p>
                            </div>
                            <div className="row">
                              <span className="clickFont">
                                * Click for more info
                              </span>
                            </div>
                          </div>
                        </td>
                      ) : /* render program if the start and end  time  includes "30 */

                      props.days &&
                        programTotalHours &&
                        startTime30 &&
                        endTime30 &&
                        firstAndLastTextMatch ? (
                        <td
                          key={i}
                          colSpan={parseInt(programTotalHours) + 1}
                          onClick={() => {
                            onOpenModal()
                            setModalData(store.programs[index])}}
                          data-program-name={store.programs[index].name}
                          //  solution to bug where startTime was 10:30 or 11:30
                          // the program would duplicate, but data would not duplicate
                          className={`p-0 ${left ? "titleLeft" : "titleRight"} 
                          ${startTime == "10:30 AM" && i > 1 ? "d-none" : ""}
                           ${startTime == "11:30 AM" && i > 1 ? "d-none" : ""}
                          `}
                          style={{
                            height: "1px",
                            overflow: "visible",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: "73px",
                          }}
                        >
                          {/* tool tip  corner arrow */}
                          <div
                            className={`p-0 ${
                              left ? "arrowRight" : "arrowLeft"
                            }`}
                          ></div>
                          <div
                            className={`scroller p-2 z-2 modalTD  `}
                            data-bs-toggle="modal"
                            data-bs-target="#programModal"
                            style={{
                              backgroundColor: bgColor,
                              fontSize: "87%",
                              overflowX: "scroll",
                              overflowY: "hidden",
                              marginLeft: `${halfHourMargin}%`,
                              marginRight: `${halfHourMargin}%`,
                            }}
                          >
                            <div className="row">
                              <p className="mb-0 ">
                                {program[`${props.days}_start`]
                                  ? program[`${props.days}_start`] +
                                    "-" +
                                    program[`${props.days}_end`]
                                  : " "}
                              </p>
                            </div>
                            <div className="row">
                              <span className="clickFont">
                                * Click for more info
                              </span>
                            </div>
                          </div>
                        </td>
                      ) : (
                        <td
                          // solution to render correct number of td's
                          // due to fact the when program renders dynamically
                          // it takes up different number of td's
                          className={i >= numOfTd || i == 11 ? "d-none" : ""}
                        ></td>
                      )}
                    </>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Calendar;