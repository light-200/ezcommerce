"use client";
import { api } from "~/trpc/react";
import Card from "./_components/ui/card";
import { useEffect, useState } from "react";
import type { Categories } from "@prisma/client";
import Pagination from "./_components/pagination";
import { ImSpinner2 } from "react-icons/im";
import { useSession } from "./_components/sessionContext";
import { useRouter } from "next/navigation";

const PAGE_LENGTH = 6;

export default function Categories() {
  const session = useSession();
  const router = useRouter();
  const [categories, setCategories] = useState<Array<Categories> | undefined>(
    [],
  );
  const [page, setPage] = useState(0);
  const categoryCaller = api.categories.getAll;
  const cat = categoryCaller.useQuery();
  const updateCat = api.categories.update.useMutation();

  useEffect(() => {
    if (!cat.error) {
      setCategories(cat.data);
    } else {
      alert("failed to fetch categories!");
    }
  }, [cat.data, cat.error]);

  if (!session.user) {
    router.push("/login");
  }

  if (session.user && !session.user.emailVerified) {
    router.push("/signup/verify");
  }

  const handleSelectCategory = (category: Categories) => {
    updateCat.mutate({ id: category.id, selected: !category.selected });
    setCategories((prev) =>
      prev?.map((value) => {
        if (value.id == category.id) {
          return { ...value, selected: !value.selected };
        }
        return value;
      }),
    );
    if (updateCat.error) {
      setCategories((prev) =>
        prev?.map((value) => {
          if (value.id == category.id) {
            return { ...value, selected: !value.selected };
          }
          return value;
        }),
      );
      alert("couldn't make changes!");
    }
  };

  return (
    <section className="grid w-screen place-content-center pt-20">
      <Card title="Please mark your interests!">
        <h3 className="text-sm">We will keep you notified.</h3>
        <div className="flex w-full flex-col gap-4">
          <h2 className="text-lg font-semibold">My saved interests!</h2>
          {cat.isLoading && <ImSpinner2 className="animate-spin text-lg" />}
          {categories && cat.isFetched && (
            <>
              <ul className="flex flex-col gap-4">
                {categories
                  ?.slice(page * PAGE_LENGTH, (page + 1) * PAGE_LENGTH)
                  ?.map((category) => (
                    <li className="flex gap-2" key={category.id}>
                      <input
                        type="checkbox"
                        checked={category.selected}
                        onClick={() => handleSelectCategory(category)}
                        className="accent-black"
                        aria-disabled={updateCat.isPending}
                      />
                      <span>{category.name}</span>
                    </li>
                  ))}
              </ul>
            </>
          )}
          <Pagination
            page={page}
            max={
              categories?.length
                ? Math.floor(categories?.length / PAGE_LENGTH)
                : 7
            }
            handlePageSelect={setPage}
          />
        </div>
      </Card>
    </section>
  );
}
