import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { useForm } from '../../hooks/useForm'
import { format } from 'date-fns'
import Swal from 'sweetalert2'

import '../../style.css'
import { postNewDate } from '../../actions/dates'

export const ModalNewDates = ({ uidService, idModal }) => {
    const [dateDay, setDateDay] = useState(format(new Date(), 'yyyy-MM-dd'))
    let initialDate = new Date()
    const [formValues, handleInputChange] = useForm({
        initHour: format(initialDate, 'HH:mm'),
        endHour: format(
            initialDate.setTime(initialDate.getTime() + 30 * 60000),
            'HH:mm'
        ),
    })

    const { initHour, endHour } = formValues

    //Lanzador de acciones.
    const dispatch = useDispatch()

    const isFormValid = () => {
        if (dateDay.trim().length === 0) {
            Swal.fire({
                title: 'Error',
                text: 'No se ha establecido la fecha',
                timer: 2000,
                showConfirmButton: true,
                confirmButtonColor: '#414e52',
                icon: 'error',
            })
            return false
        } else if (initHour.trim().length === 0) {
            Swal.fire({
                title: 'Error',
                text: 'No se ha establecido la hora de inicio',
                timer: 2000,
                showConfirmButton: true,
                confirmButtonColor: '#414e52',
                icon: 'error',
            })
            return false
        } else if (endHour.trim().length === 0) {
            Swal.fire({
                title: 'Error',
                text: 'No se ha establecido la hora de fin',
                timer: 2000,
                showConfirmButton: true,
                confirmButtonColor: '#414e52',
                icon: 'error',
            })
            return false
        }
        return true
    }

    // Envío de la información.
    const handleSubmit = (e) => {
        e.preventDefault()
        if (isFormValid()) {
            dispatch(postNewDate(dateDay, initHour, endHour, uidService))
        }
    }

    const handleDayDateChange = (e) => {
        setDateDay(format(new Date(e.target.value), 'yyyy-MM-dd'))
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
                            Registro de una nueva cita.
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form className="form-group" onSubmit={handleSubmit}>
                            <label
                                className="form-control text-center mt-3 "
                                style={{ color: '#6c757d' }}
                            >
                                Día
                                <input
                                    type="date"
                                    name="dateDay"
                                    min={format(new Date(), 'yyyy-MM-dd')}
                                    onChange={handleDayDateChange}
                                    value={dateDay}
                                    className="w-50 ms-3 border border-secondary"
                                />
                            </label>

                            <label
                                className="form-control text-center mt-3 "
                                style={{ color: '#6c757d' }}
                            >
                                Hora de inicio
                                <input
                                    type="time"
                                    className="w-50 ms-3 border border-secondary"
                                    value={initHour}
                                    name="initHour"
                                    onChange={handleInputChange}
                                />
                            </label>

                            <label
                                className="form-control text-center mt-3 "
                                style={{ color: '#6c757d' }}
                            >
                                Hora de fin
                                <input
                                    type="time"
                                    className="w-50 ms-3 border border-secondary"
                                    value={endHour}
                                    name="endHour"
                                    onChange={handleInputChange}
                                />
                            </label>

                            <button
                                type="submit"
                                className="btn btn-outline-primary mt-3"
                                data-bs-dismiss="modal"
                            >
                                Registrar Cita
                            </button>
                        </form>
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
