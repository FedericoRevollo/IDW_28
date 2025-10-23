const MEDICOS_KEY = 'medicos';
const USUARIO_KEY = 'usuarioActivo';

if (!localStorage.getItem(MEDICOS_KEY)) {
  localStorage.setItem(MEDICOS_KEY, JSON.stringify([]));
}

const loginSection = document.getElementById('loginSection');
const medicosSection = document.getElementById('medicosSection');
const loginForm = document.getElementById('loginForm');
const medicoForm = document.getElementById('medicoForm');
const cuerpoTabla = document.getElementById('cuerpoTabla');
const btnLogout = document.getElementById('btnLogout');

document.addEventListener('DOMContentLoaded', () => {
  const usuario = localStorage.getItem(USUARIO_KEY);
  if (usuario) {
    mostrarSeccionMedicos();
  } else {
    mostrarLogin();
  }
  renderizarTabla();
});

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const usuario = document.getElementById('usuario').value.trim();
  const clave = document.getElementById('clave').value.trim();
  if (usuario && clave) {
    localStorage.setItem(USUARIO_KEY, usuario);
    mostrarSeccionMedicos();
    loginForm.reset();
  } else {
    alert('Complete ambos campos');
  }
});

btnLogout.addEventListener('click', () => {
  localStorage.removeItem(USUARIO_KEY);
  mostrarLogin();
});

function mostrarLogin() {
  loginSection.classList.remove('hidden');
  medicosSection.classList.add('hidden');
}

function mostrarSeccionMedicos() {
  loginSection.classList.add('hidden');
  medicosSection.classList.remove('hidden');
}

// CRUD Médicos
medicoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = document.getElementById('medicoId').value || Date.now().toString();
  const medico = {
    id,
    nombre: document.getElementById('nombre').value.trim(),
    especialidad: document.getElementById('especialidad').value.trim(),
    telefono: document.getElementById('telefono').value.trim(),
    email: document.getElementById('email').value.trim(),
    obraSocial: document.getElementById('obraSocial').value.trim()
  };

  const medicos = JSON.parse(localStorage.getItem(MEDICOS_KEY));
  const index = medicos.findIndex(m => m.id === id);
  if (index !== -1) {
    medicos[index] = medico;
  } else {
    medicos.push(medico);
  }
  localStorage.setItem(MEDICOS_KEY, JSON.stringify(medicos));
  medicoForm.reset();
  document.getElementById('medicoId').value = '';
  renderizarTabla();
});

function renderizarTabla() {
  const medicos = JSON.parse(localStorage.getItem(MEDICOS_KEY));
  cuerpoTabla.innerHTML = '';
  medicos.forEach(m => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${m.nombre}</td>
      <td>${m.especialidad}</td>
      <td>${m.telefono}</td>
      <td>${m.email}</td>
      <td>${m.obraSocial}</td>
      <td>
        <button class="btn btn-sm btn-warning me-1" onclick="editarMedico('${m.id}')">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="eliminarMedico('${m.id}')">Eliminar</button>
      </td>
    `;
    cuerpoTabla.appendChild(tr);
  });
}

window.editarMedico = function(id) {
  const medicos = JSON.parse(localStorage.getItem(MEDICOS_KEY));
  const medico = medicos.find(m => m.id === id);
  if (medico) {
    document.getElementById('medicoId').value = medico.id;
    document.getElementById('nombre').value = medico.nombre;
    document.getElementById('especialidad').value = medico.especialidad;
    document.getElementById('telefono').value = medico.telefono;
    document.getElementById('obraSocial').value = medico.obraSocial;
    document.getElementById('email').value = medico.email;
  }
};

window.eliminarMedico = function(id) {
  if (confirm('¿Eliminar este médico?')) {
    let medicos = JSON.parse(localStorage.getItem(MEDICOS_KEY));
    medicos = medicos.filter(m => m.id !== id);
    localStorage.setItem(MEDICOS_KEY, JSON.stringify(medicos));
    renderizarTabla();
  }
};