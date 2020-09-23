// Css
var username = document.getElementById('username')
var textUser = document.getElementById("textUser")
var inputDiv = document.getElementById("input-div")
var iconAva = document.getElementById("iconAva")
var btnSubmit = document.getElementById("btnSubmit")
var img = document.getElementById("img")
var login = document.getElementById("login")
username.addEventListener('focus', () => {
    inputDiv.style.borderBottomColor = '#38d39f';
    iconAva.style.color = '#38d39f';
});
username.addEventListener('focus', (event) => {
    textUser.style.top = '0px';
});
username.addEventListener('blur', (event) => {
    if (!username.value) {
        textUser.style.top = '10px';
    }
});