import { format } from 'date-fns'
import { Link } from 'react-router-dom'

import '../../style.css'
import { AsignatedValoration } from './AsignatedValoration'
import { ModalCancelDateUser } from './ModalCancelDateUser'
import { ModalEditDateUser } from './ModalEditDateUser'
import { Valoration } from './Valoration'

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

    const appointmentDate = new Date(date).setHours(
        Number(initHour.slice(0, 2)),
        Number(initHour.slice(3, 5))
    )

    const currenthy = new Date()

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
                {/* 
                    Comprobamos si al fecha actual es menor o igual a la cual se va a mostrar

                    Si es igual o menor, no se muestran los botonoes que habilitan la edición y cancelación 
                    de una cta.
                */}
                <div className="d-flex justify-content-end ">
                    {currenthy < appointmentDate && (
                        <>
                            <button
                                className="btn"
                                style={styleBtn}
                                data-bs-toggle="modal"
                                data-bs-target={'#EditDateUser' + uidDate}
                            >
                                <i
                                    className="fa fa-pencil-square-o"
                                    aria-hidden="true"
                                ></i>
                            </button>
                            <ModalEditDateUser
                                idModal={'EditDateUser' + uidDate}
                                appointment={appointment}
                            />
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
                            <ModalCancelDateUser
                                idModal={'CancelDateUser' + uidDate}
                                appointment={appointment}
                            />
                        </>
                    )}
                </div>
            </div>
            {!appointment.valoration && currenthy > appointmentDate && (
                <Valoration uidDate={uidDate} />
            )}

            {appointment.valoration && (
                <AsignatedValoration points={appointment.valoration} />
            )}

            {currenthy < appointmentDate && (
                <p className="alert alert-info">
                    No puede valorarla, no ha tenido la cita aún.
                </p>
            )}
        </>
    )
}
