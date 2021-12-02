let newReview_data = {};
const add_pin_modal = document.querySelector('.add_pin_modal');

document.querySelector('.add_pin').addEventListener('click', () => {
  add_pin_modal.style.opacity = 1;
  add_pin_modal.style.pointerEvents = 'all';
});

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
  newReview_data = {
    author: 'Alexis',
    board: 'default',
    brand: document.querySelector('#pin_title').value,
    productType: document.querySelector('#pin_product_type').value,
    description: document.querySelector('#pin_description').value,
    price: document.querySelector('#pin_product_price').value,
    destination: document.querySelector('#pin_destination').value,
    imgBlob: pinImageBlob,
    pinSize: document.querySelector('#pin_size').value,
  };
  console.log(newReview_data);
  saveReview(newReview_data);
  create_pin(newReview_data);
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

    new_pin.innerHTML = `<div id="pin_title" data-brand='${newReview_data.brand}'></div>
    <div id="pin_product_type" data-type='${newReview_data.productType}'></div>
    <div id="pin_product_price" data-price='${newReview_data.price}'></div>
    <div id="pin_description" data-descr='${newReview_data.description}'></div>
<div class="pin_modal">

    <div class="modal_foot">
      <div class="pint_mock_icon_container">
        <div id="pin_destination" class="destination">
          <a href='${newReview_data.destination}' target='_blank'><img
                    src='../assets/upper-right-arrow.png'
                    alt='destination'
                    class='pint_mock_icon'
                  /></a>
            </div>
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

const saveReview = async (newReview_data) => {
  const brand = newReview_data.brand;
  const type = newReview_data.productType;
  const price = newReview_data.price;
  const description = newReview_data.description;
  const link = newReview_data.destination;
  if (brand && type && price && description && link) {
    const response = await fetch('/api/reviews', {
      method: 'POST',
      body: JSON.stringify({ brand, type, price, description, link }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create review');
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
