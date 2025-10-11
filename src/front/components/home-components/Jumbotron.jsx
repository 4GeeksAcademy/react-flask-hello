const Jumbotron = () => {
    return (
        <div className="jumbotron bg-light rounded-5 border border-5 border-black overflow-hidden" >


            <div className="row h-100">
                <div class="col-lg-6 d-none d-lg-block bg-danger h-100">
                    <img className="object-fit-cover" src="https://elbohemiodehojalata.wordpress.com/wp-content/uploads/2018/08/obito-uchiha-3.jpg" />

                </div>
                <div class="col-lg-6 col-12 bg-white ">
                    <div className="h-100 d-flex flex-column justify-content-center align-items-lg-start align-items-center p-2 p-lg-0 pe-lg-5 text-center text-lg-start">
                        <h1 className="display-3">Elio’s Journey to Tartara</h1>
                        <p className="fw-semibold mt-3">Elio has been lost at sea for years, searching for his home — the island of Tartara.
                            A marine once told him: “Complete 3,000 missions, and I’ll reveal the way.”
                            Now, every task you complete brings Elio closer to discovering where he truly belongs.</p>
                        <button type="button" className="btn button-color-2 font-color-3">Start a mission</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jumbotron