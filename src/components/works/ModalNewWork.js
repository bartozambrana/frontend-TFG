
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';


import { useDispatch } from 'react-redux';
// import { updateCommentUser } from '../../actions/comment';
import { useForm } from '../../hooks/useForm';
import { getValidCategories } from '../../actions/services';
export const ModalNewWork = (idService) => {
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth);
    const idModal = 'EditService' + user.uid;

    //Obtenemos los servicio del usuario
    const {userServices,validCategories} = useSelector(state => state.services);

	useEffect(() => {
		//Obtenemos las categorías válidas.
        if(validCategories.length === 0)
		    dispatch(getValidCategories())
	}, [dispatch])

    //Obtenemos los datos almacenados del servicio;
    const service = userServices.find(s => (s.idUser === user.uid) && (s.uid === idService ));
	const [formValues, handleInputChange] = useForm({
		serviceCategory: service.serviceCategory ,
		serviceInfo: service.serviceInfo,
		cityName: service.localization.cityName,
		postalCode: service.localization.postalCode,
		street: service.localization.street,
	});

    //Establecemos los campos del formulario
    const {serviceCategory, serviceInfo,cityName,postalCode,street} = formValues;

    //Verificacion de los campos del formulario.
    const isFormValid = () => {
		
		if (serviceCategory.trim().length === 0) {
			Swal.fire('Error', 'Categoria del servicio vacío', 'error');
			return false;
		} else if (serviceInfo.trim().length === 0) {
			Swal.fire('Error', 'Información del servicio vacío', 'error');
			return false;
		}  else if (cityName.trim().length === 0) {
			Swal.fire('Error', 'Nombre del servicio del servicio vacío', 'error');
			return false;
		} else if (street.trim().length === 0) {
			Swal.fire('Error', 'Calle del servicio vacío', 'error');
			return false;
		} else if (postalCode.toString().length !== 5) {
			Swal.fire('Error', 'El codigo postal tiene 5', 'error');
			return false;
		}
		return true;
	}
    return (
        <div className="modal fade" id={idModal} role="dialog" tabIndex="-1" aria-labelledby={idModal} aria-hidden="true">
			<div className="modal-dialog modal-dialog-centered">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id={idModal}>Modificación de datos del servicio.</h5>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
						</button>
					</div>
					<div className='modal-body'>
						<form className="form-group" onSubmit={handleSubmit}>
							<label className='form-control w-100 mt-3' style={{color: '#6c757d'}}>
								Categoría del servicio:
								<select className='form-select' style={{ border: '0' }} name='serviceCategory' value={serviceCategory} onChange={handleInputChange}>
									{
										validCategories.map((category) => <option value={category} key={category}>{category}</option>)
									}
								</select>
							</label>

							
							<textarea
								type='text'
								placeholder='Información del servicio'
								name='serviceInfo'
								autoComplete='off'
								className='form-control w-100 mt-2'
								value={serviceInfo}
								onChange={handleInputChange}
							/>

							
							<label className='form-control w-100 mt-3' style={{color: '#6c757d'}}>
								Código postal
								<input
									type='number'
									name='postalCode'
									placeholder='codigo postal'
									className='w-100'
									style={{border:0, borderTop:'1px solid 6c757d'}}
									value={postalCode}
									onChange={handleInputChange}
								/>
							</label>
							

							<input
								type='text'
								placeholder='Direción'
								name='street'
								autoComplete='off'
								className='form-control w-100 mt-2'
								value={street}
								onChange={handleInputChange}
							/>

							<input
								type='text'
								placeholder='Ciudad'
								name='cityName'
								autoComplete='off'
								className='form-control w-100 mt-2'
								value={cityName}
								onChange={handleInputChange}
							/>

							<button type='submit' className='btn btn-outline-primary mt-3' data-bs-dismiss='modal'>
								Registrar servicio
							</button>



						</form>

					</div>

					<div className='modal-footer'>
						<button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>Cancelar</button>
					</div>

				</div>
			</div>
		</div>
    )
}