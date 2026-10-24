import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { defaultCmsContent } from "../data/cmsDefaults";
import { fetchCmsContent, phoneToTel, saveCmsSection } from "../lib/contentRepository";
import { isSupabaseConfigured } from "../lib/supabase";
import type { CmsContent, SectionKey } from "../types/cms";

type ContentContextValue = {
  content: CmsContent;
  loading: boolean;
  fromCms: boolean;
  refresh: () => Promise<void>;
  updateSection: <K extends SectionKey>(key: K, data: CmsContent[K]) => Promise<void>;
  site: CmsContent["siteMeta"] & { phoneTel: string };
};

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<CmsContent>(defaultCmsContent);
  const [loading, setLoading] = useState(true);
  const [fromCms, setFromCms] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const next = await fetchCmsContent();
      setContent(next);
      setFromCms(isSupabaseConfigured);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const updateSection = useCallback(async <K extends SectionKey>(key: K, data: CmsContent[K]) => {
    await saveCmsSection(key, data);
    setContent((prev) => ({ ...prev, [key]: data }));
  }, []);

  const site = useMemo(
    () => ({
      ...content.siteMeta,
      phoneTel: phoneToTel(content.siteMeta.phone),
    }),
    [content.siteMeta],
  );

  const value = useMemo(
    () => ({ content, loading, fromCms, refresh, updateSection, site }),
    [content, loading, fromCms, refresh, updateSection, site],
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("useContent must be used within ContentProvider");
  return ctx;
}
