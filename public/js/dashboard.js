const deleteBtn = document.querySelector(".deletePost");
const editBtn = document.querySelector('.editPost');

deleteBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const postId = 2;
    fetch(`/api/posts/${postId}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.href = "/dashboard"
        } else {
            alert("post not deleted or does not exist")
        }
    })
});