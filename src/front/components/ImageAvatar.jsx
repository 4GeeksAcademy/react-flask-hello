import React from "react"
import useGlobalReducer from "../hooks/useGlobalReducer";

const ImageAvatar = () => {
    const { store, dispatch } = useGlobalReducer()

    return (
        <div className="avatar-circle-min">
            {store?.user?.profile?.avatar && <img src={store?.user?.profile?.avatar} alt="Avatar" />}
        </div>


    )


}

export default ImageAvatar




