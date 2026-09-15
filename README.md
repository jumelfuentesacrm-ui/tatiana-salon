# Tatiana Salon — sitio (MK2)

Sitio de Tatiana Salon (Dorado, PR), construido sobre el template MK2 de
Suitcase (edición simple de fotos/texto/logo, sin roles, sin reservas).

El diseño es una réplica exacta del HTML original (`tatianasalon.html`),
convertido a React + Supabase para que Tatiana pueda editar todo el
contenido desde `/admin` sin tocar código.

## Qué es editable desde `/admin`

- Datos del negocio: nombre, categoría, teléfono, Instagram, dirección, logo
- Portada: foto, texto del título (varias líneas), frase en cursiva,
  descripción, los dos números grandes (calificación y clientes)
- Servicios: agregar/quitar/editar (los 14 actuales ya están cargados)
- Portafolio: agregar/quitar fotos, cada una con su nombre corto
- "Por qué elegirnos": foto + las 3 razones (título y texto; los iconos son
  fijos del diseño)
- Reseñas: agregar/quitar, calificación y contador de opiniones. Las fotos
  redondas de las reseñas se toman automáticamente de las primeras 4 fotos
  del portafolio, para no duplicar trabajo

Todo lo demás (colores, tipografía, animaciones, estructura de secciones)
es fijo, tal como se acordó: **el aspecto no cambia**, solo el contenido.

## Empezar

```bash
npm install
cp .env.example .env.local   # llena las keys del proyecto de Supabase
npm run dev
```

Sigue **SETUP.md** para Supabase + Vercel (el mismo checklist del template
MK2 — sin Edge Functions, sin Stripe, sin Google Calendar).

## Estructura

```
src/
  config/content.ts     <- contenido "seed": el contenido real de Tatiana
                            Salon tal como estaba en el HTML original.
                            Sirve de valor inicial; la fuente de verdad
                            despues del primer deploy es Supabase.
  lib/
    supabase.ts          <- cliente de Supabase
    useSiteContent.ts    <- lee/escribe la fila unica de site_content
    useAuth.ts           <- sesion de Supabase Auth (un solo admin: Tatiana)
  components/
    icons.tsx
    ImageUploadField.tsx <- input de archivo + subida a Storage
  pages/
    PublicSite.tsx        <- el sitio publico (CSS identico al HTML original)
    Login.tsx              <- /login
    Admin.tsx               <- /admin, el formulario de edicion
public/seed/              <- las 16 fotos originales extraidas del HTML,
                              usadas como contenido inicial
supabase/
  schema.sql             <- tabla site_content (con el contenido real como
                            semilla) + bucket site-media + RLS
```

## Origen

Este sitio viene del template `mk2-simple-edit` del repo Suitcase
(`jumelfuentesacrm-ui/SUITCASE`). Si en el trabajo con Tatiana aparece una
mejora genuinamente reutilizable (no específica de su negocio), repórtala
para subirla de vuelta al template.
