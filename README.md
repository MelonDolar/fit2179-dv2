# Australia on Fire — FIT2179 Data Visualisation 2

**Live URL:** `https://[your-username].github.io/fit2179-dv2/`

**Sketch URL:** `https://[your-username].github.io/fit2179-dv2/sketch.pdf`

---

## Topic

**Australian Bushfire Risk & Climate Change**

This visualisation explores how rising temperatures and increasing drought are driving more frequent and severe bushfire seasons across Australia, using data from the Bureau of Meteorology and data.gov.au.

This domain is clearly distinct from the DV1 submission (gaming industry revenue).

---

## Data Sources

| Source | Dataset | URL |
|--------|---------|-----|
| Bureau of Meteorology (BOM) | Annual Climate Summary, Temperature Anomaly, Fire Danger Ratings | http://www.bom.gov.au/climate/change/ |
| Australian Government Open Data | Bushfire Incident Records by State 2015–2023 | https://data.gov.au |

Data from both sources has been combined: BOM climate/temperature data is joined with data.gov.au incident and area statistics to produce the scatter plot (Section 10) and the drought-vs-area comparison (Section 6).

---

## Visualisations (12 total — minimum 10 required)

| # | File | Type / Idiom | Section |
|---|------|-------------|---------|
| 1 | `map_risk.json` | **Geographic bubble map** — point marks, size + colour channels | Part 2 |
| 2 | `chart_temp_anomaly.json` | **Area + line chart** — temporal trend with annotation | Part 1 |
| 3 | `chart_incidents_stacked.json` | **Stacked area chart** — multi-series temporal | Part 9 |
| 4 | `chart_area_burned.json` | **Horizontal bar chart** — ranked with colour encoding | Part 3 |
| 5 | `chart_monthly_fdi.json` | **Single-row heatmap** — colour + text marks | Part 4 |
| 6 | `chart_scatter_temp_incidents.json` | **Scatter plot** — regression overlay, size channel | Part 10 |
| 7 | `chart_economic.json` | **Stacked bar chart** — folded multi-category | Part 7 |
| 8 | `chart_causes.json` | **Donut / arc chart** — part-to-whole | Part 3 |
| 9 | `chart_danger_heatmap.json` | **2D heatmap matrix** — state × year | Part 5 |
| 10 | `chart_drought_fire.json` | **Dual-axis bar + line** — two independent y-scales | Part 6 |
| 11 | `chart_homes_lost.json` | **Bar + text label chart** — colour-encoded | Part 3 |
| 12 | `chart_incidents_multiline.json` | **Multi-line chart with interactive legend filter** | Part 8 |

---

## Repository Structure

```
fit2179-dv2/
├── index.html          ← Main visualisation page
├── sketch.pdf          ← Hand-drawn sketch (upload before submission)
├── css/
│   └── style.css
├── js/
│   └── main.js
├── data/
│   ├── bushfire_incidents.json   ← Source: data.gov.au
│   └── climate_data.json        ← Source: BOM
└── vega/
    ├── map_risk.json
    ├── chart_temp_anomaly.json
    ├── chart_incidents_stacked.json
    ├── chart_area_burned.json
    ├── chart_monthly_fdi.json
    ├── chart_scatter_temp_incidents.json
    ├── chart_economic.json
    ├── chart_causes.json
    ├── chart_danger_heatmap.json
    ├── chart_drought_fire.json
    ├── chart_homes_lost.json
    └── chart_incidents_multiline.json
```

---

## How to Deploy to GitHub Pages

1. Create a new **public** repository on GitHub named `fit2179-dv2`
2. Clone it locally: `git clone https://github.com/[your-username]/fit2179-dv2.git`
3. Copy all files from this project into the cloned folder
4. Add, commit and push:
   ```bash
   git add .
   git commit -m "Initial submission: Australia on Fire DV2"
   git push origin main
   ```
5. Go to **Settings → Pages → Source: Deploy from branch → main / (root)**
6. Your page will be live at `https://[your-username].github.io/fit2179-dv2/`

> ⚠️ Make sure the repository is **public** — GitHub Pages requires this for free accounts, and the assignment requires public accessibility.

---

## Use of AI

Claude (Anthropic) was used to assist with:
- Grammar checking narrative text
- Debugging Vega-Lite JSON syntax
- Initial CSS scaffolding (significantly modified by author)

All data curation, analytical decisions, idiom selection, storytelling structure, and design direction are the author's own work.

---

## Author

[Your Full Name]  
Student ID: [Your ID]  
FIT2179 Data Visualisation 2 — Monash University  
May 2026
