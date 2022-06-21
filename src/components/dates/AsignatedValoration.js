import '../../style.css'
export const AsignatedValoration = ({ points }) => {
    let stars = [true, true, true, true, true]

    stars = stars.map((s, index) => (index + 1 <= points ? true : false))

    return (
        <div
            className=" mt-2 ms-3 d-flex justify-content-end"
            style={{ fontSize: '25px' }}
        >
            <p style={{ fontSize: '16px' }} className="me-2">
                Valoración:
            </p>
            <i
                className={'fa fa-star-o' + (stars[0] ? ' clickedstar' : '')}
                aria-hidden="true"
            ></i>
            <i
                className={'fa fa-star-o' + (stars[1] ? ' clickedstar' : '')}
                aria-hidden="true"
            ></i>
            <i
                className={'fa fa-star-o' + (stars[2] ? ' clickedstar' : '')}
                aria-hidden="true"
            ></i>
            <i
                className={'fa fa-star-o' + (stars[3] ? ' clickedstar' : '')}
                aria-hidden="true"
            ></i>
            <i
                className={'fa fa-star-o' + (stars[4] ? ' clickedstar' : '')}
                aria-hidden="true"
            ></i>
        </div>
    )
}
