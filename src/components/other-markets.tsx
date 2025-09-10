import {forwardRef} from "react";
import {GraphStatsStore} from "@/stores/graph-stats.store";
import {TrapezoidBox} from "@/components/trapezoid-box";

export const OtherMarkets = forwardRef<HTMLDivElement>((props, ref) => {
    const [market1, market2] = GraphStatsStore.useGetOtherMarkets();

    // Log para debugging
    // console.log('OtherMarkets renderizando:', {market1, market2})

    // Validación básica para evitar errores cuando los datos están undefined
    if (!market1 && !market2) {
        return (
            <div ref={ref} className="w-full flex items-center justify-center flex-col">
                <div className="text-white text-xl">Cargando mercados...</div>
            </div>
        );
    }

    if (!market1) {
        return (
            <div ref={ref} className="w-full flex items-center justify-center flex-col">
                <div className="text-white text-xl">Cargando mercado 1...</div>
            </div>
        );
    }

    if (!market2) {
        return (
            <div ref={ref} className="w-full flex items-center justify-center flex-col">
                <div className="text-white text-xl">Cargando mercado 2...</div>
            </div>
        );
    }

    return (
        <div ref={ref} className="w-full flex items-center justify-center flex-col">
            <div
                className={'bg-gradient-to-t from-[#070809] to-[#7F7E80] flex items-center justify-center w-xs rounded-tr-full rounded-tl-full py-2'}>
                <div
                    className={'text-white text-2xl font-bold flex items-center justify-center px-6'}>
                    OTROS MERCADOS
                </div>
            </div>
            <div className={'w-full flex items-center justify-center flex-col gap-2'}>
                <div className={'flex items-center justify-center gap-2 w-full flex-col'}>
                   <div className={'ml-6 flex items-center justify-center gap-2 w-full'}>
                       <TrapezoidBox variant={'dark-red'} className={'w-2/6 px-2 py-2 flex items-center justify-center h-full'}>
                           <p className={'text-white text-xl font-bold text-center line-clamp-1'}>{market1.markets.marketEq}</p>
                       </TrapezoidBox>
                       <TrapezoidBox  className={'w-4/6 px-2 py-2'}>
                           <div className="flex items-center justify-center w-full">
                               {market1?.selections?.map((selection, index) => (
                                   <div
                                       key={index}
                                       className={`px-2 text-center flex items-center justify-center
                                                ${market1.selections.length === 2 ? "w-1/2" : ""}
                                                ${market1.selections.length === 3 ? "w-1/3" : ""}
                                                ${market1.selections.length === 4 ? "w-1/4" : ""}`}
                                   >
                                       <p className="text-lg font-bold text-[#E20613] text-nowrap">
                                           {selection?.selectionnameEq}:&nbsp;
                                       </p>
                                       <p className="text-3xl font-bold quota">{selection?.quota}</p>
                                   </div>
                               ))}
                           </div>
                       </TrapezoidBox>
                   </div>
                    <div className={'flex items-center justify-center gap-2 w-full'}>
                       <TrapezoidBox variant={'dark-red'} className={'w-2/6 px-2 py-2 flex items-center justify-center h-full'}>
                           <p className={'text-white text-xl font-bold text-center line-clamp-1'}>{market2.markets.marketEq}</p>
                       </TrapezoidBox>
                       <TrapezoidBox  className={'w-4/6 px-2 py-2'}>
                           <div className="px-6 flex items-center justify-center w-full">
                               {market2?.selections?.map((selection, index) => (
                                   <div
                                       key={index}
                                       className="flex-1 px-1 text-center flex items-center justify-center"
                                   >
                                       <p className="text-lg font-bold text-[#E20613] text-nowrap">
                                           {selection?.selectionnameEq}:&nbsp;
                                       </p>
                                       <p className="text-3xl font-bold quota">{selection?.quota}</p>
                                   </div>
                               ))}
                           </div>
                       </TrapezoidBox>
                   </div>
                </div>
            </div>
        </div>
    )
})

OtherMarkets.displayName = 'OtherMarkets'