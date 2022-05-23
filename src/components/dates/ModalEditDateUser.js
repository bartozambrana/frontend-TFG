// se mostrará para los tipos de usuario clientes de un determinado servicio.

import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getDatesDay, putModifyDate } from '../../actions/dates'
import { swallError } from '../../helpers/SwalNotifications'

import { useForm } from '../../hooks/useForm'

export const ModalEditDateUser = ({ idModal, appointment }) => {
    // Lanzador de acciones.
    const dispatch = useDispatch()

    //Variable de estado para la selección del día.
    const [dateDay, setDateDay] = useState('')

    //Variable de estado de las citas disponibles para un determinado día.
    const [appointmentList, setAppointmentList] = useState([])

    //Variable de estado para la gestión de la cita seleccionada.
    const [formValues, handleInputChange, reset] = useForm({ uidDate: '' })
    const { uidDate } = formValues

    //Desestructuración de la cita antigua.
    const {
        initHour: oldInit,
        endHour: oldEnd,
        idService: service,
        date,
    } = appointment

    // Método ejecutado cuando el día de selecciona cambia.
    const handleDateDay = (e) => {
        e.preventDefault()
        setDateDay(format(new Date(e.target.value), 'yyyy-MM-dd')) //Establecemos la fecha.
    }

    // Limpieza de los valores.
    const handleReset = () => {
        setDateDay('')
        setAppointmentList([]), reset()
    }
    //Función para añadir el lestado de citas para un determinado día.
    const setNewAppointmentList = (appointments) => {
        setAppointmentList([
            ...appointments.map((date) => ({
                date: date.date,
                initHour: date.initHour,
                endHour: date.endHour,
                uid: date.uid,
            })),
        ])
    }

    //Cuando se selecciona un día establecemos el listado de citas registradas para dicho día.
    useEffect(() => {
        if (dateDay !== '')
            dispatch(getDatesDay(dateDay, service._id, setNewAppointmentList))
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

    //Método cuando se pulsa sobre el botón de selección de una cita.
    const handleSubmit = (e) => {
        e.preventDefault() //Para que no se recargue la página.
        if (isFormValid()) {
            //Si el fromulario es válido lanzamos la acción de guardarlo en el servidor.
            dispatch(putModifyDate(uidDate, appointment.uid))
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
                            Modifificación de una cita.
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
                        <div className="alert alert-info">
                            <p>Está seguro de cambiar la siguiente cita:</p>
                            <hr />
                            <p>
                                Servicio: <strong>{service.serviceName}</strong>{' '}
                                <br />
                                Fecha:{' '}
                                <strong>
                                    {format(new Date(date), 'dd-MM-yyyy')}
                                </strong>
                                <br />
                                Hora: <strong>{oldInit}</strong>-
                                <strong>{oldEnd}</strong>
                            </p>
                        </div>
                        <form className="form-group" onSubmit={handleSubmit}>
                            <label
                                className="form-control text-center mt-3 "
                                style={{ color: '#6c757d' }}
                            >
                                Día de la nueva cita:{' '}
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
                                        key={'defaultEditDateSelection'}
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

                            {uidDate !== '' &&
                                uidDate !== 'Selecciona una cita' && (
                                    <div className="alert alert-info mt-3">
                                        {appointmentList.map((date) => {
                                            if (date.uid === uidDate)
                                                return (
                                                    <>
                                                        <p
                                                            key={
                                                                'paragraph' +
                                                                date.uid
                                                            }
                                                        >
                                                            Va a cambiar la cita
                                                            por una cita para el
                                                            día{' '}
                                                            <strong>
                                                                {format(
                                                                    new Date(
                                                                        date.date
                                                                    ),
                                                                    'dd-MM-yyyy'
                                                                )}
                                                            </strong>{' '}
                                                            de {date.initHour} a{' '}
                                                            {date.endHour}
                                                        </p>
                                                        <hr
                                                            key={
                                                                'paragraph' +
                                                                date.uid +
                                                                '2'
                                                            }
                                                        />
                                                        <p
                                                            key={
                                                                'paragraph' +
                                                                date.uid +
                                                                '3'
                                                            }
                                                        >
                                                            <strong>
                                                                ¿Está seguro?
                                                            </strong>
                                                        </p>
                                                    </>
                                                )
                                        })}
                                    </div>
                                )}

                            <button
                                type="submit"
                                className="btn btn-outline-success mt-3"
                                data-bs-dismiss="modal"
                            >
                                Confirmar
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
