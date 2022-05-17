import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { SideBar } from './SideBar'
import { getAvaliableCategories } from '../../actions/services'

import './searchBox.css'

export const SearchScreen = () => {
    //Lanzador de acciones.
    const dispatch = useDispatch()

    //Cargamos la lista de categorias disponibles para realizar el filtro deseado en la búsqueda.
    useEffect(() => {
        //Cada vez que se visite la página se obtienen por si ha surgido alguna categoría.
        dispatch(getAvaliableCategories())
    }, [dispatch])

    //Obtenemos las categorias disponibles.
    const { avaliableCategories } = useSelector((state) => state.services)

    const [filters, setFilters] = useState(
        [] //Nombre categoria, seleccionada
    )

    //Cargamos los filtros en la variable de estado para saber cuales han sido seleccionados.
    useEffect(() => {
        setFilters([
            ...avaliableCategories.map((category) => ({
                category,
                selected: false,
            })),
        ])
    }, [avaliableCategories])

    //Método de comunicación entre componente padre e hijo para establecer las categorías.
    const handleSelectCategory = (e) => {
        //Encontrar la categoría en el caso de ser tipo checkbox
        if (e.target.type === 'checkbox') {
            const categoryList = filters
            categoryList[e.target.name].selected = e.target.checked
            setFilters([...categoryList])
        }
    }

    //Obtenemos los servicios conforme vayan cambiando las categorias.

    return (
        <main>
            {/*Search Container*/}
            <div className="container">
                {/*SideBar toggle*/}
                <SideBar
                    id={'offcanvas-categories'}
                    handleFilters={handleSelectCategory}
                />
                <div className="mt-3 mb-1 row">
                    <div className="search-box col-12">
                        <input
                            type="text"
                            id="input-search"
                            placeholder="Buscar ..."
                        />
                        <a href="##" className="icon">
                            <i className="fa fa-search"></i>
                        </a>
                    </div>
                    <div className="col-12 mb-4">
                        <button
                            className="btn filters"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvas-categories"
                            aria-controls="offcanvas-categories"
                        >
                            Categorías{' '}
                            <i
                                className="fa fa-arrow-right"
                                aria-hidden="true"
                            ></i>
                        </button>
                    </div>
                </div>
            </div>
            {/*List of services*/}
            <div className="container-fluid text-center">
                <h1>Filtros seleccionados - prueba</h1>
                {filters.map((f, idx) => (
                    <p key={idx}>
                        {f.category} - {f.selected ? 'true' : 'false'}
                    </p>
                ))}
            </div>
        </main>
    )
}
