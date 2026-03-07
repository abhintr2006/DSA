const fs = require("fs");

const drawioXml = `<mxfile host="Electron" modified="2024-03-07T00:00:00.000Z" agent="Mozilla/5.0" etag="xyz" version="22.1.2" type="device">
  <diagram id="stack-design" name="Full Stack Architecture">
    <mxGraphModel dx="1400" dy="1200" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1169" pageHeight="827" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />
        
        <!-- Environment Boundary -->
        <mxCell id="env_box" value="System Infrastructure" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f8f9fa;strokeColor=#ced4da;verticalAlign=top;fontStyle=1;spacingTop=20;fontColor=#495057;arcSize=4;shadow=0;strokeWidth=2;fontSize=22;fontFamily=Inter, Helvetica, sans-serif;" vertex="1" parent="1">
          <mxGeometry x="220" y="100" width="760" height="400" as="geometry" />
        </mxCell>

        <!-- Frontend -->
        <mxCell id="frontend" value="Frontend App&lt;br&gt;&lt;span style=&quot;font-size: 13px; font-weight: normal;&quot;&gt;React / Vite UI&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fff3e0;strokeColor=#fb8c00;fontColor=#e65100;fontStyle=1;fontSize=18;arcSize=10;strokeWidth=2;fontFamily=Inter, Helvetica, sans-serif;" vertex="1" parent="1">
          <mxGeometry x="260" y="260" width="160" height="80" as="geometry" />
        </mxCell>

        <!-- Backend -->
        <mxCell id="backend" value="Backend API&lt;br&gt;&lt;span style=&quot;font-size: 13px; font-weight: normal;&quot;&gt;Node.js / Express Server&lt;/span&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#e8f5e9;strokeColor=#43a047;fontColor=#2e7d32;fontStyle=1;fontSize=18;arcSize=10;strokeWidth=2;fontFamily=Inter, Helvetica, sans-serif;" vertex="1" parent="1">
          <mxGeometry x="520" y="260" width="180" height="80" as="geometry" />
        </mxCell>

        <!-- Database -->
        <mxCell id="database" value="Database&lt;br&gt;&lt;span style=&quot;font-size: 13px; font-weight: normal;&quot;&gt;PostgreSQL / MongoDB&lt;/span&gt;" style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=15;fillColor=#e3f2fd;strokeColor=#1e88e5;fontColor=#1565c0;fontStyle=1;fontSize=16;strokeWidth=2;fontFamily=Inter, Helvetica, sans-serif;" vertex="1" parent="1">
          <mxGeometry x="800" y="240" width="120" height="120" as="geometry" />
        </mxCell>

        <!-- Edges -->
        <mxCell id="edge2" value="REST / GraphQL API" style="edgeStyle=orthogonalEdgeStyle;curved=1;rounded=1;strokeColor=#495057;strokeWidth=2;html=1;fontFamily=Inter, Helvetica, sans-serif;fontSize=14;fontColor=#000000;fontStyle=1;labelBackgroundColor=#ffffff;labelBorderColor=#ced4da;endArrow=classic;" edge="1" parent="1" source="frontend" target="backend">
          <mxGeometry width="50" height="50" relative="1" as="geometry" />
        </mxCell>

        <mxCell id="edge3" value="SQL / ORM Queries" style="edgeStyle=orthogonalEdgeStyle;curved=1;rounded=1;strokeColor=#495057;strokeWidth=2;html=1;fontFamily=Inter, Helvetica, sans-serif;fontSize=14;fontColor=#000000;fontStyle=1;labelBackgroundColor=#ffffff;labelBorderColor=#ced4da;endArrow=classic;" edge="1" parent="1" source="backend" target="database">
          <mxGeometry width="50" height="50" relative="1" as="geometry" />
        </mxCell>

      </root>
    </mxGraphModel>
  </diagram>
</mxfile>`;

const contentEncoded = drawioXml
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&apos;")
  .replace(/[\x00-\x1F\x7F-\x9F]/g, "");

const svgTemplate = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="1169px" height="827px" viewBox="0 0 1169 827" content="${contentEncoded}">
  <!-- Fallback viewing for pure SVG viewers -->
  <rect width="100%" height="100%" fill="#ffffff" />
  <rect x="220" y="100" width="760" height="400" fill="#f8f9fa" stroke="#ced4da" stroke-width="2" rx="10"/>
  <text x="600" y="150" font-family="Helvetica" font-size="22" font-weight="bold" fill="#495057" text-anchor="middle">Click this file in VS Code to open via Draw.io Extension!</text>
</svg>
`;

fs.writeFileSync("frontend-backend-db.drawio.svg", svgTemplate);
console.log("Updated frontend-backend-db.drawio.svg");
