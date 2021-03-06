import { AppRoutes } from './routes/AppRoutes'
import { Provider } from 'react-redux'

import { store } from './store/store'
import './style.css'
export const TFGApp = () => {
    return (
        <Provider store={store}>
            <AppRoutes />
        </Provider>
    )
}
