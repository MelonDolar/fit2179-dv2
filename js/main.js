/* ============================================================
   AUSTRALIA ON FIRE — main.js
   FIT2179 Data Visualisation 2, Monash University, S1 2026
   ============================================================ */

const VEGA_CONFIG_LIGHT = {
  background: "transparent",
  font: "Source Serif 4, Georgia, serif",
  axis: { labelColor: "#3d3530", titleColor: "#3d3530", gridColor: "#e0d4c8", domainColor: "#c0a882", tickColor: "#c0a882" },
  legend: { labelColor: "#3d3530", titleColor: "#3d3530" },
  title: { color: "#1a1a1a", subtitleColor: "#555" }
};

const VEGA_CONFIG_DARK = {
  background: "transparent",
  font: "Source Serif 4, Georgia, serif",
  axis: { labelColor: "#c0a882", titleColor: "#c0a882", gridColor: "#3a2e28", domainColor: "#60504a", tickColor: "#60504a" },
  legend: { labelColor: "#c0a882", titleColor: "#c0a882" },
  title: { color: "#f0e0d0", subtitleColor: "#c0a882" }
};

const OPT = { renderer: "svg", actions: { export: true, source: true, compiled: false, editor: false } };

function embed(id, specPath, dark = false) {
  vegaEmbed(`#${id}`, specPath, { ...OPT, config: dark ? VEGA_CONFIG_DARK : VEGA_CONFIG_LIGHT })
    .catch(err => console.error(`Failed to embed ${id}:`, err));
}

// ── Static charts (no interactivity needed) ───────────────
embed("chart-temp",     "vega/chart_temp_anomaly.json");
embed("chart-map",      "vega/map_risk.json");
embed("chart-area",     "vega/chart_area_burned.json",  true);
embed("chart-homes",    "vega/chart_homes_lost.json",   true);
embed("chart-causes",   "vega/chart_causes.json",       true);
embed("chart-fdi",      "vega/chart_monthly_fdi.json");
embed("chart-drought",  "vega/chart_drought_fire.json");
embed("chart-scatter",  "vega/chart_scatter_temp_incidents.json");

// ══════════════════════════════════════════════════════════
// INTERACTIVE CHARTS — checkbox-driven
// ══════════════════════════════════════════════════════════

// ── 1. Multi-line: incidents by state ─────────────────────
const STATE_COLOURS = {
  NSW: "#c0392b", VIC: "#e67e22", QLD: "#c8960c",
  SA:  "#8e44ad", WA:  "#2980b9", TAS: "#27ae60"
};
const ALL_STATES = ["NSW","VIC","QLD","SA","WA","TAS"];

function buildCheckboxes(containerId, items, colours, onChange) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";
  items.forEach(item => {
    const label = document.createElement("label");
    label.className = "cb-label";
    const box = document.createElement("input");
    box.type = "checkbox";
    box.checked = true;
    box.value = item;
    if (colours) {
      label.style.borderColor = colours[item];
      label.style.color = colours[item];
    }
    box.addEventListener("change", onChange);
    const span = document.createElement("span");
    span.textContent = item;
    label.appendChild(box);
    label.appendChild(span);
    container.appendChild(label);
  });
}

function getChecked(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return [];
  return [...container.querySelectorAll("input:checked")].map(i => i.value);
}

// Multiline chart
let multilineView = null;
fetch("data/bushfire_incidents.json")
  .then(r => r.json())
  .then(raw => {
    const allData = raw.incidents_by_state_year;

    function renderMultiline(activeStates) {
      const filtered = allData.filter(d => activeStates.includes(d.state));
      const spec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "title": { "text": "Fire Incidents Trend by State", "subtitle": "Use checkboxes to show/hide states", "fontSize": 14, "subtitleFontSize": 10 },
        "width": 520, "height": 280,
        "data": { "values": filtered },
        "mark": { "type": "line", "strokeWidth": 2.5, "point": { "filled": true, "size": 60 } },
        "encoding": {
          "x": { "field": "year", "type": "ordinal", "axis": { "title": null } },
          "y": { "field": "incidents", "type": "quantitative", "axis": { "title": "Incidents", "format": ",.0f" } },
          "color": {
            "field": "state", "type": "nominal", "title": "State",
            "scale": { "domain": ALL_STATES, "range": ALL_STATES.map(s => STATE_COLOURS[s]) }
          },
          "tooltip": [
            { "field": "state", "title": "State" },
            { "field": "year", "title": "Year" },
            { "field": "incidents", "title": "Incidents", "format": "," }
          ]
        }
      };
      vegaEmbed("#chart-multiline", spec, { ...OPT, config: VEGA_CONFIG_LIGHT });
    }

    buildCheckboxes("cb-multiline", ALL_STATES, STATE_COLOURS, () => {
      renderMultiline(getChecked("cb-multiline"));
    });
    renderMultiline(ALL_STATES);
  });

// ── 2. Stacked area: incidents by state ───────────────────
fetch("data/bushfire_incidents.json")
  .then(r => r.json())
  .then(raw => {
    const allData = raw.incidents_by_state_year;
    const STACK_COLOURS = { QLD: "#f39c12", WA: "#2980b9", NSW: "#c0392b", VIC: "#e67e22", SA: "#8e44ad", TAS: "#27ae60" };
    const STACK_STATES = ["QLD","WA","NSW","VIC","SA","TAS"];

    function renderStacked(activeStates) {
      const filtered = allData.filter(d => activeStates.includes(d.state));
      const spec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "title": { "text": "Bushfire Incidents by State (2015–2023)", "subtitle": "Use checkboxes to show/hide states", "fontSize": 14, "subtitleFontSize": 10 },
        "width": 520, "height": 260,
        "data": { "values": filtered },
        "mark": { "type": "area", "opacity": 0.88 },
        "encoding": {
          "x": { "field": "year", "type": "ordinal", "axis": { "title": null, "labelAngle": 0 } },
          "y": { "field": "incidents", "type": "quantitative", "stack": "zero", "axis": { "title": "Total Incidents", "format": ",.0f" } },
          "color": {
            "field": "state", "type": "nominal", "title": "State",
            "scale": { "domain": STACK_STATES, "range": STACK_STATES.map(s => STACK_COLOURS[s]) }
          },
          "tooltip": [
            { "field": "state", "title": "State" },
            { "field": "year", "title": "Year" },
            { "field": "incidents", "title": "Incidents", "format": "," }
          ]
        }
      };
      vegaEmbed("#chart-stacked", spec, { ...OPT, config: VEGA_CONFIG_DARK });
    }

    buildCheckboxes("cb-stacked", STACK_STATES, STACK_COLOURS, () => {
      renderStacked(getChecked("cb-stacked"));
    });
    renderStacked(STACK_STATES);
  });

// ── 3. Heatmap: danger days by state ─────────────────────
fetch("data/bushfire_incidents.json")
  .then(r => r.json())
  .then(raw => {
    const allData = raw.fire_danger_days;
    const HEAT_STATES = ["NSW","VIC","QLD","SA"];
    const HEAT_COLOURS = { NSW: "#e8722a", VIC: "#e8722a", QLD: "#e8722a", SA: "#e8722a" };

    function renderHeatmap(activeStates) {
      const filtered = allData
        .filter(d => activeStates.includes(d.state))
        .map(d => ({ ...d, extreme_plus: d.catastrophic + d.extreme }));
      const spec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "title": { "text": "Days of Extreme or Catastrophic Fire Danger", "subtitle": "Use checkboxes to show/hide states", "fontSize": 14, "subtitleFontSize": 11 },
        "width": 500, "height": activeStates.length * 50 + 10,
        "data": { "values": filtered },
        "mark": { "type": "rect", "cornerRadius": 3 },
        "encoding": {
          "x": { "field": "year", "type": "ordinal", "axis": { "title": null, "labelAngle": -30 } },
          "y": { "field": "state", "type": "nominal", "sort": HEAT_STATES, "axis": { "title": null } },
          "color": {
            "field": "extreme_plus", "type": "quantitative", "title": "Days",
            "scale": { "domain": [0,30], "range": ["#3a1a08","#c04010","#f06030","#ffe8c0"] }
          },
          "tooltip": [
            { "field": "state", "title": "State" },
            { "field": "year", "title": "Year" },
            { "field": "extreme_plus", "title": "Extreme/Catastrophic Days" },
            { "field": "catastrophic", "title": "of which Catastrophic" },
            { "field": "extreme", "title": "of which Extreme" }
          ]
        }
      };
      vegaEmbed("#chart-heatmap", spec, { ...OPT, config: VEGA_CONFIG_DARK });
    }

    buildCheckboxes("cb-heatmap", HEAT_STATES, HEAT_COLOURS, () => {
      renderHeatmap(getChecked("cb-heatmap"));
    });
    renderHeatmap(HEAT_STATES);
  });

// ── 4. Economic stacked bar ───────────────────────────────
fetch("data/climate_data.json")
  .then(r => r.json())
  .then(raw => {
    const allData = raw.economic_impact;
    const CAT_MAP = {
      "Property Loss":      "property_loss_m",
      "Livestock Loss":     "livestock_loss_m",
      "Agriculture Loss":   "agriculture_loss_m",
      "Emergency Response": "emergency_cost_m"
    };
    const CAT_COLOURS = {
      "Property Loss": "#e03535", "Livestock Loss": "#9b59b6",
      "Agriculture Loss": "#e07820", "Emergency Response": "#3498db"
    };
    const ALL_CATS = Object.keys(CAT_MAP);

    function renderEconomic(activeCats) {
      const values = [];
      allData.forEach(row => {
        activeCats.forEach(cat => {
          values.push({ year: row.year, category_label: cat, value: row[CAT_MAP[cat]] });
        });
      });
      const spec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
        "title": { "text": "Economic Toll of Bushfires (A$ millions)", "subtitle": "Use checkboxes to show/hide cost categories", "fontSize": 14, "subtitleFontSize": 10 },
        "width": 480, "height": 280,
        "data": { "values": values },
        "mark": { "type": "bar", "cornerRadiusEnd": 3 },
        "encoding": {
          "x": { "field": "year", "type": "ordinal", "axis": { "title": null, "labelAngle": 0 } },
          "y": { "field": "value", "type": "quantitative", "stack": "zero", "axis": { "title": "A$ million", "format": ",.0f" } },
          "color": {
            "field": "category_label", "type": "nominal", "title": "Category",
            "scale": { "domain": ALL_CATS, "range": ALL_CATS.map(c => CAT_COLOURS[c]) }
          },
          "tooltip": [
            { "field": "year", "title": "Year" },
            { "field": "category_label", "title": "Category" },
            { "field": "value", "title": "Cost (A$M)", "format": ",.0f" }
          ]
        }
      };
      vegaEmbed("#chart-economic", spec, { ...OPT, config: VEGA_CONFIG_DARK });
    }

    buildCheckboxes("cb-economic", ALL_CATS, CAT_COLOURS, () => {
      renderEconomic(getChecked("cb-economic"));
    });
    renderEconomic(ALL_CATS);
  });
