import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { useForm } from '../../hooks/useForm'
import { format } from 'date-fns'
import Swal from 'sweetalert2'

import '../../style.css'
import { getDatesDay } from '../../actions/dates'

export const ModalEditDate = ({ uidService, idModal }) => {
    //Fecha Variable de esado para manejar la fecha.
    const [dateDay, setDateDay] = useState('')
    //Variable de estado para cargar el array de citas obtenidas.
    const [dateList, setDateList] = useState([])

    // Campos de modificación de la cita.
    const [formValues, handleInputChange, reset, setValues] = useForm({
        initHour: '',
        endHour: '',
        uidDate: '',
    })

    const { initHour, endHour, uidDate } = formValues

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
        } else if (uidDate === 'Selecciona una cita' || uidDate === '') {
            Swal.fire({
                title: 'No ha seleccionado una cita',
                timer: 2000,
                showConfirmButton: true,
                confirmButtonColor: '#414e52',
                icon: 'error',
            })
        }
        return true
    }

    // Envío de la información.
    const handleSubmit = (e) => {
        e.preventDefault()
        if (isFormValid()) {
            //dispatch(postNewDate(dateDay, initHour, endHour, uidService))
        }
    }

    // Encargado de cambiar la cita introducida y establecer el formato correcto.
    const handleDayDateChange = (e) => {
        e.preventDefault()
        setDateDay(format(new Date(e.target.value), 'yyyy-MM-dd'))
    }

    const setNewDateList = (dates) => {
        setDateList([
            ...dates.map((date) => ({
                initHour: date.initHour,
                endHour: date.endHour,
                uid: date.uid,
            })),
        ])
    }

    //Obtenemos las citas trans introducir la fecha.
    useEffect(() => {
        if (dateDay) {
            console.log('Solicitar fechas de un día del servicio: ', uidService)
            dispatch(getDatesDay(dateDay, uidService, setNewDateList))
        }
    }, [dateDay])

    //Efecto secundario de seleccionar una fecha.
    useEffect(() => {
        if (
            (uidDate !== 'Selecciona una cita' || uidDate !== '') &&
            dateList.length !== 0
        ) {
            //Obtenemos la cita que es.
            const date = dateList.find((date) => {
                return date.uid === uidDate
            })

            setValues({
                uidDate,
                initHour: date.initHour.slice(0, -1),
                endHour: date.endHour.slice(0, -1),
            })
        }
    }, [uidDate])

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
                                Día de la cita a modificar
                                <input
                                    type="date"
                                    name="dateDay"
                                    min={format(new Date(), 'yyyy-MM-dd')}
                                    onChange={handleDayDateChange}
                                    value={dateDay}
                                    className="w-50 ms-3 border border-secondary"
                                />
                            </label>
                            {dateList.length !== 0 && (
                                <>
                                    <div className="alert alert-info mt-3">
                                        Los campos de establecimiento de nuevas
                                        horas, muestran las horas actuales,
                                        puediendo ser modificadas si lo desea
                                        tras seleccionar la cita a modificar.
                                    </div>
                                    <select
                                        className="form-select mt-3 text-center"
                                        name="uidDate"
                                        value={uidDate}
                                        onChange={handleInputChange}
                                    >
                                        <option
                                            key={'default' + uidService}
                                            value="Selecciona una cita"
                                        >
                                            Selecciona una cita
                                        </option>
                                        {dateList.map((date) => (
                                            <option
                                                style={{ color: '#6c757d' }}
                                                key={date.uid}
                                                value={date.uid}
                                            >
                                                {date.initHour} - {date.endHour}
                                            </option>
                                        ))}
                                    </select>
                                    <label
                                        className="form-control text-center mt-3 "
                                        style={{ color: '#6c757d' }}
                                    >
                                        Nueva hora de inicio.
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
                                        Nueva hora de finalización.
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
                                </>
                            )}
                        </form>
                    </div>

                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                            onClick={() => {
                                reset()
                                setDateDay('')
                                setDateList('')
                            }}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
