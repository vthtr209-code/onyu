"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { PageHeader } from "@/components/admin/PageHeader";

export default function SettingsPage() {
  const [siteName, setSiteName] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [footerText, setFooterText] = useState("");
  const [defaultLanguage, setDefaultLanguage] = useState("en");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("settings").select("*").eq("id", 1).single();
      if (data) {
        setSiteName(data.site_name ?? "");
        setFacebook(data.facebook ?? "");
        setInstagram(data.instagram ?? "");
        setLinkedin(data.linkedin ?? "");
        setFooterText(data.footer_text ?? "");
        setDefaultLanguage(data.default_language ?? "en");
      }
    }
    load();
  }, []);

  async function handleSave() {
    setSaving(true);
    await supabase.from("settings").update({
      site_name: siteName,
      facebook: facebook || null,
      instagram: instagram || null,
      linkedin: linkedin || null,
      footer_text: footerText,
      default_language: defaultLanguage,
    }).eq("id", 1);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="max-w-2xl">
      <PageHeader title="Settings" description="Website configuration" />

      <div className="mt-8 space-y-6">
        <div>
          <label className="block text-[12px] font-semibold uppercase tracking-wider text-ink-soft/70">Website Name</label>
          <input type="text" value={siteName} onChange={(e) => setSiteName(e.target.value)} className="mt-2 w-full rounded-md border border-line bg-paper px-4 py-2.5 text-[14px] text-ink outline-none focus:border-brass focus:ring-1 focus:ring-brass" />
        </div>

        <div>
          <label className="block text-[12px] font-semibold uppercase tracking-wider text-ink-soft/70">Logo</label>
          <div className="mt-2 flex h-20 items-center justify-center rounded-md border-2 border-dashed border-line bg-paper text-[13px] text-ink-soft/60">
            Upload logo (Supabase Storage — coming soon)
          </div>
        </div>

        <div className="space-y-4 rounded-md border border-line/70 bg-paper p-5">
          <h3 className="text-[12px] font-semibold uppercase tracking-wider text-ink-soft/70">Social Links</h3>
          <div>
            <label className="text-[12px] text-ink-soft">Facebook</label>
            <input type="url" value={facebook} onChange={(e) => setFacebook(e.target.value)} className="mt-1 w-full rounded-md border border-line bg-ivory px-3 py-2 text-[13.5px] text-ink outline-none focus:border-brass" placeholder="https://facebook.com/..." />
          </div>
          <div>
            <label className="text-[12px] text-ink-soft">Instagram</label>
            <input type="url" value={instagram} onChange={(e) => setInstagram(e.target.value)} className="mt-1 w-full rounded-md border border-line bg-ivory px-3 py-2 text-[13.5px] text-ink outline-none focus:border-brass" placeholder="https://instagram.com/..." />
          </div>
          <div>
            <label className="text-[12px] text-ink-soft">LinkedIn</label>
            <input type="url" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className="mt-1 w-full rounded-md border border-line bg-ivory px-3 py-2 text-[13.5px] text-ink outline-none focus:border-brass" placeholder="https://linkedin.com/..." />
          </div>
        </div>

        <div>
          <label className="block text-[12px] font-semibold uppercase tracking-wider text-ink-soft/70">Footer Text</label>
          <textarea value={footerText} onChange={(e) => setFooterText(e.target.value)} rows={2} className="mt-2 w-full rounded-md border border-line bg-paper px-4 py-2.5 text-[14px] text-ink outline-none focus:border-brass focus:ring-1 focus:ring-brass" />
        </div>

        <div>
          <label className="block text-[12px] font-semibold uppercase tracking-wider text-ink-soft/70">Default Language</label>
          <select value={defaultLanguage} onChange={(e) => setDefaultLanguage(e.target.value)} className="mt-2 rounded-md border border-line bg-paper px-4 py-2.5 text-[14px] text-ink outline-none focus:border-brass">
            <option value="en">English</option>
            <option value="ko">Korean (한국어)</option>
            <option value="vi">Vietnamese (Tiếng Việt)</option>
          </select>
        </div>

        <div className="flex items-center gap-3 border-t border-line/70 pt-6">
          <button onClick={handleSave} disabled={saving} className="rounded-md bg-brass px-6 py-2.5 text-[13.5px] font-semibold text-ink transition-colors hover:bg-brass-deep hover:text-ivory disabled:opacity-50">
            {saving ? "Saving..." : "Save Settings"}
          </button>
          {saved && <span className="text-[13px] text-pine">✓ Saved successfully</span>}
        </div>
      </div>
    </div>
  );
}
