import { useSelector } from 'react-redux'

export const SideBar = ({ id, handleFilters }) => {
    //Obtenemos las categorias.
    const { avaliableCategories } = useSelector((state) => state.services)

    return (
        <aside
            className="offcanvas offcanvas-start"
            tabIndex="-1"
            id={id}
            aria-labelledby={id + 'Label'}
            data-bs-scroll="true"
            data-bs-backdrop="false"
        >
            <div className="offcanvas-header">
                <h5 className="offcanvas-title text-center" id={id + 'Label'}>
                    Categorias disponibles
                </h5>
                <button
                    type="button"
                    className="btn border-secondary text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                >
                    <i className="fa fa-arrow-left" aria-hidden="true"></i>
                </button>
            </div>

            <div className="offcanvas-body">
                {avaliableCategories === [] ? (
                    <div className="alert alert-info">
                        Se están cargando las categorias
                    </div>
                ) : (
                    <ul className="list-group list-group-flush">
                        {avaliableCategories &&
                            avaliableCategories.map((c, idx) => {
                                return (
                                    <li key={c} className="list-group-item">
                                        <input
                                            className="form-check-input me-1 ms-1"
                                            type="checkbox"
                                            name={idx}
                                            onChange={handleFilters}
                                        />
                                        {c}
                                    </li>
                                )
                            })}
                    </ul>
                )}
            </div>
        </aside>
    )
}
