var socket = io('http://localhost:3000')

var btnLogin = document.getElementById('btnSubmit')
var username = document.getElementById('username')
var userOnline = document.getElementById('userOnline')
var nameChat = document.getElementById('nameChat')
var btnLogout = document.getElementById('btnLogout')
var img = document.getElementById('img')
var login = document.getElementById('login')
var chatForm = document.getElementById('chatForm')
var btnSend = document.getElementById('btnSend')
var textInput = document.getElementById('textInput')
var contentChat = document.getElementById('contentChat')
var isTyping = document.getElementById('isTyping')

// function sendChatID(id){
//     socket.emit('client-send-ID',id)  
//     // $('#myModal').
// }
btnLogin.addEventListener('click', () => {
    socket.emit('client-send-Username', username.value)    
    username.value=''
})
btnLogout.addEventListener('click', () => {
    socket.emit('logout')
    img.style.display = 'flex';
    login.style.display = 'flex';
    chatForm.style.display = 'none';
})
btnSend.addEventListener('click', () => {
    socket.emit('client-send-message', textInput.value)
    textInput.value=''
})
textInput.addEventListener('focus',()=>{
    socket.emit('Typing')
})
textInput.addEventListener('blur',()=>{
    socket.emit('stopTyping')
})
socket.on('Server-send-success', data => {
    img.style.display = 'none';
    login.style.display = 'none';
    chatForm.style.display = 'flex';
    nameChat.innerHTML = "Welcome. I'm glad to see "+data
})
socket.on('Server-send-error', data => {
    alert(data)
})
socket.on('Server-send-array-user', arr => {
    userOnline.innerHTML = ''
    arr.map(item => {
        return userOnline.innerHTML += `<div class='arrUser' onClick="sendChatID('${item.id}')" id='${item.id}'> ${item.data} </div>`
    })
})
socket.on('Server-send-message', data => {
    contentChat.innerHTML+='<div class="text"> <p class="textP">' + data.ms + '</p></div>'
})
socket.on('Server-send-message-others', data => {
    contentChat.innerHTML+='<div class="textOthers"> <p class="textP-Others">' + data.un + ': '+ data.ms + '</p></div>'
})
socket.on('Server-send-Typing', data => {
    isTyping.innerHTML = data + ' đang soạn tin'
})

socket.on('Server-send-stopTyping', data => {
    isTyping.innerHTML = ''
})







