import { format } from 'date-fns'
import { useDispatch } from 'react-redux'
import { putCancelDate } from '../../actions/dates'

export const ModalCancelDateUser = ({ idModal, appointment }) => {
    const dispatch = useDispatch()
    const handleConfirm = () => {
        dispatch(putCancelDate(appointment.uid, true))
    }
    return (
        <div
            className="modal fade"
            id={idModal}
            role="dialog"
            tabIndex="-1"
            aria-labelledby={idModal}
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-center" id={idModal}>
                            Cancelación de cita.
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="alert alert-info">
                            <p>
                                Está seguro de eliminar la cita para el servicio{' '}
                                <strong>
                                    {appointment.idService.serviceName}
                                </strong>{' '}
                                del día{' '}
                                <strong>
                                    {format(
                                        new Date(appointment.date),
                                        'dd-MM-yyyy'
                                    )}
                                </strong>{' '}
                                de <strong>{appointment.initHour}</strong> hasta
                                las <strong>{appointment.endHour}</strong>
                            </p>
                            <hr />
                            <p>
                                <strong>¿Está seguro?</strong>
                            </p>
                        </div>
                        <button
                            className="btn btn-danger mt-3"
                            data-bs-dismiss="modal"
                            onClick={handleConfirm}
                        >
                            <i className="fa fa-ban" aria-hidden="true"></i>{' '}
                            Confirmar.
                        </button>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
