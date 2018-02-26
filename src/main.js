import { createStore } from 'redux'

const [ PERSONADD, PERSONREMOVE, SETNICK ] = [1,2,3]

const people = ( state = { people: [], me : '' }, action) => {
  let list
  switch (action.type) {
  case PERSONADD:
    list = [...state.people, action.name].sort()
    return Object.assign(state, {people: list})
  case PERSONREMOVE:
    list = state.people.filter(name => name != action.name)
    return Object.assign(state, {people: list})
  case SETNICK:
    list = [...state.people.filter(name => name != state.me), action.name].sort()
    return Object.assign(state, {people: list, me: action.name})
  default:
    return state
  }
}

// store
let store = createStore(people)

// views
let root = document.querySelector('#app')
let listView = document.createElement('ul')
root.appendChild(listView)

let nickView = document.createElement('div')
root.appendChild(nickView)

nickView.innerHTML = `
<form action="">
<input id="nick" autocomplete="off" />
<button>Set Nickname</button>
</form>
`

nickView.querySelector('form').addEventListener('submit', e => {
  e.preventDefault()
  e.target.querySelector('#nick').blur()
  store.dispatch({type: SETNICK, name: e.target[0].value})
})

nickView.querySelector('#nick').focus()
// update views
store.subscribe(() => {
  const {people, me} = store.getState()
  console.log(`people: ${people}, me: ${me}`)
  listView.innerHTML = people
    .map(n => n == me ? `${me} (*)` : n)
    .map(n => `<li>${n}</li>`)
    .join("\n")
  nickView.querySelector('#nick').value = me
})

// to easily debug in browser's console
window.store = store
