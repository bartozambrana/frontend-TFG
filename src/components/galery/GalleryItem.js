import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ModalDeleteWork } from '../works/ModalDeleteWork';
import { ModalEditWork } from '../works/ModalEditWork';



const styleBtn = {
	backgroundColor: 'transparent',
	boxShadow: 'none'
}

export const GalleryItem = ({ images, description, uid }) => {
    const idCarousel = 'idCarousel' + uid;
    const targetCarousel = '#' + idCarousel;

    const {idService} = useParams();
    const {userServices} = useSelector(state => state.services); 

    
    return (
        <div className="col mt-3">
            <div id={idCarousel} className="carousel slide" data-bs-ride="carousel" data-bs-interval='false'>
                <div className="carousel-indicators carousel">
                    {   
                        images.map((img,i=0) =>{
                            i=i+1;
                            
                            if(i === 1)
                               return( <button key={i} type="button" data-bs-target={targetCarousel} data-bs-slide-to={i-1} className="active" aria-current="true" aria-label={'Slide ' + (i-1)}></button>)
                            
                            return(<button key={i} type="button" data-bs-target={targetCarousel} data-bs-slide-to={i-1} aria-label={'Slide ' + (i-1)}></button>)
                            
                        })
                    }
                </div>
                <div className="carousel-inner">
                    {
                        images.map((img,i=0) =>{
                            i=i+1;
                            return (
                            <div key={i} className={(i === 1) ? 'item carousel-item active' : 'item carousel-item'}>
                                <img src={img} className='d-block w-100' style={{maxHeight:'500'}} alt={'trabajo'+(i+1)}/>
                            </div>)
                            
                        })
                    }
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target={targetCarousel} data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target={targetCarousel} data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className="shadow p-3 mb-5 bg-body rounded">
                {description}
                {
                    (userServices && (userServices.filter(s=> s.uid === idService).length ===1)) &&
                    (
                        <div className="d-flex justify-content-end">
                            <button className="btn" style={styleBtn} ><i className='fa fa-pencil-square-o ms-3' aria-hidden='true' data-bs-toggle="modal"
						    data-bs-target={'#EditWork' + uid}></i></button>
                            <ModalEditWork uidWork={uid}/>
                            <button className="btn" style={styleBtn} data-bs-toggle="modal" data-bs-target={'#DeleteWork' + uid} ><i className='fa fa-trash ms-3' aria-hidden='true' ></i></button>
                            <ModalDeleteWork uidWork={uid} idModal={'DeleteWork' + uid}/>
                        </div>
                        
                    )
                }
               
            </div>
            
        </div>
    )
}
