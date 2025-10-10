const Jumbotron = () => {
    return (
        <div className="jumbotron bg-light rounded-5 border border-5 border-black overflow-hidden" >


            <div className="row h-100">
                <div class="col-6 bg-danger h-100">
                        <img className="object-fit-cover" src="https://i.pinimg.com/736x/6f/e2/d3/6fe2d31038a92c02223c31d9dc0bdfca.jpg" />
                
                </div>
                <div class="col-6 bg-danger d-flex">
                    <div className="d-flex flex-column justify-content-center align-items-start pe-5">
                        <h1 className="display-3">Welcome buccaneers</h1>
                        <p>Join Claude, a determined marine, on his journey to reach the legendary island of Tartara.
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