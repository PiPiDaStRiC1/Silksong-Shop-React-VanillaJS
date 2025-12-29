import formActions from "@/libs/constants/formActionTypes"

const validateEmail = (email) => {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

const validatePassword = (password) => {
    return /^(?=(?:.*\d){3,})(?=.*[A-Za-zА-Яа-яЁё])[A-Za-zА-Яа-яЁё\d]{8,}$/.test(password);
}

const validateFullName = (fullName) => {
    return /^[A-ZА-ЯЁ][a-zа-яё]+ [A-ZА-ЯЁ][a-zа-яё]+$/.test(fullName);
}

export const formReducer = (state, {type, payload = null}) => {
    switch(type) {
        case formActions.SET_EMAIL:
            return {
                ...state,
                email: payload,
            }
        case formActions.SET_PASSWORD:
            return {
                ...state,
                password: payload,
            }
        case formActions.SET_FULL_NAME:
            return {
                ...state,
                fullName: payload,
            }
        case formActions.SET_CONFIRM_PASSWORD:
            return {
                ...state,
                confirmPassword: payload,
            }
        case formActions.VALIDATE_FORM:
            return {
                ...state,
                validateForm: {
                    email: validateEmail(payload.email),
                    password: validatePassword(payload.password),
                    fullName: validateFullName(payload.fullName),
                    confirmPassword: payload.confirmPassword === state.password,
                },
            }
        default:
            return state;
    }
}