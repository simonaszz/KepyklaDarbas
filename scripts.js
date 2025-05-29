


// Validacija įvesties laukeliams:

function validateNumberInput(inputId,
    errorId,
    minValue,
    maxLength,
    maxValue,
    emptyMessage,
    invalidMessage,
    maxLengthMessage,
    maxValueMessage,
    integerOnlyMessage) {
    const input = document.getElementById(inputId);
    const errorSpan = document.getElementById(errorId);
    const value = input.value;
    const inputValue = input.valueAsNumber;


    if (value === '') {
        input.classList.remove('input-valid');
        input.classList.add('error');
        errorSpan.textContent = emptyMessage;
        errorSpan.classList.add('show');

    } else if (value.length > maxLength) {
        input.classList.remove('input-valid');
        input.classList.add('error');
        errorSpan.textContent = maxLengthMessage;
        errorSpan.classList.add('show');

    } else if (isNaN(inputValue) || inputValue < minValue) {
        input.classList.remove('input-valid');
        input.classList.add('error');
        errorSpan.textContent = invalidMessage;
        errorSpan.classList.add('show');

    } else if (inputValue > maxValue) {
        input.classList.remove('input-valid');
        input.classList.add('error');
        errorSpan.textContent = maxValueMessage;
        errorSpan.classList.add('show');

    } else if (!Number.isInteger(inputValue)) {
        input.classList.remove('input-valid');
        input.classList.add('error');
        errorSpan.textContent = integerOnlyMessage;
        errorSpan.classList.add('show');

    } else {
        input.classList.remove('error');
        input.classList.add('input-valid');
        errorSpan.textContent = '';
        errorSpan.classList.remove('show');
    }
}

document.getElementById('employee-count').addEventListener('input', function () {
    validateNumberInput(
        'employee-count',
        'error-employee',
        1,               // min
        6,               // max length (simboliai)
        999999,          // max value (reikšmė)
        'Laukelis negali būti tuščias!',
        'Galima įvesti tik skaičių nuo 1!',
        'Galima įvesti daugiausiai 6 simbolius!',
        'Skaičius negali būti didesnis nei 999999!',
        'Leidžiami tik sveiki skaičiai!'
    );
});

document.getElementById('loaves-per-employee').addEventListener('input', function () {
    validateNumberInput(
        'loaves-per-employee',
        'error-loaves-per-employee',
        1,               // min
        6,               // max length (simboliai)
        999999,          // max value (reikšmė) 
        'Laukelis negali būti tuščias!',
        'Galima įvesti tik skaičių nuo 1!',
        'Galima įvesti daugiausiai 6 simbolius!',
        'Skaičius negali būti didesnis nei 999999!',
        'Leidžiami tik sveiki skaičiai!'
    );
});

document.getElementById('order-count').addEventListener('input', function () {
    validateNumberInput(
        'order-count',
        'error-order-count',
        1,               // min
        6,               // max length (simboliai)
        999999,          // max value (reikšmė)
        'Laukelis negali būti tuščias!',
        'Galima įvesti tik skaičių nuo 1!',
        'Galima įvesti daugiausiai 6 simbolius!',
        'Skaičius negali būti didesnis nei 999999!',
        'Leidžiami tik sveiki skaičiai!'
    );
});





document.getElementById('calculate').addEventListener('click', function () {
    const fields = [
        {
            inputId: 'employee-count',
            errorId: 'error-employee',
            min: 1,
            maxLen: 6,
            maxVal: 999999
        },
        {
            inputId: 'loaves-per-employee',
            errorId: 'error-loaves-per-employee',
            min: 1,
            maxLen: 6,
            maxVal: 999999
        },
        {
            inputId: 'order-count',
            errorId: 'error-order-count',
            min: 1,
            maxLen: 6,
            maxVal: 999999
        }
    ];

    let hasError = false;

    fields.forEach(field => {
        const error = validateNumberInput(
            field.inputId,
            field.errorId,
            field.min,
            field.maxLen,
            field.maxVal,
            'Laukelis negali būti tuščias!',
            `Skaičius turi būti nuo ${field.min}!`,
            `Galima įvesti daugiausiai ${field.maxLen} simbolius!`,
            `Skaičius negali būti didesnis nei ${field.maxVal}!`,
            'Leidžiami tik sveiki skaičiai!'
        );

        if (error) hasError = true;
    });

    if (hasError) {
        document.getElementById('results').innerHTML = '<p style="color: red;">Prašome teisingai užpildyti visus laukelius.</p>';
    } else {
        let calculateButton = document.getElementById('calculate')
        calculateButton.addEventListener('click', function () {
            console.log('clicked')
            let employeeCount = document.getElementById('employee-count').valueAsNumber
            let loavesPerEmployee = document.getElementById('loaves-per-employee').valueAsNumber
            let orderCount = document.getElementById('order-count').valueAsNumber

            let kepyklaTotal = employeeCount * loavesPerEmployee
            let arPavyks = kepyklaTotal >= orderCount

            let results = document.getElementById('results')
            results.innerHTML = `<p><strong>Kepykla per dieną spės pagaminti:</strong> ${kepyklaTotal} kepalų</p>`
            results.innerHTML += `<p><strong>Reikia pagaminti:</strong> ${orderCount} kepalų</p>`
            results.innerHTML += `<p><strong>Ar spės pagaminti?</strong> ${arPavyks ? 'Taip' : 'Ne'}</p>`
        })





    }
});


// Reset inputs

document.getElementById('reset').addEventListener('click', function () {
    const inputs = [
        { id: 'employee-count', errorId: 'error-employee' },
        { id: 'loaves-per-employee', errorId: 'error-loaves-per-employee' },
        { id: 'order-count', errorId: 'error-order-count' }
    ];

    inputs.forEach(item => {
        const input = document.getElementById(item.id);
        const errorSpan = document.getElementById(item.errorId);

        input.value = '0';
        input.classList.remove('error', 'input-valid');
        errorSpan.textContent = '';
        errorSpan.classList.remove('show');
    });

    document.getElementById('results').innerHTML = '<p>Kol kas nieko nėra.</p>';
});








/* INSTRUKCIJOS:
Papildykite projektą:
- Šiame projekte atliktas tik pradinis stiliavimas, tačiau galima padaryti ir daugiau dalykų. Pagalvokite ar galima kaip nors atnaujinti dizainą, jo nesudarkant. Pavyzdžiui, gal gali įvesties laukeliai reaguoti į pelės užvedimą, ar patvarkyti gal kokius tarpus, gal įnešti kokių spalvų įvairiose vietose, dar gal ką nors padaryti su įvesties laukeliais, mygtukų stiliai, ir pan.
- Iki galo padaryti validacijas su įvesties laukeliais (dabar yra atlikta tik su vienu).
- Pridėti daugiau įvesties laukelių ir/ar skaičiavimų iš duotos informacijos.
- Pridėti informacinių tekstų, kurie paaiškintų ką kuris laukelis ar skaičiavimas reiškia ir pan.
*/