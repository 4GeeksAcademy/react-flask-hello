const ClosingSection = () => {

    return (
        <div className="closing-section back-color-4 rounded-5">
            <div className="d-flex flex-column align-items-center p-4 h-100">
                <div className="closing-img">
                    <img className="object-fit-cover h-100" src="https://res.cloudinary.com/dra2cr3uw/image/upload/v1760182053/Elio_ejemplo_zqfn5o.png"></img>
                </div>
                <div className="closing-text back-color-3 rounded-5 flex-grow-1 w-100 text-center">
                    <div className="d-flex flex-column justify-content-center align-items-center h-100 px-5">

                        <p className="fs-4">Elio's not just searching for Tartara. He's discovering himself along the way.
                            Every mission completed brings him closer to home</p>
                        <button type="button" className="btn button-2-color-2 font-color-1 fw-semibold">
                            KEEP HELPING ELIO
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )


}

export default ClosingSection