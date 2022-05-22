import { compareAsc, format } from 'date-fns'
import { Link } from 'react-router-dom'

import '../../style.css'
import { ModalCancelDateUser } from './ModalCancelDateUser'
const styleBtn = {
    backgroundColor: 'transparent',
    boxShadow: 'none',
}
export const DateItem = ({ appointment }) => {
    //Desescrucción de la cita.
    const {
        uid: uidDate,
        initHour,
        endHour,
        idService: service,
        date,
    } = appointment

    const handleEditDate = () => {
        console.log('Edit Date: ', uidDate)
    }

    return (
        <>
            <div className="d-flex justify-content-between">
                <div className="mt-3">
                    <div
                        className="d-flex justify-content-inline-block"
                        style={{ fontSize: '1.1rem' }}
                    >
                        <Link
                            to={'/service/' + service._id}
                            className="link-no-decoration-black"
                        >
                            <p className="me-4">
                                <i
                                    className="fa fa-briefcase"
                                    aria-hidden="true"
                                ></i>{' '}
                                {service.serviceName}
                            </p>
                        </Link>
                        <p className="me-4">
                            {' '}
                            {format(new Date(date), 'dd-MM-yyyy')}{' '}
                        </p>
                        <p>
                            {initHour} - {endHour}
                        </p>
                    </div>
                </div>
                {compareAsc(new Date(date), new Date()) === 1 && (
                    <div className="d-flex justify-content-end ">
                        <button
                            className="btn"
                            style={styleBtn}
                            onClick={handleEditDate}
                        >
                            <i
                                className="fa fa-pencil-square-o"
                                aria-hidden="true"
                            ></i>
                        </button>
                        <button
                            className="btn "
                            style={styleBtn}
                            data-bs-toggle="modal"
                            data-bs-target={'#CancelDateUser' + uidDate}
                        >
                            <i
                                className="fa fa-trash ms-3"
                                aria-hidden="true"
                            ></i>
                        </button>
                    </div>
                )}
            </div>
            <ModalCancelDateUser
                idModal={'CancelDateUser' + uidDate}
                appointment={appointment}
            />
        </>
    )
}
