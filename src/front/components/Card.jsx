// export is to be able to use in other components 
export const Card = ({title,id,end}) => {
                    //the 3 variables used for making the tags dynamic 
    return (
        <div>
            <div class="w-75 card" >
                <img src={`https://cdn.watchmode.com/posters/0${id}_poster_w185.jpg`} class="card-img-top" alt="..."/>
                {/*can also add extra variable for the image source  */}
                        <div class="card-body">
                        <h5 class="card-title">{title}</h5>
                        <p class="card-text">{}</p>
                        <a href="#" class="btn btn-primary">{end}</a>
                    </div>
            </div>
        </div>
    )
}