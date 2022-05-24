import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { SideBar } from './SideBar'
import { getAvaliableCategories } from '../../actions/services'
import { useForm } from '../../hooks/useForm'
import { getRandomServices, searchQuery } from '../../actions/browser'
import { ServicesList } from './ServicesList'

import './searchBox.css'
import '../../style.css'

export const SearchScreen = () => {
    //Objeto del buscador para saver la lista de servicios servidos.
    const { servicesList } = useSelector((state) => state.browser)
    //Lanzador de acciones.
    const dispatch = useDispatch()

    //Cargamos la lista de categorias disponibles para realizar el filtro deseado en la búsqueda.
    //Cargamos una lista de servicios basándonos en un sistema random.
    useEffect(() => {
        //Cada vez que se visite la página se obtienen por si ha surgido alguna categoría.
        dispatch(getAvaliableCategories())
        //Obtenemos un listado de servicios si no se ha visitado nunca la página.
        if (servicesList.length === 0)
            dispatch(getRandomServices({ amount: 2, initial: true }))
    }, [dispatch])

    //Obtenemos las categorias disponibles.
    const { avaliableCategories } = useSelector((state) => state.services)

    // filtros.
    const [filters, setFilters] = useState({
        population: '',
        categories: [], //Nombre categoria, seleccionada
    })

    // para manejar la input del buscador.
    const [formValues, handleInputChange] = useForm({ query: '' })
    const { query } = formValues

    //Cargamos los filtros en la variable de estado para saber cuales han sido seleccionados.
    useEffect(() => {
        setFilters({
            population: filters.population,
            categories: [
                ...avaliableCategories.map((category) => ({
                    category,
                    selected: false,
                })),
            ],
        })
    }, [avaliableCategories])

    //Método de comunicación entre componente padre e hijo para establecer las categorías.
    const handleSelectCategory = (e) => {
        //Encontrar la categoría en el caso de ser tipo checkbox
        let population = filters.population
        let categoryList = filters.categories

        if (e.target.name === 'population') population = e.target.value

        if (e.target.type === 'checkbox') {
            categoryList = filters.categories
            categoryList[e.target.name].selected = e.target.checked
        }

        setFilters({
            population,
            categories: [...categoryList],
        })
    }

    //Método encargado de realizar la búsqueda.
    const handleSearch = () => {
        let categories = ''
        filters.categories.forEach((element) => {
            if (element.selected && categories === '')
                categories = element.category
            else if (element.selected)
                categories = categories + ';' + element.category
        })

        dispatch(
            searchQuery(
                categories,
                filters.population.toLocaleLowerCase(),
                query.toLocaleLowerCase()
            )
        )
    }

    //Método para obtener más servicios.
    const handleServices = () => {
        //Obtenemos más servicios.
        let servicesServed = ''
        servicesList.forEach((element) => {
            if (servicesServed === '') servicesServed = element.uid
            else servicesServed = servicesServed + ';' + element.uid
        })
        dispatch(getRandomServices({ amount: 2, servicesServed }))
    }

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
                            name="query"
                            value={query}
                            autoComplete="off"
                            onChange={handleInputChange}
                        />
                        <button className="icon" onClick={handleSearch}>
                            <i className="fa fa-search"></i>
                        </button>
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
                {/* Lista de servicios obtenidos por la consulta*/}
                <ServicesList />

                <button className="btn mt-3 see-more" onClick={handleServices}>
                    <i
                        className="fa fa-chevron-circle-down"
                        aria-hidden="true"
                    ></i>{' '}
                    Ver más
                </button>
            </div>
        </main>
    )
}
