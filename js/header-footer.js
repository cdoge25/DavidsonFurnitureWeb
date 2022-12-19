const $= document.querySelector.bind(document)
const $$= document.querySelectorAll.bind(document)

var users = JSON.parse(localStorage.getItem('users')) || [];
var urlParams = window.location.href;
if(urlParams.toString().includes('dangnhap.html')){
    $('#submit').onclick = function(){
        onLogin();
    }
}
else if(urlParams.toString().includes('dangky.html')){
    $('#submit').onclick = function() {
        onRegister();
    }
}
else if(urlParams.toString().includes('customer-account.html')){
    loadUserInformation();
}
else{
    configHeader();
    scrollWindow();
}

// register
function onRegister() {
    users = JSON.parse(localStorage.getItem('users')) || [];
    let user = {
        email: '',
        password: '',
        phone: '',
        name: ''
    };
    user.email = $('#email').value;
    user.password = $('#password').value;
    user.phone = $('#phone').value;
    user.name = $('#username').value;

    if (!user.email =='' || !user.password =='' || 
        !user.name =='' || !user.phone ==''){
        for (key in user) {
            if (user[key] === "") return false
        }
    
        if (users.find(item => item.email === user.email)) {
            alert("Email đã tồn tại");
            return false;
        }
        users.push(user); 
        localStorage.setItem('users', JSON.stringify(users));
        alert('Đăng ký thành công');
        
        window.location = "dangnhap.html";
    }
    else{
        alert('Vui lòng điền đầy đủ thông tin');
    }
}

function onLogin() {
    if ($('#email').value === "trungpht20411@st.uel.edu.vn" && $('#password').value === "123456"
    || $('#email').value === "haindt20411@st.uel.edu.vn" && $('#password').value === "123456"
    || $('#email').value === "yendh20411@st.uel.edu.vn" && $('#password').value === "123456"
    || $('#email').value === "baodg20411@st.uel.edu.vn" && $('#password').value === "123456"
    || $('#email').value === "anhntt20411@st.uel.edu.vn" && $('#password').value === "123456"){
        alert("Đăng nhập với tư cách người quản lý");
        window.location = "admin.html";
        return true;
    }
    let users = JSON.parse(localStorage.getItem('users'));
    if(users == null){
        alert("Tài khoản chưa được đăng ký");
        window.location = 'dangky.html';
    }
    let user = {
        email: '',
        password: '',
        phone: '',
        name: ''
    };
    user.email = $('#email').value;
    user.password = $('#password').value;
    // Check if user is match
    let checkUser = users.find(item => item.email === user.email);
    if (checkUser) {
        if (checkUser.password === user.password) {
            alert("Đăng nhập thành công");
            localStorage.setItem('is_logged', true);
            window.location = "index.html";
            return true;
        } else {
            alert("Sai mật khẩu, xin thử lại");
            // focus & clear confirm input
            $('#password').focus();
            $('#password').value = "";
            return false;
        }
    } else {
        alert("Email chưa được đăng ký");
        // focus & clear confirm input
        $('#email').focus();
        $('#email').value = "";
        $('#password').value = "";
        return false;
    }
}

function configHeader(){
    // =======Search area===========
    const searchIcon= $('#search-icon')
    const searchInput= $('#search-input')
    
    if(screen.width < 500){
        searchInput.style.display = 'none'
    }
    else{
        searchInput.style.transform = 'scaleX(1)'
        searchIcon.onclick = () => {
            if (searchInput.value ===""){
                return false;
            }
            window.location = 'locsp.html'+'#'+ searchInput.value ;
        }
    }
    
    // Drawer menu
    var menu= $('header nav .menu')
    var menuBtn= $('#menu-icon')
    var closeBtn= $('.menu .close-btn')
    menuBtn.addEventListener('click', () =>{
        menu.classList.add('active')
    })
    closeBtn.addEventListener('click', () =>{
        menu.classList.remove('active')
    })
    // Config user photo
    let isLogIn = localStorage.getItem('is_logged')
    if(isLogIn){
        $('#account-icon .user-photo').classList.add('active')
        $('#account-icon .temp-user').style.display = 'none'
        $('#account-icon').onclick = () =>{
            window.location = 'khachhang.html'
        }
    }
    else{
        if($('#account-icon .user-photo').classList.contains('active'))
            $('#account-icon .user-photo').classList.remove('active')
        $('#account-icon .temp-user').style.display = 'block'
        $('#account-icon').onclick = () =>{
            window.location = 'dangnhap.html'
        }
    }
}

// Catching scrolling event (px) => Header animation
function scrollWindow(){
    document.onscroll= function(){
        var navElement= $('header nav')
        if(window.scrollY >100 || document.documentElement.scrollTop > 100){
            navElement.style.transform= "translateY(-60px)"
            if(window.scrollY > 640 || document.documentElement.scrollTop > 640){
                navElement.style.display= "block"
                navElement.style.position= 'fixed'
                navElement.style.top= "0"
                navElement.style.transform= "translateY(0)"
            }
        }else{
            navElement.style.position= 'relative'
            navElement.style.transform= "translateY(0)"
        }
    }
}

function loadUserInformation(){
    let users = JSON.parse(localStorage.getItem('users'));
    if(users == null){
        return;
    }
    let user = {
        email: '',
        password: '',
        phone: '',
        name: ''
    };
    users.forEach(item => {
        user.email = item.email;
        user.password = item.password;
        user.phone = item.phone;
        user.name = item.name;
    })
    $('.nav-panel .user-name').innerText = user.name;
    $('.fragments .infor .first-name').value = user.name;
    $('.fragments .infor .phone-num').value = user.phone;
    $('.fragments .config .phone-num').value = user.phone;
    $('.fragments .config .email').value = user.email;
}
