import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getRating } from '../../actions/dates'

import '../../style.css'
const style = {
    dot: {
        height: '250px',
        width: '250px',
        borderRadius: '50%',
        border: '8px solid orange',
        color: 'orange',
    },
    points: {
        fontSize: '5rem',
    },
}
export const ShowRating = ({ idService }) => {
    const dispatch = useDispatch()

    const [rating, setRating] = useState(0)

    const handleRating = (num) => {
        setRating(num)
    }
    //Se realiza una única vez
    useEffect(() => {
        dispatch(getRating(idService, handleRating))
    }, [])
    return (
        <div className="mt-5">
            <h1 className="h1__home text-center">Valoración media</h1>
            <div className="d-flex justify-content-center shadow mt-2">
                <div style={style.dot} className="row align-items-center">
                    <p className="text-center" style={style.points}>
                        {rating}/5
                    </p>
                </div>
            </div>
        </div>
    )
}
