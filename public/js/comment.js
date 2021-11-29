const newComment = document.querySelector("#newComment");
const id = document.querySelector("#postId").textContent;

newComment.addEventListener("submit",(e)=>{
    e.preventDefault();
    const blogComment={
        content:document.querySelector("#comment").value,
    }
    fetch('/api/comments/'+id,{
        method:"POST",
        body:JSON.stringify(blogComment),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.reload();
        } else {
            alert("Comment not added")
        }
    })
})