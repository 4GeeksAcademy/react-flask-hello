const Jumbotron = () => {
    return (
        <div className="jumbotron bg-light rounded-5 border border-5 border-black overflow-hidden" >


            <div className="row h-100">
                <div class="col-lg-6 d-none d-lg-block bg-danger h-100">
                        <img className="object-fit-cover" src="https://i.pinimg.com/736x/6f/e2/d3/6fe2d31038a92c02223c31d9dc0bdfca.jpg" />
                
                </div>
                <div class="col-lg-6 col-12 bg-white ">
                    <div className="h-100 d-flex flex-column justify-content-center align-items-lg-start align-items-center p-2 p-lg-0 pe-lg-5">
                        <h1 className="display-3">Welcome buccaneers</h1>
                        <p className="fw-semibold mt-3">Join Claude, a determined marine, on his journey to reach the legendary island of Tartara.
                            Every task you and your friends add becomes a mission that brings him closer to shore.
                            Write your goals. Share the challenge. Reach Tartara.</p>
                        <button type="button" className="btn btn-primary">Join the mission</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jumbotron