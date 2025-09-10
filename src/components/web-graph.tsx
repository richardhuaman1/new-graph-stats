'use client'

import {Header} from "@/components/header";
import {Footer} from "@/components/footer";
import {GraphMain} from "@/components/content";
import {INTERVAL_REFETCH, sizes} from "@/config";
import {GraphStatsStore} from "@/stores/graph-stats.store";
import {useEffect, useRef, useState} from "react";
import {GraphStats} from "@/types";
import { gsap } from 'gsap';
import {useQueryClient} from "@tanstack/react-query";
import {graphStatsKeys} from "@/queries/graph-stats.query";

type WebGraphProps = {
    data: GraphStats[];
    isLoading: boolean;
}

export function WebGraph({data: graphStats, isLoading}: WebGraphProps) {
    const setScore = GraphStatsStore.useSetScore()
    const setOtherMarkets = GraphStatsStore.useSetOtherMarkets()
    const [isAnimating, setIsAnimating] = useState(false)
    const queryClient = useQueryClient();

    // Referencias para las animaciones
    const webGraphHeaderRef = useRef<HTMLDivElement>(null)
    const otherMarketsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setScore(graphStats[0])
        setOtherMarkets([graphStats[1], graphStats[2]])
        queryClient.invalidateQueries({queryKey: graphStatsKeys.all})
        
        // Disparar evento para que GraphMain ejecute la animación de desaparecer
        // cuando se actualicen los datos de la API
        window.dispatchEvent(new CustomEvent('apiDataUpdated'))
        
        // El evento apiDataSettled ahora se dispara automáticamente
        // cuando termina la animación de desaparecer en GraphMain
    }, [])

    useEffect(() => {
        const id = setInterval(()=> {            
            // Disparar evento para que GraphMain ejecute la animación de desaparecer
            // cuando se ejecute refetch (llamada manual a la API)
            window.dispatchEvent(new CustomEvent('apiDataUpdated'))
            
            // El evento apiDataSettled ahora se <Fdispara automáticamente
            // cuando termina la animación de desaparecer en GraphMain
        }, INTERVAL_REFETCH)
        return () => clearInterval(id)
    }, []);

    // Escuchar el evento de terremoto del header del web-graph
    useEffect(() => {
        const handleWebGraphHeaderEarthquake = () => {
            runWebGraphHeaderEarthquake()
        }
        
        window.addEventListener('webGraphHeaderEarthquake', handleWebGraphHeaderEarthquake)
        
        return () => {
            window.removeEventListener('webGraphHeaderEarthquake', handleWebGraphHeaderEarthquake)
        }
    }, []);

    // Función para ejecutar el efecto de terremoto en el header del web-graph
    const runWebGraphHeaderEarthquake = () => {
        if (isAnimating) return
        
        setIsAnimating(true)
        
        const tl = gsap.timeline({
            onComplete: () => {
                setIsAnimating(false)
            }
        })

        // EFECTO DE TERREMOTO DRAMÁTICO en el header del web-graph Y other markets
        tl.to([webGraphHeaderRef.current, otherMarketsRef.current], {
            x: -5,
            y: -3,
            rotation: -2,
            duration: 0.03,
            ease: "power1.in"
        })
        .to([webGraphHeaderRef.current, otherMarketsRef.current], {
            x: 6,
            y: 4,
            rotation: 2.5,
            duration: 0.03,
            ease: "power1.in"
        })
        .to([webGraphHeaderRef.current, otherMarketsRef.current], {
            x: -8,
            y: -5,
            rotation: -3,
            duration: 0.03,
            ease: "power1.in"
        })
        .to([webGraphHeaderRef.current, otherMarketsRef.current], {
            x: 10,
            y: 6,
            rotation: 3.5,
            duration: 0.03,
            ease: "power1.in"
        })
        .to([webGraphHeaderRef.current, otherMarketsRef.current], {
            x: -12,
            y: -7,
            rotation: -4,
            duration: 0.03,
            ease: "power1.in"
        })
        .to([webGraphHeaderRef.current, otherMarketsRef.current], {
            x: 14,
            y: 8,
            rotation: 4.5,
            duration: 0.03,
            ease: "power1.in"
        })
        .to([webGraphHeaderRef.current, otherMarketsRef.current], {
            x: -10,
            y: -6,
            rotation: -3.5,
            duration: 0.03,
            ease: "power1.in"
        })
        .to([webGraphHeaderRef.current, otherMarketsRef.current], {
            x: 8,
            y: 5,
            rotation: 3,
            duration: 0.03,
            ease: "power1.in"
        })
        .to([webGraphHeaderRef.current, otherMarketsRef.current], {
            x: -7,
            y: -4,
            rotation: -2.5,
            duration: 0.03,
            ease: "power1.in"
        })
        .to([webGraphHeaderRef.current, otherMarketsRef.current], {
            x: 6,
            y: 3,
            rotation: 2,
            duration: 0.03,
            ease: "power1.in"
        })
        .to([webGraphHeaderRef.current, otherMarketsRef.current], {
            x: -4,
            y: -2,
            rotation: -1.5,
            duration: 0.03,
            ease: "power1.in"
        })
        .to([webGraphHeaderRef.current, otherMarketsRef.current], {
            x: 3,
            y: 2,
            rotation: 1,
            duration: 0.03,
            ease: "power1.in"
        })
        .to([webGraphHeaderRef.current, otherMarketsRef.current], {
            x: -2,
            y: -1,
            rotation: -0.8,
            duration: 0.03,
            ease: "power1.in"
        })
        .to([webGraphHeaderRef.current, otherMarketsRef.current], {
            x: 1,
            y: 0.5,
            rotation: 0.4,
            duration: 0.03,
            ease: "power1.in"
        })
        .to([webGraphHeaderRef.current, otherMarketsRef.current], {
            x: 0,
            y: 0,
            rotation: 0,
            duration: 0.08,
            ease: "power2.out"
        })
    }

    return (
        <>
            <div style={{height: sizes.HEADER}} className={'w-full p-10'}>
                <Header ref={webGraphHeaderRef}/>
            </div>
            <div style={{height: sizes.MAIN}} className={'w-full px-10 flex items-center justify-center flex-col'}>
                <GraphMain otherMarketsRef={otherMarketsRef}/>
            </div>
            <div style={{height: sizes.FOOTER}} className={'w-full p-10'}>
                <Footer/>
            </div>
        </>
    )
}