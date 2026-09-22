import { layers, namedFlavor, type Flavor } from '@protomaps/basemaps';
import type { LngLatBoundsLike, StyleSpecification } from 'maplibre-gl';

export type MapTheme = 'light' | 'dark';

// The bbox `public/maps/sant-cugat.pmtiles` was extracted with (see "RAUXA LAB
// map" in CLAUDE.md). Past it there are no tiles, only bare background.
export const MAP_BOUNDS: LngLatBoundsLike = [
  [2.055, 41.455],
  [2.125, 41.495],
];

type Palette = {
  paper: string;
  block: string;
  green: string;
  water: string;
  building: string;
  road: string;
  major: string;
  casing: string;
  rail: string;
  ink: string;
  label: string;
  muted: string;
  halo: string;
};

const PALETTES: Record<MapTheme, Palette> = {
  light: {
    paper: '#EEEAE3',
    block: '#E8E3DA',
    green: '#DFE3D5',
    water: '#C5D4EC',
    building: '#E2DCD1',
    road: '#FBFAF7',
    major: '#FFFFFF',
    casing: '#D9D2C6',
    rail: '#A7ABB0',
    ink: '#0A0A0D',
    label: '#5E6066',
    muted: '#8B8E94',
    halo: '#F7F4EF',
  },
  dark: {
    paper: '#0A0A0D',
    block: '#101014',
    green: '#11171A',
    water: '#0B1433',
    building: '#17171C',
    road: '#232329',
    major: '#303038',
    casing: '#0A0A0D',
    rail: '#3A3C42',
    ink: '#F7F4EF',
    label: '#A7ABB0',
    muted: '#74777D',
    halo: '#0A0A0D',
  },
};

const brand = (base: Flavor, p: Palette): Flavor => ({
  ...base,
  background: p.paper,
  earth: p.paper,
  park_a: p.green,
  park_b: p.green,
  wood_a: p.green,
  wood_b: p.green,
  scrub_a: p.green,
  scrub_b: p.green,
  pedestrian: p.block,
  school: p.block,
  hospital: p.block,
  industrial: p.block,
  water: p.water,
  buildings: p.building,
  other: p.road,
  minor_service: p.road,
  minor_a: p.road,
  minor_b: p.road,
  link: p.road,
  major: p.major,
  highway: p.major,
  bridges_other: p.road,
  bridges_minor: p.road,
  bridges_link: p.road,
  bridges_major: p.major,
  bridges_highway: p.major,
  minor_service_casing: p.casing,
  minor_casing: p.casing,
  link_casing: p.casing,
  major_casing_early: p.casing,
  major_casing_late: p.casing,
  highway_casing_early: p.casing,
  highway_casing_late: p.casing,
  bridges_other_casing: p.casing,
  bridges_minor_casing: p.casing,
  bridges_link_casing: p.casing,
  bridges_major_casing: p.casing,
  bridges_highway_casing: p.casing,
  railway: p.rail,
  roads_label_minor: p.muted,
  roads_label_minor_halo: p.halo,
  roads_label_major: p.label,
  roads_label_major_halo: p.halo,
  address_label: p.muted,
  address_label_halo: p.halo,
  subplace_label: p.label,
  subplace_label_halo: p.halo,
  city_label: p.ink,
  city_label_halo: p.halo,
  pois: {
    blue: p.label,
    green: p.label,
    lapis: p.label,
    pink: p.label,
    red: p.label,
    slategray: p.label,
    tangerine: p.label,
    turquoise: p.label,
  },
});

const FLAVORS: Record<MapTheme, Flavor> = {
  light: brand(namedFlavor('light'), PALETTES.light),
  dark: brand(namedFlavor('dark'), PALETTES.dark),
};

const ATTRIBUTION =
  '<a href="https://protomaps.com" target="_blank" rel="noopener">Protomaps</a> © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>';

// Absolute URLs: MapLibre resolves some of these inside a worker, where a
// relative path has no page to be relative to.
export function buildStyle(theme: MapTheme): StyleSpecification {
  const assets = `${window.location.origin}/maps`;

  return {
    version: 8,
    glyphs: `${assets}/fonts/{fontstack}/{range}.pbf`,
    sprite: `${assets}/sprites/${theme}`,
    sources: {
      protomaps: {
        type: 'vector',
        url: `pmtiles://${assets}/sant-cugat.pmtiles`,
        attribution: ATTRIBUTION,
      },
    },
    // Catalan in both locales, so the streets read as their signs and our
    // address do; `name:es` would turn the town into "San Cugat del Vallés".
    layers: layers('protomaps', FLAVORS[theme], { lang: 'ca' }),
  };
}
