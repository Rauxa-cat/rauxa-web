type Dish = { id: string; price: number; perUnit?: boolean };

export const KITCHEN = [
  {
    id: 'appetizers',
    dishes: [
      { id: 'anchovySkewer', price: 2.8 },
      { id: 'olives', price: 3 },
      { id: 'curedBeef', price: 9 },
    ],
  },
  {
    id: 'classics',
    dishes: [
      { id: 'carbonaraCroquette', price: 3, perUnit: true },
      { id: 'spicyPotatoes', price: 6 },
      { id: 'prawnTartare', price: 8, perUnit: true },
      { id: 'pastramiBrioche', price: 18.5 },
      { id: 'scallop', price: 4.5 },
      { id: 'anchovyToast', price: 4 },
      { id: 'butterBread', price: 3.9 },
      { id: 'tomatoBread', price: 3.5 },
    ],
  },
  {
    id: 'tapas',
    dishes: [
      { id: 'oyster', price: 4.95 },
      { id: 'amberjack', price: 18 },
      { id: 'tunaToast', price: 12.5 },
      { id: 'steakTartare', price: 15 },
      { id: 'aubergine', price: 8.5 },
      { id: 'friedChicken', price: 9 },
      { id: 'tomatoSalad', price: 12 },
      { id: 'sirloin', price: 25 },
    ],
  },
  {
    id: 'desserts',
    dishes: [
      { id: 'flan', price: 7 },
      { id: 'frenchToast', price: 7 },
      { id: 'chocolate', price: 7 },
      { id: 'rumBaba', price: 8 },
    ],
  },
] as const satisfies readonly { id: string; dishes: readonly Dish[] }[];

type Wine = { name: string; vintage?: number; price: number };

export const WINES = [
  {
    id: 'white',
    wines: [
      { name: "Ca N'Estruc", vintage: 2025, price: 19.5 },
      { name: 'Medir', price: 25 },
      { name: 'Ramon Jané Baudili Blanco', vintage: 2025, price: 22.5 },
      { name: 'Gessami Gramona', price: 24 },
      { name: 'Constantina Sotelo Rosalía', vintage: 2025, price: 27 },
      { name: 'La Rural Malvasía de Sitges', vintage: 2024, price: 30 },
      { name: 'Batlliu Biu Riesling', price: 27.6 },
      { name: 'Vins Nus Siuralta Gris', vintage: 2022, price: 35 },
      {
        name: 'Esmeralda García Arenas de Santyuste',
        vintage: 2024,
        price: 35,
      },
      { name: 'Celler Salace Oh Bois Blanc', price: 40 },
    ],
  },
  {
    id: 'red',
    wines: [
      { name: 'Cugat', price: 25 },
      {
        name: 'Succés Vinícola La Cuca de Llum Tinto',
        vintage: 2023,
        price: 22,
      },
      { name: 'Celler Comunica Vi del Mas', vintage: 2025, price: 22 },
      { name: 'Vins Nus Jus de Rouge', vintage: 2024, price: 24 },
      { name: 'Luno Negre Alfredo Arribas', price: 25 },
      { name: "Joan d'Anguera Altaroses", vintage: 2024, price: 30 },
      { name: 'Abel Mendoza', price: 29 },
      { name: 'Manin Perdidas en el Mariñanas', vintage: 2023, price: 35 },
      {
        name: 'Goyo García Finca Los Quemados Tinto',
        vintage: 2024,
        price: 40,
      },
    ],
  },
  {
    id: 'orange',
    wines: [
      { name: 'La Rural Parellada', vintage: 2023, price: 27 },
      { name: 'Cueva Orange', vintage: 2025, price: 26 },
    ],
  },
  {
    id: 'rose',
    wines: [{ name: 'And the Winner Is... Rosado', vintage: 2025, price: 22 }],
  },
  {
    id: 'sparkling',
    wines: [
      { name: 'Ramon Jané Tinc Set Ancestral', vintage: 2025, price: 22 },
      { name: 'Joan Rubió Xarel·lo Ancestral', vintage: 2022, price: 35 },
    ],
  },
] as const satisfies readonly { id: string; wines: readonly Wine[] }[];
