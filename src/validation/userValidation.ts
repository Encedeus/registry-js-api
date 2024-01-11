const maxEmailLength = 32

const maxNameLength = 32
const minNameLength = 3

const maxPassLength = 64
const minPassLength = 8

const emailTooLongErr = Error("Email too long")
const invalidEmailErr = Error("Invalid email")
const emailNotProvidedErr = Error("Email must be provided")

const nameTooLongErr = Error("Username too long")
const nameTooShortErr = Error("Username too short")
const nameNotProvidedErr = Error("Username must be provided")

const passwordTooLongErr = Error("Password too long")
const passwordTooShortErr = Error("Password too short")
const passwordNotProvidedErr = Error("Password must be provided")

const uidNotProvidedErr = Error("Identifier must be provided")

export function validatePassword(password: string): Error | undefined {

    if (password.length == 0) {
        return passwordNotProvidedErr
    }

    if (password.length > maxPassLength) {
        return passwordTooLongErr
    }

    if (password.length < minPassLength) {
        return passwordTooShortErr
    }
}

export function validateEmail(email: string): Error | undefined {

    if (email.length == 0) {
        return emailNotProvidedErr
    }

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

    if (name.length == 0) {
        return nameNotProvidedErr
    }

    if (name.length > maxNameLength) {
        return nameTooLongErr
    }

    if (name.length < minNameLength) {
        return nameTooShortErr
    }
}

export function validateUserIdentifier(identifier: string) : Error | undefined {
    if (identifier.length == 0) {
        return uidNotProvidedErr
    }

    const emailErr = validateEmail(identifier)
    const nameErr = validateUsername(identifier)

    if (!emailErr || !nameErr){
        return
    }

    if (emailErr == invalidEmailErr) {
        return nameErr
    }
}