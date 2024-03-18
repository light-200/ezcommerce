import { api } from "~/trpc/server";

export default async function Home() {
  const categories = await api.categories.getAll();
  return (
    <main className="grid place-items-center">
      <h1 className="text-lg font-bold">Categories</h1>
      <ul>
        {categories &&
          categories.map((category) => (
            <li
              className={`mb-2 w-[100px] rounded-sm bg-gray-100 p-2 shadow transition-all duration-100 hover:translate-y-1 hover:scale-105 ${category.selected && "bg-gray-600"}`}
              key={category.id}
            >
              {category.name}
            </li>
          ))}
      </ul>
    </main>
  );
}
