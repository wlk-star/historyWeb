
export const debounce =  (func,wait=1000)=>{
    var timer = null;
    return function(){
        if(timer !== null){
            clearTimeout(timer);
        }
        timer = setTimeout(func,wait);
    }
}