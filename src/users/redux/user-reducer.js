export const initialState = {
    users:[{
        email:"ga@pis.com",
        id:"599f5e3104e121135c2f81f8",
        pass:"12345678"
    }]
};
export default function userReducer(state,action){
    if (typeof state === 'undefined') {
        return initialState
    }
    console.log('dale gas');
    return {
        users:action.users
    }
}