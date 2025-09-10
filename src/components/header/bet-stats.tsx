import { Selection } from "@/types";

type BetStatsProps = {
    selections: Selection[]
}

export function BetStats({selections = []}:BetStatsProps) {
    return (
        <div
            className="bg-gradient-to-t from-[#FFD700] to-[#F59D06] flex items-center justify-center w-[58rem] rounded-br-full rounded-bl-full h-[62px] z-10">
            <div className="w-2/6 px-8 text-center flex items-center justify-center">
                <p className={'text-4xl font-bold text-[#1E1D1B]'}>{selections[0]?.selectionnameEq}:&nbsp;</p>
                <p className={'text-5xl font-bold quota'}>{selections[0]?.quota}</p>
            </div>
            <span className="text-5xl font-extrabold">/</span>
            <div className="w-2/6 px-8 text-center flex items-center justify-center">
                <p className={'text-4xl font-bold text-[#1E1D1B]'}>{selections[1]?.selectionnameEq}:&nbsp;</p>
                <p className={'text-5xl font-bold quota'}>{selections[1]?.quota}</p>
            </div>
            <span className="text-5xl font-extrabold">/</span>
            <div className="w-2/6 px-8 text-center flex items-center justify-center">
                <p className={'text-4xl font-bold text-[#1E1D1B]'}>{selections[2]?.selectionnameEq}:&nbsp;</p>
                <p className={'text-5xl font-bold quota'}>{selections[2]?.quota}</p>
            </div>
        </div>
    )
}