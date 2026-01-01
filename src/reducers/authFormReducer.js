import formActions from "@/libs/constants/formActionTypes";

export const authFormReducer = (state, {type, payload = null}) => {
    switch(type) {
        case formActions.SET_EMAIL:
            return {
                ...state,
                email: payload,
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
        case formActions.SET_PASSWORD:
            return {
                ...state,
                password: payload,
            }
        default:
            return state;
    }
}