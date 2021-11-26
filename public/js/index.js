function listMe(beautyPin) {
    let html = "";
    beautyPin.results.forEach(function (result) {
        console.log(result);

        html += `
          <div class = "w3-card-4 w3-margin w3-center beauty-pin-card" style="flex: 0 1 30%; width:50%; border-radius: 20px;" data-id = "${result.id}">
              <div class = "pin-img">
                  <img src = "${result.image}" alt = "beauty image">
              </div>
              <div class = "beauty-pin-name">
                  <h3>${result.title}</h3>
                  <a href = "#" class = "recipe-btn">View Pin</a>
              </div>
          </div>
      `;
        mealList.innerHTML = html;
        mealResults.style.display = "block";
    });
    mealList.classList.remove("notFound");
}