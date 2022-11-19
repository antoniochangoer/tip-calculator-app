const bill = document.querySelector('.bill');
const btns = document.querySelectorAll('.calculator__btn');
const tipBtns = document.querySelector('.calculator__btns');
const customInput = document.querySelector('.custom');
const people = document.querySelector('.people');
const msg = document.querySelector('.error-msg');
const tipAmount = document.querySelector('.tip-amount');
const totalAmount = document.querySelector('.total-amount');
const btnReset = document.querySelector('.btn-reset');

let totalBill;
let tipPercentage = 0;
let numberOfPeople;

function handleClick(e) {
  e.preventDefault();

  if (e.target.classList.contains('calculator__btn')) {
    // set the custom input to 0 if clicking a button
    customInput.value = '';

    // store tip percentage as number
    const value = e.target.innerText;
    const percentage = removePercentageSign(value);
    tipPercentage = +percentage;

    // set btn class to active
    activeBtn(e.target);

    calculateBill(totalBill, tipPercentage, numberOfPeople);
  }

  if (e.target.classList.contains('custom')) {
    // disable buttons
    disableBtns();

    // read and store value of custom input
    customInput.addEventListener('keyup', (e) => {
      const customValue = +e.target.value;
      if (customValue > 0) {
        tipPercentage = customValue;

        calculateBill(totalBill, tipPercentage, numberOfPeople);
      }
    });
  }
}

function disableBtns() {
  btns.forEach((btn) => {
    btn.classList.remove('active-btn');
  });
}

function activeBtn(el) {
  disableBtns();
  el.classList.add('active-btn');
}

function removePercentageSign(input) {
  const num = input.substring(0, input.length - 1);
  return num;
}

function storeBill(e) {
  const amount = (+e.target.value).toFixed(2);
  totalBill = +amount;

  calculateBill(totalBill, tipPercentage, numberOfPeople);
}

function toggleError() {
  if (numberOfPeople === 0) {
    msg.style.display = 'block';
    people.classList.add('error');
  } else {
    msg.style.display = 'none';
    people.classList.remove('error');
  }
}

function peopleNum(e) {
  numberOfPeople = +e.target.value;

  if (numberOfPeople === 0) {
    toggleError();
    return;
  }

  toggleError();
  calculateBill(totalBill, tipPercentage, numberOfPeople);
}

function updateScreen(tip, total) {
  const val1 = tip.toFixed(2);
  const val2 = total.toFixed(2);

  if (isNaN(val1) || isNaN(val2)) {
    return;
  }

  // Only if tip and total are more then 0
  tipAmount.innerText = `$${val1}`;
  totalAmount.innerText = `$${val2}`;

  // activate resetBtn
  btnReset.classList.add('active');
}

function calculateBill(totalBill, tipAmount, numberOfPeople) {
  let tip = totalBill * (tipAmount / 100);
  let totalTipAmount = tip / numberOfPeople;
  let total = totalTipAmount + totalBill / numberOfPeople;

  // call update screen and pass in the calculations
  updateScreen(totalTipAmount, total);
}

function resetAll(e) {
  e.preventDefault();
  bill.value = '';
  people.value = '';
  tipAmount.innerText = '$0.00';
  totalAmount.innerText = '$0.00';
  numberOfPeople = NaN;
  disableBtns();
  toggleError();
  btnReset.classList.remove('active');
}

tipBtns.addEventListener('click', handleClick);
bill.addEventListener('keyup', storeBill);
people.addEventListener('keyup', peopleNum);
btnReset.addEventListener('click', resetAll);
