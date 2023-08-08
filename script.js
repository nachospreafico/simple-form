const form = document.querySelector('form');

const firstName = form["first-name"];
const lastName = form["last-name"];
const username = form["username"];
const email = form["email"];
const password = form["password"];
const confirmPassword = form["confirm-password"];
const tAndC = form["t&c"];

const tcContainer = document.querySelector('.checkbox-container');

const firstNameErrorMsg = document.querySelector("#first-name-error");
const lastNameErrorMsg = document.querySelector('#last-name-error');
const usernameErrorMsg = document.querySelector('#username-error');
const emailErrorMsg = document.querySelector("#email-error");

const pwErrorMsg = document.querySelector("#pw-error-msg");
const confirmPwErrorMsg = document.querySelector("#confirm-pw-error");

const tAndCError = document.querySelector("#tc-error");

const submitBtn = form["submit-btn"];
const clearAllBtn = form["clear-all"];

const successDiv = document.querySelector('#success');

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    validateEmptyInput(firstName, firstNameErrorMsg);
    validateEmptyInput(lastName, lastNameErrorMsg);
    validateUsername();
    validateEmail();
    validatePassword();
    validateConfirmPassword();
    if (!validateTerms()) {
        tAndCError.classList.remove("hidden")
    }
    else {
        setTimeout(() => {
            form.remove();
            document.querySelector("#header").remove();
            document.querySelector("#user-first-name").innerHTML = firstName.value;
            showSuccessMsg();
        }, 1500);
    }
});

clearAllBtn.addEventListener("click", clearAllFields);

firstName.addEventListener("change", () => validateEmptyInput(firstName, firstNameErrorMsg));
lastName.addEventListener("change", () => validateEmptyInput(lastName, lastNameErrorMsg));

username.addEventListener("input", validateUsername);

email.addEventListener("input", validateEmail);

password.addEventListener("input", validatePassword);
confirmPassword.addEventListener("input", validateConfirmPassword);

tAndCError.addEventListener("change", validateTerms);

function validatePassword() {
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!?\@]).{8,20}$/;
    if (!regex.test(password.value)) {
        pwErrorMsg.classList.remove("hidden");
        password.classList.add("error-input");
        return true;
    } else {
        pwErrorMsg.classList.add("hidden")
        password.classList.remove("error-input");
        return false;
    }
}

function validateConfirmPassword() {
    if (confirmPassword.value !== password.value) {
        confirmPwErrorMsg.classList.remove("hidden")
        confirmPassword.classList.add("error-input");
        return true;
    } else {
        confirmPassword.classList.remove("error-input");
        confirmPwErrorMsg.classList.add("hidden");
        return false;
    }
}

function validateEmptyInput(input, errorMsg) {
    if (input.value === "" || input.value.trim() === "") {
        input.classList.add("error-input");
        errorMsg.classList.remove("hidden");
        return true;
    } else { 
        input.classList.remove("error-input");
        errorMsg.classList.add("hidden");
        return false;
    }
}

function validateUsername() {
   const regex = /^[a-zA-Z0-9]{6,20}$/;
   if (!regex.test(username.value)) {
        username.classList.add("error-input");
        usernameErrorMsg.classList.remove("hidden")
        return true;
    } else {
        username.classList.remove("error-input");
        usernameErrorMsg.classList.add("hidden");
        return false;
    }
}

function validateEmail() {
    const regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!regex.test(email.value)) {
        email.classList.add("error-input");
        emailErrorMsg.classList.remove("hidden");
        return true;
    } else {
        email.classList.remove("error-input");
        emailErrorMsg.classList.add("hidden");
        return false;
    }
}

function validateTerms() {
    // Check if the "Terms and Conditions" box is checked
    const termsAccepted = tAndC.checked;

    // Return true only if the "Terms and Conditions" box is checked and all required fields are filled
    if (termsAccepted) {
        tcContainer.classList.remove("checkbox-error");
        return true;
    } else {
        tcContainer.classList.add("checkbox-error");
        return false;
    }
}

function clearAllFields() {
    let inputs = document.querySelectorAll("input");
    let errorMessages = document.querySelectorAll(".error-msg");
    inputs.forEach(elem => {
        elem.classList.remove("error-input");
        elem.value = "";
        tcContainer.classList.remove("checkbox-error");
    });
    for (let i = 0; i < errorMessages.length; i++) {
        if (!errorMessages[i].classList.contains("hidden")) {
            errorMessages[i].classList.add("hidden");
        }
    }
}

function showSuccessMsg() {
    successDiv.classList.add("success-container");
    successDiv.classList.remove("hidden");
}