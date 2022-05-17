import React from 'react'
import { Link } from 'react-router-dom'
import { ModalDelComment } from './ModalDelComment'

import { ModalEditComment } from './ModalEditComment'

const styleBtn = {
    backgroundColor: 'transparent',
    boxShadow: 'none',
}

export const CommentItem = ({ bussiness, description, uid, bussinessId }) => {
    return (
        <>
            <div className="d-flex justify-content-between mt-1">
                <div className="d-flex justify-content-inline-block">
                    <Link
                        style={{ textDecoration: 'none', color: '#38ABBA' }}
                        to={'/service/' + bussinessId}
                    >
                        {bussiness}
                    </Link>
                    <p className="ms-5"> {description} </p>
                </div>
                <div className="d-flex justify-content-end ">
                    <button
                        className="btn"
                        style={styleBtn}
                        data-bs-toggle="modal"
                        data-bs-target={'#modalEdit' + uid}
                    >
                        <i
                            className="fa fa-pencil-square-o ms-3"
                            aria-hidden="true"
                        ></i>
                    </button>
                    <ModalEditComment
                        uid={uid}
                        description={description}
                        bussiness={bussiness}
                        id={'modalEdit' + uid}
                    />
                    <button
                        className="btn"
                        style={styleBtn}
                        data-bs-toggle="modal"
                        data-bs-target={'#modalDelete' + uid}
                    >
                        <i className="fa fa-trash ms-3" aria-hidden="true"></i>
                    </button>
                    <ModalDelComment
                        uid={uid}
                        description={description}
                        bussiness={bussiness}
                        id={'modalDelete' + uid}
                    />
                </div>
            </div>
        </>
    )
}
