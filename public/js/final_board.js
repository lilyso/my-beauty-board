const add_pin_modal = document.querySelector('.add_pin_modal');

// document.querySelector('.add_pin').addEventListener('click', () => {
//   add_pin_modal.style.opacity = 1;
//   add_pin_modal.style.pointerEvents = 'all';
// });

document.querySelector('.add_pin_modal').addEventListener('click', (event) => {
  if (event.target === add_pin_modal) {
    reset_modal();
  }
});

let pinImageBlob = null;

document.querySelector('#upload_img').addEventListener('change', (event) => {
  if (event.target.files && event.target.files[0]) {
    if (/image\/*/.test(event.target.files[0].type)) {
      const reader = new FileReader();

      reader.onload = function () {
        const new_image = new Image();

        new_image.src = reader.result;
        pinImageBlob = reader.result;

        new_image.onload = function () {
          const modals_pin = document.querySelector(
            '.add_pin_modal .modals_pin'
          );

          new_image.classList.add('pin_max_width');

          document
            .querySelector('.add_pin_modal .pin_image')
            .appendChild(new_image);
          document.querySelector('#upload_img_label').style.display = 'none';

          modals_pin.style.display = 'block';

          if (
            new_image.getBoundingClientRect().width <
              new_image.parentElement.getBoundingClientRect().width ||
            new_image.getBoundingClientRect().height <
              new_image.parentElement.getBoundingClientRect().height
          ) {
            new_image.classList.remove('pin_max_width');
            new_image.classList.add('pin_max_height');
          }

          modals_pin.style.opacity = 1;
        };
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  document.querySelector('#upload_img').value = '';
});

document.querySelector('.save_pin').addEventListener('click', () => {
  const users_data = {
    author: 'Alexis',
    board: 'default',
    brand: document.querySelector('#pin_title').value,
    productType: document.querySelector('#pin_product_type').value,
    description: document.querySelector('#pin_description').value,
    price: document.querySelector('#pin_description').value,
    destination: document.querySelector('#pin_product_price').value,
    imgBlob: pinImageBlob,
    pinSize: document.querySelector('#pin_size').value,
  };

  create_pin(users_data);
  reset_modal();
});

function create_pin(pin_details) {
  const new_pin = document.createElement('div');
  const new_image = new Image();

  new_image.src = pin_details.imgBlob;
  new_pin.style.opacity = 1;

  new_image.onload = function () {
    new_pin.classList.add('card');
    new_pin.classList.add(`card_${pin_details.pinSize}`);
    new_image.classList.add('pin_max_width');

    new_pin.innerHTML = `<div class="pin_title">${pin_details.brand}</div>
<div class="pin_modal">
    <div class="modal_head">
        <div class="save_card">Save</div>
    </div>

    <div class="modal_foot">
        <div class="destination">
            <div class="pint_mock_icon_container">
                <img src="../assets/upper-right-arrow.png" alt="destination" class="pint_mock_icon">
            </div>
            <span>${pin_details.destination}</span>
        </div>

        <div class="pint_mock_icon_container">
            <img src="../assets/send.png" alt="send" class="pint_mock_icon">
        </div>

        <div class="pint_mock_icon_container">
            <img src="../assets/ellipse.png" alt="edit" class="pint_mock_icon">
        </div>
    </div>
</div>

<div class="pin_image">
</div>`;

    document.querySelector('.pin_container').appendChild(new_pin);
    new_pin.children[2].appendChild(new_image);

    if (
      new_image.getBoundingClientRect().width <
        new_image.parentElement.getBoundingClientRect().width ||
      new_image.getBoundingClientRect().height <
        new_image.parentElement.getBoundingClientRect().height
    ) {
      new_image.classList.remove('pin_max_width');
      new_image.classList.add('pin_max_height');
    }

    new_pin.style.opacity = 1;
  };
}

const saveReview = async (event) => {
  const brand = document.querySelector('#pin_title').value.trim();
  const type = document.querySelector('#pin_product_type').value.trim();
  const price = document.querySelector('#pin_product_price').value.trim();
  const description = document.querySelector('#pin_description').value.trim();
  const destination = document
    .querySelector('#pin_product_destination')
    .value.trim();
  if (brand && type && price && description && destination) {
    const response = await fetch(`/api/profile`, {
      method: 'POST',
      body: JSON.stringify({ brand, type, price, description, destination }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create product');
    }
  }
};

function reset_modal() {
  const modals_pin = document.querySelector('.add_pin_modal .modals_pin');

  add_pin_modal.style.opacity = 0;
  add_pin_modal.style.pointerEvents = 'none';
  document.querySelector('#upload_img_label').style.display = 'block';
  modals_pin.style.display = 'none';
  modals_pin.style.opacity = 0;

  if (modals_pin.children[0].children[0]) {
    modals_pin.children[0].removeChild(modals_pin.children[0].children[0]);
  }
  document.querySelector('#pin_title').value = '';
  document.querySelector('#pin_product_type').value = '';
  document.querySelector('#pin_description').value = '';
  document.querySelector('#pin_product_price').value = '';
  document.querySelector('#pin_destination').value = '';
  document.querySelector('#pin_size').value = '';
  pinImageBlog = null;
}

document.querySelector('.save_pin').addEventListener('submit', saveReview);
