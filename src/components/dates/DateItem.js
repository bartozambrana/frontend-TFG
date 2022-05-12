import React from 'react'

const styleBtn = {
    backgroundColor:'transparent',
    boxShadow:'none' 
}
export const DateItem = ({bussiness,date}) => {
    const handleEditDate = ()=> {
        console.log('Edit Comment');
    }

    const handleDeleteDate = () => {
        console.log('Delete Comment');
    }
    
    return (
        <div className="d-flex justify-content-between mt-1">

            <div className="d-flex justify-content-inline-block">
                <p> {bussiness} fdasfasfasfsdfas</p>
                <p className='ms-2 me-2'> {date}</p>
            </div>  

            <div className="d-flex justify-content-end ">
                <button className="btn" style={styleBtn} onClick={handleEditDate}>
                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                </button>
                <button className="btn " style={styleBtn} onClick={handleDeleteDate}>
                    <i className="fa fa-trash ms-3" aria-hidden="true" ></i>
                </button>
            </div>
  
        </div>
    )
}
