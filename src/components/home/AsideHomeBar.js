import { FollowServicesBox } from './FollowServicesBox'
import { LastCommentsBox } from './LastCommentsBox'

export const AsideHomeBar = () => {
    return (
        <aside className="row">
            <div className="col-12">
                <FollowServicesBox />
            </div>
            <div className="col-12">
                <LastCommentsBox />
            </div>
        </aside>
    )
}
