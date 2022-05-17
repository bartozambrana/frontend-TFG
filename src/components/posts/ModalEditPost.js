import { useState } from 'react'

import { isMobile } from 'react-device-detect'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'

import { putPost } from '../../actions/posts'
import { useForm } from '../../hooks/useForm'

import '../../style.css'

export const ModalEditPost = ({ post, idModal }) => {
    const dispatch = useDispatch()

    //Variable de estado de previsualización
    const [preview, setPreview] = useState(false)

    // Variable de estado para la muestra el url de la imagen
    const [src, setSrc] = useState('')

    //Establecemos los campos del formulario;
    const [formValues, handleInputChange] = useForm({
        fileUpload: [],
        description: post.description,
        caption: post.caption,
    })

    let classVar = ''
    if (isMobile) classVar = 'modal-dialog modal-dialog-centered'
    else classVar = 'modal-dialog modal-dialog-centered modal-xl'

    //Establecemos los campos del formulario
    const { fileUpload, description, caption } = formValues

    //Verificacion de los campos del formulario.
    const isFormValid = () => {
        if (caption.trim().length === 0) {
            Swal.fire('Error', 'No ha introducido un título', 'error')
            return false
        } else if (description.trim().length === 0) {
            Swal.fire('Error', 'Descripción del trabajo no añadida', 'error')
            return false
        }

        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isFormValid()) {
            dispatch(putPost(fileUpload, caption, description, post.uid))
        }
    }

    const handlePreview = (e) => {
        e.preventDefault()

        setPreview(!preview)

        if (fileUpload.length > 0) {
            const file = fileUpload[0]

            const reader = new FileReader()
            //Cargamos el archivo para generar la url temporal
            reader.readAsDataURL(file)

            reader.onload = () => {
                setSrc(reader.result)
            }
        } else {
            setSrc(post.photo)
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
            <div className={classVar}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id={idModal}>
                            Formulario de modificación.
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
                                className="text-center mt-1 w-100"
                                style={{ color: '#6c757d' }}
                            >
                                Título:
                                <input
                                    type="text"
                                    autoComplete="off"
                                    name="caption"
                                    placeholder="Título"
                                    value={caption}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </label>
                            <label
                                className="text-center mt-1 w-100"
                                style={{ color: '#6c757d' }}
                            >
                                Descripción del trabajo:
                                <textarea
                                    type="text"
                                    placeholder="Añada una descripción del trabajo"
                                    name="description"
                                    autoComplete="off"
                                    className="form-control w-100 mt-2"
                                    value={description}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <p className="alert alert-danger">
                                Añadir una nueva foto implica eliminar la imagen
                                original
                            </p>
                            <label
                                className="text-center mt-1 w-100"
                                style={{ color: '#6c757d' }}
                            >
                                Añada la fotografía deseada
                                <input
                                    className="form-control"
                                    type="file"
                                    name="fileUpload"
                                    files={fileUpload}
                                    onChange={handleInputChange}
                                />
                            </label>

                            <button
                                className="btn btn-outline-success mt-3 me-3"
                                onClick={handlePreview}
                            >
                                Previsualizar
                            </button>
                            {preview && (
                                <div className="rounded-bottom mb-3">
                                    <img
                                        className="img-resize"
                                        src={src}
                                        alt="PostPicture"
                                    />
                                    <div className="shadow bg-body rounded ">
                                        <p
                                            className="text-center rounded-bottom"
                                            style={{
                                                color: 'white',
                                                backgroundColor: '#27A2B2',
                                            }}
                                        >
                                            {caption}
                                        </p>
                                        <p className="ms-2">{description}</p>
                                    </div>
                                </div>
                            )}

                            <button
                                type="submit"
                                className="btn btn-outline-primary mt-3"
                                data-bs-dismiss="modal"
                            >
                                Modificar el post
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
