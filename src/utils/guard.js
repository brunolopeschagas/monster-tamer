/**
 * 
 * @param {never} _value 
 */
export function exhaustiveGuard(_value){
    throw new Error('Error Reached: value ' + JSON.stringify(_value));
}