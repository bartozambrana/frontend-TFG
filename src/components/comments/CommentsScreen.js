import React, { useEffect } from 'react'
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
        <div className="container mt-5">
            <h1 className="text-center">Comentarios</h1>
            <ul className="list-group list-group-flush">
                {state.loaded &&
                    state.userComments.map((comment) => {
                        return (
                            <li key={comment.uid} className="list-group-item">
                                <CommentItem comment={comment} />
                            </li>
                        )
                    })}
            </ul>
        </div>
    )
}
