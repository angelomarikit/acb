import { defaultCmsContent } from "../data/cmsDefaults";
import type { CmsContent, SectionKey } from "../types/cms";
import { SECTION_KEYS } from "../types/cms";
import { getSupabase, isSupabaseConfigured } from "./supabase";

function mergeContent(partial: Partial<CmsContent>): CmsContent {
  return {
    ...defaultCmsContent,
    ...partial,
  };
}

export async function fetchCmsContent(): Promise<CmsContent> {
  if (!isSupabaseConfigured) {
    return defaultCmsContent;
  }

  const supabase = getSupabase();
  const { data, error } = await supabase.from("content_sections").select("key, data");

  if (error || !data?.length) {
    console.warn("CMS fetch failed, using defaults:", error?.message);
    return defaultCmsContent;
  }

  const partial: Partial<CmsContent> = {};
  for (const row of data) {
    const key = row.key as SectionKey;
    if (SECTION_KEYS.includes(key)) {
      (partial as Record<string, unknown>)[key] = row.data;
    }
  }

  return mergeContent(partial);
}

export async function saveCmsSection<K extends SectionKey>(key: K, data: CmsContent[K]): Promise<void> {
  const supabase = getSupabase();
  const { error } = await supabase.from("content_sections").upsert({ key, data }, { onConflict: "key" });
  if (error) throw error;
}

export async function seedCmsDefaults(): Promise<void> {
  const supabase = getSupabase();
  const rows = SECTION_KEYS.map((key) => ({
    key,
    data: defaultCmsContent[key],
  }));
  const { error } = await supabase.from("content_sections").upsert(rows, { onConflict: "key" });
  if (error) throw error;
}

export async function uploadCmsMedia(file: File, folder: string): Promise<string> {
  const supabase = getSupabase();
  const ext = file.name.includes(".") ? file.name.split(".").pop() : "bin";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from("media").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;

  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return data.publicUrl;
}

export function phoneToTel(phone: string): string {
  const digits = phone.replace(/\s/g, "");
  return digits.startsWith("tel:") ? digits : `tel:${digits}`;
}
