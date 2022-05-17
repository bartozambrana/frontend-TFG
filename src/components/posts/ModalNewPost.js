import { useState } from "react";

import { isMobile } from "react-device-detect";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { useForm } from "../../hooks/useForm";
import { postPost } from "../../actions/posts";

export const ModalNewPost = ({ idService, idModal }) => {
  const dispatch = useDispatch();

  //Variable de estado de previsualización
  const [preview, setPreview] = useState(false);

  // Variable de estado para la muestra el url de la imagen
  const [src, setSrc] = useState("");

  //Establecemos los campos del formulario;
  const [formValues, handleInputChange] = useForm({
    fileUpload: [],
    description: "",
    caption: "",
  });

  let classVar = "";
  if (isMobile) classVar = "modal-dialog modal-dialog-centered";
  else classVar = "modal-dialog modal-dialog-centered modal-xl";

  //Establecemos los campos del formulario
  const { fileUpload, description, caption } = formValues;

  //Verificacion de los campos del formulario.
  const isFormValid = () => {
    if (caption.trim().length === 0) {
      Swal.fire("Error", "No ha introducido un título", "error");
      return false;
    } else if (description.trim().length === 0) {
      Swal.fire("Error", "Descripción del trabajo no añadida", "error");
      return false;
    } else if (fileUpload.length === 0) {
      Swal.fire("Error", "No ha añadido ninguna imagen del trabajo realizado");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      dispatch(postPost(fileUpload, caption, description, idService));
    }
  };

  const handlePreview = (e) => {
    e.preventDefault();
    console.log("Previsualizar: ", preview);

    setPreview(!preview);

    const file = fileUpload[0];

    const reader = new FileReader();
    //Cargamos el archivo para generar la url temporal
    reader.readAsDataURL(file);

    reader.onload = () => {
      setSrc(reader.result);
    };
  };

  return (
    <div
      className="modal fade"
      id={idModal}
      role="dialog"
      tabIndex="-1"
      aria-labelledby={idModal}
      aria-hidden="true"
    >
      <div className={classVar}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={idModal}>
              Formulario de un nuevo posts.
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form className="form-group" onSubmit={handleSubmit}>
              <input
                type="text"
                autoComplete="off"
                name="caption"
                placeholder="Título"
                value={caption}
                onChange={handleInputChange}
                className="form-control"
              />
              <label
                className="text-center mt-1 w-100"
                style={{ color: "#6c757d" }}
              >
                Descripción del trabajo:
                <textarea
                  type="text"
                  placeholder="Añada una descripción del trabajo"
                  name="description"
                  autoComplete="off"
                  className="form-control w-100 mt-2"
                  value={description}
                  onChange={handleInputChange}
                />
              </label>

              <label
                className="text-center mt-1 w-100"
                style={{ color: "#6c757d" }}
              >
                Añada fotografías deseadas
                <input
                  className="form-control"
                  type="file"
                  name="fileUpload"
                  placeholder=""
                  files={fileUpload}
                  onChange={handleInputChange}
                />
              </label>

              <button
                className="btn btn-outline-success mt-3 me-3"
                onClick={handlePreview}
              >
                Previsualizar
              </button>
              {preview && (
                <div className="shadow p-3 bg-body rounded mt-1">
                  <h3 className="text-center">Visualización final</h3>
                  <div className="container">
                    <img src={src} alt="preview post" className="w-100" />
                  </div>

                  <p
                    className="text-center rounded"
                    style={{ color: "white", backgroundColor: "#27A2B2" }}
                  >
                    {caption}
                  </p>
                  <p>{description}</p>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-outline-primary mt-3"
                data-bs-dismiss="modal"
              >
                Añadir el post
              </button>
            </form>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
