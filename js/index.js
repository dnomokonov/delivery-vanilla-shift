const dropdowns = document.querySelectorAll('.dropdown')

// Реализовать: базовую валидацию

dropdowns.forEach(dropdown => {
    var input = dropdown.querySelector('.dropdownInput')
    var dropdownList = dropdown.querySelector('.dropdown-content')
    var dropdownListItems = dropdownList.querySelectorAll('p')

    input.addEventListener('click', () => {
        showDropdownList(dropdown)
    })

    input.addEventListener('keyup', () => {
        filterSearch(input)
    })

    window.addEventListener('click', function (e) {
        if (!dropdown.contains(e.target)) {
            closeDropdown(dropdown);
        }
    });

    dropdownListItems.forEach(item => {
        item.addEventListener('click', () => {
            input.value = item.innerHTML;
            dropdownList.classList.toggle('show')
        })
    })
})

function showDropdownList(dropdown) {
    var dropdownList = dropdown.querySelector('.dropdown-content')

    dropdownList.classList.toggle('show');
    if (dropdownList.classList.contains('show')) {
        dropdown.querySelector('.fa-angle-down').style.display = 'none'
        dropdown.querySelector('.fa-angle-up').style.display = 'block'
    } else {
        dropdown.querySelector('.fa-angle-up').style.display = 'none'
        dropdown.querySelector('.fa-angle-down').style.display = 'block'
    }
}

function filterSearch(input) {
    const filter = input.value.toUpperCase();
    const dropdown = input.closest('.dropdown');
    const div = dropdown.querySelector('.dropdown-content');
    const p = div.getElementsByTagName('p');

    for (let i = 0; i < p.length; i++) {
        if (p[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            p[i].style.display = '';
        } else {
            p[i].style.display = 'none';
        }
    }
}

function closeDropdown(dropdown) {
    const list = dropdown.querySelector('.dropdown-content');
    const arrowIconDown = dropdown.querySelector('.fa-angle-down');
    const arrowIconUp = dropdown.querySelector('.fa-angle-up');

    if (list.classList.contains('show')) {
        list.classList.remove('show');
        arrowIconDown.style.display = 'block';
        arrowIconUp.style.display = 'none';
    }
}

// Костыль ???. Хотя выше не лучше
const quickList = document.querySelectorAll('.quick-select')
quickList.forEach(item => {
    var quickOptions = item.querySelectorAll('p') 
    var quickId = item.dataset.quickSelect
    var inputQuick = document.querySelector(`input[data-input=${quickId}]`)

    quickOptions.forEach(option => {
        option.addEventListener('click', () => {
            inputQuick.value = option.textContent
        })
    })
})

// Логика для формы с размерами посылки
// Лучше бы мои глаза это не видели 😶. Код очень ужасный (выше тоже самое)
const packageForm = document.querySelector('.package')
const packageInput = packageForm.querySelector('.packageInput')
const packageOptions = packageForm.querySelectorAll('.size-options')
const packageBtnType = packageForm.querySelectorAll('.toggle-btn')

packageInput.addEventListener('click', () => {
    var containerOptions = packageForm.querySelector('.container-options')

    containerOptions.classList.toggle('show')
    if (containerOptions.classList.contains('show')) {
        packageForm.querySelector('.fa-angle-down').style.display = 'none'
        packageForm.querySelector('.fa-angle-up').style.display = 'block'
    } else {
        packageForm.querySelector('.fa-angle-down').style.display = 'block'
        packageForm.querySelector('.fa-angle-up').style.display = 'none'
    }
})

packageBtnType.forEach(btn => {
    btn.addEventListener('click', () => {
        packageForm.querySelector('.active')?.classList.remove('active')
        packageForm.querySelector('.hidden')?.classList.remove('hidden')

        btn.classList.add('active')
        packageOptions.forEach(option => {
            option.classList.toggle('show')
        })
    })
})

function packageClose(form) {
    var container = form.querySelector('.container-options')
    var arrowIconUp = form.querySelector('.fa-angle-up')
    var arrowIconDown = form.querySelector('.fa-angle-down')

    if (container.classList.contains('show')) {
        container.classList.remove('show')
        arrowIconDown.style.display = 'block';
        arrowIconUp.style.display = 'none';
    }
}

// Реализовать: получение размеров из вкладки 'точные'
packageOptions.forEach(listOptions => {
    var option = listOptions.querySelectorAll('p')

    option.forEach(item => {
        item.addEventListener('click', () => {
            packageBtnType.forEach(btn => {
                if (btn.dataset.input === 'default' && btn.classList.contains('active')) {
                    packageInput.value = (item.textContent).split(',')[0]
                    packageClose(packageForm)
                }
            })
        })
    })    
})

window.addEventListener('click', (e) => {
    if (!packageForm.contains(e.target)) {
        packageClose(packageForm)
    }
})

