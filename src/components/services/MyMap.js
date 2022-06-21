import { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { useParams } from 'react-router-dom'

export const MyMap = ({ address }) => {
    const { idService } = useParams()
    const [position, setPosition] = useState([
        40.42042338472101, -3.704257600806946,
    ])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const geocoder = async () => {
            const response = await fetch(
                'https://nominatim.openstreetmap.org/search?' +
                    'q=' +
                    address +
                    '&format=json',

                {
                    method: 'GET',
                }
            )

            const body = await response.json()
            if (body.length > 0) {
                setPosition([parseFloat(body[0].lat), parseFloat(body[0].lon)])

                setLoading(true)
            }
        }

        geocoder()
    }, [idService])
    return (
        <>
            {!loading ? (
                <div className="d-flex justify-content-center">
                    <div className="spinner row align-items-center mb-4"></div>
                </div>
            ) : (
                <MapContainer
                    center={position}
                    zoom={19}
                    scrollWheelZoom={false}
                    style={{ height: '100%' }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </MapContainer>
            )}
        </>
    )
}
