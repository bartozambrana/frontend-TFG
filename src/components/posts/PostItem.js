import { useSelector } from 'react-redux'

import { ModalEditPost } from './ModalEditPost'
import { ModalDeletePost } from './ModalDeletePost'

import '../../style.css'
import { Link, useLocation } from 'react-router-dom'

export const PostItem = ({ post }) => {
    const { userServices } = useSelector((state) => state.services)
    const location = useLocation()

    return (
        <div className="rounded-bottom mb-5">
            {location.pathname === '/' && (
                <Link
                    to={'service/' + post.idService}
                    style={{ textDecoration: 'none' }}
                >
                    <div
                        className="d-flex justify-content-start ps-2 pt-2 rounded-top"
                        style={{ backgroundColor: '#414e52', color: 'white' }}
                    >
                        <i
                            className="fa fa-briefcase mt-1 me-1"
                            aria-hidden="true"
                        ></i>{' '}
                        <p>{post.serviceName}</p>
                    </div>
                </Link>
            )}

            <img className="img-resize" src={post.photo} alt="PostPicture" />
            <div className="shadow bg-body rounded ">
                <h5
                    className="text-center rounded-bottom"
                    style={{ color: 'white', backgroundColor: '#27A2B2' }}
                >
                    {post.caption}
                </h5>
                <p className="ms-2">{post.description}</p>
                {userServices &&
                    userServices.filter((s) => s.uid === post.idService)
                        .length === 1 &&
                    location.pathname !== '/' && (
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-edit-del">
                                <i
                                    className="fa fa-pencil-square-o ms-3"
                                    aria-hidden="true"
                                    data-bs-toggle="modal"
                                    data-bs-target={'#EditPost' + post.uid}
                                ></i>
                            </button>
                            <ModalEditPost
                                post={post}
                                idModal={'EditPost' + post.uid}
                            />
                            <button
                                className="btn btn-edit-del"
                                data-bs-toggle="modal"
                                data-bs-target={'#DeletePost' + post.uid}
                            >
                                <i
                                    className="fa fa-trash ms-3"
                                    aria-hidden="true"
                                ></i>
                            </button>
                            <ModalDeletePost
                                uidPost={post.uid}
                                idModal={'DeletePost' + post.uid}
                            />
                        </div>
                    )}
            </div>
        </div>
    )
}
