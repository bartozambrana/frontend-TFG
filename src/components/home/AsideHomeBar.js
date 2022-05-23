import { FollowServicesBox } from './FollowServicesBox'
import { LasCommentsBox } from './LasCommentsBox'

export const AsideHomeBar = () => {
    return (
        <aside className="row">
            <div className="col-12">
                <FollowServicesBox />
            </div>
            <div className="col-12">
                <LasCommentsBox />
            </div>
        </aside>
    )
}
