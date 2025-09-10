'use client'

import { useRef, useState, useEffect } from 'react'
import gsap from '@/libs/gsap'
import {SoccerField} from "@/components/soccer-field";
import {TV} from "@/components/tv";
import {OtherMarkets} from "@/components/other-markets";
import {SoccerHeader} from "@/components/soccer-header";
import {GraphStatsStore} from "@/stores/graph-stats.store";
import {parsePercentages} from "@/utilities/helper";
import {PercentageRegions} from "@/components/percentage-trapezoid/percentage-trapezoid";

type GraphMainProps = {
    otherMarketsRef: React.RefObject<HTMLDivElement | null>
}

export function GraphMain({ otherMarketsRef }: GraphMainProps) {
    const [isAnimating, setIsAnimating] = useState(false)
    const score = GraphStatsStore.useGetScore()

    // Referencias para las animaciones
    const headerRef = useRef<HTMLDivElement>(null)
    const canchaRef = useRef<HTMLDivElement>(null)
    const trapecioRef = useRef<HTMLDivElement>(null)
    const tvRef = useRef<HTMLDivElement>(null)
    const animationButtonRef = useRef<HTMLButtonElement>(null)
    
    // Referencias para elementos con clase quota
    const quotaElementsRef = useRef<HTMLDivElement[]>([])
    
    // Función para ejecutar terremoto en el header del web-graph (llamada desde el padre)
    const triggerWebGraphHeaderEarthquake = () => {
        // Disparar un evento personalizado para que el web-graph lo escuche
        window.dispatchEvent(new CustomEvent('webGraphHeaderEarthquake'))
    }
    
    // Recolectar elementos con clase quota cuando el componente se monte
    useEffect(() => {
        const quotaElements = document.querySelectorAll('.quota') as NodeListOf<HTMLDivElement>
        quotaElementsRef.current = Array.from(quotaElements)
    }, [])
    
    // Escuchar cuando se actualicen los datos de la API para ejecutar automáticamente la animación
    useEffect(() => {
        const handleApiDataUpdated = () => {
            // Ejecutar la animación de desaparecer automáticamente cuando se actualicen los datos
            runDisappearAnimations()
        }
        
        window.addEventListener('apiDataUpdated', handleApiDataUpdated)
        
        return () => {
            window.removeEventListener('apiDataUpdated', handleApiDataUpdated)
        }
    }, [])
    
    // Escuchar cuando se completen los setters para ejecutar automáticamente restoreAllElements
    useEffect(() => {
        const handleApiDataSettled = () => {
            // Ejecutar la animación de restaurar automáticamente después de que se completen los setters
            restoreAllElements()
        }
        
        window.addEventListener('apiDataSettled', handleApiDataSettled)
        
        return () => {
            window.removeEventListener('apiDataSettled', handleApiDataSettled)
        }
    }, [])

    // Función para ejecutar todas las animaciones de desaparecer en secuencia
    const runDisappearAnimations = () => {
        if (isAnimating) {
            return
        }
        
        // Recolectar elementos quota cada vez que se ejecute la animación
        const quotaElements = document.querySelectorAll('.quota') as NodeListOf<HTMLDivElement>
        quotaElementsRef.current = Array.from(quotaElements)
        
        // console.log('Elementos quota encontrados:', quotaElementsRef.current.length)
        
        setIsAnimating(true)
        
        // Timeline principal que ejecuta todas las animaciones en secuencia
        const tl = gsap.timeline({
            onComplete: () => {
                setIsAnimating(false)
            }
        })

        // El trapecio Y los elementos con clase quota desaparecen AL MISMO TIEMPO con fadeOutUp + escala + blur
        tl.to([trapecioRef.current, ...quotaElementsRef.current], {
            y: -80,
            opacity: 0,
            scale: 1.3,
            filter: "blur(8px)",
            duration: 0.4,
            ease: "power4.in",
            onComplete: () => {
                
                // Pequeña pausa para que se vea la secuencia
                setTimeout(() => {
                    // Disparar evento para que se ejecute la animación de reaparecer
                    // después de que termine completamente la animación de desaparecer
                    window.dispatchEvent(new CustomEvent('apiDataSettled'))
                }, 200) // 200ms de pausa para que se vea la secuencia
                
                // Efecto final del botón después de que todos los elementos desaparezcan
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

    // Función para restaurar todos los elementos con efecto de terremoto
    const restoreAllElements = () => {
        if (isAnimating) {
            return
        }
        
        setIsAnimating(true)
        
        // Timeline para restaurar elementos
        const tl = gsap.timeline({
            onComplete: () => {
                setIsAnimating(false)
            }
        })

        // 1. EFECTO DE TERREMOTO DRAMÁTICO en la cancha Y el header del web-graph al mismo tiempo
        // Disparar el terremoto del header del web-graph
        triggerWebGraphHeaderEarthquake()
        
        // La cancha tiembla con GSAP
        tl.to(canchaRef.current, {
            x: -5,
            y: -3,
            rotation: -2,
            duration: 0.03,
            ease: "power1.in"
        })
        .to(canchaRef.current, {
            x: 6,
            y: 4,
            rotation: 2.5,
            duration: 0.03,
            ease: "power1.in"
        })
        .to(canchaRef.current, {
            x: -8,
            y: -5,
            rotation: -3,
            duration: 0.03,
            ease: "power1.in"
        })
        .to(canchaRef.current, {
            x: 10,
            y: 6,
            rotation: 3.5,
            duration: 0.03,
            ease: "power1.in"
        })
        .to(canchaRef.current, {
            x: -12,
            y: -7,
            rotation: -4,
            duration: 0.03,
            ease: "power1.in"
        })
        .to(canchaRef.current, {
            x: 14,
            y: 8,
            rotation: 4.5,
            duration: 0.03,
            ease: "power1.in"
        })
        .to(canchaRef.current, {
            x: -10,
            y: -6,
            rotation: -3.5,
            duration: 0.03,
            ease: "power1.in"
        })
        .to(canchaRef.current, {
            x: 8,
            y: 5,
            rotation: 3,
            duration: 0.03,
            ease: "power1.in"
        })
        .to(canchaRef.current, {
            x: -7,
            y: -4,
            rotation: -2.5,
            duration: 0.03,
            ease: "power1.in"
        })
        .to(canchaRef.current, {
            x: 6,
            y: 3,
            rotation: 2,
            duration: 0.03,
            ease: "power1.in"
        })
        .to(canchaRef.current, {
            x: -4,
            y: -2,
            rotation: -1.5,
            duration: 0.03,
            ease: "power1.in"
        })
        .to(canchaRef.current, {
            x: 3,
            y: 2,
            rotation: 1,
            duration: 0.03,
            ease: "power1.in"
        })
        .to(canchaRef.current, {
            x: -2,
            y: -1,
            rotation: -0.8,
            duration: 0.03,
            ease: "power1.in"
        })
        .to(canchaRef.current, {
            x: 1,
            y: 0.5,
            rotation: 0.4,
            duration: 0.03,
            ease: "power1.in"
        })
        .to(canchaRef.current, {
            x: 0,
            y: 0,
            rotation: 0,
            duration: 0.08,
            ease: "power2.out"
        })

        // 2. La cabecera no se restaura (ya que nunca desapareció)
        // Solo se anima: trapecio

        // 3. La cancha tiembla con GSAP, el header del web-graph tiembla con evento personalizado
        // El terremoto ya se ejecutó en el paso 1

        // 2. ANIMACIÓN RÁPIDA DEL TRAPECIO CON ROTACIÓN
        // El trapecio aparece girando rápidamente con fadeInDown + enfoque + escala
        tl.to(trapecioRef.current, {
            y: 0,
            opacity: 1,
            scale: 1,
            rotation: 360, // Gira 360 grados
            filter: "blur(0px)",
            duration: 0.6,
            ease: "power4.out"
        }, "0") // Empieza INMEDIATAMENTE cuando inicie el terremoto
        
        // Resetear la rotación después de la animación para que funcione en la siguiente vez
        .to(trapecioRef.current, {
            rotation: 0,
            duration: 0,
            ease: "none"
        })
        
        // 3. ANIMACIÓN SIMPLE DE LOS ELEMENTOS QUOTA (fadeInDown normal)
        // console.log('Restaurando cuotas:', quotaElementsRef.current.length)
        tl.to(quotaElementsRef.current, {
            y: 0,
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.4,
            ease: "power4.out"
        }, "0") // Los quota aparecen AL MISMO TIEMPO que el trapecio

        // 3. El TV no se restaura (ya que nunca desapareció)
        // Solo se anima: trapecio

        // Efecto final del botón de restauración
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
        <div className="w-full flex flex-row justify-center items-center">
            {/* Left */}
            <div className="w-[68%] h-full flex flex-col items-center justify-center">
                <div ref={headerRef}>
                    <SoccerHeader/>
                </div>
                <div className="relative inline-block h-[30rem] w-[72.5rem]" ref={canchaRef}>
                    <SoccerField />
                    <div className="absolute inset-0 -top-[8rem]" ref={trapecioRef}>
                        <PercentageRegions
                            values={score && score.selections ?
                                parsePercentages(score.selections.map(s => s?.percentage), 3) as [number, number, number] :
                                [33.33, 33.34, 33.33] // Valores por defecto si no hay datos
                            }
                            counts={score && score.selections ? (score.selections.map(s => parseInt(s.count)) as [number, number, number]) : [0,0,0]}
                            colors={score && score.selections ? (score.selections.map(s => s.background) as [string, string, string]) : ['#335198cf', '#ffffff80', '#049ec4cf']}
                            textColors={score && score.selections ? (score.selections.map(s => s.color) as [string, string, string]) : ['#000000', '#000000', '#000000']}
                            width={1110}
                            height={705}
                            minFontSize={70}
                            maxFontSize={160}
                        />
                    </div>
                </div>
            </div>
            {/* Right */}
            <div className="w-[32%] h-full flex flex-col justify-between">
                <div ref={tvRef}>
                    <TV/>
                </div>
                <OtherMarkets ref={otherMarketsRef}/>
            </div>
        </div>
    )
}