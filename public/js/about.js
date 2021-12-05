//About page functionality
const aboutPage = async (e) => {
  e.preventDefault();
  const response = await fetch('/api/reviews', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  console.log('res', response);
  if (response.ok) {
    document.location.replace('/about');
  } else {
    alert(response.statusText);
  }
};

document.querySelector('.about').addEventListener('click', aboutPage);
