const loginBtn = document.querySelector('#login');
const logoutBtn = document.querySelector('#logout');

if(!req.session.user){
    logoutBtn.style.display = 'none';
}else{
    loginBtn.style.display = 'none'
}