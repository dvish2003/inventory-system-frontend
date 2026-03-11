export const checkIsAuth = () =>{
    if(typeof window === 'undefined'){
        return false;
    }
 const isAuth = localStorage.getItem('isAuth')
 if(!isAuth){
    return false;
 }
 return isAuth === 'true'
}