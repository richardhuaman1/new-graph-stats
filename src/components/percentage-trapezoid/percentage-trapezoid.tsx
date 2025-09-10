'use client'

import { useState, useEffect } from 'react'
import './percentage-trapezoid.css'

interface PercentageRegionsProps {
  values: [number, number, number]
  counts: [number, number, number]
  className?: string
  colors?: [string, string, string]
  textColors?: [string, string, string]
  // Controles de tamaño del trapecio
  width?: number
  height?: number
  // Controles de tamaño de los números
  minFontSize?: number
  maxFontSize?: number
  // Controles de posición del trapecio
  startX?: number
  startY?: number
}

export function PercentageRegions({
  values,
  counts,
  className = '',
  colors = ['#1a3d80a3', '#4ecdc4', '#45b7d1'],
  textColors = ['white', 'white', 'white'],
  width = 600,
  height = 400,
  minFontSize = 12,
  maxFontSize = 20,
  startX = 100,
  startY = 50
}: PercentageRegionsProps) {
  const [percentages, setPercentages] = useState(values)

  // Sincronizar con los valores cuando cambien
  useEffect(() => {
    setPercentages(values)
  }, [values])



  // Calcular las posiciones de las regiones trapezoidales basadas en proporciones del área total
  const calculateRegionPoints = () => {
    // console.log('Calculando regiones con valores:', percentages)
    const [p1, p2, p3] = percentages
    
    // Calcular las proporciones relativas para distribuir en el 100% del trapecio
    const total = p1 + p2 + p3
    const proportion1 = p1 / total
    const proportion2 = p2 / total
    const proportion3 = p3 / total

    // Posiciones base del trapecio usando los props - centrado en el SVG
    const margin = Math.max(width * 0.1, 40) // Margen mínimo de 40px o 10% del ancho
    const availableWidth = width - (2.59 * margin)
    const topStartX = margin
    const topEndX = margin + availableWidth
    const topY = margin
    const bottomY = height - margin
    
    // Dimensiones del trapecio
    const topWidth = topEndX - topStartX
    const trapezoidHeight = bottomY - topY
    const inclination = trapezoidHeight * 0.375 // Inclinación más suave para mejor apariencia
    
    // Calcular posiciones de las líneas divisorias en la parte superior
    const line1X = topStartX + proportion1 * topWidth
    const line2X = line1X + proportion2 * topWidth

    // Calcular posiciones de las líneas divisorias en la parte inferior
    const bottomStartX = topStartX - inclination
    const bottomEndX = topEndX + inclination
    const bottomLine1X = bottomStartX + proportion1 * (bottomEndX - bottomStartX)
    const bottomLine2X = bottomLine1X + proportion2 * (bottomEndX - bottomStartX)

         // Calcular el centro horizontal real de cada región trapezoidal
     // Para regiones trapezoidales, el centro real está entre el centro superior e inferior
     const center1X = ((topStartX + line1X) / 2 + (bottomStartX + bottomLine1X) / 2) / 2
     const center2X = ((line1X + line2X) / 2 + (bottomLine1X + bottomLine2X) / 2) / 2
     const center3X = ((line2X + topEndX) / 2 + (bottomLine2X + bottomEndX) / 2) / 2
     
     // Calcular la posición Y centrada verticalmente en cada región
     const centerY = topY + (trapezoidHeight / 2)

         // Calcular el ancho promedio de cada región para ajustar el tamaño del texto
     const avgWidth1 = (line1X - topStartX + (bottomLine1X - bottomStartX)) / 2
     const avgWidth2 = (line2X - line1X + (bottomLine2X - bottomLine1X)) / 2
     const avgWidth3 = (topEndX - line2X + (bottomEndX - bottomLine2X)) / 2

     // Calcular altura promedio de cada región
     const avgHeight = trapezoidHeight

           // Calcular tamaño de fuente proporcional al área de cada región pero ajustándose al espacio disponible
      const calculateFontSize = (regionWidth: number, regionHeight: number) => {
        // Usar el ancho de la región como limitador principal para evitar que se salga
        const maxWidthForText = regionWidth * 0.7 // Usar solo 70% del ancho para el texto
        const maxHeightForText = regionHeight * 0.6 // Usar solo 60% de la altura para el texto
        
        // Calcular tamaño basado en el espacio más limitante
        const sizeBasedOnWidth = maxWidthForText / 2 // Dividir por 2 para dejar espacio para el símbolo %
        const sizeBasedOnHeight = maxHeightForText
        
        // Usar el valor más pequeño para asegurar que quepa
        const safeSize = Math.min(sizeBasedOnWidth, sizeBasedOnHeight)
        
        // Aplicar límites mínimo y máximo
        return Math.max(minFontSize, Math.min(maxFontSize, safeSize))
      }

     return {
       region1: `${topStartX},${topY} ${line1X},${topY} ${bottomLine1X},${bottomY} ${bottomStartX},${bottomY}`,
       region2: `${line1X},${topY} ${line2X},${topY} ${bottomLine2X},${bottomY} ${bottomLine1X},${bottomY}`,
       region3: `${line2X},${topY} ${topEndX},${topY} ${bottomEndX},${bottomY} ${bottomLine2X},${bottomY}`,
       line1: `${line1X},${topY} ${bottomLine1X},${bottomY}`,
       line2: `${line2X},${topY} ${bottomLine2X},${bottomY}`,
       text1: {
         x: center1X,
         y: centerY,
         fontSize: calculateFontSize(avgWidth1, avgHeight)
       },
       text2: {
         x: center2X,
         y: centerY,
         fontSize: calculateFontSize(avgWidth2, avgHeight)
       },
       text3: {
         x: center3X,
         y: centerY,
         fontSize: calculateFontSize(avgWidth3, avgHeight)
       }
     }
  }

  const points = calculateRegionPoints()


    type Corner = "tl" | "tr" | "br" | "bl";

    function polygonToSelectiveRoundedPath(
        points: string,
        radius = 8,
        roundedCorners: Corner[] = []
    ) {
        const coords = points.split(" ").map((p) => p.split(",").map(Number));
        const n = coords.length;
        let d = "";

        coords.forEach(([x, y], i) => {
            const [prevX, prevY] = coords[(i - 1 + n) % n];
            const [nextX, nextY] = coords[(i + 1) % n];

            // Detect which logical corner this is (tl, tr, br, bl)
            let corner: Corner | null = null;
            if (i === 0) corner = "tl"; // first point (top-left)
            else if (i === 1) corner = "tr"; // second point (top-right)
            else if (i === 2) corner = "br"; // third point (bottom-right)
            else if (i === 3) corner = "bl"; // fourth point (bottom-left)

            if (corner && roundedCorners.includes(corner)) {
                // compute rounding
                const vx1 = x - prevX;
                const vy1 = y - prevY;
                const len1 = Math.hypot(vx1, vy1);

                const vx2 = x - nextX;
                const vy2 = y - nextY;
                const len2 = Math.hypot(vx2, vy2);

                const p1x = x - (vx1 / len1) * radius;
                const p1y = y - (vy1 / len1) * radius;
                const p2x = x - (vx2 / len2) * radius;
                const p2y = y - (vy2 / len2) * radius;

                if (i === 0) d += `M ${p1x},${p1y} `;
                else d += `L ${p1x},${p1y} `;

                d += `Q ${x},${y} ${p2x},${p2y} `;
            } else {
                // sharp corner
                if (i === 0) d += `M ${x},${y} `;
                else d += `L ${x},${y} `;
            }
        });

        d += "Z";
        return d;
    }
  return (
    <div className={`svg-percentage-container ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className='percentage-svg'
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Gradientes personalizados */}
          <linearGradient id='grad1' x1='0%' y1='0%' x2='100%' y2='0%'>
            <stop
              offset='0%'
              style={{ stopColor: colors[0], stopOpacity: 1 }}
            />
            <stop
              offset='100%'
              style={{ stopColor: colors[0], stopOpacity: 0.8 }}
            />
          </linearGradient>
          <linearGradient id='grad2' x1='0%' y1='0%' x2='100%' y2='0%'>
            <stop
              offset='0%'
              style={{ stopColor: colors[1], stopOpacity: 1 }}
            />
            <stop
              offset='100%'
              style={{ stopColor: colors[1], stopOpacity: 0.8 }}
            />
          </linearGradient>
          <linearGradient id='grad3' x1='0%' y1='0%' x2='100%' y2='0%'>
            <stop
              offset='0%'
              style={{ stopColor: colors[2], stopOpacity: 1 }}
            />
            <stop
              offset='100%'
              style={{ stopColor: colors[2], stopOpacity: 0.8 }}
            />
          </linearGradient>

          {/* Filtros para efectos */}
          <filter id='glow' x='-50%' y='-50%' width='200%' height='200%'>
            <feGaussianBlur stdDeviation='3' result='coloredBlur' />
            <feMerge>
              <feMergeNode in='coloredBlur' />
              <feMergeNode in='SourceGraphic' />
            </feMerge>
          </filter>

          {/* Sombras */}
          <filter id='shadow' x='-20%' y='-20%' width='140%' height='140%'>
            <feDropShadow
              dx='2'
              dy='2'
              stdDeviation='3'
              floodColor='#000'
              floodOpacity='0.3'
            />
          </filter>
        </defs>

          <path
              d={polygonToSelectiveRoundedPath(points.region1, 10, ["tl", "bl"])}
              fill={colors[0]}
              filter="url(#shadow)"
          />

          <path
              d={polygonToSelectiveRoundedPath(points.region2, 10, [])}
              fill={colors[1]}
              filter="url(#shadow)"
          />

          <path
              d={polygonToSelectiveRoundedPath(points.region3, 10, ["tr", "br"])}
              fill={colors[2]}
              filter="url(#shadow)"
          />

                 {/* Texto de valores con símbolo % centrado y de diferente tamaño */}
         {/* Región 1 */}
         <text
           id='text1'
           x={points.text1.x}
           y={points.text1.y + (points.text1.fontSize * 0.2)}
           textAnchor='middle'
           fill={textColors[0]}
           fontSize={percentages[0] < 10 ? points.text1.fontSize * 0.7 : points.text1.fontSize}
           fontWeight='bold'
         >
           {Math.round(percentages[0])}
           <tspan fontSize={percentages[0] < 10 ? points.text1.fontSize * 0.35 : points.text1.fontSize * 0.5}>%</tspan>
         </text>

          {/* Región 1 - count */}
          <text
              id='count1'
              x={points.text1.x}
              y={points.text1.y + (points.text1.fontSize * 1.0)} // Más cerca del porcentaje
              textAnchor='middle'
              fill={textColors[0]}
              fontSize={percentages[0] < 10 ? points.text1.fontSize * 0.3 : points.text1.fontSize * 0.4}
              fontWeight='normal'
          >
              {counts[0]}
          </text>
         
         {/* Región 2 */}
         <text
           id='text2'
           x={points.text2.x}
           y={points.text2.y + (points.text2.fontSize * 0.2)}
           textAnchor='middle'
           fill={textColors[1]}
           fontSize={percentages[1] < 10 ? points.text2.fontSize * 0.7 : points.text2.fontSize}
           fontWeight='bold'
         >
           {Math.round(percentages[1])}
           <tspan fontSize={percentages[1] < 10 ? points.text2.fontSize * 0.35 : points.text2.fontSize * 0.5}>%</tspan>
         </text>

          {/* Región 2 - count */}
          <text
              id='count2'
              x={points.text2.x}
              y={points.text2.y + (points.text2.fontSize * 1.0)} // Más cerca del porcentaje
              textAnchor='middle'
              fill={textColors[1]}
              fontSize={percentages[1] < 10 ? points.text2.fontSize * 0.3 : points.text2.fontSize * 0.4}
              fontWeight='normal'
          >
              {counts[1]}
          </text>
         
         {/* Región 3 */}
         <text
           id='text3'
           x={points.text3.x}
           y={points.text3.y + (points.text3.fontSize * 0.2)}
           textAnchor='middle'
           fill={textColors[2]}
           fontSize={percentages[2] < 10 ? points.text3.fontSize * 0.7 : points.text3.fontSize}
           fontWeight='bold'
         >
           {Math.round(percentages[2])}
           <tspan fontSize={percentages[2] < 10 ? points.text3.fontSize * 0.35 : points.text3.fontSize * 0.5}>%</tspan>
         </text>
          {/* Región 3 - count */}
          <text
              id='count3'
              x={points.text3.x}
              y={points.text3.y + (points.text3.fontSize * 1.0)} // Más cerca del porcentaje
              textAnchor='middle'
              fill={textColors[2]}
              fontSize={percentages[2] < 10 ? points.text3.fontSize * 0.3 : points.text3.fontSize * 0.4}
              fontWeight='normal'
          >
              {counts[2]}
          </text>
        
      </svg>
    </div>
  )
}
