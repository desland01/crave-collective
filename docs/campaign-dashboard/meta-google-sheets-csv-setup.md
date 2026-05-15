# Meta Google Sheets CSV Setup

This dashboard is intentionally simple: the app does not need a live Meta API
token. It needs a Google Sheet that can be exported as CSV with consistent
column names.

## Recommended Sheet

Create a Google Sheet named `Crave Meta Campaign Performance` with three tabs.

### 1. `meta_export_raw`

This tab is populated by the Meta-to-Sheets connector. Use the connector already
available to the account, such as a Meta Ads scheduled report, Supermetrics,
Coupler, Make, Zapier, or another Sheets connector.

Pull these fields at campaign level:

| Field | Required | Notes |
| --- | --- | --- |
| `Date` | Recommended | Day or week is fine. |
| `Client` | Recommended | Account or business name. |
| `Campaign` | Required | Meta campaign name. |
| `Creative Type` | Recommended | Can be manual if the connector only gives ad name. |
| `Amount Spent` | Required | Spend in USD. |
| `Leads` | Required unless `CPL` exists | Meta result count, instant form leads, or qualified leads. |
| `CPL` | Optional | Used only if leads are missing. |

### 2. `sales_outcomes`

Meta usually knows ad spend and lead volume. It does not reliably know closed
job revenue unless the CRM or sales result is brought back into the sheet.

Track these fields manually or through the CRM:

| Field | Required | Notes |
| --- | --- | --- |
| `Campaign` | Required | Must match the campaign name from `meta_export_raw`. |
| `Booked Calls` | Recommended | Discovery calls or appointments booked. |
| `Closed Jobs` | Recommended | Jobs won from those leads. |
| `Revenue` | Strongly recommended | Closed revenue. This is what makes ROAS defensible. |

### 3. `dashboard_csv`

This is the clean export tab. One row per campaign per reporting period.

Use these exact headers for the easiest import:

```csv
Date,Client,Campaign,Creative Type,Amount Spent,Leads,Booked Calls,Closed Jobs,Revenue
```

The dashboard also recognizes common aliases like `Campaign Name`, `Spend`,
`Results`, `Cost Per Lead`, `Closed Revenue`, and `Purchase Conversion Value`.

## Connection Workflow

1. Connect Meta Ads to Google Sheets using the account's preferred connector.
2. Refresh `meta_export_raw` daily or weekly.
3. Add the sales outcome data in `sales_outcomes`.
4. Use formulas or a pivot table to create the clean `dashboard_csv` tab.
5. In Google Sheets, open the `dashboard_csv` tab.
6. Go to `File > Download > Comma-separated values (.csv)`.
7. Open `/meta` in the Crave site.
8. Choose `CSV ROAS`.
9. Upload the CSV or paste the contents.
10. Review detected columns, optimization notes, and the PDF report.

## ROAS Rules

The dashboard calculates:

```text
ROAS = Revenue / Amount Spent
CPL = Amount Spent / Leads
Close Rate = Closed Jobs / Leads
```

If `Revenue` is missing, the dashboard estimates revenue from:

```text
Estimated Revenue = Closed Jobs x Average Job Size
```

If `Closed Jobs` is also missing, it estimates closed jobs from:

```text
Estimated Closed Jobs = Leads x Estimated Close Rate
```

For client-facing reports, use real `Revenue` whenever possible. Estimated
revenue is useful for forecasting, but actual closed revenue is the stronger
proof point.

## Weekly Operating Rhythm

1. Monday: refresh Meta spend and leads.
2. Tuesday: update booked calls and closed jobs.
3. Wednesday: upload CSV into the dashboard and review campaign ROAS.
4. Before the client call: export the branded PDF report.
5. On the call: explain CPL as an input, then lead the discussion with ROAS,
   close quality, and revenue per lead.
