import CartItem from "./CartItem";
import Txt from "./Txt";

function CartItems({ products, deleteItem, editItem }) {
  return (
    <>
      <div className="grid grid-cols-7 gap-4 w-4/5 m-auto  mt-6 mb-2 pl-5">
        {["Name", "Price", "Quantity"].map((item, i) => {
          return <Txt key={i} txtValue={item} />;
        })}
        <div className=" col-span-1 ">
          <Txt txtValue="Actions" />
        </div>
      </div>
      {products.map((item, i) => {
        return (
          <CartItem
            key={i}
            id={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            deleteItem={deleteItem}
            editItem={editItem}
          />
        );
      })}
    </>
  );
}

export default CartItems;
