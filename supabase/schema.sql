-- Tatiana Salon (MK2) -- schema completo. Una sola tabla + un bucket de Storage.
-- Correr una sola vez en Supabase SQL Editor -> New query -> Run.

-- ============================================================
-- Tabla: site_content
-- Una sola fila (id = 1) con todo el contenido editable del sitio.
-- No hay tabla de roles/permisos -- MK2 asume un solo admin por sitio,
-- controlado enteramente por Supabase Auth (ver seccion RLS abajo).
-- ============================================================

create table if not exists public.site_content (
  id integer primary key default 1,

  business_name_first text not null default 'Tatiana',
  business_name_rest text not null default 'Salon',
  tagline text not null default 'Salón de Belleza',
  phone text not null default '+17877960545',
  city_line text not null default 'Dorado, PR',
  address text not null default 'Carr 693 Calle Marginal Costa de Oro A6, Dorado, PR 00646',
  instagram_url text not null default 'https://instagram.com/tatianasalonpr',
  maps_url text not null default 'https://www.google.com/maps/search/?api=1&query=Tatiana+Salon+Dorado+PR',
  logo_url text not null default '/seed/img-01.png',

  hero_eyebrow text not null default 'Dorado, Puerto Rico',
  hero_image_url text not null default '/seed/img-02.jpg',
  hero_title text not null default 'Tu mejor
versión
te espera',
  hero_subtitle text not null default 'Belleza con alma, arte con precisión',
  hero_description text not null default 'Especialistas en color, cortes y tratamientos capilares. Donde la técnica se une con el cuidado genuino.',

  services jsonb not null default '[]'::jsonb,
  gallery jsonb not null default '[]'::jsonb,

  why_image_url text not null default '/seed/img-12.jpg',
  why_items jsonb not null default '[]'::jsonb,

  reviews_rating text not null default '4.6',
  reviews_count_label text not null default '58 opiniones en Google',
  reviews jsonb not null default '[]'::jsonb,

  updated_at timestamptz not null default now(),
  constraint site_content_singleton check (id = 1)
);

-- Semilla: exactamente una fila con el contenido real de Tatiana Salon, tal
-- como estaba en el HTML original. El sitio publico y el panel /admin
-- siempre leen/escriben id = 1 (ver src/lib/useSiteContent.ts).
insert into public.site_content (
  id, services, gallery, why_items, reviews
) values (
  1,
  '[
    {"title":"Blower","description":"Secado y peinado profesional para un cabello liso, brillante y con movimiento."},
    {"title":"Cortes","description":"Cortes a la medida de tu estilo, desde clásicos hasta las últimas tendencias."},
    {"title":"Color","description":"Coloración completa con los mejores productos del mercado."},
    {"title":"Highlights","description":"Mechas e iluminaciones para dar dimensión y luz a tu cabello."},
    {"title":"Balayage","description":"Técnica de coloración a mano alzada para un degradado natural."},
    {"title":"Extensiones","description":"Extensiones de cabello para más largo y volumen."},
    {"title":"Tratamientos de Cabello","description":"Keratina, Brazilian Blowout, cirugía capilar y botox capilar."},
    {"title":"Peinado","description":"Peinados para toda ocasión, del día a día a eventos especiales."},
    {"title":"Maquillaje","description":"Aplicación profesional de maquillaje para cualquier ocasión."},
    {"title":"Manicura","description":"Cuidado y arreglo completo de manos y uñas."},
    {"title":"Pedicura","description":"Cuidado y arreglo completo de pies y uñas."},
    {"title":"Esmalte en Gel","description":"Esmaltado en gel de larga duración con acabado brillante."},
    {"title":"Uñas Acrílicas","description":"Extensiones de uñas acrílicas a la medida."},
    {"title":"Depilación Facial","description":"Depilación facial con cera para un rostro limpio y definido."}
  ]'::jsonb,
  '[
    {"url":"/seed/img-03.jpg","label":"Balayage Rubio"},
    {"url":"/seed/img-04.jpg","label":"Ondas & Color"},
    {"url":"/seed/img-05.jpg","label":"Balayage Claro"},
    {"url":"/seed/img-06.jpg","label":"Balayage Largo"},
    {"url":"/seed/img-07.jpg","label":"Caramelo & Brillo"},
    {"url":"/seed/img-08.jpg","label":"Bob Corto"},
    {"url":"/seed/img-09.jpg","label":"Balayage Caramelo"},
    {"url":"/seed/img-10.jpg","label":"Balayage & Ondas"},
    {"url":"/seed/img-11.jpg","label":"Medio Recogido"},
    {"url":"/seed/img-12.jpg","label":"Ondas Sueltas"},
    {"url":"/seed/img-13.jpg","label":"Balayage Natural"},
    {"url":"/seed/img-14.jpg","label":"Rubio Beach Waves"},
    {"url":"/seed/img-15.jpg","label":"Updo & Perlas"},
    {"url":"/seed/img-16.jpg","label":"Bob Cobrizo"}
  ]'::jsonb,
  '[
    {"title":"Técnicos certificados","description":"Equipo en constante formación con las últimas técnicas y tendencias internacionales."},
    {"title":"Citas puntuales","description":"Respetamos tu tiempo. Tu cita siempre comenzará a la hora acordada, sin esperas."},
    {"title":"Ambiente acogedor","description":"Un espacio cuidado donde te sientes especial desde el momento en que entras."}
  ]'::jsonb,
  '[
    {"text":"Quiero expresar mi agradecimiento a Tatiana Salón por el excelente trabajo realizado en mi maquillaje y peinado para la boda de mi sobrina. Desde el primer momento recibí una atención profesional, amable y dedicada, cuidando cada detalle.","author":"Nelkie Méndez","meta":"Local Guide · Hace 2 meses"},
    {"text":"¡Excelente servicio! Desde su trato hasta como quedó el cabello de mi hija. 100% recomendada. Súper profesional.","author":"María Muriel","meta":"Hace 1 año"},
    {"text":"So grateful to find this hidden gem while staying in Dorado. My sister and I both had our hair done and they were both fantastic!","author":"Andrea Oyola Reid","meta":"Local Guide · Hace 2 años"},
    {"text":"Excelente servicio. Cumplen con horario de la cita. Muy amables; precios adecuados.","author":"Christine Albino","meta":"Hace 2 años"},
    {"text":"Amazing experience!!! Very professional, bilingual team. Very skilled. Gracias por tan buena experiencia.","author":"Francisco Romero","meta":"Local Guide · Hace 2 años"},
    {"text":"Los reviews no se equivocan. Estaba en el área de Dorado por el fin de semana. Hice reservación para corte y blower. El cabello me quedó divino.","author":"VM González","meta":"Local Guide · Hace 3 semanas"}
  ]'::jsonb
)
on conflict (id) do nothing;

-- ============================================================
-- Row Level Security
-- Lectura publica (el sitio de marketing es publico).
-- Escritura solo para usuarios autenticados (el unico admin del sitio).
-- ============================================================

alter table public.site_content enable row level security;

drop policy if exists "site_content_public_read" on public.site_content;
create policy "site_content_public_read"
  on public.site_content for select
  using (true);

drop policy if exists "site_content_admin_write" on public.site_content;
create policy "site_content_admin_write"
  on public.site_content for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

drop policy if exists "site_content_admin_insert" on public.site_content;
create policy "site_content_admin_insert"
  on public.site_content for insert
  with check (auth.role() = 'authenticated');

-- ============================================================
-- Storage: bucket publico para logo / foto de portada / galeria
-- ============================================================

insert into storage.buckets (id, name, public)
values ('site-media', 'site-media', true)
on conflict (id) do nothing;

drop policy if exists "site_media_public_read" on storage.objects;
create policy "site_media_public_read"
  on storage.objects for select
  using (bucket_id = 'site-media');

drop policy if exists "site_media_admin_write" on storage.objects;
create policy "site_media_admin_write"
  on storage.objects for insert
  with check (bucket_id = 'site-media' and auth.role() = 'authenticated');

drop policy if exists "site_media_admin_update" on storage.objects;
create policy "site_media_admin_update"
  on storage.objects for update
  using (bucket_id = 'site-media' and auth.role() = 'authenticated');

drop policy if exists "site_media_admin_delete" on storage.objects;
create policy "site_media_admin_delete"
  on storage.objects for delete
  using (bucket_id = 'site-media' and auth.role() = 'authenticated');
