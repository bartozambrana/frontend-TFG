import { useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import { useDispatch, useSelector } from 'react-redux'

import { getUserAppointments } from '../../actions/dates'
import { DateItem } from './DateItem'

import '../../style.css'
// Componente para albergar todos los elementos de la pantalla de <Tus Citas>
export const DatesScreen = () => {
    // Lanzador de acciones.
    const dispatch = useDispatch()

    // Obtenemos las citas almacenadas.
    const { userAppointments, loaded } = useSelector(
        (state) => state.appointments
    )

    // Efecto de entrar en la pantalla - ya que como se enceuntra sin dependencias, será ejecutado una única vez.
    // que será cuando entre por premera vez a la pantalla.
    useEffect(() => {
        //Cargamos las citas del usuario si no han sido cargadas previamente
        if (userAppointments.length === 0 || !loaded) {
            dispatch(getUserAppointments())
        }
    }, [])
    return (
        <main>
            <div className="container-front-image">
                {!isMobile ? (
                    <img
                        src="/assets/landscape-cutted.png"
                        alt="landscape"
                        className="w-100"
                    />
                ) : (
                    <img
                        src="/assets/landscape.jpg"
                        alt="landscape"
                        className="w-100"
                    />
                )}
                <h1 className="caption" style={{ color: 'white' }}>
                    Tus citas
                </h1>
            </div>

            <div className="container mt-5">
                <ul className="list-group list-group-flush">
                    {/* Mostramos el listado de citas que posee el usuario */}
                    {userAppointments.length !== 0 ? (
                        userAppointments.map((appointment, idx) => {
                            return (
                                <li key={idx} className="list-group-item">
                                    <DateItem appointment={appointment} />
                                </li>
                            )
                        })
                    ) : (
                        <h3 className="text-center">
                            Aún no dispone de ninguna cita.
                        </h3>
                    )}
                </ul>
            </div>
        </main>
    )
}
