import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSiteContent } from "../lib/useSiteContent";

// CSS identico al HTML original de Tatiana Salon (tatianasalon.html).
// Se monta/desmonta con este componente para no afectar /admin ni /login,
// que usan su propia hoja de estilos (styles.css).
const SITE_CSS = `
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
.ts-root{
  --cream:#F6F9F8;--cream-dark:#E8F0EE;--warm-white:#FFFFFF;--ink:#221E1F;--ink-soft:#3D3739;
  --taupe:#6C8681;--taupe-light:#A9BDB8;--red:#3F6963;--red-soft:#54807A;--red-muted:#DCEAE7;
  --gold:#B9504C;--gold-light:#D98884;--fd:'Cormorant Garamond',Georgia,serif;--fb:'Jost',sans-serif;
}
.ts-root{font-family:var(--fb);background:var(--cream);color:var(--ink);font-weight:300;overflow-x:hidden;font-size:16px;line-height:1.6}
.ts-root nav{background:rgba(34,30,31,0.28);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);padding:0.9rem 1.25rem;display:flex;align-items:center;justify-content:space-between;position:fixed;top:0;left:0;right:0;z-index:100;transition:background 0.4s, backdrop-filter 0.4s}
.ts-root nav.scrolled{background:rgba(246,249,248,0.95);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);border-bottom:1px solid rgba(108,134,129,0.16)}
.ts-root .brand{display:flex;align-items:center;gap:0.6rem}
.ts-root .logo-img{width:34px;height:34px;border-radius:50%;display:block;flex-shrink:0;filter:drop-shadow(0 1px 4px rgba(0,0,0,0.25))}
.ts-root .logo{font-family:var(--fd);font-size:1.3rem;font-weight:500;letter-spacing:0.05em;color:var(--warm-white);text-decoration:none;display:block;transition:color 0.4s}
.ts-root .logo span{color:var(--gold)}
.ts-root nav.scrolled .logo{color:var(--ink)}
.ts-root nav.scrolled .logo span{color:var(--red)}
.ts-root .nav-tag{font-size:0.54rem;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.7);margin-top:1px;transition:color 0.4s}
.ts-root nav.scrolled .nav-tag{color:var(--taupe)}
.ts-root .nav-btn{font-size:0.62rem;letter-spacing:0.13em;text-transform:uppercase;font-weight:400;color:var(--warm-white);background:var(--red);padding:0.7rem 1.1rem;text-decoration:none;white-space:nowrap;display:inline-block;-webkit-tap-highlight-color:transparent;border-radius:2px}
.ts-root .hero{position:relative;min-height:100vh;min-height:100svh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:6rem 1.5rem 4rem;overflow:hidden}
.ts-root .hero-video{position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;object-position:center 15%;z-index:1}
.ts-root .hero-overlay{position:absolute;top:0;left:0;width:100%;height:100%;z-index:2;background:linear-gradient(180deg, rgba(34,30,31,0.62) 0%, rgba(34,30,31,0.48) 40%, rgba(34,30,31,0.68) 100%)}
.ts-root .hero-content{position:relative;z-index:3;width:100%;max-width:560px}
.ts-root .eyebrow{font-size:0.6rem;letter-spacing:0.26em;text-transform:uppercase;color:var(--gold);font-weight:400;margin-bottom:1.4rem;display:flex;align-items:center;justify-content:center;gap:0.8rem}
.ts-root .eyebrow::before,.ts-root .eyebrow::after{content:'';display:block;width:24px;height:1px;background:var(--gold)}
.ts-root h1{font-family:var(--fd);font-size:3.6rem;font-weight:300;line-height:1.03;color:var(--warm-white);margin-bottom:0.7rem;text-shadow:0 2px 30px rgba(0,0,0,0.3)}
.ts-root h1 em{font-style:italic;color:var(--gold-light)}
.ts-root .hero-sub{font-family:var(--fd);font-style:italic;font-size:1.15rem;color:rgba(255,255,255,0.92);margin-bottom:1.3rem}
.ts-root .hero-desc{font-size:0.86rem;line-height:1.9;color:rgba(255,255,255,0.8);margin:0 auto 2.2rem;font-weight:300;max-width:360px}
.ts-root .hero-btns{display:flex;gap:0.8rem;align-items:center;justify-content:center;flex-wrap:nowrap}
.ts-root .btn-p{font-size:0.6rem;letter-spacing:0.12em;text-transform:uppercase;font-weight:400;color:var(--warm-white);background:var(--red);padding:0 1.1rem;text-decoration:none;display:flex;align-items:center;justify-content:center;min-height:48px;-webkit-tap-highlight-color:transparent;border-radius:2px;white-space:nowrap}
.ts-root .btn-mid{font-size:0.6rem;letter-spacing:0.12em;text-transform:uppercase;font-weight:400;color:var(--ink);background:var(--warm-white);padding:0 1.1rem;text-decoration:none;display:flex;align-items:center;justify-content:center;min-height:48px;-webkit-tap-highlight-color:transparent;border-radius:2px;white-space:nowrap}
.ts-root .btn-s{font-size:0.6rem;letter-spacing:0.12em;text-transform:uppercase;font-weight:400;color:var(--warm-white);text-decoration:none;border-bottom:1px solid var(--gold);padding-bottom:3px;white-space:nowrap}
.ts-root .scroll-hint{position:absolute;bottom:1.6rem;left:50%;transform:translateX(-50%);z-index:3;color:rgba(255,255,255,0.6)}
.ts-root .scroll-hint svg{width:22px;height:22px;stroke:currentColor;fill:none;stroke-width:1.5;animation:ts-bounce 2s infinite}
@keyframes ts-bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}}
.ts-root .stats{display:grid;grid-template-columns:repeat(3,1fr);background:var(--warm-white);padding:1.6rem 1.5rem;border-bottom:1px solid var(--cream-dark)}
.ts-root .stat-n{font-family:var(--fd);font-size:1.9rem;font-weight:300;color:var(--red);display:block;line-height:1;margin-bottom:0.3rem}
.ts-root .stat-l{font-size:0.57rem;letter-spacing:0.14em;text-transform:uppercase;color:var(--taupe)}
.ts-root section{padding:4rem 1.5rem}
.ts-root .sec-eye{font-size:0.6rem;letter-spacing:0.26em;text-transform:uppercase;color:var(--red);font-weight:400;margin-bottom:1rem;display:flex;align-items:center;gap:0.8rem}
.ts-root .sec-eye::before{content:'';display:block;width:20px;height:1px;background:var(--red)}
.ts-root h2{font-family:var(--fd);font-size:2.4rem;font-weight:300;line-height:1.1;color:var(--ink);margin-bottom:2.4rem}
.ts-root h2 em{font-style:italic;color:var(--taupe)}
.ts-root .svc-list{display:flex;flex-direction:column;gap:2px}
.ts-root .svc-card{background:var(--warm-white);padding:1.9rem 1.5rem;position:relative;border-left:2px solid transparent;transition:border-color 0.25s}
.ts-root .svc-card:active{border-left-color:var(--red)}
.ts-root .svc-num{font-family:var(--fd);font-size:2.8rem;font-weight:300;color:var(--red-muted);line-height:1;margin-bottom:0.9rem;display:block}
.ts-root .svc-name{font-family:var(--fd);font-size:1.35rem;font-weight:400;color:var(--ink);margin-bottom:0.5rem}
.ts-root .svc-desc{font-size:0.82rem;line-height:1.85;color:var(--taupe);font-weight:300}
.ts-root .gallery-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:1.5rem}
.ts-root .gi-full{grid-column:1/-1}
.ts-root .gi{overflow:hidden;position:relative;background:var(--cream-dark);line-height:0}
.ts-root .gi img{width:100%;height:100%;object-fit:cover;object-position:center;display:block}
.ts-root .gi-label{position:absolute;bottom:0.8rem;left:0.8rem;background:rgba(34,30,31,0.82);color:var(--warm-white);font-size:0.57rem;letter-spacing:0.13em;text-transform:uppercase;padding:0.35rem 0.7rem;line-height:1.4}
.ts-root .why-sec{background:var(--warm-white)}
.ts-root .why-img{margin:0 -1.5rem 2.4rem;position:relative;overflow:hidden;line-height:0;height:380px}
.ts-root .why-img img{width:100%;height:100%;object-fit:cover;object-position:center 20%;display:block}
.ts-root .why-list{display:flex;flex-direction:column}
.ts-root .why-item{display:flex;gap:1.2rem;align-items:flex-start;padding:1.5rem 0;border-bottom:1px solid var(--cream-dark)}
.ts-root .why-item:last-child{border-bottom:none;padding-bottom:0}
.ts-root .why-icon{width:34px;height:34px;border-radius:50%;background:var(--red-muted);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px}
.ts-root .why-icon svg{width:15px;height:15px;stroke:var(--red);fill:none;stroke-width:1.5}
.ts-root .wi-title{font-family:var(--fd);font-size:1.1rem;font-weight:400;color:var(--ink);margin-bottom:0.35rem}
.ts-root .wi-desc{font-size:0.8rem;line-height:1.8;color:var(--taupe);font-weight:300}
.ts-root .reviews-sec{background:var(--cream)}
.ts-root .rv-head{display:flex;align-items:baseline;gap:0.7rem;margin-bottom:1.4rem}
.ts-root .rv-rating{font-family:var(--fd);font-size:3rem;font-weight:300;color:var(--red);line-height:1}
.ts-root .rv-stars-big{display:flex;flex-direction:column;gap:0.3rem}
.ts-root .rv-stars-row{display:flex;gap:2px}
.ts-root .rv-stars-row .star{width:13px;height:13px}
.ts-root .rv-count{font-size:0.7rem;color:var(--taupe);letter-spacing:0.05em}
.ts-root .rv-avatars{display:flex;flex-wrap:wrap;gap:0.6rem;margin-bottom:2.2rem}
.ts-root .rv-av{width:52px;height:52px;border-radius:50%;overflow:hidden;border:2px solid var(--warm-white);box-shadow:0 0 0 1px var(--cream-dark);flex-shrink:0}
.ts-root .rv-av img{width:100%;height:100%;object-fit:cover;display:block}
.ts-root .review-list{display:flex;flex-direction:column;gap:2px}
.ts-root .review-card{background:var(--warm-white);padding:1.9rem 1.5rem}
.ts-root .stars{display:flex;gap:3px;margin-bottom:1rem}
.ts-root .star{width:11px;height:11px;background:var(--gold);clip-path:polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)}
.ts-root .rv-text{font-family:var(--fd);font-size:1.08rem;font-weight:300;font-style:italic;line-height:1.7;color:var(--ink-soft);margin-bottom:1.1rem}
.ts-root .rv-author{font-size:0.7rem;letter-spacing:0.04em;color:var(--ink);font-weight:400}
.ts-root .rv-meta{font-size:0.62rem;letter-spacing:0.05em;color:var(--taupe);margin-top:2px}
.ts-root .contact-sec{background:var(--ink);padding:4rem 1.5rem}
.ts-root .contact-sec .sec-eye{color:var(--gold)}
.ts-root .contact-sec .sec-eye::before{background:var(--gold)}
.ts-root .contact-sec h2{color:var(--warm-white)}
.ts-root .contact-sec h2 em{color:var(--gold)}
.ts-root .contact-list{display:flex;flex-direction:column;gap:1.4rem;margin-top:1.5rem}
.ts-root .contact-item{display:flex;gap:1rem;align-items:flex-start}
.ts-root .contact-icon{width:38px;height:38px;border:1px solid rgba(185,80,76,0.35);border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.ts-root .contact-icon svg{width:16px;height:16px;stroke:var(--gold);fill:none;stroke-width:1.5}
.ts-root .contact-label{font-size:0.58rem;letter-spacing:0.16em;text-transform:uppercase;color:var(--gold);margin-bottom:0.3rem}
.ts-root .contact-val{font-size:0.92rem;color:var(--warm-white);font-weight:300;line-height:1.6;text-decoration:none;display:block}
.ts-root a.contact-val:active{color:var(--gold)}
.ts-root .cta-sec{background:var(--cream-dark);padding:4.5rem 1.5rem;text-align:center}
.ts-root .cta-eye{font-size:0.6rem;letter-spacing:0.26em;text-transform:uppercase;color:var(--red);font-weight:400;margin-bottom:1.2rem;display:flex;align-items:center;justify-content:center;gap:0.8rem}
.ts-root .cta-eye::before,.ts-root .cta-eye::after{content:'';display:block;width:20px;height:1px;background:var(--red)}
.ts-root .cta-title{font-family:var(--fd);font-size:2.9rem;font-weight:300;color:var(--ink);line-height:1.08;margin-bottom:1rem}
.ts-root .cta-title em{font-style:italic;color:var(--red)}
.ts-root .cta-sub{font-size:0.8rem;color:var(--taupe);margin-bottom:2.2rem;letter-spacing:0.03em}
.ts-root .cta-btns{display:flex;flex-direction:column;gap:1rem;align-items:stretch}
.ts-root .cta-btns .btn-p{justify-content:center;min-height:54px;font-size:0.7rem}
.ts-root .cta-btns .btn-link{text-align:center;font-size:0.6rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--ink);text-decoration:none;border-bottom:1px solid var(--ink);padding-bottom:3px;align-self:center}
.ts-root footer{background:var(--ink);padding:2.8rem 1.5rem;border-top:1px solid rgba(185,80,76,0.15)}
.ts-root .ft-name{font-family:var(--fd);font-size:1.7rem;font-weight:300;color:var(--warm-white);letter-spacing:0.04em;margin-bottom:0.3rem}
.ts-root .ft-name span{color:var(--red-soft)}
.ts-root .ft-tag{font-size:0.57rem;letter-spacing:0.2em;text-transform:uppercase;color:var(--taupe);margin-bottom:1.8rem}
.ts-root .ft-bottom{display:flex;flex-direction:column;gap:1rem;padding-top:1.8rem;border-top:1px solid rgba(255,255,255,0.08)}
.ts-root .ft-copy{font-size:0.68rem;color:rgba(255,255,255,0.3)}
.ts-root .ft-copy span{color:var(--red-soft)}
.ts-root .ft-social{display:flex;gap:0.8rem}
.ts-root .social-a{width:40px;height:40px;border:1px solid rgba(185,80,76,0.3);display:flex;align-items:center;justify-content:center;text-decoration:none;-webkit-tap-highlight-color:transparent;border-radius:50%}
.ts-root .social-a svg{width:15px;height:15px;fill:var(--gold)}
.ts-root .reveal{opacity:0;transform:translateY(20px);transition:opacity 0.6s ease,transform 0.6s ease}
.ts-root .reveal.visible{opacity:1;transform:translateY(0)}
.ts-root.no-js .reveal{opacity:1;transform:none}
.ts-admin-link{position:fixed;bottom:10px;right:10px;z-index:200;opacity:0.35;font-size:0.65rem;color:#fff;text-decoration:none;background:rgba(0,0,0,0.4);padding:4px 8px;border-radius:3px}
`;

// Muestra el telefono legible ("(787) 796-0545") aunque se guarde en
// formato internacional para el link tel:. Si no matchea el patron de EEUU/PR
// (10 digitos), se muestra tal cual para no romper otros formatos.
function formatPhoneDisplay(phone: string): string {
  const digits = phone.replace(/\D/g, "").replace(/^1/, "");
  if (digits.length !== 10) return phone;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function Stars() {
  return (
    <div className="star" />
  );
}

// Iconos fijos del bloque "Por que elegirnos" -- son parte del diseno, no
// contenido editable. El texto (title/description) si viene de content.why_items.
const WHY_ICONS = [
  <svg viewBox="0 0 24 24" key="award"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>,
  <svg viewBox="0 0 24 24" key="clock"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>,
  <svg viewBox="0 0 24 24" key="heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>,
];

export default function PublicSite() {
  const { content: c, loading } = useSiteContent();
  const rootRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > window.innerHeight * 0.7);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    root.classList.remove("no-js");
    const items = root.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05, rootMargin: "0px 0px -10% 0px" },
      );
      items.forEach((el) => obs.observe(el));
      const t = setTimeout(() => items.forEach((el) => el.classList.add("visible")), 2500);
      return () => {
        obs.disconnect();
        clearTimeout(t);
      };
    } else {
      items.forEach((el) => el.classList.add("visible"));
    }
  }, [loading]);

  if (loading) {
    return <div className="loading-shell">Cargando...</div>;
  }

  const heroLines = c.hero_title.split("\n").filter(Boolean);
  const heroLast = heroLines[heroLines.length - 1];
  const heroRest = heroLines.slice(0, -1);
  const telHref = `tel:${c.phone}`;
  const galleryAvatars = c.gallery.slice(0, 4);

  return (
    <div className={`ts-root no-js`} ref={rootRef}>
      <style>{SITE_CSS}</style>

      <nav className={scrolled ? "scrolled" : ""}>
        <div className="brand">
          <img src={c.logo_url} alt={`${c.business_name_first} ${c.business_name_rest}`} className="logo-img" />
          <div>
            <a href="#" className="logo">
              {c.business_name_first} <span>·</span> {c.business_name_rest}
            </a>
            <div className="nav-tag">{c.tagline}</div>
          </div>
        </div>
        <a href={telHref} className="nav-btn">Agenda tu cita</a>
      </nav>

      <section className="hero">
        <img className="hero-video" src={c.hero_image_url} alt={`${c.business_name_first} ${c.business_name_rest}`} />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="eyebrow">{c.hero_eyebrow}</div>
          <h1>
            {heroRest.map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
            <em>{heroLast}</em>
          </h1>
          <p className="hero-sub">{c.hero_subtitle}</p>
          <p className="hero-desc">{c.hero_description}</p>
          <div className="hero-btns">
            <a href="#servicios" className="btn-s">Servicios</a>
            <a href={telHref} className="btn-mid">Reserva</a>
            <a href="#portafolio" className="btn-s">Portafolio</a>
          </div>
        </div>
        <div className="scroll-hint">
          <svg viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg>
        </div>
      </section>

      <div className="stats">
        <div style={{ textAlign: "center" }}><span className="stat-n">{c.stat_rating}</span><span className="stat-l">Google</span></div>
        <div style={{ textAlign: "center" }}><span className="stat-n">{c.stat_clients}</span><span className="stat-l">Clientes</span></div>
        <div style={{ textAlign: "center" }}><span className="stat-n">PR</span><span className="stat-l">{c.city_line.split(",")[0]}</span></div>
      </div>

      <section id="servicios">
        <div className="sec-eye">Lo que hacemos</div>
        <h2>Servicios <em>premium</em><br />para ti</h2>
        <div className="svc-list">
          {c.services.map((s, i) => (
            <div className="svc-card reveal" style={{ transitionDelay: `${Math.min(i * 0.04, 0.6)}s` }} key={i}>
              <span className="svc-num">{String(i + 1).padStart(2, "0")}</span>
              <div className="svc-name">{s.title}</div>
              <p className="svc-desc">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="portafolio" style={{ background: "var(--warm-white)" }}>
        <div className="sec-eye">Nuestro trabajo</div>
        <h2>Portafolio <em>real</em></h2>
        <div className="gallery-grid">
          {c.gallery.map((g, i) => {
            const isFull = i % 3 === 0;
            const height = i === 0 ? 340 : isFull ? 320 : 220;
            return (
            <div className={`gi ${isFull ? "gi-full" : ""}`} style={{ height }} key={i}>
              <img src={g.url} alt={`${g.label} en ${c.business_name_first} ${c.business_name_rest}`} />
              <div className="gi-label">{g.label}</div>
            </div>
            );
          })}
        </div>
      </section>

      <section className="why-sec" id="nosotros">
        <div className="sec-eye">¿Por qué elegirnos?</div>
        <h2>Experiencia que <em>se siente</em></h2>
        <div className="why-img"><img src={c.why_image_url} alt={`${c.business_name_first} ${c.business_name_rest}`} /></div>
        <div className="why-list">
          {c.why_items.map((w, i) => (
            <div className="why-item reveal" style={{ transitionDelay: `${i * 0.1}s` }} key={i}>
              <div className="why-icon">
                {WHY_ICONS[i % WHY_ICONS.length]}
              </div>
              <div>
                <div className="wi-title">{w.title}</div>
                <p className="wi-desc">{w.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="reviews-sec">
        <div className="sec-eye">Lo que dicen</div>
        <h2>Clientes <em>contentos</em></h2>
        <div className="rv-head">
          <span className="rv-rating">{c.reviews_rating}</span>
          <div className="rv-stars-big">
            <div className="rv-stars-row"><Stars /><Stars /><Stars /><Stars /><Stars /></div>
            <span className="rv-count">{c.reviews_count_label}</span>
          </div>
        </div>
        <div className="rv-avatars">
          {galleryAvatars.map((g, i) => (
            <div className="rv-av" key={i}><img src={g.url} alt={g.label} /></div>
          ))}
        </div>
        <div className="review-list">
          {c.reviews.map((r, i) => (
            <div className="review-card reveal" style={{ transitionDelay: `${Math.min(i * 0.08, 0.4)}s` }} key={i}>
              <div className="stars"><Stars /><Stars /><Stars /><Stars /><Stars /></div>
              <p className="rv-text">"{r.text}"</p>
              <div className="rv-author">{r.author}</div>
              <div className="rv-meta">{r.meta}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="contact-sec" id="contacto">
        <div className="sec-eye">Visítanos</div>
        <h2>Estamos <em>aquí</em></h2>
        <div className="contact-list">
          <div className="contact-item">
            <div className="contact-icon"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg></div>
            <div><div className="contact-label">Teléfono</div><a href={telHref} className="contact-val">{formatPhoneDisplay(c.phone)}</a></div>
          </div>
          <div className="contact-item">
            <div className="contact-icon"><svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg></div>
            <div><div className="contact-label">Dirección</div><a href={c.maps_url} target="_blank" rel="noreferrer" className="contact-val">{c.address}</a></div>
          </div>
        </div>
      </section>

      <section className="cta-sec">
        <div className="cta-eye">¿Lista para el cambio?</div>
        <h2 className="cta-title">Reserva tu cita<br /><em>hoy mismo</em></h2>
        <p className="cta-sub">{c.city_line} · {c.tagline}</p>
        <div className="cta-btns">
          <a href={telHref} className="btn-p">Llamar ahora</a>
          <a href={c.instagram_url} className="btn-link" target="_blank" rel="noreferrer">Ver en Instagram →</a>
        </div>
      </section>

      <footer>
        <img src={c.logo_url} alt={`${c.business_name_first} ${c.business_name_rest}`} style={{ width: 56, height: 56, borderRadius: "50%", marginBottom: "1rem" }} />
        <div className="ft-name">{c.business_name_first} <span>·</span> {c.business_name_rest}</div>
        <div className="ft-tag">{c.tagline} · {c.city_line}</div>
        <div className="ft-bottom">
          <div className="ft-copy">© {new Date().getFullYear()} <span>{c.business_name_first} {c.business_name_rest}</span>. Todos los derechos reservados. {c.city_line}.</div>
          <div className="ft-social">
            <a href={c.instagram_url} className="social-a" aria-label="Instagram" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
            </a>
            <a href={c.maps_url} className="social-a" aria-label="Google Maps" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24"><path d="M12 0C8.102 0 5 3.102 5 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.898-3.102-7-7-7zm0 9.5c-1.381 0-2.5-1.119-2.5-2.5S10.619 4.5 12 4.5s2.5 1.119 2.5 2.5S13.381 9.5 12 9.5z" /></svg>
            </a>
          </div>
        </div>
      </footer>

      <Link to="/login" className="ts-admin-link">admin</Link>
    </div>
  );
}
