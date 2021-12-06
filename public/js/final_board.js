let newReview_data = {};
const add_pin_modal = document.querySelector('.add_pin_modal');
const readMoreButton = document.querySelector('.modal-read-more-btn');

document.querySelector('.add_pin').addEventListener('click', () => {
  add_pin_modal.style.opacity = 1;
  add_pin_modal.style.pointerEvents = 'all';
});

document.querySelector('.add_pin_modal').addEventListener('click', (event) => {
  if (event.target === add_pin_modal) {
    reset_modal();
  }
});

document.querySelector('.save_pin').addEventListener('click', () => {
  newReview_data = {
    brand: document.querySelector('#pin_title').value,
    productType: document.querySelector('#pin_product_type').value,
    description: document.querySelector('#pin_description').value,
    price: document.querySelector('#pin_product_price').value,
    destination: document.querySelector('#pin_destination').value,
    c_link: document.querySelector('#c_link').value,
  };
  saveReview(newReview_data);
  reset_modal();
});

const saveReview = async (newReview_data) => {
  const brand = newReview_data.brand;
  const type = newReview_data.productType;
  const description = newReview_data.description;
  const price = newReview_data.price;
  const link = newReview_data.destination;
  const c_url = newReview_data.c_link;
  if (brand && type && description && price && link && c_url) {
    const response = await fetch('/api/reviews', {
      method: 'POST',
      body: JSON.stringify({ brand, type, description, price, link, c_url }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      location.reload();
    } else {
      alert('Failed to create review');
    }
  }
};

$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus');
});

function reset_modal() {
  const modals_pin = document.querySelector('.add_pin_modal .modals_pin');

  add_pin_modal.style.opacity = 0;
  add_pin_modal.style.pointerEvents = 'none';
  document.querySelector('#upload_img_label').style.display = 'block';

  document.querySelector('#pin_title').value = '';
  document.querySelector('#pin_product_type').value = '';
  document.querySelector('#pin_description').value = '';
  document.querySelector('#pin_product_price').value = '';
  document.querySelector('#pin_destination').value = '';
}
