import { UserType } from '../HW8'

type ActionType =
    | { type: 'sort'; payload: 'up' | 'down' }
    | { type: 'check'; payload: number }

export const homeWorkReducer = (state: UserType[], action: ActionType): UserType[] => {
    switch (action.type) {
        case 'sort': {
            if (action.payload === 'up') {
                return state.sort((a, b) => {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1
                    } else {
                        return -1
                    }
                })
            } else {
                return state.sort((a, b) => {
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {
                        return 1
                    } else {
                        return -1
                    }
                })
            }
        }
        case 'check': {
            return state.filter(user => user.age > 18).sort((a,b) => a.age - b.age)
        }
        default:
            return state
    }
}
