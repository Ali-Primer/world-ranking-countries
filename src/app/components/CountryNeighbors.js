import './CountryNeighbors.css'

export const CountryNeighbors = ({name, flag}) => {
    return(
        <>
            <div className="country">
                <div className="country_box">
                    <div className="box_flag">
                        <img src={flag.svg} alt={flag.alt}/>
                    </div>
                    <div className="box_name">
                        {name}
                    </div>
                </div>
            </div>
        </>
    )
}