import { AsideHomeBar } from './AsideHomeBar'
import { PostsWorksHome } from './PostsWorksHome'
import { isMobile } from 'react-device-detect'

import '../../style.css'
import { Recommendations } from './Recommendations'

export const HomeScreen = () => {
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
                    Disfruta de esta experiencia
                </h1>
            </div>
            <div className="container">
                <Recommendations />
                <div className="row justify-content-center">
                    <div className="col-lg-8 mt-3 mb-3">
                        <PostsWorksHome />
                    </div>
                    <div className="col-lg-4 ">
                        <AsideHomeBar />
                    </div>
                </div>
            </div>
        </main>
    )
}
