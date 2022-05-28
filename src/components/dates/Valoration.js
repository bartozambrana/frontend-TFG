import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { sendValoration } from '../../actions/dates'

import '../../style.css'
export const Valoration = ({ uidDate }) => {
    const dispatch = useDispatch()
    //Envío de la petición.
    const handleSendValoration = () => {
        let valoration = 1
        stars.map((val, idx) => {
            if (val) valoration = idx + 1
        })
        dispatch(sendValoration(valoration, uidDate))
    }
    //Estado para manejar la valoración
    const [stars, setStars] = useState([true, false, false, false, false])

    return (
        <div className="rating mt-2 ms-3 d-flex justify-content-end">
            <p style={{ fontSize: '16px' }} className="me-2">
                Envía tu valoración:
            </p>
            <i
                className={'fa fa-star-o' + (stars[0] ? ' clickedstar' : '')}
                aria-hidden="true"
                onClick={() =>
                    setStars([!stars[0], false, false, false, false])
                }
            ></i>
            <i
                className={'fa fa-star-o' + (stars[1] ? ' clickedstar' : '')}
                aria-hidden="true"
                onClick={() => setStars([true, !stars[1], false, false, false])}
            ></i>
            <i
                className={'fa fa-star-o' + (stars[2] ? ' clickedstar' : '')}
                aria-hidden="true"
                onClick={() => setStars([true, true, !stars[2], false, false])}
            ></i>
            <i
                className={'fa fa-star-o' + (stars[3] ? ' clickedstar' : '')}
                aria-hidden="true"
                onClick={() => setStars([true, true, true, !stars[3], false])}
            ></i>
            <i
                className={'fa fa-star-o' + (stars[4] ? ' clickedstar' : '')}
                aria-hidden="true"
                onClick={() => setStars([true, true, true, true, !stars[4]])}
            ></i>
            <button
                className="btn btn-primary ms-2"
                onClick={handleSendValoration}
            >
                <i className="fa fa-paper-plane-o" aria-hidden="true">
                    {' '}
                    Enviar
                </i>
            </button>
        </div>
    )
}
