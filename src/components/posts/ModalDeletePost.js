import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/posts";

export const ModalDeletePost = ({uidPost,idModal}) => {
    const dispatch = useDispatch();
    
    const handleConfirmButton = () => {
        dispatch(deletePost(uidPost));
    }

    return (
        <div className="modal fadel" id={idModal} role='dialog' tabIndex="-1" aria-labelledby={idModal} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id={idModal}>Confirmación de borrado.</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>¿Está seguro de eliminar el post seleccionado?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleConfirmButton}>Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
