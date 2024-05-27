"use client";
import CartItems from "@/app/_components/CartItems";
import Header from "@/app/_components/Header";
import Input from "@/app/_components/Input";
import { useState } from "react";
import useAuth from "@/app/_hooks/useAuth";
import { useLocalStorage } from "@/app/_hooks/useLocalStorage";

function Home() {
  useAuth();
  console.log(useAuth());
  const [name, setName] = useState("");
  const [price, setPrice] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [users, setUsers] = useLocalStorage("users", []);
  const loggedInUser = users.find((user) => user.isLoggedIn === true);
  const [productContainer, setProductContainer] = useState(
    loggedInUser ? loggedInUser.products || [] : []
  );
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  function updateUserProducts(products) {
    const loggedInUserIndex = users.findIndex(
      (user) => user.isLoggedIn === true
    );
    if (loggedInUserIndex !== -1) {
      const updatedUsers = [...users];
      updatedUsers[loggedInUserIndex].products = products;
      setUsers(updatedUsers);
    }
  }

  function handleinputName(item) {
    setName(item);
  }

  function handleinputPrice(item) {
    setPrice(Number(item));
  }

  function handleinputQuantity(item) {
    setQuantity(Number(item));
  }

  function handleAddItem() {
    const newProductContainer = isEditing
      ? productContainer.map((item) =>
          item.id === currentProductId
            ? { ...item, name, price, quantity }
            : item
        )
      : [...productContainer, { id: Date.now(), name, price, quantity }];

    setProductContainer(newProductContainer);
    updateUserProducts(newProductContainer);

    setIsEditing(false);
    setCurrentProductId(null);
    setName("");
    setPrice(1);
    setQuantity(1);
  }

  function handleEditItem(id, currentName, currentPrice, currentQuantity) {
    setIsEditing(true);
    setCurrentProductId(id);
    setName(currentName);
    setPrice(currentPrice);
    setQuantity(currentQuantity);
  }

  function handleDeleteItem(id) {
    const newProductContainer = productContainer.filter(
      (item) => item.id !== id
    );
    setProductContainer(newProductContainer);
    updateUserProducts(newProductContainer);
  }

  function handleDownload() {
    const jsonData = JSON.stringify(productContainer, null, 2);

    const blob = new Blob([jsonData], { type: "application/json" });

    const tempAnchor = document.createElement("a");
    tempAnchor.href = URL.createObjectURL(blob);
    tempAnchor.download = "products.json"; // File name

    tempAnchor.click();

    URL.revokeObjectURL(tempAnchor.href);
  }

  return (
    <div>
      <Header />
      <div className="grid grid-cols-7 gap-4 w-4/5 mx-auto border-b-2 pb-12 my-6 ">
        <div className="col-span-2">
          <Input
            inputName="Name"
            inputType="text"
            inputPlaceholder="Enter your name"
            inputValue={name}
            handleinputValue={handleinputName}
          />
        </div>
        <div className="col-span-2">
          <Input
            inputName="Price"
            inputType="number"
            inputPlaceholder="Enter price"
            inputValue={price}
            handleinputValue={handleinputPrice}
          />
        </div>
        <div className="col-span-2">
          <Input
            inputName="Quantity"
            inputType="number"
            inputPlaceholder="Enter quantity"
            inputValue={quantity}
            handleinputValue={handleinputQuantity}
          />
        </div>
        <div className="col-span-1">
          <button
            className="rounded-lg text-white text-sm w-32 h-12 self-center mt-6"
            style={{ backgroundColor: "#26B7CD", maxHeight: "48px" }}
            onClick={handleAddItem}
          >
            {isEditing ? "Update" : "Add"}
          </button>
        </div>
      </div>
      <CartItems
        products={productContainer}
        deleteItem={handleDeleteItem}
        editItem={handleEditItem}
      />
      {productContainer.length !== 0 && (
        <div className="text-center mt-44">
          <button
            className="rounded-lg text-white text-sm w-48 h-12"
            style={{ backgroundColor: "#26B7CD" }}
            onClick={handleDownload}
          >
            Download Product Table
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
