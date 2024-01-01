// Global requirement string variables
symbols = "~`!@#$%^&*()_-+={[}]|\:;'<,>.?/"
numbers = "0123456789"
letters = "abcdefghijklmnopqrstuvwxyz"
uppercases = letters.toUpperCase()

requirements = [[symbols], [numbers], [letters], [uppercases]]
// Custom range input
let rangeInput = document.getElementById('pass-length');
let valueSpan = document.getElementById('value');

rangeInput.addEventListener('input', function() {
    passLength = rangeInput.value;
    valueSpan.textContent = passLength;
})

// Variables
let result = document.getElementById("result-area");
let generateBtn = document.querySelector('.submitBtn');

// Declare requirement
let symbolBtn = document.getElementById('symbol');
let numberBtn = document.getElementById('number');
let upperBtn = document.getElementById('upper');
let lowerBtn = document.getElementById('lower');
let requireCategory = ["symbol", "numbers", "lower", "upper"];
let numOfRequire = requireCategory.length;

generateBtn.addEventListener('click', function() {
    symbolStatus = symbolBtn.checked;
    numberStatus = numberBtn.checked;
    upperStatus = upperBtn.checked;
    lowerStatus = lowerBtn.checked;
    if (!(symbolStatus || numberStatus || upperStatus || lowerStatus)) {
        alert("need a requirements");
    }
    else {
        let options = {"symbol" : 0, "numbers" : 0, "lower" : 0, "upper" : 0};
        let optionStatus = {"symbol" : symbolStatus, "numbers" : numberStatus, "lower" : lowerStatus, "upper" : upperStatus};
        let passLength = rangeInput.value;
        let password = "";
        while (passLength > 0) {
            let num = randomNumber(numOfRequire, 0);
            while (!(optionStatus[requireCategory[num]])) {
                num = randomNumber(numOfRequire, 0);
            }
            options[requireCategory[num]]++;
            passLength--;
        }
        passLength = rangeInput.value;
        let i = 0;
        while (i < passLength) {
            let number = randomNumber(numOfRequire, 0);
            while (options[requireCategory[number]] == 0) {
                number = randomNumber(numOfRequire, 0);
            }
            options[requireCategory[number]]--;
            option = requirements[number].join("");
            let length = option.length;
            position = randomNumber(length, 0);
            password += option[position];
            i += 1
        }
        result.innerText = password;
    }
})

function randomNumber(end, start) {
    return Math.floor(Math.random() * (end - start)) + start;
}

// Copy button
let copyButton = document.getElementById('copyBtn');

// Add an event listener to the button
copyButton.addEventListener('click', function() {
    // Create a range and selection to copy the text
    var range = document.createRange();
    var selection = window.getSelection();

    // Select the text inside the span
    range.selectNodeContents(result);
    selection.removeAllRanges();
    selection.addRange(range);

    // Copy the selected text to the clipboard
    document.execCommand('copy');

    // Clear the selection
    selection.removeAllRanges();

    // Optionally, provide feedback to the user
    alert('Text has been copied to the clipboard!');
});