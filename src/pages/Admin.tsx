import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/useAuth";
import { supabase } from "../lib/supabase";
import { useSiteContent, saveSiteContent } from "../lib/useSiteContent";
import {
  DEFAULT_CONTENT,
  type SiteContent,
  type ServiceBlurb,
  type GalleryPhoto,
  type Review,
} from "../config/content";
import ImageUploadField from "../components/ImageUploadField";
import { LogOutIcon, PlusIcon, TrashIcon } from "../components/icons";

export default function Admin() {
  const navigate = useNavigate();
  const { isLoggedIn, loading: authLoading } = useAuth();
  const { content: loaded, loading: contentLoading } = useSiteContent();
  const [form, setForm] = useState<SiteContent>(DEFAULT_CONTENT);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!contentLoading) setForm(loaded);
  }, [contentLoading, loaded]);

  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      navigate("/login", { replace: true });
    }
  }, [authLoading, isLoggedIn, navigate]);

  if (authLoading || contentLoading || !isLoggedIn) {
    return <div className="loading-shell">Cargando...</div>;
  }

  function update<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  // Servicios
  function updateService(index: number, field: keyof ServiceBlurb, value: string) {
    setForm((f) => {
      const services = [...f.services];
      services[index] = { ...services[index], [field]: value };
      return { ...f, services };
    });
  }
  function addService() {
    setForm((f) => ({ ...f, services: [...f.services, { title: "", description: "" }] }));
  }
  function removeService(index: number) {
    setForm((f) => ({ ...f, services: f.services.filter((_, i) => i !== index) }));
  }

  // Galeria
  function updateGalleryLabel(index: number, label: string) {
    setForm((f) => {
      const gallery = [...f.gallery];
      gallery[index] = { ...gallery[index], label };
      return { ...f, gallery };
    });
  }
  function updateGalleryUrl(index: number, url: string) {
    setForm((f) => {
      const gallery = [...f.gallery];
      gallery[index] = { ...gallery[index], url };
      return { ...f, gallery };
    });
  }
  function addGalleryPhoto(url: string) {
    setForm((f) => ({ ...f, gallery: [...f.gallery, { url, label: "" } as GalleryPhoto] }));
  }
  function removeGalleryPhoto(index: number) {
    setForm((f) => ({ ...f, gallery: f.gallery.filter((_, i) => i !== index) }));
  }

  // Por que elegirnos (siempre 3 razones, mismos iconos del diseno)
  function updateWhy(index: number, field: "title" | "description", value: string) {
    setForm((f) => {
      const why_items = [...f.why_items];
      why_items[index] = { ...why_items[index], [field]: value };
      return { ...f, why_items };
    });
  }

  // Resenas
  function updateReview(index: number, field: keyof Review, value: string) {
    setForm((f) => {
      const reviews = [...f.reviews];
      reviews[index] = { ...reviews[index], [field]: value };
      return { ...f, reviews };
    });
  }
  function addReview() {
    setForm((f) => ({ ...f, reviews: [...f.reviews, { text: "", author: "", meta: "" }] }));
  }
  function removeReview(index: number) {
    setForm((f) => ({ ...f, reviews: f.reviews.filter((_, i) => i !== index) }));
  }

  async function handleSave() {
    setStatus("saving");
    setErrorMsg(null);
    try {
      await saveSiteContent(form);
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2000);
    } catch (e) {
      setStatus("error");
      setErrorMsg(e instanceof Error ? e.message : "Error al guardar");
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login", { replace: true });
  }

  return (
    <div className="admin-shell">
      <div className="admin-header">
        <strong>Editar Tatiana Salon</strong>
        <div style={{ display: "flex", gap: 10 }}>
          <a className="btn btn--ghost" href="/" target="_blank" rel="noreferrer">Ver sitio</a>
          <button className="btn btn--ghost" onClick={handleLogout}>
            <LogOutIcon /> Salir
          </button>
        </div>
      </div>

      <div className="admin-body">
        <p className="admin-help">
          Cambia lo que quieras y presiona <strong>Guardar</strong> al final. Los cambios se ven en el sitio
          al instante despues de guardar.
        </p>

        <section className="admin-section">
          <h2>Datos del negocio</h2>
          <div className="admin-grid-2">
            <div className="field">
              <label>Nombre (primera palabra)</label>
              <input value={form.business_name_first} onChange={(e) => update("business_name_first", e.target.value)} />
            </div>
            <div className="field">
              <label>Nombre (resto)</label>
              <input value={form.business_name_rest} onChange={(e) => update("business_name_rest", e.target.value)} />
            </div>
            <div className="field">
              <label>Categoria (ej. "Salón de Belleza")</label>
              <input value={form.tagline} onChange={(e) => update("tagline", e.target.value)} />
            </div>
            <div className="field">
              <label>Ciudad (ej. "Dorado, PR")</label>
              <input value={form.city_line} onChange={(e) => update("city_line", e.target.value)} />
            </div>
            <div className="field">
              <label>Telefono (con codigo, ej. +17877960545)</label>
              <input value={form.phone} onChange={(e) => update("phone", e.target.value)} />
            </div>
            <div className="field">
              <label>Instagram (link completo)</label>
              <input value={form.instagram_url} onChange={(e) => update("instagram_url", e.target.value)} />
            </div>
            <div className="field" style={{ gridColumn: "1 / -1" }}>
              <label>Direccion completa</label>
              <input value={form.address} onChange={(e) => update("address", e.target.value)} />
            </div>
            <div className="field" style={{ gridColumn: "1 / -1" }}>
              <label>Link de Google Maps (compartir ubicacion)</label>
              <input value={form.maps_url} onChange={(e) => update("maps_url", e.target.value)} />
            </div>
          </div>
          <ImageUploadField label="Logo" value={form.logo_url} onChange={(url) => update("logo_url", url)} folder="logo" />
        </section>

        <section className="admin-section">
          <h2>Portada</h2>
          <ImageUploadField
            label="Foto de portada"
            value={form.hero_image_url}
            onChange={(url) => update("hero_image_url", url)}
            folder="hero"
          />
          <div className="field">
            <label>Texto pequeño arriba del titulo (ej. "Dorado, Puerto Rico")</label>
            <input value={form.hero_eyebrow} onChange={(e) => update("hero_eyebrow", e.target.value)} />
          </div>
          <div className="field">
            <label>Titulo principal (una frase por linea, la ultima linea sale en dorado)</label>
            <textarea rows={3} value={form.hero_title} onChange={(e) => update("hero_title", e.target.value)} />
          </div>
          <div className="field">
            <label>Frase en cursiva (debajo del titulo)</label>
            <input value={form.hero_subtitle} onChange={(e) => update("hero_subtitle", e.target.value)} />
          </div>
          <div className="field">
            <label>Descripcion corta</label>
            <textarea value={form.hero_description} onChange={(e) => update("hero_description", e.target.value)} />
          </div>
        </section>

        <section className="admin-section">
          <h2>Servicios</h2>
          {form.services.map((s, i) => (
            <div className="service-row" key={i}>
              <div>
                <input
                  placeholder="Nombre del servicio"
                  value={s.title}
                  onChange={(e) => updateService(i, "title", e.target.value)}
                  style={{ marginBottom: 8 }}
                />
                <textarea
                  placeholder="Descripcion"
                  value={s.description}
                  onChange={(e) => updateService(i, "description", e.target.value)}
                />
              </div>
              <button className="icon-btn" onClick={() => removeService(i)} title="Eliminar servicio">
                <TrashIcon />
              </button>
            </div>
          ))}
          <button className="btn btn--ghost" onClick={addService}>
            <PlusIcon /> Agregar servicio
          </button>
        </section>

        <section className="admin-section">
          <h2>Portafolio (galeria de fotos)</h2>
          <p className="admin-help">Cada foto necesita un nombre corto (ej. "Balayage Rubio") que aparece encima de la foto.</p>
          {form.gallery.map((g, i) => (
            <div className="gallery-row" key={i}>
              {g.url ? <img src={g.url} alt="" className="gallery-row__thumb" /> : <div className="gallery-row__thumb gallery-row__thumb--empty" />}
              <div>
                <input
                  placeholder="Nombre de la foto (ej. Balayage Rubio)"
                  value={g.label}
                  onChange={(e) => updateGalleryLabel(i, e.target.value)}
                  style={{ marginBottom: 8 }}
                />
                <ImageUploadField
                  label="Reemplazar foto"
                  value=""
                  onChange={(url) => updateGalleryUrl(i, url)}
                  folder="gallery"
                />
              </div>
              <button className="icon-btn" onClick={() => removeGalleryPhoto(i)} title="Eliminar foto">
                <TrashIcon />
              </button>
            </div>
          ))}
          <ImageUploadField label="Agregar foto nueva a la galeria" value="" onChange={addGalleryPhoto} folder="gallery" />
        </section>

        <section className="admin-section">
          <h2>¿Por qué elegirnos?</h2>
          <ImageUploadField
            label="Foto de esta seccion"
            value={form.why_image_url}
            onChange={(url) => update("why_image_url", url)}
            folder="why"
          />
          <p className="admin-help">Son siempre 3 razones (no se pueden agregar ni quitar, solo editar el texto).</p>
          {form.why_items.map((w, i) => (
            <div className="why-row" key={i}>
              <input
                placeholder="Titulo"
                value={w.title}
                onChange={(e) => updateWhy(i, "title", e.target.value)}
                style={{ marginBottom: 8 }}
              />
              <textarea
                placeholder="Descripcion"
                value={w.description}
                onChange={(e) => updateWhy(i, "description", e.target.value)}
              />
            </div>
          ))}
        </section>

        <section className="admin-section">
          <h2>Reseñas</h2>
          <div className="admin-grid-2">
            <div className="field">
              <label>Calificacion (ej. "4.6")</label>
              <input value={form.reviews_rating} onChange={(e) => update("reviews_rating", e.target.value)} />
            </div>
            <div className="field">
              <label>Texto debajo (ej. "58 opiniones en Google")</label>
              <input value={form.reviews_count_label} onChange={(e) => update("reviews_count_label", e.target.value)} />
            </div>
          </div>
          <p className="admin-help">Las fotos redondas de las reseñas usan las primeras 4 fotos de la galeria arriba, automaticamente.</p>
          {form.reviews.map((r, i) => (
            <div className="review-row" key={i}>
              <div>
                <textarea
                  placeholder="Texto de la reseña"
                  value={r.text}
                  onChange={(e) => updateReview(i, "text", e.target.value)}
                  style={{ marginBottom: 8 }}
                />
                <div className="admin-grid-2">
                  <input
                    placeholder="Nombre de quien escribe"
                    value={r.author}
                    onChange={(e) => updateReview(i, "author", e.target.value)}
                  />
                  <input
                    placeholder='Fecha/detalle (ej. "Hace 2 meses")'
                    value={r.meta}
                    onChange={(e) => updateReview(i, "meta", e.target.value)}
                  />
                </div>
              </div>
              <button className="icon-btn" onClick={() => removeReview(i)} title="Eliminar reseña">
                <TrashIcon />
              </button>
            </div>
          ))}
          <button className="btn btn--ghost" onClick={addReview}>
            <PlusIcon /> Agregar reseña
          </button>
        </section>

        <div className="save-bar">
          {status === "error" && <span className="error-text">{errorMsg}</span>}
          {status === "saved" && <span className="save-status">Guardado. Ya se ve en el sitio.</span>}
          <button className="btn" onClick={handleSave} disabled={status === "saving"}>
            {status === "saving" ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}
