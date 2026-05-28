/* ============================================================
   AUSTRALIA ON FIRE — main.js
   Embeds all Vega-Lite visualisations into the page.
   FIT2179 Data Visualisation 2, Monash University, S1 2026
   ============================================================ */

const VEGA_CONFIG = {
  background: "transparent",
  font: "Source Serif 4, Georgia, serif",
  title: {
    font: "Playfair Display, Georgia, serif",
    subtitleFont: "Source Serif 4, Georgia, serif"
  },
  axis: {
    labelFont: "Source Serif 4, Georgia, serif",
    titleFont: "Source Serif 4, Georgia, serif",
    labelFontSize: 11,
    titleFontSize: 12,
    gridColor: "#e0d4c8",
    domainColor: "#c0a882",
    tickColor: "#c0a882"
  },
  legend: {
    labelFont: "Source Serif 4, Georgia, serif",
    titleFont: "Source Serif 4, Georgia, serif",
    labelFontSize: 11,
    titleFontSize: 12
  }
};

const VEGA_CONFIG_DARK = {
  ...VEGA_CONFIG,
  axis: {
    ...VEGA_CONFIG.axis,
    labelColor: "#c0a882",
    titleColor: "#c0a882",
    gridColor: "#3a2e28",
    domainColor: "#60504a",
    tickColor: "#60504a"
  },
  legend: {
    ...VEGA_CONFIG.legend,
    labelColor: "#c0a882",
    titleColor: "#c0a882"
  },
  title: {
    ...VEGA_CONFIG.title,
    color: "#f0e0d0",
    subtitleColor: "#a08878"
  }
};

const EMBED_OPT = {
  renderer: "svg",
  actions: { export: true, source: true, compiled: false, editor: false },
  theme: "default"
};

function embed(id, specPath, darkMode = false) {
  const cfg = darkMode ? VEGA_CONFIG_DARK : VEGA_CONFIG;
  vegaEmbed(`#${id}`, specPath, { ...EMBED_OPT, config: cfg })
    .catch(err => console.error(`Failed to embed ${id}:`, err));
}

// ── Light-background charts ────────────────────────────────
embed("chart-temp",      "vega/chart_temp_anomaly.json");
embed("chart-fdi",       "vega/chart_monthly_fdi.json");
embed("chart-drought",   "vega/chart_drought_fire.json");
embed("chart-scatter",   "vega/chart_scatter_temp_incidents.json");
embed("chart-stacked",   "vega/chart_incidents_stacked.json");
embed("chart-multiline", "vega/chart_incidents_multiline.json");

// ── Dark / ember-background charts ────────────────────────
embed("chart-map",       "vega/map_risk.json",          true);
embed("chart-area",      "vega/chart_area_burned.json", true);
embed("chart-homes",     "vega/chart_homes_lost.json",  true);
embed("chart-causes",    "vega/chart_causes.json",      true);
embed("chart-economic",  "vega/chart_economic.json",    true);
embed("chart-heatmap",   "vega/chart_danger_heatmap.json", true);
