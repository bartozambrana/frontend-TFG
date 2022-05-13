
export const types = {

    login: '[auth] login',
    logout: '[auth] logout',
    checkingFinish: '[auth] checking finish]',

    //Comments
    getCommentsUser: '[Comment] getCommentsUser',
    getCommentsService: '[Comment] getCommentsService',

    putComment: '[Comment] putComment',
    
    postComment: '[Comment] postComment',
    postReply: '[Comment] postReply',
    
    delComment: '[Comment] deetelComment',
    


    //Appointments
    getAllDatesUser: '[Appointments] getAllDatesUser',
    getDatesService: '[Appointments] getDatesService',
    getAsignedDates: '[Appointments] getAsignedDates',
    getPDF: '[Appointments] getPDF',

    postDate: '[Appointments] postDate',
    
    putDate: '[Appointments] putDate',
    putSelectDate: '[Appointments] putSelectDate',
    putModifyDate: '[Appointments] putModifyDate',
    putCancelDate: '[Appointments] putCancelDate',
    
    delDate: '[Appointments] delDate',



    
    //Services
    getServicesUser : '[Services] getServicesUser',
    getValidCategories: '[Services] getValidCategories',
    getService: '[Services] getService',
    getServicesByCategory: '[Services] getServicesByCategory',
    getServicesByName: '[Services] getServicesByName',
    getServiceById: '[Services] getServiceById',
    
    putService: '[Services] putService',

    postService: '[Services] postService',
    postFollow: '[Services] postFollow',
    
    delService: '[Services] delService',

    setServiceError: '[Services] setServiceError',

    //Works
    getWorks: '[Works] getWorks',
    putWork: '[Works] putWork',
    postWork: '[Works] postWork',
    delWork: '[Works] delWork',
    setError: '[Works] setError',


}