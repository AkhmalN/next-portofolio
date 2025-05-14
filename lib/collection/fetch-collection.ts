import { cookies } from "next/headers";
import { collections } from "./collection";

export const fetchCollections = async (
  collectionName: keyof typeof collections,
  params: Record<string, string>
) => {
  let url = `${process.env.ORIGIN_URL}${collections[collectionName]}`;
  console.log("fetch tags =>", collectionName);
  if (collections[collectionName].includes("[id]") && params.id) {
    url = `${process.env.ORIGIN_URL}${collections[collectionName].replace(
      "[id]",
      params.id
    )}`;
  }

  const token = cookies().get("access_token")?.value;
  console.log(new Date().getSeconds());
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: [collectionName],
      revalidate: 30,
    },
  });

  if (!res.ok) {
    console.error("Check network connection");
  }

  const result = await res.json();
  return { [collectionName]: result };
};
