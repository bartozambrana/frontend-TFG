import Swal from 'sweetalert2'

export const loadingOpen = (text) => {
    Swal.fire({
        title: text,
        didOpen() {
            Swal.showLoading()
        },
        didClose() {
            Swal.hideLoading()
        },
        allowEnterKey: false,
        allowEscapeKey: false,
        allowOutsideClick: false,
        showConfirmButton: false,
    })
}

export const loadingClose = () => {
    Swal.close()
}

export const swalInfoTimer = (text) => {
    Swal.fire({
        title: 'Éxito',
        text: text,
        timer: 4000,
        showConfirmButton: true,
        confirmButtonColor: '#414e52',
        icon: 'info',
    })
}

export const swallError = (text) => {
    Swal.fire({
        title: text,
        timer: 4000,
        showConfirmButton: true,
        confirmButtonColor: '#414e52',
        icon: 'error',
    })
}

export const swallSuccess = (text) => {
    Swal.fire({
        title: text,
        timer: 4000,
        showConfirmButton: true,
        confirmButtonColor: '#414e52',
        icon: 'success',
    })
}
