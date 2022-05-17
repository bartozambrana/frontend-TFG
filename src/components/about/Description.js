import { isMobile } from "react-device-detect";

export const Description = () => {
  return (
    <>
      <div>
        {!isMobile ? (
          <img
            src="/assets/landscape-cutted.png"
            alt="landscape"
            className="w-100"
          />
        ) : (
          <img src="/assets/landscape.jpg" alt="landscape" className="w-100" />
        )}
      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-12 col-md-7">
            <h1 className="text-muted">¿Quienes somos?</h1>
            <p>
              Somos un pequeños grupos de estudiantes de la Universidad de
              Granada. Los cuales se encuentra terminando el Grado de Ingenería
              informática.
              <br />
              <br />
              Todos los miembros de este pqueños gurpos tenemos como sueño
              emprender una StartUp Online, de ahí que surja este noble
              projecto, esperando como resultado una buena idéa.
            </p>
          </div>
          <div className="col-12 col-md-5">
            <img
              src="/assets/programmer.jpg"
              alt="Programmer"
              style={{ borderRadius: 200, width: "100%" }}
            />
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-12 col-md-7">
            <h1 className="text-muted">¿Qué es este sitio web?</h1>
            <p>
              Este sitio web recoge todo un Trabajo Fin de Grado, el cual es
              accesible mediante el siguiente enlace.
            </p>
            <button className="btn btn-dark mt-1">
              <h6>
                <a
                  href="#"
                  className="link-light"
                  style={{ textDecoration: "none" }}
                >
                  DevCommerce
                </a>
              </h6>
            </button>

            <h1 className="text-muted mt-5">¿Qué ofrecemos?</h1>

            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <strong>NUEVO</strong> método de difusión orientado a pequeña
                empresa.
              </li>
              <li className="list-group-item">
                <strong>SOLICITUD</strong> de citas remotamente con facilidad.
              </li>
              <li className="list-group-item">
                <strong>PUBLICACIONES</strong> de vuestros trabajos y posts a
                multiples usuarios.
              </li>
              <li className="list-group-item">
                <strong>SEGUIMIENTO</strong> de usuarios, permitienendo
                comunicarles cualquier novedad.
              </li>
              <li className="list-group-item">
                <strong>RECOMENDACIONES</strong> de servicios a usuarios
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-5">
            <div className="text-center">
              <img
                src="/assets/Logo Tipo TFG.png"
                style={{ width: "100%" }}
                alt="LogoTipo"
              />
              <button
                className="btn mt-5 mb-5"
                style={{ backgroundColor: "#414E52", color: "white" }}
              >
                <h5>ÚNETE</h5>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
