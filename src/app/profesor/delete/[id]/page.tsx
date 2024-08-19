"use client";

import { useParams, useRouter } from "next/navigation";

export default async function Delete() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const res = await fetch(
    `https://tp-dsw-back.onrender.com/api/profesor/${id}`,
    {
      method: "Delete",
    },
  ).then(() => router.push("src/app/profesor"));

  return null;
}
