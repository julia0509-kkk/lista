const textScroll = document.querySelectorAll('[data-text="text-scroll"]')
const listaCompras = document.querySelector('[data-lista="lista-compras"]')
const nomeItem = document.querySelector('[data-nome="nome-item"]')
const btnSubmit = document.querySelector('[data-submit="submit"]')
const showElementsA = document.querySelector('.show-elements')
const itemsNav = document.querySelector('[data-items="itemsNav"]')

const container = document.querySelector('[data-container="container"]')
const indicators = document.querySelectorAll('.indicator')

const myObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show')
        } else {
            entry.target.classList.remove('show')
        }
    })
})

textScroll.forEach((element) => myObserver.observe(element))

let navElement = false
showElementsA.addEventListener('click', () => {
    if (navElement === false) {
        itemsNav.classList.add('items-nav-visible')
        navElement = true
    } else {
        itemsNav.classList.remove('items-nav-visible')
        navElement = false
    }
    
})
let slideIndex = 0

function slide() {
    let slideItems = document.querySelectorAll('[data-slide="item"]')
    slideItems.forEach((slide) => {
        slide.style.transform = `translateX(-${slideIndex * 100}%)`
    })
    indicators.forEach((indicator) => {
        indicator.classList.remove('active')
    })

    indicators[slideIndex].classList.add('active')


    slideIndex++
    
    if (slideIndex >= slideItems.length) {
        slideIndex = 0
    }
}

//Função para ir para um slide especifico
function goToSlide(index) {
    slideIndex = index
    slide()
}


//Muda o slide a cada (determinado) segundos
let slideInterval = setInterval(slide, 3000)

slide()

//Adiciona evento de clique aos indicadores
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        clearInterval(slideInterval) //Pausar o slide automatico
        goToSlide(index)
        slideInterval = setInterval(slide, 3000) // Reinicia o slide
    })
})



btnSubmit.addEventListener('click', function () {
    const valorInput = nomeItem.value

    const ul = document.createElement('ul')
    const li = document.createElement('li')
    const span = document.createElement('span')
    const btn = document.createElement('button')

    listaCompras.appendChild(ul)
    ul.appendChild(li)
    li.appendChild(span)
    li.appendChild(btn)

    btn.classList.add('btn-active')

    span.textContent = valorInput
    btn.textContent = 'Excluir'

    const visibleP = document.querySelector('[data-visible="visible-p"]')

    if (valorInput === '') {
        visibleP.classList.remove('none-p')
        visibleP.classList.add('visible-p')
        li.remove()
    } else {
        visibleP.classList.add('none-p')
        visibleP.classList.remove('visible-p')
    }

    btn.addEventListener('click', function () {
       li.remove()
    })

    nomeItem.value = ''
    nomeItem.focus()

    const itemsLista = document.querySelectorAll('li')
    const maxtems = document.querySelector('.maxItems')

    if (itemsLista.length > 10) {
        maxtems.style.display = 'block'
        visibleP.classList.add('none-p')
        visibleP.classList.remove('visible-p')
        li.remove()
    } else {
        maxtems.style.display = 'none'
    }
    
})


