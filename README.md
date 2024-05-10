# Aplicación del Clima

Esta aplicación muestra información meteorológica actual y pronósticos para los próximos cinco días. Utiliza React para la interfaz de usuario y consume datos de una API de clima externa para obtener los datos meteorológicos.

## Capturas de Pantalla

### Pantalla Principal
![Pantalla Principal](/C1.png)

### Mobile
![Mobile](/C2.png)
![Mobile](/C3.png)
![Mobile](/C4.png)

## Características

- Muestra el clima actual y un pronóstico de cinco días.
- Permite cambiar entre unidades de temperatura (Celsius y Fahrenheit).
- Muestra iconos representativos para diferentes condiciones climáticas.
- Utiliza componentes React para una mejor estructuración del código y reusabilidad.

## Tecnologías Utilizadas

- **React**: Usado para construir la interfaz de usuario.
- **Weather API**: Fuente de los datos meteorológicos.
- **Tailwind**: Para el estilo de la aplicación.

## Estructura del Proyecto

- `src/components/`: Contiene todos los componentes React utilizados en la aplicación.
  - `MainContent.jsx`: Componente principal que muestra la información del clima.
  - `Sidebar.jsx`: Componente para mostrar datos actuales del clima como el lugar fecha y el icono de ese momento.
  - `SearchLocation.jsx`: Componente para buscar por ubicacion datos del clima.
  - `LargeCard.jsx`: Componente para mostrar datos destacados del clima.
  - `SmallCard.jsx`: Componente para mostrar el pronóstico diario.
- `src/WeatherContext.jsx`: Contexto de React que maneja la carga y disponibilidad de los datos del clima.

