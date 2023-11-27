const fs = require('fs');
const pdf = require('html-pdf');

function generarInforme(contactos) {
  // Configuración de estilos CSS para la tabla
  const styles = `
    <style>
      table {
        border-collapse: collapse;
        width: 100%;
      }
      th, td {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
      }
      th {
        background-color: #f2f2f2;
      }
      h2{
        color: red;
        text-align: center;
      }
    </style>
  `;

  // Construir el contenido HTML de la tabla
  const tablaHTML = `
  ${styles}
    <h2>Lista de contactos</h2>
   
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Mensaje</th>
        </tr>
      </thead>
      <tbody>
        ${contactos.map(contacto => `
          <tr>
            <td>${contacto.nombre}</td>
            <td>${contacto.email}</td>
            <td>${contacto.mensaje}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  // Opciones de configuración para html-pdf
  const opcionesPDF = {
    format: 'Letter',
    border: {
      top: '1cm',
      right: '1cm',
      bottom: '1cm',
      left: '1cm'
    }
  };

  // Convertir el HTML a PDF
  pdf.create(tablaHTML, opcionesPDF).toFile('informe.pdf', (err, res) => {
    if (err) {
      console.error('Error al crear el informe PDF:', err);
    } else {
      console.log('Informe PDF creado con éxito.');
    }
  });
}

module.exports = generarInforme;
