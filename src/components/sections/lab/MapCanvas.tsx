'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import {
  addProtocol,
  MapLibreMap,
  Marker,
  NavigationControl,
  setWorkerUrl,
} from 'maplibre-gl';
import { Protocol } from 'pmtiles';
import 'maplibre-gl/dist/maplibre-gl.css';
import { cn } from '@/lib/utils';
import { LAB } from '@/lib/content/lab';
import { buildStyle, MAP_BOUNDS, type MapTheme } from './mapStyle';

// Left to itself MapLibre starts `new Worker('')` from inside the bundle and
// the map never requests a tile. See scripts/copy-maplibre-worker.mjs.
setWorkerUrl('/maps/maplibre/maplibre-gl-worker.mjs');
addProtocol('pmtiles', new Protocol().tile);

// Tailwind's utilities live in a cascade layer and maplibre-gl.css does not,
// so any rule of its own wins whatever the specificity: hence every `!`.
const CHROME = [
  '[&_.maplibregl-ctrl-group]:rounded-md! [&_.maplibregl-ctrl-group]:border! [&_.maplibregl-ctrl-group]:border-border! [&_.maplibregl-ctrl-group]:bg-background! [&_.maplibregl-ctrl-group]:shadow-none!',
  '[&_.maplibregl-ctrl-group_button+button]:border-border!',
  'dark:[&_.maplibregl-ctrl-icon]:invert',
  '[&_.maplibregl-ctrl-attrib]:bg-background/80! [&_.maplibregl-ctrl-attrib]:text-foreground/70! [&_.maplibregl-ctrl-attrib_a]:text-foreground/70!',
  'dark:[&_.maplibregl-ctrl-attrib-button]:invert',
  '[&_canvas]:-outline-offset-2!',
].join(' ');

const DOT_SIZE = 20;

function markerElement() {
  const el = document.createElement('div');
  el.className = 'pointer-events-none flex items-center gap-2';

  const dot = document.createElement('span');
  dot.className =
    'size-5 rounded-full border-2 border-[var(--rauxa-pearl)] bg-primary shadow-[0_0_0_6px_--alpha(var(--color-primary)/22%),0_0_28px_--alpha(var(--color-primary)/65%)]';

  const tag = document.createElement('span');
  tag.className =
    'font-accent rounded-sm border bg-background px-2 text-lg leading-6 tracking-[0.15em] text-foreground';
  tag.textContent = 'RAUXA LAB';

  el.append(dot, tag);
  return el;
}

export function MapCanvas() {
  const t = useTranslations('lab.map');
  const { resolvedTheme } = useTheme();
  const theme: MapTheme = resolvedTheme === 'dark' ? 'dark' : 'light';
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setStyle(buildStyle(theme));
      return;
    }

    const map = new MapLibreMap({
      container: containerRef.current!,
      style: buildStyle(theme),
      center: LAB.coordinates,
      zoom: 15.5,
      minZoom: 13,
      maxZoom: 18,
      maxBounds: MAP_BOUNDS,
      cooperativeGestures: true,
      dragRotate: false,
      pitchWithRotate: false,
      touchPitch: false,
      attributionControl: { compact: true },
      locale: {
        'Map.Title': t('title'),
        'Marker.Title': 'RAUXA LAB',
        'NavigationControl.ZoomIn': t('zoomIn'),
        'NavigationControl.ZoomOut': t('zoomOut'),
        'AttributionControl.ToggleAttribution': t('attribution'),
        'CooperativeGesturesHandler.WindowsHelpText': t('gesturesWindows'),
        'CooperativeGesturesHandler.MacHelpText': t('gesturesMac'),
        'CooperativeGesturesHandler.MobileHelpText': t('gesturesMobile'),
      },
    });
    map.touchZoomRotate.disableRotation();
    map.keyboard.disableRotation();
    map.addControl(new NavigationControl({ showCompass: false }));
    // Protomaps' v4 sprite lacks a few icons its own layers reference
    // (`townhall`); a transparent stand-in stops the console warning.
    map.setMissingStyleImageResolver((id) => {
      map.addImage(id, { width: 1, height: 1, data: new Uint8Array(4) });
    });
    new Marker({
      element: markerElement(),
      anchor: 'left',
      offset: [-DOT_SIZE / 2, 0],
    })
      .setLngLat(LAB.coordinates)
      .addTo(map);
    map.once('load', () => setLoaded(true));
    mapRef.current = map;
  }, [theme, t]);

  useEffect(
    () => () => {
      mapRef.current?.remove();
      mapRef.current = null;
    },
    [],
  );

  // MapLibre pins its container to `position: relative`, from a stylesheet no
  // utility can outrank, so the absolute fill has to live on a wrapper.
  return (
    <div
      className={cn(
        'absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none',
        loaded ? 'opacity-100' : 'opacity-0',
      )}
    >
      <div ref={containerRef} className={`size-full ${CHROME}`} />
    </div>
  );
}
