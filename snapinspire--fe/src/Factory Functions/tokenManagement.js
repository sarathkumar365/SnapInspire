export const  storeToken  = (accessToken) => {
    localStorage.setItem('accessToken',accessToken)
    
}

export const getToken = () => {
    return localStorage.getItem('accessToken') || null
}

export const logout = () => {
    localStorage.setItem('accessToken',null)
}