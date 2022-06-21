import { format } from 'date-fns'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getAsignedDates, getPDF } from '../../actions/dates'
import { swallError } from '../../helpers/SwalNotifications'

export const ModalPDF = ({ idService, idModal }) => {
    //Día del que obtener las citas.
    const [inputDate, setInputDate] = useState('')
    const [dateInit, setDateInit] = useState(format(new Date(), 'yyyy-MM-dd'))
    const [dateEnd, setDateEnd] = useState(format(new Date(), 'yyyy-MM-dd'))
    const [dateList, setDateList] = useState([])

    //Para saber si hemos realizado la petición.
    const [request, setRequest] = useState(false)

    //Comprobar si hay algún error por no cerrar el modal.
    const [valid, setValid] = useState(true)

    //Lanzador de acciones
    const dispatch = useDispatch()

    //Comprobación de la cita.
    const isValid = () => {
        if (dateInit.trim().length === 0) {
            swallError('No se ha introducido una fecha')
            setValid(!valid)
            return false
        } else if (dateEnd.trim().length === 0) {
            swallError('No se ha introducido una fecha de finalización')
            setValid(!valid)
            return false
        }
        return true
    }

    //DateList.
    const handleSetList = (list) => {
        setDateList([
            ...list.map((date) => ({
                initHour: date.initHour,
                endHour: date.endHour,
                userName: date.idUser.userName,
                uid: date.uid,
            })),
        ])
    }

    //Envío de la información al servidor.
    const handleSubmit = (e) => {
        e.preventDefault()
        if (isValid()) {
            dispatch(getPDF(idService, dateInit, dateEnd))
        }
    }

    //submit listado de citas.
    const handleSubmitList = (e) => {
        e.preventDefault()
        if (inputDate.trim().length !== 0) {
            dispatch(getAsignedDates(inputDate, idService, handleSetList))
            setRequest(true)
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
                            Consulta de citas asignadas.
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>

                    <div className="modal-body">
                        {/* Formulario para mostrar las citas asignadas, por si no quiere solicitarlo mediante PDF*/}
                        <form
                            className="form-group"
                            onSubmit={handleSubmitList}
                        >
                            <label
                                className="form-control text-center mt-3 "
                                style={{ color: '#6c757d' }}
                            >
                                Día
                                <input
                                    type="date"
                                    name="inputDate"
                                    onChange={(e) =>
                                        setInputDate(
                                            format(
                                                new Date(e.target.value),
                                                'yyyy-MM-dd'
                                            )
                                        )
                                    }
                                    value={inputDate}
                                    className="w-50 ms-3 border border-secondary"
                                />
                            </label>
                            <button
                                style={{ boxShadow: 'none' }}
                                type="submit"
                                className="btn btn-outline-primary mt-3"
                            >
                                Obtener citas
                            </button>
                        </form>
                        {/* Lista de citas */}
                        {dateList.length === 0 && request ? (
                            <div className="alert alert-info mt-3">
                                No hay citas asignadas para dicho día.
                            </div>
                        ) : (
                            <div className="container mt-3">
                                {dateList.map((date, idx) => {
                                    return (
                                        <div key={'itemDate' + idx}>
                                            <p className="text-center">
                                                Usuario: {date.userName}
                                            </p>
                                            <p className="text-center border-bottom">
                                                {date.initHour} - {date.endHour}
                                            </p>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                        {/* Formulario para mostrar las citas asignadas mediante PDF*/}
                        <h5 className="mt-2">Generar PDF</h5>
                        <div className="alert alert-info mt-3">
                            El primer campo se corresponde con el día de inicio
                            a partir del cual queremos obtener las citas que han
                            sido seleccionadas por los clientes.
                            <br />
                            <br />
                            El segundo campo se corresponde con el día de fin.
                            <br />
                            <br />
                            <strong>
                                Como resultado se le mandará un PDF a su email
                                vinculado.
                            </strong>
                        </div>
                        <form className="form-group" onSubmit={handleSubmit}>
                            <label
                                className="form-control text-center mt-3 "
                                style={{ color: '#6c757d' }}
                            >
                                Inicio
                                <input
                                    type="date"
                                    name="dateDay"
                                    onChange={(e) =>
                                        setDateInit(
                                            format(
                                                new Date(e.target.value),
                                                'yyyy-MM-dd'
                                            )
                                        )
                                    }
                                    value={dateInit}
                                    className="w-50 ms-3 border border-secondary"
                                />
                            </label>

                            <label
                                className="form-control text-center mt-3 "
                                style={{ color: '#6c757d' }}
                            >
                                Fín
                                <input
                                    type="date"
                                    name="dateEnd"
                                    onChange={(e) =>
                                        setDateEnd(
                                            format(
                                                new Date(e.target.value),
                                                'yyyy-MM-dd'
                                            )
                                        )
                                    }
                                    value={dateEnd}
                                    className="w-50 ms-3 border border-secondary"
                                />
                            </label>

                            <button
                                type="submit"
                                className="btn btn-outline-primary mt-3"
                                data-bs-dismiss={valid ? 'modal' : ''}
                            >
                                Obtener PDF
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
