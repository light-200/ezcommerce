import { BiCart, BiSearch } from "react-icons/bi";

export default function Nav() {
  return (
    <div className="flex flex-col p-2 px-4">
      <div className="self-end">
        <nav>
          <ul className="flex cursor-pointer gap-2 text-xs">
            <li>Help</li>
            <li>Order & Returns</li>
            <li>Hi, John</li>
          </ul>
        </nav>
      </div>
      <div className="flex flex-1 items-baseline justify-between py-2 pt-4 text-sm">
        <span className="text-lg font-bold">ECOMMERCE</span>
        <nav>
          <ul className="flex gap-4">
            <li>Categories</li>
            <li>Sale</li>
            <li>Clearance</li>
            <li>New Stock</li>
            <li>Trending</li>
          </ul>
        </nav>
        <nav>
          <ul className="flex cursor-pointer gap-4 text-lg">
            <li>
              <BiSearch />
            </li>
            <li>
              <BiCart />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
