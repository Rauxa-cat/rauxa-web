const ADDRESS = {
  street: 'Avinguda de Cerdanyola, 52',
  postalCode: '08172',
  locality: 'Sant Cugat del Vallès',
  region: 'Barcelona',
};

export const LAB = {
  address: ADDRESS,
  // Portal 52 as CartoCiudad and the ICGC geocode it; OpenStreetMap only knows
  // the street, and its centroid lands a block away.
  coordinates: [2.09115, 41.47382] as [number, number],
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${ADDRESS.street}, ${ADDRESS.postalCode} ${ADDRESS.locality}`,
  )}`,
};
