type State = {
    name: string,
    price: number,
    id: number
}

const st: State = {
    name: 'Donut',
    price: 123,
    id: 1
}

const st1: State = {
    name: 'Bread',
    price: 122,
    id: 2
}

const InitialState: Array<State> = [st, st1]

export const reducer = (state:Array<State> = InitialState, action:any):State[] => {
    switch(action.type){
        case 'ADD':
            return [...state, {
                name: action.name,
                price: action.price,
                id: new Date().getTime()
            }]
        case 'EDIT':
            return state.map(elem => {
                if(elem.id === action.id){
                    elem.name = action.name
                    elem.price = action.price
                }
                return elem
            })
        case 'REMOVE':
            return state.filter(elem => elem.id !== action.id)
        case 'A-Z_SORT':
            return [...state.sort(function(a, b){
                if(a.name < b.name) { return -1; }
                if(a.name > b.name) { return 1; }
                return 0;
            })]
        case 'Z-A_SORT':
            return [...state.sort(function(a, b){
                if(a.name < b.name) { return 1; }
                if(a.name > b.name) { return -1; }
                return 0;
            })]
        case 'SMALL_TO_BIG':
            return [...state.sort(function(a, b){
                return a.price - b.price
            })]
        case 'BIG_TO_SMALL':
            return [...state.sort(function(a, b){
                return a.price - b.price
            }).reverse()]
        default:
            return state
    }
}
