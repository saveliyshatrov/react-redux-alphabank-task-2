export const add = (name: string, price: number) => ({type: 'ADD', name: name, price: price})
export const remove = (name: string, price: number, id: number) => ({type: 'REMOVE', name: name, price: price, id: id})
export const edit = (name: string, price: number, id: number) => ({type: 'EDIT', name: name, price: price, id: id})
export const a_z_sort = () => ({type: 'A-Z_SORT', name:'', price:0, id:0})
export const z_a_sort = () => ({type: 'Z-A_SORT', name:'', price:0, id:0})
export const small_to_big_sort = () => ({type: 'SMALL_TO_BIG', name:'', price:0, id:0})
export const big_to_small_sort = () => ({type: 'BIG_TO_SMALL', name:'', price:0, id:0})
