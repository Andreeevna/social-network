const ACTIVE_NAV = "ACTIVE_NAV";
const DISACTIVE_NAV = "UPDATE-NEW-NEWS-TEXT";

const initialState = {
    isActive: false
};

export type navType = {
    isActive: boolean
};

const navReducer = (state = initialState, action: any): navType => {
    switch (action.type) {

        case ACTIVE_NAV:
            return {
                ...state,
                isActive: true
            }

        case DISACTIVE_NAV:
            return {
                ...state,
                isActive: false
            }

        default:
            return state;
    }
}

type activeNavType = {
    type: typeof ACTIVE_NAV
}


export const activeNav = (): activeNavType => {
    return {
        type: ACTIVE_NAV
    }
}


type disactiveNavType = {
    type: typeof DISACTIVE_NAV
}

export const disactiveNav = (): disactiveNavType => {
    return {
        type: DISACTIVE_NAV,
    }

}

export default navReducer;