
import './footer.css';

export const Footer = () => {
    return (
        <footer className="dark-footer">
            <div className="container mt-3 p-4 ">
                <div className="row d-flex justify-content-center text-center">
                    <div className="col-12 col-md-4">
                        <h5><u>Mapa virtual</u></h5>
                        <ul className='list-none-style'>
                            <li>a</li>
                            <li>b</li>
                            <li>c</li>
                            <li>d</li>
                        </ul>
                    </div>
                    <div className="col-12 col-md-4 ">
                        <h5><u>Nuestras Políticas</u></h5>
                        <ul className='list-none-style'>
                            <li>Condiciones de uso</li>
                            <li>Condiciones de privacidad</li>
                            <li>Aviso legal</li>
                        </ul>
                    </div>
                    <div className="col-12 col-md-4 text-center">
                        <h5><u>Síguenos</u></h5>
                            <i className="ms-3 fa fa-instagram fa-2x"></i>
                            <i className="ms-3 fa fa-facebook fa-2x"></i>
                            <i className="ms-3 fa fa-twitter-square fa-2x"></i>
                    </div>
                </div>
            </div>
        </footer>
    )
}
