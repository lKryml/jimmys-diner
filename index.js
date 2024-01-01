import menuArray from "./data.js";
let orderCreated = false;
const base = document.createElement(`div`);
base.classList.add("order-container");
const main = document.getElementById("main");
const foodSection = document.getElementById("food-section");
const itemsArr = [];

// * FINISHED
document.addEventListener("click", (e) => {
  console.log(e.target);
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
// * FINISHED
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
// * FINISHED
foodSection.insertAdjacentHTML("afterbegin", getFoodItemsHtml(menuArray));
// * FINISHED

function getTotalPrice() {
  let totalPrice = itemsArr.map((food) => {
    return food.price;
  });
  totalPrice = totalPrice.reduce((total, current) => {
    return total + current;
  });
  document.getElementById("total-price").textContent = totalPrice + "$";
}
// * FINISHED
// * FINISHED
// * FINISHED
// * FINISHED

function renderOrderList() {
  if (itemsArr.length > 0) {
    createOrder();

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

    console.log("RENDERED THE ORDER LIST");
  } else {
    main.removeChild(base);
  }
  // !base && main.appendChild;
  // console.log(itemsArr);
}

function removeOrderItem(item) {
  console.log("ITEMS ARRRAY:");
  console.log(itemsArr);
  // ai implementation very good.
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
    base.innerHTML += orderTemplateHtml;
    main.appendChild(base);
    orderCreated = true;
  } else {
    console.log("ORDERCREATED IS TRUE");
  }
}
