import React from "react"
import useGlobalReducer from "../hooks/useGlobalReducer";

const ImageAvatar = () => {
    const { store, dispatch } = useGlobalReducer()
     

    
    return (
        <div className="avatar-circle-min">
            {store?.user?.avatarUrl && <img src={store?.user?.avatarUrl } alt="Avatar" />}
        </div>
    )


}

export default ImageAvatar




