function validateNumberInput(inputId, errorId, minValue, maxLength, maxValue, emptyMsg, invalidMsg, maxLenMsg, maxValMsg, intOnlyMsg) {
    const input = document.getElementById(inputId);
    const errorSpan = document.getElementById(errorId);
    const value = input.value.trim();
    const inputValue = input.valueAsNumber;

    if (value === '') {
        input.classList.remove('input-valid');
        input.classList.add('error');
        errorSpan.textContent = emptyMsg;
        errorSpan.classList.add('show');
        return true;
    } else if (value.length > maxLength) {
        input.classList.remove('input-valid');
        input.classList.add('error');
        errorSpan.textContent = maxLenMsg;
        errorSpan.classList.add('show');
        return true;
    } else if (isNaN(inputValue) || inputValue < minValue) {
        input.classList.remove('input-valid');
        input.classList.add('error');
        errorSpan.textContent = invalidMsg;
        errorSpan.classList.add('show');
        return true;
    } else if (inputValue > maxValue) {
        input.classList.remove('input-valid');
        input.classList.add('error');
        errorSpan.textContent = maxValMsg;
        errorSpan.classList.add('show');
        return true;
    } else if (!Number.isInteger(inputValue)) {
        input.classList.remove('input-valid');
        input.classList.add('error');
        errorSpan.textContent = intOnlyMsg;
        errorSpan.classList.add('show');
        return true;
    } else {
        input.classList.remove('error');
        input.classList.add('input-valid');
        errorSpan.textContent = '';
        errorSpan.classList.remove('show');
        return false;
    }
}

function calculateResults() {
    const emp = document.getElementById('employee-count').valueAsNumber;
    const loaves = document.getElementById('loaves-per-employee').valueAsNumber;
    const orders = document.getElementById('order-count').valueAsNumber;

    const total = emp * loaves;
    const success = total >= orders;

    const results = document.getElementById('results');
    results.innerHTML = `
    <p><strong>Kepykla per dieną spės pagaminti:</strong> ${total} kepalų</p>
    <p><strong>Reikia pagaminti:</strong> ${orders} kepalų</p>
    <p><strong>Ar spės pagaminti?</strong> ${success ? 'Taip' : 'Ne'}</p>
  `;
}

const fields = [
    { inputId: 'employee-count', errorId: 'error-employee', min: 1, maxLen: 6, maxVal: 999999 },
    { inputId: 'loaves-per-employee', errorId: 'error-loaves-per-employee', min: 1, maxLen: 6, maxVal: 999999 },
    { inputId: 'order-count', errorId: 'error-order-count', min: 1, maxLen: 6, maxVal: 999999 }
];

fields.forEach(field => {
    document.getElementById(field.inputId).addEventListener('input', () => {
        validateNumberInput(field.inputId, field.errorId, field.min, field.maxLen, field.maxVal,
            'Laukelis negali būti tuščias!',
            `Skaičius turi būti nuo ${field.min}!`,
            `Galima įvesti daugiausiai ${field.maxLen} simbolių!`,
            `Skaičius negali būti didesnis nei ${field.maxVal}!`,
            'Leidžiami tik sveiki skaičiai!'
        );
    });
});

document.getElementById('calculate').addEventListener('click', () => {
    let hasError = false;

    fields.forEach(field => {
        const error = validateNumberInput(field.inputId, field.errorId, field.min, field.maxLen, field.maxVal,
            'Laukelis negali būti tuščias!',
            `Skaičius turi būti nuo ${field.min}!`,
            `Galima įvesti daugiausiai ${field.maxLen} simbolių!`,
            `Skaičius negali būti didesnis nei ${field.maxVal}!`,
            'Leidžiami tik sveiki skaičiai!'
        );
        if (error) hasError = true;
    });

    if (!hasError) calculateResults();
    else {
        document.getElementById('results').innerHTML = '<p class="error">Prašome teisingai užpildyti visus laukelius.</p>';
    }
});

document.getElementById('reset').addEventListener('click', () => {
    fields.forEach(field => {
        const input = document.getElementById(field.inputId);
        const errorSpan = document.getElementById(field.errorId);
        input.value = '0';
        input.classList.remove('error', 'input-valid');
        errorSpan.textContent = '';
        errorSpan.classList.remove('show');
    });

    document.getElementById('results').innerHTML = '<p class="error">Kol kas nieko nėra.</p>';
});






