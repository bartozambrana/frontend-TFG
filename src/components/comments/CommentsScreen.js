import React, { useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import { useDispatch, useSelector } from 'react-redux'

import { getCommentsUser } from '../../actions/comment'
import { CommentItem } from './CommentItem'

export const CommentsScreen = () => {
    const dispatch = useDispatch()
    const state = useSelector((state) => state.comments)

    useEffect(() => {
        if (!state.loaded) dispatch(getCommentsUser())
    }, [state.loaded])

    return (
        <main>
            <div className="container-front-image">
                {!isMobile ? (
                    <img
                        src="/assets/landscape-cutted.png"
                        alt="landscape"
                        className="w-100"
                    />
                ) : (
                    <img
                        src="/assets/landscape.jpg"
                        alt="landscape"
                        className="w-100"
                    />
                )}
                <h1
                    className="caption"
                    style={{
                        color: 'white',
                        fontSize: '3rem',
                        textShadow: '2px 2px black',
                    }}
                >
                    Tus comentarios
                </h1>
            </div>
            <div className="container mt-5">
                <ul className="list-group list-group-flush">
                    {state.loaded &&
                        state.userComments.map((comment) => {
                            return (
                                <li
                                    key={comment.uid}
                                    className="list-group-item"
                                >
                                    <CommentItem comment={comment} />
                                </li>
                            )
                        })}
                    {state.loaded && state.userComments.length === 0 && (
                        <h1 className="alert alert-info">
                            No ha establecido ningún comentario.
                        </h1>
                    )}
                </ul>
            </div>
        </main>
    )
}
