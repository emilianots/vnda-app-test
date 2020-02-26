export const validation = {
    email: {
        presence: {
            message: "Digite o email"
        },
        format: {//  regular expression to the email format
            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Digite um email válido"
        }
    }
}

export function validate(nameFIeld, value) {
    let response: Array<any> = [null, null];  // stores the values of the validation

    if (validation.hasOwnProperty(nameFIeld)) { //  
        let v = validation[nameFIeld];  //  validation object with the name of the name field

        if (value === '' || value === null) {
            response[0] = false;
            response[1] = v['presence']['message'];

        } else if ((v.hasOwnProperty('format')) && (!v['format']['pattern'].test(value))) {
            response[0] = false;
            response[1] = v['format']['message']
        } else {
            response[0] = true;
        }

    } else {
        response[0] = true;
    }
    return response;
}