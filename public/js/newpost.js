const newPost = document.querySelector("#newPost");
newPost.addEventListener("submit",(event)=>{
    event.preventDefault();
    const blogPost={
        title:document.querySelector("#title").value,
        description:document.querySelector("#description").value,
    }
    fetch("/api/posts",{
        method:"POST",
        body:JSON.stringify(blogPost),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.href = "/dashboard"
        } else {
            alert("post not made")
        }
    })
})