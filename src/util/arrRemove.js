function arrayRemove(arr, value) { 
    
    return arr.filter(function(ele){ 
        console.log(ele)
        return ele !== value; 
    });
}

export { arrayRemove }