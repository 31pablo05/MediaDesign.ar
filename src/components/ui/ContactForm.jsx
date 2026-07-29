import { useState } from 'react';

const FORM_ENDPOINT = import.meta.env.PUBLIC_CONTACT_FORM_URL;

const inputStyle = {
  fontFamily: "'Chakra Petch', sans-serif",
  fontSize: 15,
  color: 'var(--color-white)',
  background: 'var(--color-bg-deep)',
  border: '1px solid rgba(255,255,255,.12)',
  borderRadius: 8,
  padding: '13px 14px',
  outline: 'none',
  width: '100%',
  transition: 'border-color .2s, box-shadow .2s',
};

const labelStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 7,
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: '1.5px',
  color: 'var(--color-muted)',
  fontFamily: "'Chakra Petch', sans-serif",
};

const errorStyle = {
  fontSize: 11,
  color: 'var(--color-magenta)',
  marginTop: 3,
  fontFamily: "'Chakra Petch', sans-serif",
};

export default function ContactForm() {
  const [form, setForm] = useState({ nombre: '', email: '', servicio: 'Diseño web', mensaje: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setSubmitError('');
    setSending(true);

    try {
      if (FORM_ENDPOINT) {
        const response = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: form.nombre,
            email: form.email,
            service: form.servicio,
            message: form.mensaje,
            _subject: `Nuevo contacto — ${form.servicio}`,
          }),
        });

        if (!response.ok) throw new Error('No se pudo enviar el mensaje.');
      } else {
        const body = encodeURIComponent(
          `Nombre: ${form.nombre}\nEmail: ${form.email}\nServicio: ${form.servicio}\n\n${form.mensaje}`
        );
        window.location.href = `mailto:contacto@mediadesign.ar?subject=${encodeURIComponent(`Consulta — ${form.servicio}`)}&body=${body}`;
      }

      setSent(true);
      setForm({ nombre: '', email: '', servicio: 'Diseño web', mensaje: '' });
      setTimeout(() => setSent(false), 4000);
    } catch {
      setSubmitError('Hubo un error al enviar. Escribinos por WhatsApp o Instagram.');
    } finally {
      setSending(false);
    }
  };

  const handleChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const focusBorder = (target) => {
    target.style.borderColor = 'var(--color-cyan)';
    target.style.boxShadow = '0 0 0 2px rgba(47,228,255,.2)';
  };

  const blurBorder = (target, field) => {
    target.style.borderColor = errors[field] ? 'var(--color-magenta)' : 'rgba(255,255,255,.12)';
    target.style.boxShadow = 'none';
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="contact-form">
      <div className="contact-form__row">
        <label style={labelStyle}>
          NOMBRE
          <input
            type="text"
            placeholder="Tu nombre"
            value={form.nombre}
            onChange={(ev) => handleChange('nombre', ev.target.value)}
            style={{ ...inputStyle, borderColor: errors.nombre ? 'var(--color-magenta)' : 'rgba(255,255,255,.12)' }}
            onFocus={(ev) => focusBorder(ev.target)}
            onBlur={(ev) => blurBorder(ev.target, 'nombre')}
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
            onChange={(ev) => handleChange('email', ev.target.value)}
            style={{ ...inputStyle, borderColor: errors.email ? 'var(--color-magenta)' : 'rgba(255,255,255,.12)' }}
            onFocus={(ev) => focusBorder(ev.target)}
            onBlur={(ev) => blurBorder(ev.target, 'email')}
            aria-invalid={!!errors.email}
          />
          {errors.email && <span style={errorStyle}>{errors.email}</span>}
        </label>
      </div>

      <label style={labelStyle}>
        SERVICIO
        <select
          value={form.servicio}
          onChange={(ev) => handleChange('servicio', ev.target.value)}
          style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
          onFocus={(ev) => focusBorder(ev.target)}
          onBlur={(ev) => blurBorder(ev.target, 'servicio')}
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

      <label style={labelStyle}>
        MENSAJE
        <textarea
          rows={4}
          placeholder="Contanos sobre tu proyecto..."
          value={form.mensaje}
          onChange={(ev) => handleChange('mensaje', ev.target.value)}
          style={{
            ...inputStyle,
            resize: 'vertical',
            borderColor: errors.mensaje ? 'var(--color-magenta)' : 'rgba(255,255,255,.12)',
          }}
          onFocus={(ev) => focusBorder(ev.target)}
          onBlur={(ev) => blurBorder(ev.target, 'mensaje')}
          aria-invalid={!!errors.mensaje}
        />
        {errors.mensaje && <span style={errorStyle}>{errors.mensaje}</span>}
      </label>

      {submitError && (
        <p role="alert" style={{ ...errorStyle, fontSize: 13, marginTop: 4 }}>{submitError}</p>
      )}

      <button type="submit" disabled={sending} className="contact-form__submit">
        {sent ? '¡MENSAJE ENVIADO! ✦' : sending ? 'ENVIANDO...' : 'ENVIAR MENSAJE'}
      </button>

      {!FORM_ENDPOINT && (
        <p style={{ fontSize: 12, color: 'var(--color-dim)', textAlign: 'center', marginTop: 4 }}>
          Sin backend configurado: se abrirá tu cliente de correo.
        </p>
      )}

      <style>{`
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 32px;
          border-radius: 14px;
          background: linear-gradient(160deg, var(--color-surface), var(--color-card-to));
          border: 1px solid rgba(255,255,255,.08);
          box-shadow: var(--shadow-form);
        }
        .contact-form__row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .contact-form__submit {
          margin-top: 6px;
          font-family: 'Chakra Petch', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #fff;
          border: none;
          cursor: pointer;
          padding: 16px;
          border-radius: 30px;
          background: linear-gradient(100deg, var(--color-cyan), var(--color-purple), var(--color-magenta));
          box-shadow: 0 8px 26px rgba(157,92,255,.45);
          transition: filter .2s, opacity .2s;
        }
        .contact-form__submit:hover:not(:disabled) { filter: brightness(1.1); }
        .contact-form__submit:disabled { opacity: .7; cursor: wait; }
        .contact-form__submit.sent {
          background: linear-gradient(100deg, var(--color-green), var(--color-cyan));
        }
        @media (max-width: 640px) {
          .contact-form { padding: 24px 20px; }
          .contact-form__row { grid-template-columns: 1fr; }
        }
      `}</style>
    </form>
  );
}
