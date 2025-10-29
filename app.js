let dropdowns = document.querySelectorAll('.dropdown select');
let btn = document.querySelector('form button');

for (let select of dropdowns) {
    for (let currCode in countryList) {

        let newOption = document.createElement('option');
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener('change', (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {

    let newValue = element.value;
    let countryCode = countryList[newValue];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector('.select-container img');
    img.src = newSrc;

}

btn.addEventListener('click', (e) => {

    e.preventDefault();
    updateCurrency();

});

const updateCurrency = async () => {
    let amount = document.querySelector('.amount input');
    let fromCurr = document.querySelector('.from select');
    let toCurr = document.querySelector('.to select');
    let msg = document.querySelector('.msg');

    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    const URL = `https://api.exchangerate-api.com/v4/latest/${fromCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();

    let finalAmount = data.rates[toCurr.value];

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

window.addEventListener('load', () => {
    updateCurrency();
})