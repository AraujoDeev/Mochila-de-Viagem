const form = document.getElementById('novoItem')
const lista = document.getElementById('lista')
const items = JSON.parse(localStorage.getItem('items')) || []
console.log(items)

items.forEach((element) => {
  createElement(element)
})

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const name = e.target.elements['nome']
  const amount = e.target.elements['quantidade']

  const exists = items.find((element) => element.nome === nome.value)

  const currentItem = {
    nome: nome.value,
    quantidade: quantidade.value,
  }

  if (exists) {
    currentItem.id = exists.id

    updateElement(currentItem)

    items[items.findIndex((element) => element.id === exists.id)] = currentItem
  } else {
    currentItem.id = items[items.length - 1]
      ? items[items.length - 1].id + 1
      : 0

    createElement(currentItem)

    items.push(currentItem)
  }

  localStorage.setItem('items', JSON.stringify(items))

  name.value = ''
  amount.value = ''
})

function createElement(item) {
  const newItem = document.createElement('li')
  newItem.classList.add('item')

  const numberItem = document.createElement('strong')
  numberItem.innerHTML = item.quantidade
  numberItem.dataset.id = item.id

  newItem.appendChild(numberItem)
  newItem.innerHTML += item.nome

  newItem.appendChild(deleteButton(item.id))

  lista.appendChild(newItem)
}

function updateElement(item) {
  document.querySelector("[data-id='" + item.id + "']").innerHTML =
    item.quantidade
}

function deleteButton(id) {
  const elementButton = document.createElement('button')
  elementButton.innerText = 'X'
  elementButton.addEventListener('click', function () {
    deleteElement(this.parentNode, id)
  })
  return elementButton
}

function deleteElement(tag, id) {
  tag.remove()
  items.splice(
    items.findIndex((element) => element.id === id),
    1
  )

  console.log(items)

  localStorage.setItem('items', JSON.stringify(items))
}
