// se mostrará para los tipos de usuario clientes de un determinado servicio.

import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getDatesDay, putSelectDate } from '../../actions/dates'
import { swallError } from '../../helpers/SwalNotifications'

import { useForm } from '../../hooks/useForm'

export const ModalSelectDate = ({ idModal, uidService }) => {
    // Lanzador de acciones.
    const dispatch = useDispatch()

    //Variable de estado para la selección del día.
    const [dateDay, setDateDay] = useState('')

    //Variable de estado de las citas disponibles para un determinado día.
    const [appointmentList, setAppointmentList] = useState([])

    //Variable de estado para la gestión de la cita seleccionada.
    const [formValues, handleInputChange, reset] = useForm({ uidDate: '' })
    const { uidDate } = formValues

    // Método ejecutado cuando el día de selecciona cambia.
    const handleDateDay = (e) => {
        setDateDay(format(new Date(e.target.value), 'yyyy-MM-dd')) //Establecemos la fecha.
    }

    //Función para añadir el lestado de citas para un determinado día.
    const setNewAppointmentList = (appointments) => {
        setAppointmentList([
            ...appointments.map((date) => ({
                initHour: date.initHour,
                endHour: date.endHour,
                uid: date.uid,
            })),
        ])
    }

    //Cuando se selecciona un día establecemos el listado de citas registradas para dicho día.
    useEffect(() => {
        if (dateDay !== '')
            dispatch(getDatesDay(dateDay, uidService, setNewAppointmentList))
    }, [dateDay])

    //Método de validación de formulario.
    const isFormValid = () => {
        if (dateDay.trim().length === 0) {
            swallError(
                'No se ha seleccionado el día para el que se quiere la cita.'
            )
            return false
        } else if (uidDate === '' || uidDate === 'Selecciona una cita') {
            swallError(
                'No se ha seleccionado el día para el que se quiere la cita.'
            )
            return false
        }
        return true
    }
    const handleReset = () => {
        reset()
        setAppointmentList([])
        setDateDay('')
    }
    //Método cuando se pulsa sobre el botón de selección de una cita.
    const handleSubmit = (e) => {
        e.preventDefault() //Para que no se recargue la página.
        if (isFormValid()) {
            //Si el fromulario es válido lanzamos la acción de guardarlo en el servidor. Así como en local.
            dispatch(putSelectDate(uidDate))
            //Reiniciamos los campos del formulario.
            handleReset()
        }
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
                            Selección de una cita.
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={handleReset}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form className="form-group" onSubmit={handleSubmit}>
                            <label
                                className="form-control text-center mt-3 "
                                style={{ color: '#6c757d' }}
                            >
                                Día de la cita:{' '}
                                <input
                                    type="date"
                                    name="dateDay"
                                    min={format(new Date(), 'yyyy-MM-dd')}
                                    onChange={handleDateDay}
                                    value={dateDay}
                                    className="w-50 ms-3 border border-secondary"
                                />
                            </label>

                            {appointmentList.length !== 0 && (
                                <select
                                    className="form-select mt-3 text-center"
                                    name="uidDate"
                                    value={uidDate}
                                    onChange={handleInputChange}
                                >
                                    <option
                                        key={'defaultDateSelection'}
                                        value="Selecciona una cita"
                                    >
                                        Selecciona una cita
                                    </option>
                                    {appointmentList.map((date) => (
                                        <option
                                            style={{ color: '#6c757d' }}
                                            key={date.uid}
                                            value={date.uid}
                                        >
                                            {date.initHour} - {date.endHour}
                                        </option>
                                    ))}
                                </select>
                            )}

                            <button
                                type="submit"
                                className="btn btn-outline-primary mt-3"
                                data-bs-dismiss="modal"
                            >
                                Selecciona Cita
                            </button>
                        </form>
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                            onClick={handleReset}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
