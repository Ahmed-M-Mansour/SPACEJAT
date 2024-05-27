import Txt from "./Txt";

function CartItem({ id, name, price, quantity, deleteItem, editItem }) {
  return (
    <div className="grid grid-cols-7 gap-4 w-4/5 m-auto my-3 pl-5 items-center">
      {[name, price, quantity].map((item, i) => {
        return <Txt key={i} txtValue={item} />;
      })}
      <div className="col-span-1 flex">
        <button
          className="py-2 px-4 rounded-lg border-2 mr-1 text-primarryBtnColor border-primarryBtnColor "
          onClick={() => editItem(id, name, price, quantity)}
        >
          Edit
        </button>
        <button
          className="py-2 px-4 rounded-lg text-white ml-1 bg-secondaryBtnColor"
          onClick={() => deleteItem(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default CartItem;
