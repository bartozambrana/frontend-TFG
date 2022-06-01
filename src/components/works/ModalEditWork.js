import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useForm } from '../../hooks/useForm'
import { putWork } from '../../actions/works'
import { swallError } from '../../helpers/SwalNotifications'

const styleCheck = {
    backgroundColor: 'rgb(114, 180, 108)',
    size: '5%',
    borderRadius: '50%',
}

export const ModalEditWork = ({ uidWork }) => {
    const dispatch = useDispatch()

    //Obtenemos el conjunto de trabajos
    const { worksLastService } = useSelector((state) => state.works)

    // Obtenemos el trabajo que va a ser modificado.
    let work = useRef(worksLastService.find((w) => w.uid === uidWork))

    // Identificador del modal.
    const idModal = 'EditWork' + uidWork

    let initialState = useRef(
        work.current.photos.map((photo) => {
            return { photo, selected: false }
        })
    )

    //Selector de imágenes de borrado.
    const [photosDeleted, setPhotosDeleted] = useState(initialState.current)

    //Establecemos los campos del formulario;
    const [formValues, handleInputChange] = useForm({
        fileUploads: [],
        description: work.current.description,
        photos: work.current.photos,
    })

    //Establecemos los campos del formulario
    const { fileUploads, description } = formValues

    const togglePhotoSelected = (idx) => {
        const photoList = photosDeleted
        photoList[idx].selected = !photoList[idx].selected
        setPhotosDeleted([...photoList])
    }

    useEffect(() => {
        work.current = worksLastService.find((w) => w.uid === uidWork)
        initialState.current = work.current.photos.map((photo) => {
            return { photo, selected: false }
        })
        setPhotosDeleted(initialState.current)
    }, [dispatch, worksLastService, uidWork])

    //Verificacion de los campos del formulario.
    const isFormValid = () => {
        let selectable = false
        photosDeleted.forEach((p) => {
            if (p.selected) selectable = true
        })

        if (
            description.trim().length === 0 &&
            fileUploads.length === 0 &&
            !selectable
        ) {
            swallError('No se puede actualizar un trabajo sin actualizaciones.')
            return false
        }
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let deletedFiles = ''
        photosDeleted.forEach((element) => {
            if (element.selected) {
                if (deletedFiles === '') deletedFiles = element.photo
                else deletedFiles = deletedFiles + ';' + element.photo
            }
        })

        if (isFormValid()) {
            dispatch(putWork(uidWork, deletedFiles, fileUploads, description))
            setPhotosDeleted(initialState.current)
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
                        <h5 className="modal-title" id={idModal}>
                            Modificación de trabajo.
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
                            <div className="container">
                                {photosDeleted.map((photoItem, index) => {
                                    return (
                                        <div
                                            className="mt-3"
                                            style={{ cursor: 'pointer' }}
                                            key={index}
                                            onClick={() =>
                                                togglePhotoSelected(index)
                                            }
                                        >
                                            {photoItem.selected && (
                                                <i
                                                    className="fa fa-check"
                                                    style={styleCheck}
                                                    aria-hidden="true"
                                                ></i>
                                            )}
                                            <img
                                                src={photoItem.photo}
                                                className={
                                                    photoItem.selected
                                                        ? 'w-100 border border-success'
                                                        : 'w-100'
                                                }
                                                alt={'picture ' + index}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                            <label
                                className="text-center mt-1 w-100"
                                style={{ color: '#6c757d' }}
                            >
                                Descripción del trabajo:
                                <textarea
                                    type="text"
                                    placeholder="Información del servicio"
                                    name="description"
                                    autoComplete="off"
                                    className="form-control w-100 mt-2"
                                    value={description}
                                    onChange={handleInputChange}
                                />
                            </label>

                            <label
                                className="text-center mt-1 w-100"
                                style={{ color: '#6c757d' }}
                            >
                                Añada fotografías si lo desea
                                <input
                                    className="form-control"
                                    type="file"
                                    name="fileUploads"
                                    placeholder=""
                                    files={fileUploads}
                                    onChange={handleInputChange}
                                    multiple
                                />
                            </label>

                            <button
                                type="submit"
                                className="btn btn-outline-primary mt-3"
                                data-bs-dismiss="modal"
                            >
                                Modificar trabajo servicio
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
