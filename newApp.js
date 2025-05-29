import { db } from "./fireBase.js";

import {
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js";
const productListContainer = document.getElementById("productList");
const productList = document.getElementById("productList");
const loader = document.getElementById("loader");
const collectionRef = collection(db, "animals");
let itemsFromFireStore = [];
const getData = async () => {
  try {
    const response = await getDocs(collectionRef);
    itemsFromFireStore = response.docs.map((doc) => ({
      ...doc.data(),
    }));

    if (itemsFromFireStore) {
      loader.classList.add("hidden");
      productList.classList.remove("hidden");
    }

    // productListContainer.innerHTML = ""; // clear container before rendering
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
await getData();

itemsFromFireStore.forEach((d) => {
  console.log(d);

  const card = document.createElement("div");

  card.classList.add(
    "bg-white",
    "rounded-xl",
    "shadow-md",
    "p-2",
    "transition",
    "hover:shadow-lg",
    "text-center",
    "flex",
    "flex-col",
    "items-center"
    // "space-y-3"
  );

  card.innerHTML = `
  <div class="flex flex-col w-64 h-70  items-center">
  <img 
  src="${d.url}" 
  alt="${d.name}" 
  class="w-80 h-48 sm:h-56 md:h-64 object-center rounded-md mb-4"
/>

  <div class="">
      <p class="text-gray-700"><strong>Breed:</strong> ${d.breed}</p>
      <p class="text-gray-700"><strong>Category:</strong> ${d.category}</p>
      <p class="text-gray-700"><strong>Price:</strong> Rs ${d.price.toLocaleString()}</p>
      <p class="text-gray-700"><strong>Source:</strong> ${d.source}</p>
      </div>

      <div class="flex space-x-3 mt-4">
        <button id=${
          d.id
        }  class="book-btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add to Cart
        </button>
        <button class="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">
          Contribute
        </button>
      </div>
      </div>
    `;
  productList.appendChild(card);
});

const iconCart = document.getElementById("iconCart")
