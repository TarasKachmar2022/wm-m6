let books = [{
    id: "1",
    title: `Apple. Эволюция компьютера`,
    author: `Владимир Невзоров`,
    img: `https://bukva.ua/img/products/449/449532_200.jpg`,
    plot: `Богато иллюстрированный хронологический справочник по истории компьютеров, в котором увлекательно 
    и в структурированном виде изложена информация о создании и развитии техники Apple на фоне истории 
    персональных компьютеров в целом.
    В книге даны описания десятков наиболее значимых моделей устройств как Apple, так и других производителей, 
    сопровождающиеся большим количеством оригинальных студийных фотографий.
    Книга предназначена для широкого круга читателей, интересующихся историей электроники. 
    Она также может послужить источником вдохновения для дизайнеров, маркетологов и предпринимателей.`,
  }, 
  {
    id: "2",
    title: `Как объяснить ребенку информатику`,
    author: `Кэрол Вордерман`,
    img: `https://bukva.ua/img/products/480/480030_200.jpg`,
    plot: `Иллюстрированная энциклопедия в формате инфографики о технических, социальных и культурных аспектах 
    в информатике. Пошагово объясняет, как детям максимально эффективно использовать компьютеры и интернет-сервисы, 
    оставаясь в безопасности. 
    Книга рассказывает обо всем: от хранения данных до жизни в интернет-пространстве, 
    от программирования до компьютерных атак. О том, как компьютеры функционируют, о современном программном 
    обеспечении, устройстве Интернета и цифровом этикете. Все концепты - от хакера до биткоина - 
    объясняются наглядно с помощью иллюстраций и схем.`,
  },
  {
    id: "3",
    title: `Путь скрам-мастера. #ScrumMasterWay`,
    author: `Зузана Шохова`,
    img: `https://bukva.ua/img/products/480/480090_200.jpg`,
    plot: `Эта книга поможет вам стать выдающимся скрам-мастером и добиться отличных результатов с вашей командой. 
    Она иллюстрированная и легкая для восприятия - вы сможете прочитать ее за выходные, а пользоваться полученными 
    знаниями будете в течение всей карьеры.
    Основываясь на 15-летнем опыте, Зузана Шохова рассказывает, какие роли и обязанности есть у скрам-мастера, 
    как ему решать повседневные задачи, какие компетенции нужны, чтобы стать выдающимся скрам-мастером, 
    какими инструментами ему нужно пользоваться.`,
  },

]
const divEl = document.querySelector('#root');

const firstDivEl = document.createElement('div');
firstDivEl.classList.add('first');

const secondDivEl = document.createElement('div');
secondDivEl.classList.add('second');

divEl.append(firstDivEl,secondDivEl);

const titleEl = document.createElement('h1');
titleEl.textContent = 'Title';
titleEl.classList.add('title');

const listEl = document.createElement('ul');
listEl.classList.add('list');

const btnEl = document.createElement('button')
btnEl.classList.add('btn');
btnEl.textContent = 'Add book';
btnEl.addEventListener('click', addBook)

firstDivEl.append(titleEl, listEl, btnEl);

function renderList() {
    const mapkup = books.map(({id, title}) => `<li id="${id}" class = "item"><p class = "txt-item">${title}</p><button class = "btn btn-del">Del</button><button class = "btn btn-edit">Edit</button></li>`).join('');
    listEl.innerHTML = '';
    listEl.insertAdjacentHTML('afterbegin', mapkup);
    const txtItemEl = document.querySelectorAll('.txt-item');
    // for (const txt of txtItemEl) {
    //     txt.addEventListener('click', foo);
    // }
    txtItemEl.forEach(txt => {
        txt.addEventListener('click', renderPreviu);
    });
    const btnDelEl = document.querySelectorAll('.btn-del');
    btnDelEl.forEach(btn => {
        btn.addEventListener('click', delBook)
    });
    const btnEditEl = document.querySelectorAll('.btn-edit');
    btnEditEl.forEach(btn => {
        btn.addEventListener('click', editBook)
    });
}
function renderPreviu(evt) {
    // console.log(evt.target.textContent);
    const book = books.find(({title}) => title === evt.target.textContent);
    secondDivEl.innerHTML = ceretePrivMarkup(book);
}
function ceretePrivMarkup({id, title, author, img, plot}) {
    const privMapkup =  `<div data-id = "${id}"><h2>${title}</h2><p>${author}</p><img src="${img}" alt="book ${title}"><p>${plot}</p></div>`;
    return privMapkup
}

function delBook(evt) {
    const delBook = evt.target.parentNode.getAttribute('id');
    books = books.filter((book) => delBook !== book.id);
    listEl.innerHTML = '';
    renderList();
    const privBook = document.querySelector(`[data-id = '${delBook}']`);
    // privBook .? secondDivEl.innerHTML = '';
    if (privBook) {
        secondDivEl.innerHTML = '';
    }
}

function editBook(evt) {
    const editBook = evt.target.parentNode.getAttribute('id');
    const book = books.find((book) => editBook === book.id);
    console.log(book)
    createFormMarkup(book);
    formObject(book);
    const form = document.querySelector('form');
    form.addEventListener('submit', handleSubmit);
    function handleSubmit(event) {
        event.preventDefault();
        console.log(book);
        const index = books.findIndex(book => book.id === editBook);
        books[index] = book;
        renderList();
        secondDivEl.innerHTML = '';

    }
}
function addBook(evt) {
    const newBook = {
        id: `${Date.now()}`,
        title: '',
        author: '',
        img: '',
        plot: ''
    }
    createFormMarkup(newBook)
    formObject(newBook)
    const form = document.querySelector('form');
    form.addEventListener('submit', handleSubmit);
    function handleSubmit(event) {
        event.preventDefault()
        const values = Object.values(newBook)
        if (values.some(value => value === '')) {
            alert("Заповніть всі рядки");
        }
        books.push(newBook);
        renderList();
        secondDivEl.innerHTML = '';
    }
}


function createFormMarkup(book) {
    const mapkup = `<form action="">
    <label>Title
        <input type="text" name = "title" value= "${book.title}">
    </label>
    <label>Author
        <input type="text" name = "author" value= "${book.author}">
    </label>
    <label>Img
        <input type="text" name = "img" value="${book.img}">
    </label>
    <label>Plot<input type="text" name = "plot" value="${book.plot}"></label>
    <button type = save>Sub</button>
</form> `
secondDivEl.innerHTML = '';
secondDivEl.insertAdjacentHTML('afterbegin', mapkup)
}


renderList()

function formObject(book) {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('change', handleChange);
    });
    function handleChange(event) {
        book[event.target.name] = event.target.value;
    }
}