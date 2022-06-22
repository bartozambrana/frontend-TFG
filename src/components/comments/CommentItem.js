import { Link } from 'react-router-dom'
import { ModalDelComment } from './ModalDelComment'

import { ModalEditComment } from './ModalEditComment'

const styleBtn = {
    backgroundColor: 'transparent',
    boxShadow: 'none',
}

export const CommentItem = ({ comment }) => {
    return (
        <>
            <div className="d-flex justify-content-between mt-1">
                <Link
                    style={{ textDecoration: 'none', color: '#38ABBA' }}
                    to={'/service/' + comment.idService._id}
                >
                    <i className="fa fa-briefcase" aria-hidden="true"></i>{' '}
                    {comment.idService.serviceName}
                </Link>

                {
                    //Se permite borrarlo o editarlo si no posee
                    //ninguna respuesta.
                    comment.replyTo.length === 0 && (
                        <div className="d-flex justify-content-end ">
                            <button
                                className="btn"
                                style={styleBtn}
                                data-bs-toggle="modal"
                                data-bs-target={'#modalEdit' + comment.uid}
                            >
                                <i
                                    className="fa fa-pencil-square-o ms-3"
                                    aria-hidden="true"
                                ></i>
                            </button>
                            <ModalEditComment
                                uid={comment.uid}
                                description={comment.text}
                                id={'modalEdit' + comment.uid}
                            />
                            <button
                                className="btn"
                                style={styleBtn}
                                data-bs-toggle="modal"
                                data-bs-target={'#modalDelete' + comment.uid}
                            >
                                <i
                                    className="fa fa-trash ms-3"
                                    aria-hidden="true"
                                ></i>
                            </button>
                            <ModalDelComment
                                uid={comment.uid}
                                description={comment.text}
                                id={'modalDelete' + comment.uid}
                            />
                        </div>
                    )
                }
            </div>
            <div>
                <p className="ms-5"> {comment.text} </p>
            </div>
        </>
    )
}
