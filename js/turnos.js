// Claves para localStorage
const USUARIOS_KEY = 'usuariosTurnos';
const TURNOS_KEY = 'turnosPorUsuario';
const MEDICOS_KEY = 'medicos'; // Viene de alta-medica.js

// Inicialización
if (!localStorage.getItem(USUARIOS_KEY)) {
  localStorage.setItem(USUARIOS_KEY, JSON.stringify([]));
}
if (!localStorage.getItem(TURNOS_KEY)) {
  localStorage.setItem(TURNOS_KEY, JSON.stringify({}));
}

// Elementos del DOM
const authSection = document.getElementById('authSection');
const turnosSection = document.getElementById('turnosSection');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const turnoForm = document.getElementById('turnoForm');
const tablaTurnosBody = document.getElementById('tablaTurnosBody');
const userDisplay = document.getElementById('userDisplay');
const btnLogout = document.getElementById('btnLogout');
const medicoSelect = document.getElementById('medicoId');
const btnCancelar = document.getElementById('btnCancelar');

let usuarioActivo = null;

// Verificar si hay un usuario logueado al cargar
document.addEventListener('DOMContentLoaded', () => {
  const usuariosGuardados = JSON.parse(localStorage.getItem(USUARIOS_KEY));
  const ultimoUsuario = localStorage.getItem('ultimoUsuario');
  if (ultimoUsuario && usuariosGuardados.some(u => u.usuario === ultimoUsuario)) {
    iniciarSesion(ultimoUsuario);
  } else {
    mostrarAuth();
  }
  cargarMedicosEnSelect();
});

// --- FUNCIONES DE AUTENTICACIÓN ---

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const usuario = document.getElementById('loginUsuario').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  const usuarios = JSON.parse(localStorage.getItem(USUARIOS_KEY));
  const user = usuarios.find(u => u.usuario === usuario && u.password === password);

  if (user) {
    iniciarSesion(usuario);
    loginForm.reset();
  } else {
    alert('Usuario o contraseña incorrectos.');
  }
});

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const usuario = document.getElementById('registerUsuario').value.trim();
  const password = document.getElementById('registerPassword').value.trim();

  if (!usuario || !password) {
    alert('Complete ambos campos.');
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem(USUARIOS_KEY));
  if (usuarios.some(u => u.usuario === usuario)) {
    alert('El nombre de usuario ya existe.');
    return;
  }

  usuarios.push({ usuario, password });
  localStorage.setItem(USUARIOS_KEY, JSON.stringify(usuarios));
  alert('Registro exitoso. Ahora puede iniciar sesión.');
  registerForm.reset();
});

btnLogout.addEventListener('click', () => {
  usuarioActivo = null;
  localStorage.removeItem('ultimoUsuario');
  mostrarAuth();
});

function iniciarSesion(usuario) {
  usuarioActivo = usuario;
  localStorage.setItem('ultimoUsuario', usuario);
  userDisplay.textContent = usuario;
  mostrarTurnos();
  cargarTurnos();
}

function mostrarAuth() {
  authSection.style.display = 'block';
  turnosSection.style.display = 'none';
}

function mostrarTurnos() {
  authSection.style.display = 'none';
  turnosSection.style.display = 'block';
}

// --- GESTIÓN DE TURNOS ---

turnoForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const id = document.getElementById('turnoId').value || Date.now().toString();
  const turno = {
    id,
    paciente: document.getElementById('nombrePaciente').value.trim(),
    medicoId: document.getElementById('medicoId').value,
    fecha: document.getElementById('fecha').value,
    hora: document.getElementById('hora').value,
    motivo: document.getElementById('motivo').value.trim(),
    usuario: usuarioActivo
  };

  if (!turno.medicoId) {
    alert('Seleccione un médico.');
    return;
  }

  // Guardar en localStorage
  const turnosPorUsuario = JSON.parse(localStorage.getItem(TURNOS_KEY));
  if (!turnosPorUsuario[usuarioActivo]) turnosPorUsuario[usuarioActivo] = [];

  const turnosUsuario = turnosPorUsuario[usuarioActivo];
  const index = turnosUsuario.findIndex(t => t.id === id);

  if (index !== -1) {
    turnosUsuario[index] = turno;
  } else {
    turnosUsuario.push(turno);
  }

  localStorage.setItem(TURNOS_KEY, JSON.stringify(turnosPorUsuario));
  turnoForm.reset();
  document.getElementById('turnoId').value = '';
  cargarTurnos();
});

btnCancelar.addEventListener('click', () => {
  turnoForm.reset();
  document.getElementById('turnoId').value = '';
});

// --- CARGAR MÉDICOS EN SELECT ---

function cargarMedicosEnSelect() {
  const medicos = JSON.parse(localStorage.getItem(MEDICOS_KEY)) || [];
  medicoSelect.innerHTML = '<option value="">Seleccionar médico</option>';
  medicos.forEach(medico => {
    const option = document.createElement('option');
    option.value = medico.id;
    option.textContent = `${medico.nombre} - ${medico.especialidad}`;
    medicoSelect.appendChild(option);
  });
}

// --- RENDERIZAR TURNOS DEL USUARIO ACTIVO ---

function cargarTurnos() {
  const turnosPorUsuario = JSON.parse(localStorage.getItem(TURNOS_KEY));
  const turnos = turnosPorUsuario[usuarioActivo] || [];
  const medicos = JSON.parse(localStorage.getItem(MEDICOS_KEY)) || [];

  tablaTurnosBody.innerHTML = '';

  turnos.forEach(turno => {
    const medico = medicos.find(m => String(m.id) === String(turno.medicoId)) || { nombre: 'Desconocido' };

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${turno.paciente}</td>
      <td>${medico.nombre}</td>
      <td>${turno.fecha}</td>
      <td>${turno.hora}</td>
      <td>${turno.motivo}</td>
      <td>
        <button class="btn btn-sm btn-warning me-1" onclick="editarTurno('${turno.id}')">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="eliminarTurno('${turno.id}')">Eliminar</button>
      </td>
    `;
    tablaTurnosBody.appendChild(tr);
  });
}

// --- FUNCIONES GLOBALES PARA EDICIÓN Y ELIMINACIÓN ---

window.editarTurno = function(id) {
  const turnosPorUsuario = JSON.parse(localStorage.getItem(TURNOS_KEY));
  const turnos = turnosPorUsuario[usuarioActivo] || [];
  const turno = turnos.find(t => t.id === id);
  if (turno) {
    document.getElementById('turnoId').value = turno.id;
    document.getElementById('nombrePaciente').value = turno.paciente;
    document.getElementById('medicoId').value = turno.medicoId;
    document.getElementById('fecha').value = turno.fecha;
    document.getElementById('hora').value = turno.hora;
    document.getElementById('motivo').value = turno.motivo;
  }
};

window.eliminarTurno = function(id) {
  if (!confirm('¿Está seguro de eliminar este turno?')) return;

  const turnosPorUsuario = JSON.parse(localStorage.getItem(TURNOS_KEY));
  const turnos = turnosPorUsuario[usuarioActivo] || [];
  turnosPorUsuario[usuarioActivo] = turnos.filter(t => t.id !== id);
  localStorage.setItem(TURNOS_KEY, JSON.stringify(turnosPorUsuario));
  cargarTurnos();
};
