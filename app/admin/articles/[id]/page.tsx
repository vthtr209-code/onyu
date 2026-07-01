"use client";

import { useParams } from "next/navigation";
import { articles } from "@/lib/data/articles";
import { ArticleForm } from "@/components/admin/ArticleForm";

export default function EditArticlePage() {
  const params = useParams();
  const id = params.id as string;
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return (
      <div className="py-20 text-center text-ink-soft">Article not found</div>
    );
  }

  return <ArticleForm mode="edit" initial={article} />;
}
