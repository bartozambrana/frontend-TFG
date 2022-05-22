import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { format } from 'date-fns'
import { swallError } from '../../helpers/SwalNotifications'

import { getAsignedDates,putCancelDate } from '../../actions/dates'
import { useForm } from '../../hooks/useForm'


import '../../style.css'



export const ModalCancelDateOwner = ({ uidService, idModal }) => {
    //Fecha Variable de esado para manejar la fecha.
    const [dateDay, setDateDay] = useState('');
    //Variable de estado para cargar el array de citas obtenidas.
    const [dateList, setDateList] = useState([]);

    //Variable de estado para saber que cita ha sido seleccionada.
    const [formValues, handleInputChange, reset, setValues] = useForm({
        uidDate: '',
        userName:'',
        initHour:'',
        endHour:''
    });
    const { uidDate,userName, initHour, endHour } = formValues;

    //Lanzador de acciones.
    const dispatch = useDispatch();

    const isFormValid = () => {

        if (dateDay.trim().length === 0) {
            swallError('No se ha seleccionado una fecha.');
            return false
        }else if (uidDate === '' || uidDate === 'Selecciona una cita') {
            
            swallError('No se ha seleccionado la cita a anular.');
            return false;
        }
        return true
    }

    // Envío de la información.
    const handleSubmit = (e) => {
        e.preventDefault()
        if (isFormValid()) {
            dispatch(putCancelDate(uidDate));
            //En el caso de que todo vaya bien reseteamos el formulario.
            // De modo que el usuario pueda acceder y encontrarse el formulario
            // en el estado anterior en el caso de algún error en la validación de los campos.
            reset()
            setDateDay('')
            setDateList('')
        }
    }

    // Encargado de cambiar la cita introducida y establecer el formato correcto.
    const handleDayDateChange = (e) => {
        e.preventDefault()
        setDateDay(format(new Date(e.target.value), 'yyyy-MM-dd'))
    }

    //Función llamada cuando se obtienen la citas citas que han sido asignadas.
    const setNewDateList = (dates) => {
        setDateList([
            ...dates.map((date) => ({
                initHour: date.initHour,
                endHour: date.endHour,
                userName: date.idUser.userName,
                uid: date.uid,
            })),
        ])
    }

    //Obtenemos las citas trans introducir la fecha, ya que la variable dateDay ha sido modificada..
    useEffect(() => {
        if (dateDay) {
            // Obtener la citas que han sido asignadas a un cliente en un determinado día.
            dispatch(getAsignedDates(dateDay, uidService, setNewDateList))
        }
    }, [dateDay])

    //Efecto secundario de seleccionar una fecha.
    useEffect(() => {
        if (
            uidDate !== 'Selecciona una cita' && uidDate !== '' &&
            dateList.length !== 0
        ) {
            //Obtenemos la cita que es.
            const date = dateList.find((date) => {
                return date.uid === uidDate
            })

            setValues({
                uidDate,
                userName: date.userName,
                initHour: date.initHour,
                endHour: date.endHour
            })
        }
    }, [uidDate])
    return (
        <>
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
                                Cancelación de una cita a un cliente.
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => {
                                    reset()
                                    setDateDay('')
                                    setDateList('')
                                }}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form className="form-group" onSubmit={handleSubmit}>
                                <label
                                    className="form-control text-center mt-3 "
                                    style={{ color: '#6c757d' }}
                                >
                                    Día de la cita a cancelar:
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
                                        <select
                                            className="form-select mt-3 text-center"
                                            name="uidDate"
                                            value={uidDate}
                                            onChange={handleInputChange}
                                        >
                                            <option
                                                key={'defaultCancelDate' + uidService}
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
                                        {
                                            (uidDate !== 'Selecciona una cita' && uidDate !== '') &&
                                            <div className='alert alert-info mt-3'>
                                                    <p>Va a cancelarle una cita al usuario: <strong>{userName}</strong></p>
                                                    <hr/>
                                                    <ul>
                                                        <li>Hora: {initHour} - {endHour}</li>
                                                        <li>Fecha: {format(new Date(dateDay),'dd-MM-yyyy')}</li>
                                                    </ul>
                                                    <strong>¿Está seguro?</strong>
                                            </div>
                                        }
                                       

                                        <button
                                            className="btn btn-danger mt-3"
                                            type="submit"
                                            data-bs-dismiss="modal"
                                            
                                        >
                                            <i
                                                className="fa fa-ban"
                                                aria-hidden="true"
                                            ></i>
                                            {' '} Confirmar.
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
        </>
    )
}
