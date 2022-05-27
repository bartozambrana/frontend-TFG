import { useSelector } from 'react-redux'
import { ModalEditComment } from '../comments/ModalEditComment'
import { ModalDelComment } from '../comments/ModalDelComment'

const style = {
    reply: {
        backgroundColor: 'rgb(39, 162, 178)',
        color: 'white',
        fontSize: '0.85rem',
    },
    btn: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
    },
}

export const Reply = ({ reply }) => {
    const { author, text } = reply
    const { user } = useSelector((state) => state.auth)
    const { userServices } = useSelector((state) => state.services)

    return (
        <div className="mb-2">
            <div
                className="d-flex justify-content-center rounded overflow-auto scrollbar-hidden"
                style={style.reply}
            >
                <p className="mb-0">
                    {' '}
                    <i className="fa fa-user-o" aria-hidden="true"></i>{' '}
                    {author.userName ? author.userName : author.serviceName}
                </p>
            </div>
            <div className=" border border-bottom">
                <p className="mb-0 ms-2">{text}</p>
                {/*
                    Se muestra únicamente para el dueño del comentario.
                    */}
                {(reply.author.userName === user.userName ||
                    userServices.filter(
                        (s) => s.serviceName === reply.author.serviceName
                    ).length !== 0) && (
                    <div className="d-flex justify-content-end">
                        <button
                            className="btn"
                            style={style.btn}
                            data-bs-toggle="modal"
                            data-bs-target={'#modalEditReply' + reply._id}
                        >
                            <i
                                className="fa fa-pencil-square-o ms-3"
                                aria-hidden="true"
                            ></i>
                        </button>
                        <ModalEditComment
                            uid={reply._id}
                            description={reply.text}
                            id={'modalEditReply' + reply._id}
                            reply={true}
                        />
                        <button
                            className="btn"
                            style={style.btn}
                            data-bs-toggle="modal"
                            data-bs-target={'#modalDeleteReply' + reply._id}
                        >
                            <i
                                className="fa fa-trash ms-3"
                                aria-hidden="true"
                            ></i>
                        </button>
                        <ModalDelComment
                            uid={reply._id}
                            description={reply.text}
                            id={'modalDeleteReply' + reply._id}
                            reply={true}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
