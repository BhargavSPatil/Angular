import { AbstractControl, ValidatorFn } from "@angular/forms";

//To custom validate, pass the formControl as parameter to the function. This function's return type is either a object with value of input field, which is returned when there is a
//forbidden name used or null is returned if there is no error. Then in function's body check if the control value matches the value of forbidden name, and return the result accordingly
export function forbiddenNameValidator(control: AbstractControl): {[key: string]: any} | null {
    let forbidden = /admin/.test(control.value)
    return forbidden ? { 'forbiddenName': { value: control.value } } : null
}

//By using the above method, we can only check for one value. If we needed to validate more than one forbidden values, we need to create the above function multiple times.
//The below function is called Factory function, which can take any forbidden values as string as its parameter and validate them. Its return type is inturn a validator function,
//similar to the above function
export function forbiddenPwdValidator(forbiddenPwd: RegExp): ValidatorFn{
    return (control: AbstractControl): { [key: string]: any } | null => {
        let frbiddn = forbiddenPwd.test(control.value)
        return frbiddn ? { 'forbiddenPwd': { value: control.value } } : null
    }
}

export function crossFieldValidator(control: AbstractControl): { [key: string]: boolean } | null{
    const password = control.get('password')
    const confirmPassword = control.get('confirmPassword')
    if (password?.pristine || confirmPassword?.pristine || confirmPassword?.untouched)
        return null
    return password && confirmPassword && (password.value != confirmPassword.value ? {'mismatch': true} : null)
}