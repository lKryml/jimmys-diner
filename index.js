import menuArray from "./data.js";
let orderCreated = false;
const orderTemplate = document.createElement(`div`);
orderTemplate.classList.add("order-container");
const main = document.getElementById("main");
const foodSection = document.getElementById("food-section");
const itemsArr = [];
const modal = document.getElementById("modal");
const modalExit = document.getElementById("modal-exit");
const cardForm = document.getElementById("card-form");

//* converts arguement to html based on data.js(foods)
function getFoodItemsHtml(menu) {
  const foodHTML = menu
    .map((item) => {
      const { name, ingredients, id, price, emoji } = item;
      let itemHtml = `
            <div class="food-item" id="food-${id}">
                <p class="food-icon">${emoji}</p>
                <div class="food-text">
                    <p class="food-name">${name}</p>
                    <p class="food-ingredients">${ingredients}</p>
                    <p class="food-price">$${price}</p>
                </div>
                <button class="food-button mleft" data-food="${id}">+</button>
            </div>
            `;
      return itemHtml;
    })
    .join("");
  return foodHTML;
}

foodSection.insertAdjacentHTML("afterbegin", getFoodItemsHtml(menuArray));

//* calls all necessary funcs and sends item to order list
function renderOrderList() {
  createOrder();
  check();
  const itemsHTML = itemsArr.map((food) => {
    return `
                    <p class="order-item food-name">
                    ${food.name}
                    <button class="remove-order-item-btn" data-remove="${food.id}">
                        remove
                    </button> 
                    </p>
                    <p class="food-price mleft">${food.price}$</p>
    `;
  });

  document.getElementById("order-items").innerHTML = itemsHTML;
  getTotalPrice();
}

// *create order html template and append to main
function createOrder() {
  if (!orderCreated) {
    const orderTemplateHtml = `
            <p class="order-header food-name">Your order</p>
            <div class="order-items" id="order-items">
            </div>
            <div class="total-container">
                <p class="total-price-text food-name">Total price:</p>
                <p class="total-price food-price mleft" id="total-price"></p>
            </div>
            <button class="order-btn" id="order-btn">Complete order</button>
        `;

    orderTemplate.innerHTML = orderTemplateHtml;
    main.appendChild(orderTemplate);
    document.getElementById("order-btn").addEventListener("click", () => {
      if (modal.classList.contains("hidden")) modal.classList.toggle("hidden");
    });
    orderCreated = true;
  }
}
// *check if order is empty and delete order template html
function check() {
  if (!itemsArr.length) {
    main.removeChild(orderTemplate);
    orderCreated = false;
  }
}
// *calc total price of order
function getTotalPrice() {
  let totalPrice = itemsArr.map((food) => {
    return food.price;
  });
  totalPrice = totalPrice.reduce((total, current) => {
    return total + current;
  });
  document.getElementById("total-price").textContent = totalPrice + "$";
}
// *event listener for adding items + removing items
main.addEventListener("click", (e) => {
  if (e.target.dataset.food) {
    let item = menuArray.filter((food) => {
      if (food.id == e.target.dataset.food) {
        return food;
      }
    });
    itemsArr.push(...item);
    renderOrderList();
  } else if (e.target.dataset.remove) {
    removeOrderItem(e.target);
  }
});
// *Remove items from order
function removeOrderItem(item) {
  // ?index implementation
  // const index = itemsArr.findIndex((food) => food.id == item.dataset.remove);
  // if (index !== -1) {
  //   itemsArr.splice(index, 1);
  // }
  itemsArr.every((food, n) => {
    if (food.id == item.dataset.remove) {
      itemsArr.splice(n, 1);
      return false;
    } else return true;
  });
  renderOrderList();
}
// *MODAL
modalExit.addEventListener("click", () => modal.classList.toggle("hidden"));
cardForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const cardFormData = new FormData(cardForm);
  const name = cardFormData.get("name");
  const orderFinishedTemplate = document.createElement("div");
  orderFinishedTemplate.classList.add("order-finished");
  orderFinishedTemplate.innerHTML = `<p>Thanks,${name}! Your order is on its way!</p>`;
  modal.classList.toggle("hidden");
  main.removeChild(orderTemplate);
  main.appendChild(orderFinishedTemplate);
});
