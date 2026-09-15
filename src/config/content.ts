// Contenido del sitio de Tatiana Salon. Este objeto es el "seed" -- el valor
// inicial que ve el panel /admin y el sitio publico ANTES de que exista la
// fila en Supabase (ver supabase/schema.sql, que inserta esto mismo como
// fila real la primera vez). A partir de ahi, la fuente de verdad es la
// base de datos: todo lo que se edite en /admin sobrescribe esto.

export interface ServiceBlurb {
  title: string;
  description: string;
}

export interface GalleryPhoto {
  url: string;
  label: string;
}

export interface WhyItem {
  title: string;
  description: string;
}

export interface Review {
  text: string;
  author: string;
  meta: string;
}

export interface SiteContent {
  // Negocio
  business_name_first: string;
  business_name_rest: string;
  tagline: string;
  phone: string;
  city_line: string;
  address: string;
  instagram_url: string;
  maps_url: string;
  logo_url: string;

  // Portada
  hero_eyebrow: string;
  hero_image_url: string;
  hero_title: string;
  hero_subtitle: string;
  hero_description: string;

  // Servicios
  services: ServiceBlurb[];

  // Portafolio
  gallery: GalleryPhoto[];

  // Por que elegirnos
  why_image_url: string;
  why_items: WhyItem[];

  // Resenas
  reviews_rating: string;
  reviews_count_label: string;
  reviews: Review[];
}

export const DEFAULT_CONTENT: SiteContent = {
  business_name_first: "Tatiana",
  business_name_rest: "Salon",
  tagline: "Salón de Belleza",
  phone: "+17877960545",
  city_line: "Dorado, PR",
  address: "Carr 693 Calle Marginal Costa de Oro A6, Dorado, PR 00646",
  instagram_url: "https://instagram.com/tatianasalonpr",
  maps_url: "https://www.google.com/maps/search/?api=1&query=Tatiana+Salon+Dorado+PR",
  logo_url: "/seed/img-01.png",

  hero_eyebrow: "Dorado, Puerto Rico",
  hero_image_url: "/seed/img-02.jpg",
  hero_title: "Tu mejor\nversión\nte espera",
  hero_subtitle: "Belleza con alma, arte con precisión",
  hero_description:
    "Especialistas en color, cortes y tratamientos capilares. Donde la técnica se une con el cuidado genuino.",

  services: [
    { title: "Blower", description: "Secado y peinado profesional para un cabello liso, brillante y con movimiento." },
    { title: "Cortes", description: "Cortes a la medida de tu estilo, desde clásicos hasta las últimas tendencias." },
    { title: "Color", description: "Coloración completa con los mejores productos del mercado." },
    { title: "Highlights", description: "Mechas e iluminaciones para dar dimensión y luz a tu cabello." },
    { title: "Balayage", description: "Técnica de coloración a mano alzada para un degradado natural." },
    { title: "Extensiones", description: "Extensiones de cabello para más largo y volumen." },
    { title: "Tratamientos de Cabello", description: "Keratina, Brazilian Blowout, cirugía capilar y botox capilar." },
    { title: "Peinado", description: "Peinados para toda ocasión, del día a día a eventos especiales." },
    { title: "Maquillaje", description: "Aplicación profesional de maquillaje para cualquier ocasión." },
    { title: "Manicura", description: "Cuidado y arreglo completo de manos y uñas." },
    { title: "Pedicura", description: "Cuidado y arreglo completo de pies y uñas." },
    { title: "Esmalte en Gel", description: "Esmaltado en gel de larga duración con acabado brillante." },
    { title: "Uñas Acrílicas", description: "Extensiones de uñas acrílicas a la medida." },
    { title: "Depilación Facial", description: "Depilación facial con cera para un rostro limpio y definido." },
  ],

  gallery: [
    { url: "/seed/img-03.jpg", label: "Balayage Rubio" },
    { url: "/seed/img-04.jpg", label: "Ondas & Color" },
    { url: "/seed/img-05.jpg", label: "Balayage Claro" },
    { url: "/seed/img-06.jpg", label: "Balayage Largo" },
    { url: "/seed/img-07.jpg", label: "Caramelo & Brillo" },
    { url: "/seed/img-08.jpg", label: "Bob Corto" },
    { url: "/seed/img-09.jpg", label: "Balayage Caramelo" },
    { url: "/seed/img-10.jpg", label: "Balayage & Ondas" },
    { url: "/seed/img-11.jpg", label: "Medio Recogido" },
    { url: "/seed/img-12.jpg", label: "Ondas Sueltas" },
    { url: "/seed/img-13.jpg", label: "Balayage Natural" },
    { url: "/seed/img-14.jpg", label: "Rubio Beach Waves" },
    { url: "/seed/img-15.jpg", label: "Updo & Perlas" },
    { url: "/seed/img-16.jpg", label: "Bob Cobrizo" },
  ],

  why_image_url: "/seed/img-12.jpg",
  why_items: [
    { title: "Técnicos certificados", description: "Equipo en constante formación con las últimas técnicas y tendencias internacionales." },
    { title: "Citas puntuales", description: "Respetamos tu tiempo. Tu cita siempre comenzará a la hora acordada, sin esperas." },
    { title: "Ambiente acogedor", description: "Un espacio cuidado donde te sientes especial desde el momento en que entras." },
  ],

  reviews_rating: "4.6",
  reviews_count_label: "58 opiniones en Google",
  reviews: [
    { text: "Quiero expresar mi agradecimiento a Tatiana Salón por el excelente trabajo realizado en mi maquillaje y peinado para la boda de mi sobrina. Desde el primer momento recibí una atención profesional, amable y dedicada, cuidando cada detalle.", author: "Nelkie Méndez", meta: "Local Guide · Hace 2 meses" },
    { text: "¡Excelente servicio! Desde su trato hasta como quedó el cabello de mi hija. 100% recomendada. Súper profesional.", author: "María Muriel", meta: "Hace 1 año" },
    { text: "So grateful to find this hidden gem while staying in Dorado. My sister and I both had our hair done and they were both fantastic!", author: "Andrea Oyola Reid", meta: "Local Guide · Hace 2 años" },
    { text: "Excelente servicio. Cumplen con horario de la cita. Muy amables; precios adecuados.", author: "Christine Albino", meta: "Hace 2 años" },
    { text: "Amazing experience!!! Very professional, bilingual team. Very skilled. Gracias por tan buena experiencia.", author: "Francisco Romero", meta: "Local Guide · Hace 2 años" },
    { text: "Los reviews no se equivocan. Estaba en el área de Dorado por el fin de semana. Hice reservación para corte y blower. El cabello me quedó divino.", author: "VM González", meta: "Local Guide · Hace 3 semanas" },
  ],
};
