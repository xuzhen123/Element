 const getters = {
    isAuth(state) {
        if (state.auth && state.auth.type && state.auth.token) {
            if (state.auth.expires) {
                if (state.auth.expires <= new Date().getTime()) {
                    return false;
                }
            }
            return true;
        }
        return false;
    },
    authorization(state) {
        if (state.auth && state.auth.type && state.auth.token) {
            return `${state.auth.type} ${state.auth.token}`;
        }
        return null;
    },
}

export default getters