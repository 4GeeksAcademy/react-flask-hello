import React from "react";
import { Link } from "react-router-dom";

export const Reviews = () => {
  return (
    <div className="container">
      <section>
        <div className="row d-flex justify-content-center">
          <div className="col-md-10 col-xl-8 text-center mt-5 mb-5">
            <h1 className="mb-4"><b>Comentarios</b></h1>
          </div>
        </div>

        <div className="row text-center">
          <div className="col-md-4 mb-5 mb-md-0">
            <div className="d-flex justify-content-center mb-4">
              <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d8613b9a-b860-4344-8702-238372e9f5be/de61h0w-1793170a-0166-4c07-91d0-22d4cc6192b6.png/v1/fit/w_828,h_828,q_70,strp/gabriel_garcia_marquez_by_fbonett_de61h0w-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2Q4NjEzYjlhLWI4NjAtNDM0NC04NzAyLTIzODM3MmU5ZjViZVwvZGU2MWgwdy0xNzkzMTcwYS0wMTY2LTRjMDctOTFkMC0yMmQ0Y2M2MTkyYjYucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.rM_ay4l1u3NyfGUSGqJBJZDyLcBLR5dkhqz0oj8mxhY"
                className="rounded-circle shadow-1-strong" width="150" height="150" />
            </div>
            <h5 className="mb-3">Maria Smantha</h5>
            <h6 className="text-primary mb-3">Web Developer</h6>
            <p className="px-xl-3">
              <i className="fas fa-quote-left pe-2"></i>Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Quod eos id officiis hic tenetur quae quaerat ad velit ab hic
              tenetur.
            </p>
            <ul className="list-unstyled d-flex justify-content-center mb-0">
              <li>
                <i className="fas fa-star fa-sm text-warning"></i>
              </li>
              <li>
                <i className="fas fa-star fa-sm text-warning"></i>
              </li>
              <li>
                <i className="fas fa-star fa-sm text-warning"></i>
              </li>
              <li>
                <i className="fas fa-star fa-sm text-warning"></i>
              </li>
              <li>
                <i className="fas fa-star-half-alt fa-sm text-warning"></i>
              </li>
            </ul>
          </div>
          <div className="col-md-4 mb-5 mb-md-0">
            <div className="d-flex justify-content-center mb-4">
              <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d8613b9a-b860-4344-8702-238372e9f5be/de61h0w-1793170a-0166-4c07-91d0-22d4cc6192b6.png/v1/fit/w_828,h_828,q_70,strp/gabriel_garcia_marquez_by_fbonett_de61h0w-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2Q4NjEzYjlhLWI4NjAtNDM0NC04NzAyLTIzODM3MmU5ZjViZVwvZGU2MWgwdy0xNzkzMTcwYS0wMTY2LTRjMDctOTFkMC0yMmQ0Y2M2MTkyYjYucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.rM_ay4l1u3NyfGUSGqJBJZDyLcBLR5dkhqz0oj8mxhY"
                className="rounded-circle shadow-1-strong" width="150" height="150" />
            </div>
            <h5 className="mb-3">Lisa Cudrow</h5>
            <h6 className="text-primary mb-3">Graphic Designer</h6>
            <p className="px-xl-3">
              <i className="fas fa-quote-left pe-2"></i>Ut enim ad minima veniam, quis nostrum
              exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid commodi.
            </p>
            <ul className="list-unstyled d-flex justify-content-center mb-0">
              <li>
                <i className="fas fa-star fa-sm text-warning"></i>
              </li>
              <li>
                <i className="fas fa-star fa-sm text-warning"></i>
              </li>
              <li>
                <i className="fas fa-star fa-sm text-warning"></i>
              </li>
              <li>
                <i className="fas fa-star fa-sm text-warning"></i>
              </li>
              <li>
                <i className="fas fa-star fa-sm text-warning"></i>
              </li>
            </ul>
          </div>
          <div className="col-md-4 mb-0">
            <div className="d-flex justify-content-center mb-4">
              <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d8613b9a-b860-4344-8702-238372e9f5be/de61h0w-1793170a-0166-4c07-91d0-22d4cc6192b6.png/v1/fit/w_828,h_828,q_70,strp/gabriel_garcia_marquez_by_fbonett_de61h0w-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2Q4NjEzYjlhLWI4NjAtNDM0NC04NzAyLTIzODM3MmU5ZjViZVwvZGU2MWgwdy0xNzkzMTcwYS0wMTY2LTRjMDctOTFkMC0yMmQ0Y2M2MTkyYjYucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.rM_ay4l1u3NyfGUSGqJBJZDyLcBLR5dkhqz0oj8mxhY"
                className="rounded-circle shadow-1-strong" width="150" height="150" />
            </div>
            <h5 className="mb-3">John Smith</h5>
            <h6 className="text-primary mb-3">Marketing Specialist</h6>
            <p className="px-xl-3">
              <i className="fas fa-quote-left pe-2"></i>At vero eos et accusamus et iusto odio
              dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.
            </p>
            <ul className="list-unstyled d-flex justify-content-center mb-0">
              <li>
                <i className="fas fa-star fa-sm text-warning"></i>
              </li>
              <li>
                <i className="fas fa-star fa-sm text-warning"></i>
              </li>
              <li>
                <i className="fas fa-star fa-sm text-warning"></i>
              </li>
              <li>
                <i className="fas fa-star fa-sm text-warning"></i>
              </li>
              <li>
                <i className="far fa-star fa-sm text-warning"></i>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}