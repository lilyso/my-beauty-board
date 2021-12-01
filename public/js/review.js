const newReview = async (event) => {

    const brand = document.querySelector('#brand').value.trim();
    const type = document.querySelector('#type').value.trim();
    const price = document.querySelector('#price').value.trim();
    const description = document.querySelector('#description').value.trim();
    const user_create = document.querySelector('#user_create').value.trim();
    if (brand && type && description && price && user_create) {
        const response = await fetch(`/api/reviews`, {
            method: 'POST',
            body: JSON.stringify({ brand, type, description, price, user_create }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/reviews');
        } else {
            alert('Failed to create review');
        }
    }
};
// document
//     .querySelector(".allPosts")
//     .addEventListener("click", newReview)


// const delButtonHandler = async (event) => {
//     if (event.target.hasAttribute('data-id')) {
//         const id = event.target.getAttribute('data-id');

//         const response = await fetch(`/api/projects/${id}`, {
//             method: 'DELETE',
//         });

//         if (response.ok) {
//             document.location.replace('/profile');
//         } else {
//             alert('Failed to delete project');
//         }
//     }
// };


