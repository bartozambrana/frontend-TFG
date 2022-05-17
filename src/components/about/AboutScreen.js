import { NavBarAbout } from '../ui/NavBarAbout'

import { Footer } from '../ui/Footer'
import { Description } from './Description'
export const AboutScreen = () => {
    return (
        <>
            <header>
                <NavBarAbout />
            </header>
            <main>
                <Description />
            </main>
            <Footer />
        </>
    )
}
