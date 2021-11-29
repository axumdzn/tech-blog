const deleteBtn = document.querySelector(".deletePost");




deleteBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const postId = parseInt(this.data.blogid);
    console.log(postId);
    fetch(`/api/blogs/${postId}`,{
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