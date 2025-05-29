import { db } from "./fireBase.js";

import {
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";

//
const collectionRef = collection(db, "animals");
const breedInput = document.getElementById("breed");
const categoryInput = document.getElementById("category");
const priceInput = document.getElementById("price");
const sourceInput = document.getElementById("source");
const imageUpload = document.getElementById("imageUpload");
const submitButton = document.getElementById("submitButton");
const result = document.getElementById("result");
const animalurl = document.getElementById("url");
const loader = document.getElementById("loader");
const checkoutBtn = document.getElementById("checkoutBtn");
// console.log(checkoutBtn);

checkoutBtn.addEventListener("click", handleCheckout);
let checkout = {};

let globalData;
// console.log(loader);

// // filtering data
document
  .getElementById("goatBtn")
  ?.addEventListener("click", () => getData("goat"));
document
  .getElementById("camelBtn")
  ?.addEventListener("click", () => getData("camel"));
document
  .getElementById("bullBtn")
  ?.addEventListener("click", () => getData("bull"));

document.getElementById("clear")?.addEventListener("click", () => {
  window.location.href = "MainPage.html";
});

// -------------------------------------------------

submitButton?.addEventListener("click", async (e) => {
  e.preventDefault();
  const url = animalurl.value.trim();
  const breed = breedInput.value.trim();
  const category = categoryInput.value.trim();
  const price = priceInput.value.trim();
  const source = sourceInput.value.trim();

  if (!breed || !category || !price || !source) {
    alert("Please fill in all required fields.");
    return;
  }

  try {
    await addDoc(collectionRef, {
      url,
      breed,
      category,
      price,
      source,
    });

    console.log("Submitted data:", {
      url,
      breed,
      category,
      price,
      source,
    });

    alert("Data added successfully!");
    if (alert) {
      window.location.href = "admin.html";
    }
    result.classList.remove("hidden");
    animalurl.value = "";
    breedInput.value = "";
    categoryInput.value = "";
    priceInput.value = "";
    sourceInput.value = "";
    const getData = async () => {
      try {
        const response = await getDocs(collectionRef);
        const products = response.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        container.innerHTML = ""; // clear container before rendering
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  } catch (error) {
    console.error("Error adding document: ", error);
    alert("Failed to add data.");
  }
});

let dataLoaded;
const menu = document.getElementById("menu");
const animalContainer = document.getElementById("animalContainer");
const getData = (filterCategory = null) => {
  getDocs(collectionRef).then((response) => {
    dataLoaded = true;

    let data = response.docs.map((item) => {
      // console.log(item.data());

      return { ...item.data(), id: item.id };
    });

    globalData = data;

    // 💡 If a filter is selected, apply it
    if (filterCategory) {
      data = data.filter(
        (d) => d.category.toLowerCase() === filterCategory.toLowerCase()
      );
    }
    if (dataLoaded) {
      loader.classList.add("hidden");
      menu.classList.remove("hidden");
    }
    // Clear old cards before adding new ones
    animalContainer.innerHTML = "";
    data.forEach((d, i) => {
      const card = document.createElement("div");
      card.id = i;
      // console.log(card.id);

      card.classList.add(
        "bg-white/30",
        "backdrop-blur-md",
        "rounded-xl",
        "shadow-md",
        "p-6",
        "transition",
        "hover:shadow-lg",
        "text-center",
        "flex",
        "flex-col",
        "items-center",
        "space-y-4",
        "w-72",
        "mx-auto"
      );

      card.innerHTML = `
        <img 
          src="${d.url}" 
          alt="${d.name}" 
          class="w-full h-48 object-cover rounded-md"
        />
      
        <div class="space-y-1 text-gray-700">
          <p><strong>Breed:</strong> ${d.breed}</p>
          <p><strong>Category:</strong> ${d.category}</p>
          <p><strong>Price:</strong> Rs ${d.price.toLocaleString()}</p>
          <p><strong>Source:</strong> ${d.source}</p>
        </div>
      
        <div class="flex addCart justify-center space-x-3 pt-3">
          <button id="${d.id}" class="pay-btn addCart ">
  <span id="${d.id}1" class="btn-text addCart">Add to Cart</span>
  <div class="icon-container addCart">
    <svg viewBox="0 0 24 24" class="icon addCart card-icon">
      <path
        d="M20,8H4V6H20M20,18H4V12H20M20,4H4C2.89,4 2,4.89 2,6V18C2,19.11 2.89,20 4,20H20C21.11,20 22,19.11 22,18V6C22,4.89 21.11,4 20,4Z"
        fill="currentColor"
      ></path>
    </svg>
    <svg viewBox="0 0 24 24" class="icon addCart payment-icon">
      <path
        d="M2,17H22V21H2V17M6.25,7H9V6H6V3H18V6H15V7H17.75L19,17H5L6.25,7M9,10H15V8H9V10M9,13H15V11H9V13Z"
        fill="currentColor"
      ></path>
    </svg>
    <svg viewBox="0 0 24 24" class="icon dollar-icon">
      <path
        d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"
        fill="currentColor"
      ></path>
    </svg>

    <svg viewBox="0 0 24 24" class="icon wallet-icon default-icon">
      <path
        d="M21,18V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H19A2,2 0 0,1 21,5V6H12C10.89,6 10,6.9 10,8V16A2,2 0 0,0 12,18M12,16H22V8H12M16,13.5A1.5,1.5 0 0,1 14.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,12A1.5,1.5 0 0,1 16,13.5Z"
        fill="currentColor"
      ></path>
    </svg>

    <svg viewBox="0 0 24 24" class="icon check-icon">
      <path
        d="M9,16.17L4.83,12L3.41,13.41L9,19L21,7L19.59,5.59L9,16.17Z"
        fill="currentColor"
      ></path>
    </svg>
  </div>
</button>

          
        </div>
      `;

      //

      animalContainer.appendChild(card);

      document.getElementById(d.id).addEventListener("click", (e) => {
        // const addCartElement = e.target.closest(".addCart");
        // if (addCartElement) {
        const item = globalData.find((p) => p.id === d.id);

        if (!item) return;

        const cartItem = cart.find((x) => x.id === d.id);

        if (cartItem) {
          cartItem.quantity += 1;
        } else {
          cart.push({ ...item, quantity: 1 });
        }

        updateCartUI();
        // }
      });

      // document.getElementById(d.id).addEventListener("click", (e) => {
      //   // console.log("done");

      //   e.preventDefault();
      //   if (e.target.classList.contains("addCart")) {
      //     alert(card.dataset.id);
      //   }
      // });
    });
  });
};

const container = document.getElementById("buttonDiv");
const button = document.createElement("button");

button.innerText = "Main Page";
Object.assign(
  button.style,
  {
    padding: "10px 20px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    margin: "8px",
  },
  2000
);

button.addEventListener("click", () => {
  window.location.href = "MainPage.html";
});
container?.appendChild(button);

getData();

let cartTab = document.getElementById("cartTab");
const iconCart = document.getElementById("iconCart");
let close = document.getElementById("close");

let CartOpen = false;

iconCart.addEventListener("click", () => {
  if (!CartOpen) {
    cartTab.style.right = "0px";
  } else {
    cartTab.style.right = "-400px";
  }
  CartOpen = !CartOpen;
});

close.addEventListener("click", () => {
  if (!CartOpen) {
    cartTab.style.right = "0px";
  } else {
    cartTab.style.right = "-400px";
  }
  cartTab = !cartTab;
});

let cart = [];

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("book-btn")) {
    const id = e.target.dataset.id;
    const item = data.find((p) => p.id == id);

    const cartItem = cart.find((x) => x.id == id);
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }

    updateCartUI();
  }
});

setTimeout(() => {
  const addtoCart2 = document.getElementById("addtoCart2");
  console.log(addtoCart2);
}, 2000);
// add to card button
const itemsInCart = document.getElementById("itemsInCart");
document.addEventListener("click", (e) => {
  // const addCartElement = e.target.closest(".addCart");
  // if (addCartElement) {
  //   // console.log("test");

  //   // e.target.style.backgroundColor = "green";

  //   // setTimeout(() => {
  //   //   e.target.style.backgroundColor = "";
  //   //   e.target.classList.add("bg-blue-500");
  //   // }, 500);

  //   const id = e.target.id;
  //   const item = globalData.find((p) => p.id === id);
  //   // console.log(item);

  //   if (!item) return;

  //   const cartItem = cart.find((x) => x.id === id);

  //   if (cartItem) {
  //     cartItem.quantity += 1;
  //   } else {
  //     cart.push({ ...item, quantity: 1 });
  //   }

  //   updateCartUI();
  // }

  if (e.target.classList.contains("plus")) {
    const id = e.target.dataset.id;
    const item = cart.find((x) => x.id === id);
    if (item) item.quantity++;

    updateCartUI();
    // console.log(cart);
  }

  if (e.target.classList.contains("minus")) {
    const id = e.target.dataset.id;
    const item = cart.find((x) => x.id === id);
    if (item) {
      item.quantity--;

      if (item.quantity <= 0) {
        cart = cart.filter((x) => x.id !== id);
      }
    }
    updateCartUI();
    // console.log(cart);
  }
});

const listCart = document.querySelector(".listCart");

function updateCartUI() {
  listCart.innerHTML = "";

  cart.forEach((item) => {
    // console.log(item.id);

    const div = document.createElement("div");
    div.className =
      "item grid [grid-template-columns:70px_150px_50px_1fr] gap-3 p-1 my-1 text-center items-center";

    div.innerHTML = `
      <div class="img">
        <img class="w-full h-[60px] object-cover" src="${item.url}" alt="${item.breed}" />
      </div>
      <div class="name">${item.breed}</div>
      <div class="totalPrice">Rs ${item.price}</div>
      <div class="quantity">
        <span class="inline-block w-[25px] h-[25px] bg-white text-black rounded-full cursor-pointer minus" data-id="${item.id}">-</span>
        <span class="inline-block w-[25px] h-[25px] bg-transparent text-white rounded-full">${item.quantity}</span>
        <span class="inline-block w-[25px] h-[25px] bg-white text-black rounded-full cursor-pointer plus" data-id="${item.id}">+</span>
      </div>
    `;

    listCart.appendChild(div);
  });
}

setInterval(itemsInCartSpan);

function itemsInCartSpan() {
  const totalQauntity = cart.reduce((sum, item) => sum + item.quantity, 0);
  itemsInCart.innerText = totalQauntity;
}

function handleCheckout() {
  const totalQauntity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalprice = cart.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  checkout = {
    totalQauntity,
    totalprice,
  };
  alert(
    `Checkout Summary:\n\nTotal Items: ${totalQauntity}\nTotal Price: Rs ${totalprice.toLocaleString()}`
  );
}

// let cardIDs = [];
// const bodyStyle = document.getElementById("darkMode");
// const blackAndWhitebtn = document.getElementById("blackAndWhite");
// let darkMode = false;
// blackAndWhitebtn.addEventListener("click", () => {
//   function useCardIDs() {
//     for (let index = 0; index < cardIDs.length; index++) {
//       let card = array[index];
//       console.log(card);
//       // let something = document.getElementById(cardIDs[i]);

//       if (card & !darkMode) {
//         card.style.backgroundColor = "black";
//         card.style.color = "white";
//       } else {
//         card.style.backgroundColor = "white";
//         card.style.color = "black";
//       }
//     }
//     if (!darkMode) {
//       bodyStyle.style.backgroundColor = "black";
//       bodyStyle.style.color = "white";
//     } else {
//       bodyStyle.style.backgroundColor = "white";
//       bodyStyle.style.color = "black";
//     }
//     useCardIDs();
//     darkMode = !darkMode;
//   }
// });
