export const initialState = {
    users:[
        {
            email:"ga@pis.com",
            id:"599f5e3104e121135c2f81f8",
            pass:"12345678"
        }
    ]
};
const userReducer = (state, action) => {

    if (typeof state === 'undefined') {
        return initialState;
    }

    return {
        users:action.users
    }
};

export default userReducer;
