// Post request new comment
const newCommentHandler = async (event) => {
    event.preventDefault();

    const newComment = document.querySelector("#comment").value;
    const reviewId = document.querySelector("#reviewId").value;

    if (newComment) {
        console.log(newComment)
        const response = await fetch("/api/comment", {
            method: "POST",
            body: JSON.stringify({ newComment, reviewId }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            location.reload();
        } else {
            alert("Failed to add comment");
        }
    }
};

// Delete request for comment
// const delCommentHandler = async (event) => {
//     event.preventDefault();
//     if (event.target.hasAttribute("data-id")) {
//         const id = event.target.getAttribute("data-id");

//         const response = await fetch(`/api/comments/${id}`, {
//             method: "DELETE",
//         });
//         if (response.ok) {
//             location.reload();
//         } else {
//             alert("Failed to delete comment");
//         }
//     }
// };

// Update a comment request
// const toggleEditForms = async (event) => {
//     event.preventDefault();
//     const id = event.target.getAttribute("data-id");
//     // Toggle hidden class to display form so a user can edit their comment if they are logged in
//     document.querySelector(`.comment-${id}-form`).classList.toggle("d-none");
//     document.querySelector(`.comment-${id}-text`).classList.toggle("d-none");
// };

// Update comment request
// const updateComment = async (event) => {
//     event.preventDefault();

//     let newComment = event.target.comment.value;
//     let id = event.target.id.value;
//     try {
//         const response = await fetch(`/api/comments/${id}`, {
//             method: "PUT",
//             body: JSON.stringify({ comment: newComment }),
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });
//         // Remove edit form if PUT request is successful
//         document.querySelector(`.comment-${id}-form`).classList.toggle("d-none");
//         document.querySelector(`.comment-${id}-p`).innerHTML = newComment;
//         document.querySelector(`.comment-${id}-text`).classList.toggle("d-none");
//     } catch (error) {
//         alert("Failed to update comment");
//     }
// };

// New comment event listener
document
    .querySelector(".new-comment")
    .addEventListener("submit", newCommentHandler);

// // Delete comment event listener
// var buttons = document.querySelectorAll(".delete-comment");

// buttons.forEach(function (button) {
//     button.addEventListener("click", delCommentHandler);
// });

// // Edit comment event listener
// var editbuttons = document.querySelectorAll(".edit-comment-link");

// editbuttons.forEach(function (button) {
//     button.addEventListener("click", toggleEditForms);
// });

// // Update comment event listener
// var editForms = document.querySelectorAll(".update-comment");

// editForms.forEach(function (button) {
//     button.addEventListener("submit", updateComment);
// });