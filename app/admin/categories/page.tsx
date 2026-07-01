"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { PageHeader } from "@/components/admin/PageHeader";

interface Category {
  id: string;
  name: string;
  slug: string;
  color: string | null;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newName, setNewName] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [newColor, setNewColor] = useState("#a97c50");

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    const { data } = await supabase.from("categories").select("*").order("name");
    setCategories(data ?? []);
  }

  async function handleAdd() {
    if (!newName.trim()) return;
    const slug = newSlug || newName.toLowerCase().replace(/\s+/g, "-");
    await supabase.from("categories").insert({ name: newName, slug, color: newColor });
    setNewName("");
    setNewSlug("");
    loadCategories();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this category?")) return;
    await supabase.from("categories").delete().eq("id", id);
    loadCategories();
  }

  return (
    <div className="max-w-3xl">
      <PageHeader title="Categories" description="Manage article categories" />

      <div className="mt-8 flex flex-wrap items-end gap-3 rounded-md border border-line/70 bg-paper p-5">
        <div className="flex-1">
          <label className="block text-[12px] font-medium text-ink-soft">Name</label>
          <input
            type="text"
            value={newName}
            onChange={(e) => { setNewName(e.target.value); setNewSlug(e.target.value.toLowerCase().replace(/\s+/g, "-")); }}
            className="mt-1 w-full rounded-md border border-line px-3 py-2 text-[13.5px] text-ink outline-none focus:border-brass"
            placeholder="Category name"
          />
        </div>
        <div className="flex-1">
          <label className="block text-[12px] font-medium text-ink-soft">Slug</label>
          <input type="text" value={newSlug} onChange={(e) => setNewSlug(e.target.value)} className="mt-1 w-full rounded-md border border-line px-3 py-2 text-[13.5px] font-mono text-ink-soft outline-none focus:border-brass" />
        </div>
        <div>
          <label className="block text-[12px] font-medium text-ink-soft">Color</label>
          <input type="color" value={newColor} onChange={(e) => setNewColor(e.target.value)} className="mt-1 h-9 w-12 cursor-pointer rounded border border-line" />
        </div>
        <button onClick={handleAdd} className="rounded-md bg-brass px-4 py-2 text-[13px] font-semibold text-ink hover:bg-brass-deep hover:text-ivory">
          Add
        </button>
      </div>

      <div className="mt-6 overflow-hidden rounded-md border border-line/70">
        <table className="w-full text-left text-[13.5px]">
          <thead className="border-b border-line/70 bg-paper">
            <tr>
              <th className="px-4 py-3 font-medium text-ink-soft">Color</th>
              <th className="px-4 py-3 font-medium text-ink-soft">Name</th>
              <th className="px-4 py-3 font-medium text-ink-soft">Slug</th>
              <th className="px-4 py-3 font-medium text-ink-soft">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-b border-line/40 last:border-0">
                <td className="px-4 py-3">
                  <div className="h-5 w-5 rounded-full border border-line" style={{ background: cat.color ?? "#ccc" }} />
                </td>
                <td className="px-4 py-3 font-medium text-ink">{cat.name}</td>
                <td className="px-4 py-3 font-mono text-ink-soft">{cat.slug}</td>
                <td className="px-4 py-3">
                  <button onClick={() => handleDelete(cat.id)} className="text-[12px] font-medium text-red-600/70 hover:text-red-700">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
