const maxEmailLength = 32

const maxNameLength = 32
const minNameLength = 3

const emailTooLongErr = Error("Email too long")
const invalidEmailErr = Error("Invalid email")

const nameTooLongErr = Error("Username too long")
const nameTooShortErr = Error("Username too short")

export function validateEmail(email: string): Error | undefined {

    if (email.length > maxEmailLength) {
        return emailTooLongErr
    }

    const isEmail = email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if (!isEmail){
        return invalidEmailErr
    }
}

export function validateUsername(name: string): Error | undefined {
    if (name.length > maxNameLength) {
        return nameTooLongErr
    }

    if (name.length < minNameLength) {
        return nameTooShortErr
    }
}

export function validateUserIdentifier(identifier: string) {
    return !(validateEmail(identifier) instanceof Error) || !(validateUsername(identifier) instanceof Error)
}