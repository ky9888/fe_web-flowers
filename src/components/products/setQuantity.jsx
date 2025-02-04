"use client";


export default function SetQuantity({
  cartItem ,
  handleQtyIncrease,
  handleQtyDecrease,
}) {

  return (
    <div className="space-y-2">
      <div className="flex border w-[90px] h-9 items-center rounded-xl">
        <button
          onClick={handleQtyDecrease}
          className="w-1/4 bg-slate-100 hover:bg-gray-400 h-full rounded-l-xl"
        >
          -
        </button>
        <p className="w-2/4   border-r h-full flex items-center justify-center border-l">
          {cartItem.quantity}
        </p>
        <button
          onClick={handleQtyIncrease}
          className="w-1/4 bg-slate-100  hover:bg-gray-400 h-full rounded-r-xl"
        >
          +
        </button>
      </div>
    </div>
  );
}
