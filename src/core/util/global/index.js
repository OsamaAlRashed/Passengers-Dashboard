import { NIL, v4 } from 'uuid/dist';
export const nullGuid = NIL;
export const guid = () => {
  return v4()
}

export function getSearchResultOnRow(state, row) {
    let searchWork = ''
    let subRow = {...row}
    state.searchDto.keys.forEach(key => {
        let spain = key.split('.')
        if(spain.length > 1) {
            spain.forEach(ob => {
                subRow = subRow[ob]
            })
            searchWork += subRow
        }
        else searchWork += row[key]
    })
    return searchWork.indexOf(state.searchDto.query) != -1
}

export function sortListObjByArgName(field, sortType, list) {
    return mergeSort(field, sortType, list)
}
const mergeSort = (field, sortType, items) => {
    if (items.length < 2) return items
    const middle = Math.floor(items.length / 2)
    const items_l = items.slice(0, middle)
    const items_r = items.slice(middle, items.length)
    const sorted_l = mergeSort(field, sortType, items_l)
    const sorted_r = mergeSort(field, sortType, items_r)
    return _mergeArrays(sorted_l, sorted_r, field, sortType)
}
const _mergeArrays = (a, b, field, sortType) => {
    const c = []
    while (a.length && b.length) {
        if(typeof a[0] == 'object' && typeof b[0] == 'object') {
            let typeOne = typeof a[0][field]
            let typeTow = typeof b[0][field]
            let itemOne = a[0][field]
            let itemTow = b[0][field]
            if (new Date(a[0][field]) != 'Invalid Date' && new Date(b[0][field]) != 'Invalid Date') {
                itemOne = new Date(itemOne)
                itemTow = new Date(itemTow)
            } else if (typeOne == 'string' && typeTow == 'string') {
                itemOne = itemOne.toLowerCase()
                itemTow = itemTow.toLowerCase()
            }
            if(sortType == 'desc') {
                c.push(itemOne < itemTow ? b.shift() : a.shift())
            } else {
                c.push(itemOne > itemTow ? b.shift() : a.shift())
            }
        } else if (typeof a[0] == typeof b[0]) {
            let typeOne = typeof a[0]
            let typeTow = typeof b[0]
            let itemOne = a[0]
            let itemTow = b[0]
            if (new Date(a[0]) != 'Invalid Date' && new Date(b[0]) != 'Invalid Date') {
                itemOne = new Date(itemOne)
                itemTow = new Date(itemTow)
            } else if (typeOne == 'string' && typeTow == 'string') {
                itemOne = itemOne.toLowerCase()
                itemTow = itemTow.toLowerCase()
            }
            if(sortType == 'desc') {
                c.push(a[0] > b[0] ? b.shift() : a.shift())
            } else {
                c.push(a[0] < b[0] ? b.shift() : a.shift())
            }
        } else {
            console.error('can\'t sort array of typre any')
        }
    }
  
    //if we still have values, let's add them at the end of `c`
    while (a.length) {
      c.push(a.shift())
    }
    while (b.length) {
      c.push(b.shift())
    }
  
    return c
}

export const getCookie = (name) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
}
export const setCookie = (name, value, days) => {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export const isObject = obj => typeof obj === 'object' && obj !== null

export const isToday = date => {
  const today = new Date()
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}