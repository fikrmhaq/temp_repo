export const IfUndefined = (value, replace = [], inreturn = null) => {

    if([undefined].includes(value)) return replace
    
    if(![null].includes(inreturn)) return value[inreturn]
    
    return value

}