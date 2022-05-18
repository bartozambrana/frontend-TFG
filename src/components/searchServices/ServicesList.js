import { useSelector } from 'react-redux'
import { ServiceItem } from './ServiceItem'

export const ServicesList = () => {
    const { servicesList } = useSelector((state) => state.browser)

    return (
        <div className="row row-cols-1 row-cols-md-3 g-4">
            {servicesList.length !== 0 ? (
                servicesList.map((service, idx) => {
                    return <ServiceItem key={idx} service={service} />
                })
            ) : (
                <h3>No se han obtenido servicios para dicha búsqueda.</h3>
            )}
        </div>
    )
}
