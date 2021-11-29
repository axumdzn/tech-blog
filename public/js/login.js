const loginForm = document.querySelector("#loginForm");
loginForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    const userObject={
        username:document.querySelector("#username").value,
        password:document.querySelector("#password").value,
    };
    fetch("/api/users/login",{
        method:"POST",
        body:JSON.stringify(userObject),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.href = "/dashboard"
        } else {
            alert("User not found")
        }
    })
})