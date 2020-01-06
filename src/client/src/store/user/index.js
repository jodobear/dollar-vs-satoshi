const initState = {
    connected: false,
    userName: undefined,
    hashedKey: undefined,
    id: undefined,
    balance: 0,
    payreq: undefined
};

const USER_CONNECT = 'user/connect';
const UPDATE_PAYREQ = 'user/update-payreq';
const UPDATE_BALANCE = 'user/update-balance';

const userReducer = (state = initState, action) => {
    const {type, payload} = action;
    switch (type){
        case USER_CONNECT:
            return Object.assign( {}, state, {
                connected: true,
                userName: payload.userName,
                hashedKey: payload.hashedKey,
                id: payload.id,
                balance: payload.balance,
        });
        case UPDATE_PAYREQ:
            return Object.assign({}, state, {
                payreq: payload
        });
        case UPDATE_BALANCE:
            return Object.assign( {}, state, {
                balance: payload
            });
        default:
            return state
    }
};

const getReducer = (state) => {
    return state.userReducer; //this doesn't resolve to userReducer - why?
};

export const isUserConnected = (state) => getReducer(state).connected;
export const getUserName = (state) => getReducer(state).userName;
export const getUserId = (state) => getReducer(state).id;
export const getBalance = (state) => getReducer(state).balance;
export const getPayreq = (state) => getReducer(state).payreq;

const connectUser = (u, h, i, b) => {
    return {
        type: USER_CONNECT,
        payload: {
            userName: u,
            hashedKey: h,
            id: i,
            balance: b
        }
    }
};

export const updatePayreq = (newPayreq) => {
    return {
        type: UPDATE_PAYREQ,
        payload: newPayreq
    }
};

export const updateBalance = (newBalance) => {
    return {
        type: UPDATE_BALANCE,
        payload: newBalance
    }
};

export const userSocketEvents = (dispatch, socket) => {
    socket.on('userConnected', (userName, hashedKey, id, balance) => {
        dispatch(connectUser(userName, hashedKey, id, balance));
        socket.on(`updateBalance-${id}`, (newBalance) => {
            dispatch(updateBalance(newBalance))
        })
    });
    socket.on('sendPayreq', (newPayreq) => {
        dispatch(updatePayreq(newPayreq))
    })
};

export default userReducer;