const obtenerPaises = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3/all');
      const data = await response.json();
      
      const paisesOrdenados = data.sort((a, b) => {
        const nombreA = a.name.common.toUpperCase();
        const nombreB = b.name.common.toUpperCase();
        return nombreA < nombreB ? -1 : nombreA > nombreB ? 1 : 0;
      });
  
      mostrarBanderas(paisesOrdenados);
    } catch (error) {
      console.error("Error al obtener los países: ", error);
    }
  };
  
  const mostrarBanderas = (paises) => {
    const container = document.getElementById('countries-list');
    container.innerHTML = '';
  
    paises.forEach(pais => {
      const flagDiv = document.createElement('div');
      flagDiv.classList.add('flag');
      flagDiv.innerHTML = `
        <img src="${pais.flags?.svg || pais.flags?.png}" alt="Bandera de ${pais.name.common}" width="100%" />
        <div>${pais.name.common}</div>
      `;
      
      flagDiv.addEventListener('click', () => mostrarDetalles(pais));
  
      container.appendChild(flagDiv);
    });
  };
  
  const mostrarDetalles = (pais) => {
    const modal = document.getElementById('modal');
    const countryDetails = document.getElementById('countryDetails');
    
    countryDetails.innerHTML = `
      <h2>${pais.name.common}</h2>
      <img src="${pais.flags?.svg || pais.flags?.png}" alt="Bandera de ${pais.name.common}" width="100%" />
      <p><strong>Capital:</strong> ${pais.capital ? pais.capital[0] : 'N/A'}</p>
      <p><strong>Población:</strong> ${pais.population.toLocaleString()}</p>
      <p><strong>Lado de la carretera:</strong> ${pais.car.dDriveOn ? 'Derecha' : 'Izquierda'}</p>
    `;
    
    modal.style.display = 'flex';
  };
  
  const cerrarModal = () => {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
  };
  
  document.getElementById('closeBtn').addEventListener('click', cerrarModal);
  
  window.onload = obtenerPaises;
  
