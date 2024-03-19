"use client";
import { api } from "~/trpc/react";
import Card from "../_components/card";
import { useEffect, useState } from "react";
import { Categories } from "@prisma/client";
import Pagination from "../_components/pagination";

const PAGE_LENGTH = 6;

export default function Categories() {
  const [categories, setCategories] = useState<Array<Categories> | undefined>(
    [],
  );
  const [page, setPage] = useState(0);
  const categoryCaller = api.categories.getAll;
  const cat = categoryCaller.useQuery();

  useEffect(() => {
    if (!cat.error) {
      setCategories(cat.data);
    } else {
      alert("failed to fetch categories!");
    }
  });

  return (
    <section className="grid w-screen place-content-center pt-20">
      <Card title="Please mark your interests!">
        <h3 className="text-sm">We will keep you notified.</h3>
        <div className="flex w-full flex-col gap-4">
          <h2 className="text-lg font-semibold">My saved interests!</h2>
          <ul className="flex flex-col gap-4">
            {categories?.slice(page, page + PAGE_LENGTH)?.map((category) => (
              <li className="flex" key={category.id}>
                <input type="checkbox" checked={category.selected} />
                <span>{category.name}</span>
              </li>
            ))}
          </ul>
          <Pagination
            page={page}
            max={Math.floor(categories?.length!! / PAGE_LENGTH)}
            handlePageSelect={setPage}
          />
        </div>
      </Card>
    </section>
  );
}
