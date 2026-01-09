"use client";

import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";

interface ConditionalCategorySectionsProps {
  children: ReactNode;
}

export default function ConditionalCategorySections({
  children,
}: ConditionalCategorySectionsProps) {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  // Hide category sections when there's a search query
  if (search && search.trim()) {
    return null;
  }

  return <>{children}</>;
}
