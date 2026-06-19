import { useState } from 'react';

const inputStyle = {
  fontFamily: "'Chakra Petch', sans-serif",
  fontSize: 15,
  color: '#fff',
  background: '#0a0a10',
  border: '1px solid rgba(255,255,255,.12)',
  borderRadius: 8,
  padding: '13px 14px',
  outline: 'none',
  width: '100%',
  transition: 'border-color .2s',
};

const labelStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 7,
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: '1.5px',
  color: '#9aa0ad',
  fontFamily: "'Chakra Petch', sans-serif",
};

const errorStyle = {
  fontSize: 11,
  color: '#ff3ad8',
  marginTop: 3,
  fontFamily: "'Chakra Petch', sans-serif",
};

export default function ContactForm() {
  const [form, setForm] = useState({ nombre: '', email: '', servicio: 'Diseño web', mensaje: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.nombre.trim()) e.nombre = 'El nombre es requerido.';
    if (!form.email.trim()) {
      e.email = 'El email es requerido.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Ingresá un email válido.';
    }
    if (!form.mensaje.trim()) e.mensaje = 'El mensaje es requerido.';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setSent(true);
    setTimeout(() => setSent(false), 3500);
    // TODO: conectar a backend / servicio de email (EmailJS, Resend, etc.)
  };

  const handleChange = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    if (errors[field]) setErrors(e => { const n = { ...e }; delete n[field]; return n; });
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        padding: 32,
        borderRadius: 14,
        background: 'linear-gradient(160deg,#14151b,#0b0b10)',
        border: '1px solid rgba(255,255,255,.08)',
        boxShadow: '0 24px 60px rgba(0,0,0,.5)',
      }}
    >
      {/* Nombre + Email */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <label style={labelStyle}>
          NOMBRE
          <input
            type="text"
            placeholder="Tu nombre"
            value={form.nombre}
            onChange={e => handleChange('nombre', e.target.value)}
            style={{ ...inputStyle, borderColor: errors.nombre ? '#ff3ad8' : 'rgba(255,255,255,.12)' }}
            onFocus={e => (e.target.style.borderColor = '#2fe4ff')}
            onBlur={e => (e.target.style.borderColor = errors.nombre ? '#ff3ad8' : 'rgba(255,255,255,.12)')}
            aria-invalid={!!errors.nombre}
          />
          {errors.nombre && <span style={errorStyle}>{errors.nombre}</span>}
        </label>
        <label style={labelStyle}>
          EMAIL
          <input
            type="email"
            placeholder="tu@email.com"
            value={form.email}
            onChange={e => handleChange('email', e.target.value)}
            style={{ ...inputStyle, borderColor: errors.email ? '#ff3ad8' : 'rgba(255,255,255,.12)' }}
            onFocus={e => (e.target.style.borderColor = '#2fe4ff')}
            onBlur={e => (e.target.style.borderColor = errors.email ? '#ff3ad8' : 'rgba(255,255,255,.12)')}
            aria-invalid={!!errors.email}
          />
          {errors.email && <span style={errorStyle}>{errors.email}</span>}
        </label>
      </div>

      {/* Servicio */}
      <label style={labelStyle}>
        SERVICIO
        <select
          value={form.servicio}
          onChange={e => handleChange('servicio', e.target.value)}
          style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
          onFocus={e => (e.target.style.borderColor = '#2fe4ff')}
          onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,.12)')}
        >
          <option>Diseño web</option>
          <option>Landing Page</option>
          <option>Tienda Online</option>
          <option>Gestión de Redes</option>
          <option>Diseño Gráfico</option>
          <option>Branding</option>
          <option>Contenido Audiovisual</option>
        </select>
      </label>

      {/* Mensaje */}
      <label style={labelStyle}>
        MENSAJE
        <textarea
          rows={4}
          placeholder="Contanos sobre tu proyecto..."
          value={form.mensaje}
          onChange={e => handleChange('mensaje', e.target.value)}
          style={{
            ...inputStyle,
            resize: 'vertical',
            borderColor: errors.mensaje ? '#ff3ad8' : 'rgba(255,255,255,.12)',
          }}
          onFocus={e => (e.target.style.borderColor = '#2fe4ff')}
          onBlur={e => (e.target.style.borderColor = errors.mensaje ? '#ff3ad8' : 'rgba(255,255,255,.12)')}
          aria-invalid={!!errors.mensaje}
        />
        {errors.mensaje && <span style={errorStyle}>{errors.mensaje}</span>}
      </label>

      {/* Botón submit */}
      <button
        type="submit"
        style={{
          marginTop: 6,
          fontFamily: "'Chakra Petch', sans-serif",
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: '2px',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          padding: 16,
          borderRadius: 30,
          background: sent
            ? 'linear-gradient(100deg,#57ff7a,#2fe4ff)'
            : 'linear-gradient(100deg,#2fe4ff,#9d5cff,#ff3ad8)',
          boxShadow: '0 8px 26px rgba(157,92,255,.45)',
          transition: 'filter .2s, background .4s',
        }}
        onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1.1)')}
        onMouseLeave={e => (e.currentTarget.style.filter = '')}
      >
        {sent ? '¡MENSAJE ENVIADO! ✦' : 'ENVIAR MENSAJE'}
      </button>
    </form>
  );
}
