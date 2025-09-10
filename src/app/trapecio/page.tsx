'use client'

import { useState, useRef } from 'react'
import { gsap } from 'gsap'
import PercentageRegions from './components/PercentageTrapezoid'

export default function ExtranetPage() {
  const [percentages, setPercentages] = useState<[number, number, number]>([40, 35, 25])
  const [colors, setColors] = useState<[string, string, string]>(['#1a3d80a3', '#4ecdc4', '#45b7d1'])
  const [opacities, setOpacities] = useState<[number, number, number]>([0.8, 0.8, 0.8])
  const [trapezoidSize, setTrapezoidSize] = useState({ width: 1200, height: 1600 })
  const [textSize, setTextSize] = useState({ min: 14, max: 24 }) 
  const [position, setPosition] = useState({ startX: 150, startY: 80 })
  const [isAnimating, setIsAnimating] = useState(false)

  // Referencias para las animaciones
  const animationButtonRef = useRef<HTMLButtonElement>(null)
  const controlesColoresRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const h2Ref = useRef<HTMLHeadingElement>(null)
  const trapezoidRef = useRef<HTMLDivElement>(null)
  const canchaImageRef = useRef<HTMLImageElement>(null)

  const handleColorChange = (index: number, color: string) => {
    const newColors: [string, string, string] = [...colors]
    newColors[index] = color
    setColors(newColors)
  }

  const handleOpacityChange = (index: number, opacity: number) => {
    const newOpacities: [number, number, number] = [...opacities]
    newOpacities[index] = opacity
    setOpacities(newOpacities)
  }

  // Función para convertir color hex a rgba
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  // Colores con transparencia aplicada
  const colorsWithOpacity: [string, string, string] = [
    hexToRgba(colors[0], opacities[0]),
    hexToRgba(colors[1], opacities[1]),
    hexToRgba(colors[2], opacities[2]) 
  ]

               // Función para ejecutar todas las animaciones en secuencia
    const runAllAnimations = () => {
      if (isAnimating) return
      
      setIsAnimating(true)
      
      // Timeline principal que ejecuta todas las animaciones en secuencia
      const tl = gsap.timeline({
        onComplete: () => {
          // No restaurar elementos automáticamente - se hará con otro botón
          setIsAnimating(false)
        }
      })

                                                // TODOS los elementos desaparecen AL MISMO TIEMPO con fadeOutUp + escala + blur
         tl.to([titleRef.current, h2Ref.current, trapezoidRef.current], {
           y: -80,
           opacity: 0,
           scale: 1.3,
           filter: "blur(8px)",
           duration: 0.6,
           ease: "power4.in",
           stagger: 0, // Sin delay entre elementos
           onComplete: () => {
             // Efecto final del botón después de que todo desaparezca
             gsap.to(animationButtonRef.current, {
               scale: 1.1,
               duration: 0.2,
               ease: "power2.out"
             }).then(() => {
               gsap.to(animationButtonRef.current, {
                 scale: 1,
                 duration: 0.2,
                 ease: "power2.in"
               })
             })
           }
         })
    }

    // NUEVA FUNCIÓN: Efecto dramático de aparecer gigante y contraer
    const dramaticAppearEffect = () => {
      if (isAnimating) return
      
      setIsAnimating(true)
      
      const tl = gsap.timeline({
        onComplete: () => {
          setIsAnimating(false)
        }
      })
      
      // 1. APARECER GIGANTE: El trapecio aparece enorme en pantalla
      tl.fromTo(trapezoidRef.current, {
        scale: 0,
        opacity: 0,
        rotation: -180,
        y: -200,
        filter: "blur(20px)"
      }, {
        scale: 3.5, // ¡3.5 veces más grande!
        opacity: 1,
        rotation: 0,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "back.out(2.5)" // Efecto de rebote dramático
      })
      
      // 2. PAUSA DRAMÁTICA: Se mantiene gigante por un momento
      tl.to(trapezoidRef.current, {
        scale: 3.5,
        duration: 0.8,
        ease: "power1.in"
      })
      
      // 3. CONTRACCIÓN DRAMÁTICA: Se contrae a su tamaño normal con efecto de "succión"
      tl.to(trapezoidRef.current, {
        scale: 1,
        y: 0,
        rotation: 0,
        duration: 1.5,
        ease: "power4.in", // Efecto de contracción muy dramático
        onComplete: () => {
          // Efecto final de "estabilización"
          gsap.to(trapezoidRef.current, {
            scale: 1.05,
            duration: 0.2,
            ease: "power2.out"
          }).then(() => {
            gsap.to(trapezoidRef.current, {
              scale: 1,
              duration: 0.3,
              ease: "elastic.out(1, 0.3)"
            })
          })
        }
      })
    }

       // Función para restaurar todos los elementos
    const restoreAllElements = () => {
      if (isAnimating) return
      
      setIsAnimating(true)
      
      // Timeline para restaurar elementos
      const tl = gsap.timeline({
        onComplete: () => {
          setIsAnimating(false)
        }
      })

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               // 1. EFECTO DE TERREMOTO DRAMÁTICO en la cancha Y controles-colores antes de que aparezca todo (0.5 segundos total)
            tl.to([canchaImageRef.current, controlesColoresRef.current], {
              x: -5,
              y: -3,
              rotation: -2,
              duration: 0.03,
              ease: "power1.in"
            })
            .to([canchaImageRef.current, controlesColoresRef.current], {
              x: 6,
              y: 4,
              rotation: 2.5,
              duration: 0.03,
              ease: "power1.in"
            })
            .to([canchaImageRef.current, controlesColoresRef.current], {
              x: -8,
              y: -5,
              rotation: -3,
              duration: 0.03,
              ease: "power1.in"
            })
            .to([canchaImageRef.current, controlesColoresRef.current], {
              x: 10,
              y: 6,
              rotation: 3.5,
              duration: 0.03,
              ease: "power1.in"
            })
            .to([canchaImageRef.current, controlesColoresRef.current], {
              x: -12,
              y: -7,
              rotation: -4,
              duration: 0.03,
              ease: "power1.in"
            })
            .to([canchaImageRef.current, controlesColoresRef.current], {
              x: 14,
              y: 8,
              rotation: 4.5,
              duration: 0.03,
              ease: "power1.in"
            })
            .to([canchaImageRef.current, controlesColoresRef.current], {
              x: -10,
              y: -6,
              rotation: -3.5,
              duration: 0.03,
              ease: "power1.in"
            })
            .to([canchaImageRef.current, controlesColoresRef.current], {
              x: 8,
              y: 5,
              rotation: 3,
              duration: 0.03,
              ease: "power1.in"
            })
            .to([canchaImageRef.current, controlesColoresRef.current], {
              x: -7,
              y: -4,
              rotation: -2.5,
              duration: 0.03,
              ease: "power1.in"
            })
            .to([canchaImageRef.current, controlesColoresRef.current], {
              x: 6,
              y: 3,
              rotation: 2,
              duration: 0.03,
              ease: "power1.in"
            })
            .to([canchaImageRef.current, controlesColoresRef.current], {
              x: -4,
              y: -2,
              rotation: -1.5,
              duration: 0.03,
              ease: "power1.in"
            })
            .to([canchaImageRef.current, controlesColoresRef.current], {
              x: 3,
              y: 2,
              rotation: 1,
              duration: 0.03,
              ease: "power1.in"
            })
            .to([canchaImageRef.current, controlesColoresRef.current], {
              x: -2,
              y: -1,
              rotation: -0.8,
              duration: 0.03,
              ease: "power1.in"
            })
            .to([canchaImageRef.current, controlesColoresRef.current], {
              x: 1,
              y: 0.5,
              rotation: 0.4,
              duration: 0.03,
              ease: "power1.in"
            })
            .to([canchaImageRef.current, controlesColoresRef.current], {
              x: 0,
              y: 0,
              rotation: 0,
              duration: 0.08,
              ease: "power2.out"
            })

                                                                                   // 2. Restaurar título con fadeInDown + enfoque gradual + escala normal (DURANTE el terremoto)
            tl.to(titleRef.current, {
              y: 0,
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.8,
              ease: "power2.out"
            }, "0.1") // Empieza a aparecer 0.1s después de que inicie el terremoto

            // 3. Restaurar H2 con fadeInDown + enfoque gradual + escala normal (DURANTE el terremoto)
            tl.to(h2Ref.current, {
              y: 0,
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.6,
              ease: "power2.out"
            }, "0.2") // Empieza a aparecer 0.2s después de que inicie el terremoto

            // 4. Restaurar trapecio con fadeInDown + enfoque gradual + escala normal (DURANTE el terremoto)
            tl.to(trapezoidRef.current, {
              y: 0,
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.7,
              ease: "back.out(1.7)"
            }, "0.3") // Empieza a aparecer 0.3s después de que inicie el terremoto

      // 4. Efecto final del botón de restauración
      tl.to(animationButtonRef.current, {
        scale: 1.1,
        duration: 0.2,
        ease: "power2.out"
      }, "-=0.5")
      .to(animationButtonRef.current, {
        scale: 1,
        duration: 0.2,
        ease: "power2.in"
      })
    }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto">
        <h1 
          ref={titleRef}
          className="text-3xl font-bold text-gray-800 mb-8 text-center"
        >
          Gráfico de Porcentajes en Trapecio con Regiones Adaptadas
        </h1>
        
                 {/* Botones de animación */}
         <div className="text-center mb-6">
                       <div className="flex justify-center gap-4 mb-4">
              <button
                ref={animationButtonRef}
                onClick={runAllAnimations}
                disabled={isAnimating}
                className="master-animation-button"
              >
                {isAnimating ? '🎬 Ejecutando...' : '🎬 Hacer Desaparecer'}
              </button>
              
              <button
                onClick={restoreAllElements}
                disabled={isAnimating}
                className="restore-animation-button"
              >
                {isAnimating ? '🔄 Restaurando...' : '🔄 Hacer Reaparecer'}
              </button>

              <button
                onClick={dramaticAppearEffect}
                disabled={isAnimating}
                className="dramatic-morph-button"
              >
                {isAnimating ? '🌟 Ejecutando...' : '🌟 Aparecer Gigante'}
              </button>
            </div>
                                                                                               <p className="text-sm text-gray-600">
                Botón 1: Todos desaparecen simultáneamente | Botón 2: Cancha tiembla → Elementos reaparecen | Botón 3: Trapecio aparece gigante y se contrae dramáticamente
              </p>
         </div>
        
                                   {/* Controles de Colores y Transparencia */}
          <div 
            id='controles-colores' 
            ref={controlesColoresRef}
            className="bg-white rounded-lg shadow-lg p-6 mb-6"
          >
           <h2 
             ref={h2Ref}
             className="text-xl font-semibold text-gray-800 mb-4"
           >
             Controles de Colores y Transparencia
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="control-group">
              <label className="control-label">
                <span className="color-indicator" style={{ background: colors[0] }}></span>
                Color Región 1:
              </label>
                              <input
                  type="color"
                  value={colors[0]}
                  onChange={(e) => handleColorChange(0, e.target.value)}
                  className="w-full h-10 rounded border border-gray-300 mb-2"
                />
                <div className="opacity-control">
                  <span>Opacidad:</span>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.1"
                    value={opacities[0]}
                    onChange={(e) => handleOpacityChange(0, parseFloat(e.target.value))}
                  />
                  <span className="opacity-value">{Math.round(opacities[0] * 100)}%</span>
                </div>
            </div>
            <div className="control-group">
              <label className="control-label">
                <span className="color-indicator" style={{ background: colors[1] }}></span>
                Color Región 2:
              </label>
                              <input
                  type="color"
                  value={colors[1]}
                  onChange={(e) => handleColorChange(1, e.target.value)}
                  className="w-full h-10 rounded border border-gray-300 mb-2"
                />
                <div className="opacity-control">
                  <span>Opacidad:</span>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.1"
                    value={opacities[1]}
                    onChange={(e) => handleOpacityChange(1, parseFloat(e.target.value))}
                  />
                  <span className="opacity-value">{Math.round(opacities[1] * 100)}%</span>
                </div>
            </div>
            <div className="control-group">
              <label className="control-label">
                <span className="color-indicator" style={{ background: colors[2] }}></span>
                Color Región 3:
              </label>
                              <input
                  type="color"
                  value={colors[2]}
                  onChange={(e) => handleColorChange(2, e.target.value)}
                  className="w-full h-10 rounded border border-gray-300 mb-2"
                />
                <div className="opacity-control">
                  <span>Opacidad:</span>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.1"
                    value={opacities[2]}
                    onChange={(e) => handleOpacityChange(2, parseFloat(e.target.value))}
                  />
                  <span className="opacity-value">{Math.round(opacities[2] * 100)}%</span>
                </div>
            </div>
          </div>
        </div>
        
        {/* Gráfico de visualización */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="relative">
            <div className="flex justify-center">
              <img 
                ref={canchaImageRef}
                src="/images/CANCHA_RECORTADA.png" 
                alt="Cancha de fútbol 3D" 
                className="max-w-full h-auto rounded-lg shadow-lg"
                style={{ maxHeight: '300px' }}
              />
            </div>
            <div 
              className="absolute inset-0 flex items-center justify-center" 
              style={{ 
                padding: `${Math.max(40, trapezoidSize.width * 0.1, trapezoidSize.height * 0.15)}px` 
              }}
            >
              <div 
                ref={trapezoidRef}
                className="w-full h-full flex items-center justify-center"
              >
                <PercentageRegions
                  values={percentages}
                  counts={[0,0,0]}
                  colors={colorsWithOpacity}
                  width={trapezoidSize.width}
                  height={trapezoidSize.height}
                  minFontSize={textSize.min}
                  maxFontSize={textSize.max}
                  startX={position.startX}
                  startY={position.startY}
                  className="w-auto"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Controles de configuración del trapecio */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Configuración del Trapecio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">Tamaño del Trapecio</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Ancho: {trapezoidSize.width}px
                  </label>
                  <input
                    type="range"
                    min="400"
                    max="1200"
                    value={trapezoidSize.width}
                    className="slider w-full"
                    onChange={(e) => setTrapezoidSize(prev => ({ ...prev, width: parseInt(e.target.value) }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Alto: {trapezoidSize.height}px
                  </label>
                  <input
                    type="range"
                    min="200"
                    max="600"
                    value={trapezoidSize.height}
                    className="slider w-full"
                    onChange={(e) => setTrapezoidSize(prev => ({ ...prev, height: parseInt(e.target.value) }))}
                  />
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-3">Tamaño del Texto</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Tamaño mínimo: {textSize.min}px
                  </label>
                  <input
                    type="range"
                    min="8"
                    max="20"
                    value={textSize.min}
                    className="slider w-full"
                    onChange={(e) => setTextSize(prev => ({ ...prev, min: parseInt(e.target.value) }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Tamaño máximo: {textSize.max}px
      </label>
                  <input
                    type="range"
                    min="16"
                    max="32"
                    value={textSize.max}
                    className="slider w-full"
                    onChange={(e) => setTextSize(prev => ({ ...prev, max: parseInt(e.target.value) }))}
                  />
                </div>
              </div>
            </div>
          </div>
    </div>
    
        {/* Controles de tamaños externos */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Controles de Tamaños de Regiones</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="control-group">
              <label className="control-label">
                <span className="color-indicator" style={{ background: colors[0] }}></span>
                Región 1: <span className="percent-display">{Math.round(percentages[0])}</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={Math.round(percentages[0])}
                className="slider"
                onChange={(e) => {
                  const newPercentages: [number, number, number] = [...percentages]
                  newPercentages[0] = parseInt(e.target.value)
                  setPercentages(newPercentages)
                }}
              />
            </div>
            <div className="control-group">
              <label className="control-label">
                <span className="color-indicator" style={{ background: colors[1] }}></span>
                Región 2: <span className="percent-display">{Math.round(percentages[1])}</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={Math.round(percentages[1])}
                className="slider"
                onChange={(e) => {
                  const newPercentages: [number, number, number] = [...percentages]
                  newPercentages[1] = parseInt(e.target.value)
                  setPercentages(newPercentages)
                }}
              />
            </div>
            <div className="control-group">
              <label className="control-label">
                <span className="color-indicator" style={{ background: colors[2] }}></span>
                Región 3: <span className="percent-display">{Math.round(percentages[2])}</span>
      </label>
              <input
                type="range"
                min="0"
                max="100"
                value={Math.round(percentages[2])}
                className="slider"
                onChange={(e) => {
                  const newPercentages: [number, number, number] = [...percentages]
                  newPercentages[2] = parseInt(e.target.value)
                  setPercentages(newPercentages)
                }}
              />
            </div>
          </div>
    </div>
    
                <div className="mt-8 text-center text-gray-600">
          <p>Utiliza los controles para ajustar los colores, transparencia y tamaños de cada región.</p>
          <p>Cada región puede tener cualquier valor independientemente de las otras.</p>
        </div>
  </div>
</div>
  )
}
