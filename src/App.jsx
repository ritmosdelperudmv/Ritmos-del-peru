import { useState, useMemo } from "react";

// ─── MAIN LOGO ───────────────────────────────────────────────────────────────
// Replace with your logo URL. Example: "https://yoursite.com/logo.png"
// Or put logo.png in your /public folder and use "/logo.png"
const MAIN_LOGO_URL = "/ritmos del peru logo.jpg"; // ← paste your logo URL here

// ─── GROUPS & COLORS ─────────────────────────────────────────────────────────
const GROUPS = ["All", "Sumaj Tusuy DMV", "Sentimiento Peruano", "Aquí Está Mi Perú", "Papalca", "Perú Folclore", "Fraternidad Matices del Perú", "Percy Chinchilla", "Chicha Morada", "Kuyayky"];

const GROUP_INSTAGRAM = {
  "Sumaj Tusuy DMV":             "sumajtusuydmv",
  "Sentimiento Peruano":         "sentimientoperuanousa",
  "Aquí Está Mi Perú":           "aquiesta.miperu",
  "Papalca":                     "papalca_",
  "Perú Folclore":               "perufolkloreschool",
  "Fraternidad Matices del Perú":"fcmaticesdelperu",
  "Percy Chinchilla":            "percy_chinchilla",
  "Chicha Morada":               "chichamorada_",
  "Kuyayky":                     "kuyaykyfnd",
};

const REQUIRES_REGISTRATION = ["Sentimiento Peruano", "Papalca"];

const REGISTRATION_CONTACT = {
  "Sentimiento Peruano": "Inscripciones: Catherine · 703-304-8322",
  "Papalca":             "Inscripciones: Victor · 240-839-8803",
};

const SPONSORS = [
  { name: "Inca Social", instagram: "incasocial", logo: "/Inca Social.PNG" },
  { name: "Calletana's Peruvian Fast Food", instagram: "calletanasperuvianfastfood", logo: "/Calletanas.PNG" },
];

const GROUP_COLORS = {
  "Sumaj Tusuy DMV":             "#C0392B",
  "Sentimiento Peruano":         "#E67E22",
  "Aquí Está Mi Perú":           "#D4AC0D",
  "Papalca":                     "#7D6608",
  "Perú Folclore":               "#922B21",
  "Fraternidad Matices del Perú":"#CA6F1E",
  "Percy Chinchilla":            "#1E8449",
  "Chicha Morada":               "#7B241C",
  "Kuyayky":                     "#B7950B",
};

// ─── GROUP LOGOS ─────────────────────────────────────────────────────────────
// Add each group's logo URL here. Leave "" to show initials instead.
const GROUP_LOGOS = {
  "Sumaj Tusuy DMV":             "/Sumaj Tusuy DMV_.JPG",
  "Sentimiento Peruano":         "/Sentimiento Peruano USA.png",
  "Aquí Está Mi Perú":           "/Aqui esta mi Peru.png",
  "Papalca":                     "/Papalca.PNG",
  "Perú Folclore":               "/Peru Folklore.JPG",
  "Fraternidad Matices del Perú":"/Fraternida Cultural Matices del Peru.jpg",
  "Percy Chinchilla":            "/Percy Chinchilla.PNG",
  "Chicha Morada":               "/Chicha Morada.png",
  "Kuyayky":                     "/Kuyayky.jpg",
};

// ─── EVENTS ──────────────────────────────────────────────────────────────────
const SAMPLE_EVENTS = [
  { id: 1,  title: "Clase de Festejo · Tondero · Huaylarsh · Carnaval — Sumaj Tusuy DMV", group: "Sumaj Tusuy DMV", date: "2026-06-01", time: "7:30 PM – 9:00 PM", location: "George Mason Regional Library, 7001 Little River Tpke, Annandale, VA 22003", description: "Contacto: Beatriz Morales · 305-761-2666", host: "Sumaj Tusuy DMV", published: true },
  { id: 2,  title: "Clase de Festejo · Tondero · Huaylarsh · Carnaval — Sumaj Tusuy DMV", group: "Sumaj Tusuy DMV", date: "2026-06-17", time: "7:30 PM – 9:00 PM", location: "Thomas Jefferson Library, 7415 Arlington Blvd, Falls Church, VA 22042", description: "Contacto: Beatriz Morales · 305-761-2666", host: "Sumaj Tusuy DMV", published: true },
  { id: 3,  title: "Clase de Festejo · Tondero · Huaylarsh · Carnaval — Sumaj Tusuy DMV", group: "Sumaj Tusuy DMV", date: "2026-06-24", time: "7:30 PM – 9:00 PM", location: "Richard Byrd Library, 7250 Commerce St, Springfield, VA 22150", description: "Contacto: Beatriz Morales · 305-761-2666", host: "Sumaj Tusuy DMV", published: true },
  { id: 4,  title: "Clase de Marinera, Cajón y Danzas Peruanas — Sentimiento Peruano",          group: "Sentimiento Peruano",         date: "2026-06-05", time: "7pm Marinera Básico · 8pm Marinera Avanzado / Cajón · 9pm Danzas Folclóricas", location: "3700 S Four Mile Run, Arlington", description: "Requiere registro previo. Contacto: Catherine · 703-304-8322", host: "Sentimiento Peruano", published: true },
  { id: 5,  title: "Clase de Marinera, Cajón y Danzas Peruanas — Sentimiento Peruano",          group: "Sentimiento Peruano",         date: "2026-06-12", time: "7pm Marinera Básico · 8pm Marinera Avanzado / Cajón · 9pm Danzas Folclóricas", location: "3700 S Four Mile Run, Arlington", description: "Requiere registro previo. Contacto: Catherine · 703-304-8322", host: "Sentimiento Peruano", published: true },
  { id: 6,  title: "Clase de Caporales — Aquí Está Mi Perú", group: "Aquí Está Mi Perú", date: "2026-06-13", time: "6:00 PM", location: "Gaithersburg Elementary, 35 N Summit Ave, Gaithersburg, MD 20877", description: "Fecha, hora y lugar por confirmar.", host: "Aquí Está Mi Perú", published: true },
  { id: 15, title: "Clase de Caporales — Aquí Está Mi Perú", group: "Aquí Está Mi Perú", date: "2026-06-20", time: "6:00 PM", location: "Gaithersburg Elementary, 35 N Summit Ave, Gaithersburg, MD 20877", description: "Fecha, hora y lugar por confirmar.", host: "Aquí Está Mi Perú", published: true },
  { id: 16, title: "Clase de Caporales — Aquí Está Mi Perú", group: "Aquí Está Mi Perú", date: "2026-06-27", time: "6:00 PM", location: "Gaithersburg Elementary, 35 N Summit Ave, Gaithersburg, MD 20877", description: "Fecha, hora y lugar por confirmar.", host: "Aquí Está Mi Perú", published: true },
  { id: 7,  title: "Clase de Festejo — Papalca",                      group: "Papalca",                     date: "2026-06-06", time: "10:00 AM", location: "📍 Ubicación privada — regístrate para recibirla", description: "Requiere registro previo para recibir la dirección. Contacto: Victor · 240-839-8803", host: "Papalca", published: true },
  { id: 8,  title: "Clase de Ritmos Afro Peruanos — Perú Folclore",                group: "Perú Folclore",               date: "2026-06-09", time: "7:00 PM", location: "14301 Climbing Rose Way, Centreville, VA 20121", description: "Contacto: Andrés Arevalo · 202-500-9328", host: "Perú Folclore", published: true },
  { id: 9,  title: "Clase de Danzas Peruanas — Fraternidad Matices del Perú", group: "Fraternidad Matices del Perú", date: "2026-06-06", time: "5:00 PM", location: "Washington Square Neighborhood Park, 17800 Amity Drive, Gaithersburg, MD 20877", description: "Contacto: Maryorie · 240-477-2370 · lm.delao75@gmail.com", host: "Fraternidad Matices del Perú", published: true },
  { id: 13, title: "Clase de Danzas Peruanas — Fraternidad Matices del Perú", group: "Fraternidad Matices del Perú", date: "2026-06-13", time: "5:00 PM", location: "Washington Square Neighborhood Park, 17800 Amity Drive, Gaithersburg, MD 20877", description: "Contacto: Maryorie · 240-477-2370 · lm.delao75@gmail.com", host: "Fraternidad Matices del Perú", published: true },
  { id: 10, title: "Clase de Cajón Peruano — Percy Chinchilla",             group: "Percy Chinchilla",            date: "2026-06-06", time: "11:00 AM – 12:30 PM", location: "Calletana's Peruvian Chicken & Cuisine, 4300 Chantilly Shopping Center, Chantilly, VA 20151", description: "Contacto: Percy · 240-963-8503 · percychinchilla18@gmail.com", host: "Percy Chinchilla", published: true },
  { id: 11, title: "Evento — Chicha Morada",                group: "Chicha Morada",               date: "", time: "", location: "Inca Social, 1776 Wilson Blvd, Arlington, VA 22209", description: "Fecha y hora por confirmar. Contacto: chichamoradadc@gmail.com", host: "Chicha Morada", published: false },
  { id: 12, title: "Masterclass de Música de Cámara Andina — Kuyayky",                      group: "Kuyayky",                     date: "2026-06-06", time: "4:00 PM – 6:00 PM", location: "George Mason Regional Library, 7001 Little River Turnpike, Annandale, VA 22003", description: "Contacto: Jose Hurtado · (786) 228-6189", host: "Kuyayky", published: true },
];

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

// Peruvian palette — light cream
const P = {
  red:     "#C0392B",
  redDark: "#922B21",
  gold:    "#B8860B",
  goldDim: "#9A7209",
  cream:   "#FDF6E3",
  tan:     "#F5E6C8",
  brown:   "#7B3F00",
  bg:      "#FDF6E3",
  bgCard:  "#FFFFFF",
  bgMid:   "#FAF0D7",
  text:    "#3B1A00",
  muted:   "#8B5E3C",
  border:  "rgba(184,134,11,0.22)",
};

function formatDate(str) {
  if (!str) return "";
  const [y, m, d] = str.split("-");
  return `${MONTHS[parseInt(m)-1]} ${parseInt(d)}, ${y}`;
}

function GroupAvatar({ group, size = 40 }) {
  const logo = GROUP_LOGOS[group];
  const color = GROUP_COLORS[group] || P.gold;
  const initials = group.split(" ").slice(0,2).map(w => w[0]).join("").toUpperCase();
  return logo
    ? <img src={logo} alt={group} style={{ width:size, height:size, borderRadius:"50%", objectFit:"cover", border:`2px solid ${color}`, flexShrink:0 }} />
    : <div style={{ width:size, height:size, borderRadius:"50%", background:`${color}20`, border:`2px solid ${color}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:size*0.32, fontWeight:800, color, flexShrink:0, letterSpacing:"-0.02em" }}>{initials}</div>;
}

function Modal({ children, onClose }) {
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(80,20,0,0.55)", backdropFilter:"blur(6px)", zIndex:100, display:"flex", alignItems:"center", justifyContent:"center", padding:"1rem" }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background:"#FFFFFF", border:`1px solid ${P.border}`, borderRadius:"1.25rem", padding:"2rem", width:"100%", maxWidth:"500px", maxHeight:"90vh", overflowY:"auto" }}>
        {children}
      </div>
    </div>
  );
}

function PublishedToggle({ value, onChange }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", padding:"0.75rem 1rem", borderRadius:"0.6rem", background: value ? "rgba(74,222,128,0.1)" : "#FAF0D7", border: value ? "1px solid rgba(74,222,128,0.3)" : `1px solid ${P.border}`, cursor:"pointer", userSelect:"none" }} onClick={() => onChange(!value)}>
      <div style={{ width:"36px", height:"20px", borderRadius:"999px", background: value ? "#4ade80" : "rgba(255,255,255,0.15)", position:"relative", transition:"background 0.2s", flexShrink:0 }}>
        <div style={{ position:"absolute", top:"3px", left: value ? "19px" : "3px", width:"14px", height:"14px", borderRadius:"50%", background:"#fff", transition:"left 0.2s", boxShadow:"0 1px 3px rgba(0,0,0,0.5)" }} />
      </div>
      <div>
        <div style={{ fontSize:"0.85rem", fontWeight:600, color: value ? "#4ade80" : P.muted }}>{value ? "Publicado" : "Borrador"}</div>
        <div style={{ fontSize:"0.72rem", color:"#7a6040" }}>{value ? "Visible a la comunidad" : "Solo visible para ti"}</div>
      </div>
    </div>
  );
}

function StatusBadge({ published }) {
  return published
    ? <span style={{ display:"inline-flex", alignItems:"center", gap:"0.3rem", fontSize:"0.65rem", letterSpacing:"0.07em", textTransform:"uppercase", padding:"0.2rem 0.6rem", borderRadius:"999px", background:"rgba(74,222,128,0.12)", color:"#4ade80", border:"1px solid rgba(74,222,128,0.3)", fontWeight:700 }}>● Publicado</span>
    : <span style={{ display:"inline-flex", alignItems:"center", gap:"0.3rem", fontSize:"0.65rem", letterSpacing:"0.07em", textTransform:"uppercase", padding:"0.2rem 0.6rem", borderRadius:"999px", background:"rgba(251,191,36,0.1)", color:"#fbbf24", border:"1px solid rgba(251,191,36,0.3)", fontWeight:700 }}>◌ Borrador</span>;
}

function EventForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || { title:"", group: GROUPS[1], date:"", time:"", location:"", description:"", host:"", published: false });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const inputStyle = { width:"100%", background:"#FDF6E3", border:`1px solid ${P.border}`, borderRadius:"0.5rem", padding:"0.6rem 0.8rem", color:P.text, fontSize:"0.9rem", outline:"none", boxSizing:"border-box" };
  const labelStyle = { fontSize:"0.72rem", letterSpacing:"0.08em", color:P.muted, textTransform:"uppercase", marginBottom:"0.3rem", display:"block" };
  return (
    <div>
      <h2 style={{ fontFamily:"'Playfair Display', serif", color:P.gold, marginBottom:"1.5rem", fontSize:"1.35rem" }}>{initial?.id ? "Editar Evento" : "Agregar Evento"}</h2>
      <div style={{ display:"grid", gap:"1rem" }}>
        {[["Título","title","text"],["Grupo / Anfitrión","host","text"],["Lugar","location","text"],["Fecha","date","date"],["Hora","time","text"]].map(([label, key, type]) => (
          <div key={key}>
            <label style={labelStyle}>{label}</label>
            <input type={type} value={form[key]} onChange={e => set(key, e.target.value)} style={inputStyle} placeholder={label} />
          </div>
        ))}
        <div>
          <label style={labelStyle}>Categoría</label>
          <select value={form.group} onChange={e => set("group", e.target.value)} style={{ ...inputStyle, cursor:"pointer" }}>
            {GROUPS.filter(g => g !== "All").map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Descripción / Contacto</label>
          <textarea value={form.description} onChange={e => set("description", e.target.value)} rows={3} style={{ ...inputStyle, resize:"vertical" }} placeholder="Descripción, contacto, etc." />
        </div>
        <div>
          <label style={labelStyle}>Visibilidad</label>
          <PublishedToggle value={form.published} onChange={v => set("published", v)} />
        </div>
      </div>
      <div style={{ display:"flex", gap:"0.75rem", marginTop:"1.5rem" }}>
        <button onClick={() => onSave(form)} style={{ flex:1, padding:"0.75rem", background:`linear-gradient(135deg, ${P.red}, ${P.gold})`, border:"none", borderRadius:"0.5rem", color:"#fff", fontWeight:700, fontSize:"0.95rem", cursor:"pointer" }}>
          {initial?.id ? "Guardar Cambios" : "Agregar Evento"}
        </button>
        <button onClick={onCancel} style={{ padding:"0.75rem 1.25rem", background:"rgba(255,255,255,0.05)", border:`1px solid ${P.border}`, borderRadius:"0.5rem", color:P.muted, cursor:"pointer" }}>Cancelar</button>
      </div>
    </div>
  );
}

function CardView({ events, onEdit, onDelete, onView, onTogglePublish, adminMode }) {
  return (
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))", gap:"1.25rem" }}>
      {events.length === 0 && <p style={{ color:P.muted, gridColumn:"1/-1", textAlign:"center", padding:"3rem 0", opacity:0.6 }}>No hay eventos en esta categoría.</p>}
      {events.map(ev => {
        const color = GROUP_COLORS[ev.group] || P.gold;
        const isDraft = !ev.published;
        return (
          <div key={ev.id}
            style={{ background: isDraft && adminMode ? "#FFFBEA" : "#FFFFFF", border: isDraft && adminMode ? "1px solid rgba(184,134,11,0.35)" : `1px solid ${color}55`, borderRadius:"1rem", padding:"1.4rem", position:"relative", overflow:"hidden", transition:"transform 0.2s, box-shadow 0.2s", cursor:"pointer", opacity: isDraft && adminMode ? 0.8 : 1 }}
            onMouseEnter={e => { e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow=`0 12px 32px ${color}22`; }}
            onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}
            onClick={() => onView(ev)}
          >
            {/* top accent bar */}
            <div style={{ position:"absolute", top:0, left:0, right:0, height:"3px", background:`linear-gradient(90deg, ${color}, transparent)` }} />

            {/* header row: avatar + badges */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"0.9rem" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"0.6rem" }}>
                <GroupAvatar group={ev.group} size={38} />
                <span style={{ fontSize:"0.7rem", fontWeight:700, color, letterSpacing:"0.06em", textTransform:"uppercase", background:`${color}18`, padding:"0.2rem 0.55rem", borderRadius:"999px", border:`1px solid ${color}40` }}>{ev.group}</span>
              </div>
              {adminMode && <StatusBadge published={ev.published} />}
            </div>

            <h3 style={{ fontFamily:"'Playfair Display', serif", color:P.text, fontSize:"1.1rem", margin:"0 0 0.25rem", lineHeight:1.3 }}>
              {ev.title.includes(" — ") ? ev.title.split(" — ")[1] : ev.title}
            </h3>
            {ev.title.includes(" — ") && (
              <p style={{ fontSize:"0.8rem", color:P.muted, margin:"0 0 0.5rem", fontStyle:"italic" }}>
                {ev.title.split(" — ")[0]}
              </p>
            )}
            {ev.date && <p style={{ color:P.muted, fontSize:"0.82rem", margin:"0 0 0.2rem" }}>📅 {formatDate(ev.date)}{ev.time ? ` · ${ev.time}` : ""}</p>}
            {ev.location && <p style={{ color:P.muted, fontSize:"0.82rem", margin:"0 0 0.75rem" }}>📍 {ev.location.slice(0,60)}{ev.location.length>60?"…":""}</p>}
            {ev.description && <p style={{ color:"#a07850", fontSize:"0.8rem", margin:0, lineHeight:1.5 }}>{ev.description.slice(0,80)}{ev.description.length>80?"…":""}</p>}

            {/* Registration badge */}
            {REQUIRES_REGISTRATION.includes(ev.group) && (
              <div style={{ marginTop:"0.75rem", background:"rgba(192,57,43,0.06)", border:`1px solid ${P.red}35`, borderRadius:"0.5rem", padding:"0.5rem 0.75rem" }}>
                <div style={{ fontSize:"0.72rem", color:P.red, fontWeight:700, marginBottom:"0.2rem" }}>📋 Requiere registro previo</div>
                <div style={{ fontSize:"0.78rem", color:P.brown }}>{REGISTRATION_CONTACT[ev.group]}</div>
              </div>
            )}
            {/* Public action buttons */}
            {!adminMode && (
              <div style={{ display:"flex", gap:"0.5rem", marginTop:"0.85rem", flexWrap:"wrap" }} onClick={e => e.stopPropagation()}>
                {ev.date && (
                  <a href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(ev.title)}&dates=${ev.date.replace(/-/g,"")}T${ev.time ? "190000" : "120000"}/${ev.date.replace(/-/g,"")}T${ev.time ? "210000" : "140000"}&details=${encodeURIComponent(ev.description)}&location=${encodeURIComponent(ev.location)}`} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize:"0.72rem", padding:"0.3rem 0.7rem", background:"rgba(66,133,244,0.1)", border:"1px solid rgba(66,133,244,0.3)", borderRadius:"0.4rem", color:"#4285F4", cursor:"pointer", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:"0.3rem" }}>
                    📅 Google Calendar
                  </a>
                )}
                {GROUP_INSTAGRAM[ev.group] && (
                  <a href={`https://instagram.com/${GROUP_INSTAGRAM[ev.group]}`} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize:"0.72rem", padding:"0.3rem 0.7rem", background:"rgba(225,48,108,0.08)", border:"1px solid rgba(225,48,108,0.25)", borderRadius:"0.4rem", color:"#E1306C", cursor:"pointer", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:"0.3rem" }}>
                    📸 Instagram
                  </a>
                )}
              </div>
            )}
            {adminMode && (
              <div style={{ display:"flex", gap:"0.5rem", marginTop:"1rem", flexWrap:"wrap" }} onClick={e => e.stopPropagation()}>
                <button onClick={() => onEdit(ev)} style={{ fontSize:"0.72rem", padding:"0.28rem 0.65rem", background:`${P.gold}18`, border:`1px solid ${P.gold}50`, borderRadius:"0.4rem", color:P.gold, cursor:"pointer" }}>Editar</button>
                <button onClick={() => onTogglePublish(ev.id)} style={{ fontSize:"0.72rem", padding:"0.28rem 0.65rem", background: ev.published ? "rgba(251,191,36,0.1)" : "rgba(74,222,128,0.1)", border: ev.published ? "1px solid rgba(251,191,36,0.35)" : "1px solid rgba(74,222,128,0.35)", borderRadius:"0.4rem", color: ev.published ? "#fbbf24" : "#4ade80", cursor:"pointer" }}>
                  {ev.published ? "Despublicar" : "Publicar"}
                </button>
                <button onClick={() => onDelete(ev.id)} style={{ fontSize:"0.72rem", padding:"0.28rem 0.65rem", background:"rgba(192,57,43,0.12)", border:"1px solid rgba(192,57,43,0.3)", borderRadius:"0.4rem", color:"#e74c3c", cursor:"pointer" }}>Eliminar</button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function CalendarView({ events, onView }) {
  const [viewYear] = useState(2026);
  const [viewMonth] = useState(5); // June only (0-indexed)

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const eventsByDay = useMemo(() => {
    const map = {};
    events.forEach(ev => {
      if (!ev.date) return;
      const [y, m, d] = ev.date.split("-").map(Number);
      if (y === viewYear && m - 1 === viewMonth) {
        if (!map[d]) map[d] = [];
        map[d].push(ev);
      }
    });
    return map;
  }, [events, viewYear, viewMonth]);

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  const today = new Date();
  const isToday = d => d === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();

  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"1.25rem" }}>
        <h2 style={{ fontFamily:"'Playfair Display', serif", color:P.gold, fontSize:"1.3rem", margin:0 }}>{MONTHS[viewMonth]} {viewYear}</h2>
      </div>
      {/* Mobile-friendly upcoming events list */}
      <div style={{ display:"block", marginBottom:"1.5rem" }}>
        <p style={{ fontSize:"0.72rem", letterSpacing:"0.1em", textTransform:"uppercase", color:P.muted, margin:"0 0 0.75rem" }}>Próximos eventos en junio</p>
        <div style={{ display:"flex", flexDirection:"column", gap:"0.5rem" }}>
          {events.filter(e => e.date).sort((a,b) => a.date.localeCompare(b.date)).map(ev => {
            const color = ev.published ? (GROUP_COLORS[ev.group] || P.gold) : "#fbbf24";
            return (
              <div key={ev.id} onClick={() => onView(ev)} style={{ display:"flex", alignItems:"center", gap:"0.75rem", background:"#fff", border:`1px solid ${color}40`, borderLeft:`4px solid ${color}`, borderRadius:"0.5rem", padding:"0.6rem 0.85rem", cursor:"pointer" }}>
                <div style={{ minWidth:"42px", textAlign:"center", background:`${color}15`, borderRadius:"0.4rem", padding:"0.25rem" }}>
                  <div style={{ fontSize:"1rem", fontWeight:800, color, lineHeight:1 }}>{ev.date.split("-")[2]}</div>
                  <div style={{ fontSize:"0.6rem", color:P.muted, textTransform:"uppercase" }}>{MONTHS[parseInt(ev.date.split("-")[1])-1].slice(0,3)}</div>
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:"0.82rem", fontWeight:700, color:P.text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                    {ev.title.includes(" — ") ? ev.title.split(" — ")[1] : ev.title}
                  </div>
                  <div style={{ fontSize:"0.72rem", color:P.muted }}>{ev.title.includes(" — ") ? ev.title.split(" — ")[1].split("—")[0] : ""}{ev.time ? " · " + ev.time : ""}</div>
                  <div style={{ fontSize:"0.72rem", color, fontWeight:600 }}>{ev.group}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <p style={{ fontSize:"0.72rem", letterSpacing:"0.1em", textTransform:"uppercase", color:P.muted, margin:"0 0 0.75rem" }}>Vista de calendario</p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:"2px", marginBottom:"3px" }}>
        {DAYS.map(d => <div key={d} style={{ textAlign:"center", fontSize:"0.68rem", color:P.muted, letterSpacing:"0.08em", padding:"0.4rem 0", textTransform:"uppercase", opacity:0.7 }}>{d}</div>)}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:"2px" }}>
        {cells.map((d, i) => {
          const dayEvents = d ? (eventsByDay[d] || []) : [];
          return (
            <div key={i} style={{ minHeight:"70px", background: d ? (dayEvents.length > 0 ? "#FFF8E7" : isToday(d) ? `${P.red}15` : "#FFFFFF") : "transparent", border: d ? (isToday(d) ? `2px solid ${P.red}` : dayEvents.length > 0 ? `2px solid ${P.gold}` : `1px solid ${P.border}`) : "none", borderRadius:"0.5rem", padding:"0.3rem", boxSizing:"border-box", boxShadow: dayEvents.length > 0 ? `0 2px 8px ${P.gold}30` : "none" }}>
              {d && (
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"0.25rem" }}>
                  <div style={{ fontSize:"0.72rem", color: isToday(d) ? P.red : dayEvents.length > 0 ? P.brown : "#b0967a", fontWeight: isToday(d) || dayEvents.length > 0 ? 800 : 400 }}>{d}</div>
                  {dayEvents.length > 0 && <div style={{ width:"7px", height:"7px", borderRadius:"50%", background:P.red, flexShrink:0 }} />}
                </div>
              )}
              {dayEvents.slice(0,3).map(ev => {
                const color = ev.published ? (GROUP_COLORS[ev.group] || P.gold) : "#fbbf24";
                return (
                  <div key={ev.id} onClick={() => onView(ev)} title={ev.title}
                    style={{ background:`${color}22`, borderLeft:`3px solid ${color}`, borderRadius:"3px", padding:"2px 4px", fontSize:"0.6rem", color: P.brown, marginBottom:"2px", cursor:"pointer", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", fontWeight:600 }}>
                    {!ev.published && "◌ "}{ev.title}
                  </div>
                );
              })}
              {dayEvents.length > 3 && <div style={{ fontSize:"0.58rem", color:P.red, fontWeight:700 }}>+{dayEvents.length-3} más</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ShareBar() {
  const [copied, setCopied] = useState(false);
  const url = window.location.href;
  const text = "🇵🇪 Clases gratuitas de danza y música peruana en el DMV — Junio 2026";

  const copyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{ background:P.red, padding:"1.5rem", textAlign:"center" }}>
      <p style={{ color:"rgba(255,255,255,0.9)", fontSize:"0.85rem", margin:"0 0 1rem", letterSpacing:"0.05em" }}>
        🎉 ¡Comparte el calendario con tu comunidad!
      </p>
      <div style={{ display:"flex", justifyContent:"center", gap:"0.75rem", flexWrap:"wrap" }}>
        <a href={"https://wa.me/?text=" + encodeURIComponent("Clases gratuitas de danza y musica peruana en el DMV - Junio 2026 " + url)} target="_blank" rel="noopener noreferrer"
          style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", padding:"0.6rem 1.25rem", background:"#25D366", border:"none", borderRadius:"999px", color:"#fff", fontWeight:700, fontSize:"0.85rem", textDecoration:"none", cursor:"pointer" }}>
          💬 WhatsApp
        </a>
        <a href={"mailto:?subject=" + encodeURIComponent("Ritmos del Peru DMV 2026") + "&body=" + encodeURIComponent("Clases gratuitas de danza y musica peruana en el DMV - Junio 2026 " + url)}
          style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", padding:"0.6rem 1.25rem", background:"rgba(255,255,255,0.15)", border:"2px solid rgba(255,255,255,0.4)", borderRadius:"999px", color:"#fff", fontWeight:700, fontSize:"0.85rem", textDecoration:"none", cursor:"pointer" }}>
          📧 Email
        </a>
        <button onClick={copyLink}
          style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", padding:"0.6rem 1.25rem", background: copied ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.15)", border:"2px solid rgba(255,255,255,0.4)", borderRadius:"999px", color:"#fff", fontWeight:700, fontSize:"0.85rem", cursor:"pointer" }}>
          {copied ? "✅ ¡Copiado!" : "🔗 Copiar enlace"}
        </button>
      </div>
    </div>
  );
}

export default function CommunityCalendar() {
  const [events, setEvents] = useState(SAMPLE_EVENTS);
  const [view, setView] = useState("cards");
  const [filter, setFilter] = useState("All");
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [nextId, setNextId] = useState(100);
  const [adminMode, setAdminMode] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const ADMIN_PASSWORD = "DMVritmos25";

  const handleAdminLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setAdminMode(true);
      setShowPasswordModal(false);
      setPasswordInput("");
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const filtered = useMemo(() => {
    let evs = filter === "All" ? events : events.filter(e => e.group === filter);
    if (!adminMode) evs = evs.filter(e => e.published);
    return evs.sort((a, b) => a.date.localeCompare(b.date));
  }, [events, filter, adminMode]);

  const draftCount = events.filter(e => !e.published).length;

  const handleSave = (form) => {
    if (form.id) setEvents(evs => evs.map(e => e.id === form.id ? form : e));
    else { setEvents(evs => [...evs, { ...form, id: nextId }]); setNextId(n => n+1); }
    setModal(null); setSelected(null);
  };
  const handleDelete = (id) => setEvents(evs => evs.filter(e => e.id !== id));
  const handleTogglePublish = (id) => setEvents(evs => evs.map(e => e.id === id ? { ...e, published: !e.published } : e));

  return (
    <div style={{ minHeight:"100vh", background:P.bg, color:P.text, fontFamily:"'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;700&display=swap" rel="stylesheet" />

      {/* ── HEADER ── */}
      <div style={{ background:`linear-gradient(160deg, #C0392B 0%, #922B21 100%)`, borderBottom:`1px solid ${P.border}`, padding:"2.5rem 1.5rem 2rem", position:"relative", overflow:"hidden" }}>
        {/* decorative stripes — Peruvian flag echo */}
        <div style={{ position:"absolute", top:0, left:0, width:"6px", bottom:0, background:P.red, opacity:0.7 }} />
        <div style={{ position:"absolute", top:0, right:0, width:"6px", bottom:0, background:P.red, opacity:0.7 }} />

        <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:"1.25rem" }}>

            {/* Logo + Title */}
            <div style={{ display:"flex", alignItems:"center", gap:"1.25rem" }}>
              {MAIN_LOGO_URL
                ? <img src={MAIN_LOGO_URL} alt="Logo" style={{ height:"110px", width:"110px", objectFit:"contain", borderRadius:"0.75rem", border:`2px solid ${P.gold}` }} />
                : <div style={{ height:"110px", width:"110px", borderRadius:"0.75rem", border:`2px solid ${P.gold}`, background:P.bgMid, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"2.5rem" }}>🇵🇪</div>
              }
              <div>
                <p style={{ fontSize:"0.72rem", letterSpacing:"0.2em", color:"#FFE58A", textTransform:"uppercase", margin:"0 0 0.3rem", opacity:1, display:"none" }}>✦ Calendario Comunitario</p>
                <h1 style={{ fontFamily:"'Playfair Display', serif", fontSize:"clamp(1.6rem, 4vw, 2.6rem)", margin:"0 0 0.3rem", color:"#FFFFFF", lineHeight:1.1 }}>
                  Ritmos del Perú DMV 2026
                </h1>
                <p style={{ color:"rgba(255,255,255,0.9)", margin:"0 0 0.75rem", fontSize:"0.88rem", lineHeight:1.6 }}>Clases de folclore y música peruana gratuitas ofrecidas por distintas escuelas y artistas del DMV · Junio 2026</p>
                <p style={{ color:"#FFE58A", margin:0, fontSize:"0.85rem", fontWeight:600 }}>👇 Encuentra una clase cerca de ti — ¡todas son gratuitas y abiertas a la comunidad!</p>
              </div>
            </div>

            {/* Admin toggle */}
            <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:"0.4rem" }}>
              <div style={{ display:"flex", gap:"0.5rem", alignItems:"center" }}>
                <button onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title:"Ritmos del Peru DMV 2026", url: window.location.href });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Enlace copiado!");
                  }
                }} style={{ padding:"0.45rem 1rem", fontSize:"0.78rem", fontWeight:600, cursor:"pointer", border:"2px solid rgba(255,255,255,0.5)", borderRadius:"0.6rem", background:"rgba(255,255,255,0.15)", color:"#fff", display:"flex", alignItems:"center", gap:"0.4rem" }}>
                  🔗 Compartir
                </button>
                <div style={{ display:"flex", background:"rgba(255,255,255,0.3)", border:`1px solid ${P.border}`, borderRadius:"0.6rem", overflow:"hidden" }}>
                  <button onClick={() => { if(adminMode){ setAdminMode(false); } else { setShowPasswordModal(true); } }}
                    style={{ padding:"0.45rem 1rem", fontSize:"0.78rem", fontWeight:600, cursor:"pointer", border:"none", background: adminMode ? "rgba(255,255,255,0.25)" : "transparent", color: adminMode ? "#FFFFFF" : "rgba(255,255,255,0.6)", transition:"all 0.15s" }}>
                    {adminMode ? "🔓 Admin" : "🔒 Admin"}
                  </button>
                </div>
              </div>
              {adminMode && draftCount > 0 && <span style={{ fontSize:"0.7rem", color:"#FFE58A" }}>◌ {draftCount} borrador{draftCount!==1?"es":""} ocultos</span>}
            </div>
          </div>
        </div>
      </div>

      {/* ── GOLD DIVIDER ── */}
      <div style={{ height:"3px", background:`linear-gradient(90deg, transparent, ${P.gold}, ${P.red}, ${P.gold}, transparent)` }} />

      {/* ── CONTROLS ── */}
      <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"1.5rem 1.5rem 0" }}>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"0.75rem", alignItems:"center", justifyContent:"space-between" }}>
          {/* Group filters */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:"0.4rem" }}>
            {GROUPS.map(g => {
              const active = filter === g;
              const color = g === "All" ? P.gold : (GROUP_COLORS[g] || P.gold);
              return (
                <button key={g} onClick={() => setFilter(g)}
                  style={{ padding:"0.3rem 0.8rem", borderRadius:"999px", fontSize:"0.78rem", fontWeight:600, cursor:"pointer", transition:"all 0.15s", background: active ? color : "#FFFFFF", border:`1px solid ${active ? color : color+"50"}`, color: active ? "#fff" : color, display:"flex", alignItems:"center", gap:"0.35rem" }}>
                  {g !== "All" && <GroupAvatar group={g} size={18} />}
                  {g === "All" ? "Todos" : g}
                </button>
              );
            })}
          </div>
          {/* View + Add */}
          <div style={{ display:"flex", gap:"0.5rem", alignItems:"center" }}>
            {[["cards","⊞ Tarjetas"],["calendar","◫ Calendario"]].map(([v,label]) => (
              <button key={v} onClick={() => setView(v)}
                style={{ padding:"0.4rem 0.9rem", borderRadius:"0.5rem", fontSize:"0.78rem", cursor:"pointer", background: view===v ? `${P.gold}18` : "#FFFFFF", border: view===v ? `1px solid ${P.gold}70` : `1px solid ${P.border}`, color: view===v ? P.gold : P.muted }}>
                {label}
              </button>
            ))}
            {adminMode && <button onClick={() => { setSelected(null); setModal("add"); }}
              style={{ padding:"0.4rem 1rem", borderRadius:"0.5rem", fontSize:"0.78rem", fontWeight:700, cursor:"pointer", background:`linear-gradient(135deg,${P.red},${P.gold})`, border:"none", color:"#fff" }}>
              + Agregar
            </button>}
          </div>
        </div>
        <p style={{ color:"#6a4828", fontSize:"0.78rem", marginTop:"0.65rem" }}>
          {filtered.length} evento{filtered.length!==1?"s":""} {filter!=="All" ? `· ${filter}` : "· todos los grupos"}
          {!adminMode && " · vista pública"}
        </p>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"1rem 1.5rem 5rem" }}>
        {view === "cards"
          ? <CardView events={filtered} onEdit={ev=>{setSelected(ev);setModal("edit");}} onDelete={handleDelete} onView={ev=>{setSelected(ev);setModal("view");}} onTogglePublish={handleTogglePublish} adminMode={adminMode} />
          : <CalendarView events={filtered} onView={ev=>{setSelected(ev);setModal("view");}} />
        }
      </div>

      {/* ── ABOUT ── */}
      <div style={{ background:P.bgMid, borderTop:`3px solid ${P.gold}`, borderBottom:`1px solid ${P.border}`, padding:"3rem 1.5rem" }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
          <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:"clamp(1.6rem, 3vw, 2.2rem)", color:P.red, margin:"0 0 1rem", borderLeft:`4px solid ${P.gold}`, paddingLeft:"1rem" }}>¿Qué es Ritmos del Perú?</h2>
          <p style={{ fontSize:"clamp(1rem, 2.5vw, 1.25rem)", color:P.text, lineHeight:1.7, margin:"0 0 2rem", maxWidth:"800px" }}>
            Un calendario de eventos que ofrece clases y talleres gratuitos en el área del DMV, ofrecidas por distintos grupos de danza y música peruana.
          </p>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))", gap:"1.25rem" }}>
            {[
              { title:"Visibilidad", color:"#0E9E8E", text:"Conectamos grupos con la comunidad y atraemos nuevas personas a la cultura peruana." },
              { title:"Comunidad",   color:P.gold,    text:"Creamos un espacio para descubrir, explorar y celebrar la danza y música del Perú." },
              { title:"Mes Patrio",  color:"#C9A87C",  text:"Preparamos a la comunidad para las celebraciones de independencia de julio." },
            ].map(card => (
              <div key={card.title} style={{ background:P.bgCard, border:`1px solid ${P.border}`, borderTop:`3px solid ${card.color}`, borderRadius:"0.75rem", padding:"1.5rem" }}>
                <h3 style={{ fontFamily:"'Playfair Display', serif", color:card.color, fontSize:"1.3rem", margin:"0 0 1rem" }}>{card.title}</h3>
                <p style={{ color:P.muted, fontSize:"0.92rem", lineHeight:1.65, margin:0 }}>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAP ── */}
      <div style={{ background:P.tan, borderBottom:`1px solid ${P.border}`, padding:"3rem 1.5rem" }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
          <p style={{ fontSize:"0.72rem", letterSpacing:"0.2em", textTransform:"uppercase", color:P.gold, margin:"0 0 0.4rem" }}>✦ Ubicaciones</p>
          <h2 style={{ fontFamily:"'Playfair Display', serif", color:P.text, fontSize:"1.5rem", margin:"0 0 1.5rem" }}>¿Dónde son los eventos?</h2>
          <div style={{ borderRadius:"1rem", overflow:"hidden", border:`2px solid ${P.border}`, boxShadow:`0 4px 20px ${P.gold}20` }}>
            <a href="https://www.google.com/maps/dir/George+Mason+Regional+Library,+7001+Little+River+Tpke,+Annandale,+VA+22003/Thomas+Jefferson+Library,+7415+Arlington+Blvd,+Falls+Church,+VA+22042/Richard+Byrd+Library,+7250+Commerce+St,+Springfield,+VA+22150/3700+S+Four+Mile+Run+Dr,+Arlington,+VA/Gaithersburg+Elementary,+35+N+Summit+Ave,+Gaithersburg,+MD+20877/14301+Climbing+Rose+Way,+Centreville,+VA+20121/Calletana's,+4300+Chantilly+Shopping+Center,+Chantilly,+VA/1776+Wilson+Blvd,+Arlington,+VA/Washington+Square+Neighborhood+Park,+17800+Amity+Dr,+Gaithersburg,+MD" target="_blank" rel="noopener noreferrer" style={{ display:"block", textDecoration:"none" }}>
              <div style={{ width:"100%", height:"280px", background:`linear-gradient(135deg, ${P.tan}, #fff)`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"1rem", border:`2px dashed ${P.border}`, borderRadius:"0.75rem", cursor:"pointer" }}>
                <div style={{ fontSize:"3rem" }}>🗺️</div>
                <div style={{ textAlign:"center" }}>
                  <p style={{ fontFamily:"'Playfair Display', serif", fontSize:"1.2rem", color:P.text, margin:"0 0 0.4rem", fontWeight:700 }}>Ver todas las ubicaciones en Google Maps</p>
                  <p style={{ fontSize:"0.85rem", color:P.muted, margin:0 }}>Toca cada tarjeta abajo para abrir la dirección exacta</p>
                </div>
                <div style={{ padding:"0.6rem 1.5rem", background:`linear-gradient(135deg, ${P.red}, ${P.gold})`, borderRadius:"999px", color:"#fff", fontWeight:700, fontSize:"0.9rem" }}>Ver área del DMV →</div>
              </div>
            </a>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))", gap:"0.75rem", marginTop:"1.25rem" }}>
            {[
              { name:"George Mason Regional Library", addr:"7001 Little River Tpke, Annandale, VA 22003", groups:"Sumaj Tusuy DMV · Kuyayky" },
              { name:"Thomas Jefferson Library", addr:"7415 Arlington Blvd, Falls Church, VA 22042", groups:"Sumaj Tusuy DMV" },
              { name:"Richard Byrd Library", addr:"7250 Commerce St, Springfield, VA 22150", groups:"Sumaj Tusuy DMV" },
              { name:"3700 S Four Mile Run", addr:"Arlington, VA", groups:"Sentimiento Peruano" },
              { name:"Gaithersburg Elementary", addr:"35 N Summit Ave, Gaithersburg, MD 20877", groups:"Aquí Está Mi Perú" },
              { name:"14301 Climbing Rose Way", addr:"Centreville, VA 20121", groups:"Perú Folclore" },
              { name:"Calletana's", addr:"4300 Chantilly Shopping Center, VA", groups:"Percy Chinchilla" },
              { name:"Inca Social", addr:"1776 Wilson Blvd, Arlington, VA", groups:"Chicha Morada" },
              { name:"Washington Square Neighborhood Park", addr:"17800 Amity Drive, Gaithersburg, MD", groups:"Fraternidad Matices del Perú" },
            ].map(loc => (
              <a key={loc.name} href={`https://maps.google.com/?q=${encodeURIComponent(loc.addr)}`} target="_blank" rel="noopener noreferrer"
                style={{ background:"#fff", border:`1px solid ${P.border}`, borderRadius:"0.6rem", padding:"0.75rem 1rem", textDecoration:"none", display:"block", transition:"transform 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.transform="translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform="translateY(0)"}>
                <div style={{ fontSize:"0.82rem", fontWeight:700, color:P.text, marginBottom:"0.2rem" }}>📍 {loc.name}</div>
                <div style={{ fontSize:"0.75rem", color:P.muted, marginBottom:"0.2rem" }}>{loc.addr}</div>
                <div style={{ fontSize:"0.7rem", color:P.gold, fontWeight:600 }}>{loc.groups}</div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── SHARE ── */}
      <ShareBar />

      {/* ── SPONSORS ── */}
      <div style={{ borderTop:`2px solid ${P.border}`, background:P.tan, padding:"2rem 1.5rem" }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
          <p style={{ textAlign:"center", fontSize:"0.72rem", letterSpacing:"0.15em", textTransform:"uppercase", color:P.muted, marginBottom:"1.25rem" }}>✦ Patrocinadores</p>
          <div style={{ display:"flex", justifyContent:"center", alignItems:"center", gap:"2rem", flexWrap:"wrap" }}>
            {SPONSORS.map(s => (
              <a key={s.name} href={`https://instagram.com/${s.instagram}`} target="_blank" rel="noopener noreferrer"
                style={{ display:"flex", alignItems:"center", gap:"0.75rem", textDecoration:"none", background:"#fff", border:`1px solid ${P.border}`, borderRadius:"0.75rem", padding:"0.75rem 1.25rem", transition:"transform 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.transform="translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform="translateY(0)"}>
                <img src={s.logo} alt={s.name} style={{ height:"40px", objectFit:"contain" }} />
                <div>
                  <div style={{ fontSize:"0.8rem", fontWeight:700, color:P.text }}>{s.name}</div>
                  <div style={{ fontSize:"0.72rem", color:"#E1306C" }}>@{s.instagram}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── MODALS ── */}
      {/* Password Modal */}
      {showPasswordModal && (
        <Modal onClose={() => { setShowPasswordModal(false); setPasswordInput(""); setPasswordError(false); }}>
          <div>
            <div style={{ textAlign:"center", marginBottom:"1.5rem" }}>
              <div style={{ fontSize:"2.5rem", marginBottom:"0.5rem" }}>🔒</div>
              <h2 style={{ fontFamily:"'Playfair Display', serif", color:P.text, fontSize:"1.4rem", margin:"0 0 0.25rem" }}>Acceso Admin</h2>
              <p style={{ color:P.muted, fontSize:"0.85rem", margin:0 }}>Ingresa tu contraseña para continuar</p>
            </div>
            <input
              type="password"
              value={passwordInput}
              onChange={e => { setPasswordInput(e.target.value); setPasswordError(false); }}
              onKeyDown={e => e.key === "Enter" && handleAdminLogin()}
              placeholder="Contraseña"
              style={{ width:"100%", background:"#FDF6E3", border:`2px solid ${passwordError ? P.red : P.border}`, borderRadius:"0.5rem", padding:"0.75rem 1rem", color:P.text, fontSize:"1rem", outline:"none", boxSizing:"border-box", marginBottom:"0.5rem" }}
              autoFocus
            />
            {passwordError && <p style={{ color:P.red, fontSize:"0.8rem", margin:"0 0 0.75rem" }}>❌ Contraseña incorrecta. Intenta de nuevo.</p>}
            <button onClick={handleAdminLogin}
              style={{ width:"100%", padding:"0.75rem", background:`linear-gradient(135deg, ${P.red}, ${P.gold})`, border:"none", borderRadius:"0.5rem", color:"#fff", fontWeight:700, fontSize:"1rem", cursor:"pointer", marginTop:"0.5rem" }}>
              Entrar
            </button>
          </div>
        </Modal>
      )}

      {(modal==="add"||modal==="edit") && (
        <Modal onClose={() => { setModal(null); setSelected(null); }}>
          <EventForm initial={selected} onSave={handleSave} onCancel={() => { setModal(null); setSelected(null); }} />
        </Modal>
      )}
      {modal==="view" && selected && (
        <Modal onClose={() => { setModal(null); setSelected(null); }}>
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1rem", flexWrap:"wrap", gap:"0.5rem" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"0.6rem" }}>
                <GroupAvatar group={selected.group} size={36} />
                <span style={{ fontSize:"0.7rem", fontWeight:700, color:GROUP_COLORS[selected.group]||P.gold, letterSpacing:"0.06em", textTransform:"uppercase" }}>{selected.group}</span>
              </div>
              {adminMode && <StatusBadge published={selected.published} />}
            </div>
            <h2 style={{ fontFamily:"'Playfair Display', serif", color:P.text, fontSize:"1.4rem", margin:"0 0 1.1rem" }}>{selected.title}</h2>
            {[["📅 Fecha y Hora", `${formatDate(selected.date)}${selected.time ? " · "+selected.time : ""}`], ["📍 Lugar", selected.location], ["🎭 Grupo", selected.host]].map(([k,v]) => v ? (
              <div key={k} style={{ marginBottom:"0.65rem" }}>
                <span style={{ color:P.muted, fontSize:"0.75rem" }}>{k}</span>
                <p style={{ color:P.text, margin:"0.15rem 0 0", fontSize:"0.92rem", lineHeight:1.5 }}>{v}</p>
              </div>
            ) : null)}
            {selected.description && <div style={{ marginTop:"1rem", padding:"0.9rem 1rem", background:"#FDF6E3", border:`1px solid ${P.border}`, borderRadius:"0.75rem", color:P.muted, fontSize:"0.88rem", lineHeight:1.6 }}>{selected.description}</div>}
            {adminMode && <div style={{ marginTop:"1rem" }}><PublishedToggle value={selected.published} onChange={v => { handleTogglePublish(selected.id); setSelected(s=>({...s,published:v})); }} /></div>}
            <div style={{ display:"flex", gap:"0.75rem", marginTop:"1.5rem" }}>
              {adminMode && <button onClick={() => setModal("edit")} style={{ flex:1, padding:"0.65rem", background:`${P.gold}18`, border:`1px solid ${P.gold}60`, borderRadius:"0.5rem", color:P.gold, cursor:"pointer", fontWeight:600 }}>Editar</button>}
              <button onClick={() => { setModal(null); setSelected(null); }} style={{ padding:"0.65rem 1.25rem", background:"#FAF0D7", border:`1px solid ${P.border}`, borderRadius:"0.5rem", color:P.muted, cursor:"pointer" }}>Cerrar</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
