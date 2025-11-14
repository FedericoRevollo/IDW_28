// Médicos
const DEFAULT_MEDICOS = [
  {
    id: 1,
    matricula: 12345,
    apellido: "López",
    nombre: "Ana",
    especialidad: 1,
    descripcion: "Médica general con 10 años de experiencia en atención primaria.",
    obrasSociales: [1],
    fotografia: "image/1000736535.jpg=",
    valorConsulta: 3500.50
  },
  {
    id: 2,
    matricula: 67890,
    apellido: "castro",
    nombre: "Sofia",
    especialidad: 2,
    descripcion: "Pediatra especializado en primeros años de vida.",
    obrasSociales: [1, 2],
    fotografia: "image/1000736539==",
    valorConsulta: 4000.00
  }
  {
    id: 3,
    matricula: 67890,
    apellido: "Alex",
    nombre: "Otega",
    especialidad: 4,
    descripcion: "especialista en lesiones oseas.",
    obrasSociales: [1, 2],
    fotografia: "image/1000736540==",
    valorConsulta: 4000.00
  }
  {
    id: 4,
    matricula: 67890,
    apellido: "Fenandez",
    nombre: "Agustina",
    especialidad: 3,
    descripcion: "Pediatra especializado en primeros años de vida.",
    obrasSociales: [1, 2],
    fotografia: "image/1000736539==",
    valorConsulta: 4000.00
  }
  {
    id: 2,
    matricula: 67890,
    apellido: "Sofia",
    nombre: "Castro",
    especialidad: 5,
    descripcion: "Pediatra especializado en primeros años de vida.",
    obrasSociales: [1, 2],
    fotografia: "image/1000736539==",
    valorConsulta: 4000.00
  }
];

// Especialidades
const DEFAULT_ESPECIALIDADES = [
  { id: 1, nombre: "Clínica médica" },
  { id: 2, nombre: "Pediatría" }
  { id: 3, nombre: "Traumatologia" }
  { id: 4, nombre: "Neurologia" }
  { id: 2, nombre: "Oftalmologia" }
];

// Obras Sociales (incluye campo 'descuento' para la lógica de cálculo)
const DEFAULT_OBRAS_SOCIALES = [
  { id: 1, nombre: "OSDE", descuento: 30 },
  { id: 2, nombre: "IOMA", descuento: 48 }
  { id: 2, nombre: "OSPE", descuento: 25 }
  { id: 2, nombre: "OSPRERA", descuento: 45 }
  { id: 2, nombre: "IOPSEP", descuento: 15 }
];

// Turnos
const DEFAULT_TURNOS = [
  { id: 1, medicoId: 1, fechaHora: "2025-11-15T10:00", disponible: true },
  { id: 2, medicoId: 1, fechaHora: "2025-11-15T11:00", disponible: true },
  { id: 3, medicoId: 2, fechaHora: "2025-11-16T09:00", disponible: true }
];

// Reservas 
const DEFAULT_RESERVAS = [];


function inicializarStorage() {
  if (!localStorage.getItem('medicos')) {
    localStorage.setItem('medicos', JSON.stringify(DEFAULT_MEDICOS));
  }
  if (!localStorage.getItem('especialidades')) {
    localStorage.setItem('especialidades', JSON.stringify(DEFAULT_ESPECIALIDADES));
  }
  if (!localStorage.getItem('obrasSociales')) {
    localStorage.setItem('obrasSociales', JSON.stringify(DEFAULT_OBRAS_SOCIALES));
  }
  if (!localStorage.getItem('turnos')) {
    localStorage.setItem('turnos', JSON.stringify(DEFAULT_TURNOS));
  }
  if (!localStorage.getItem('reservas')) {
    localStorage.setItem('reservas', JSON.stringify(DEFAULT_RESERVAS));
  }
}

// Ejecutar la inicialización
inicializarStorage();


// Ejecutar la inicialización al cargar este script
inicializarStorage();
