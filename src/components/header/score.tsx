import {BetStats} from "@/components/header/bet-stats";
import {GraphStatsStore} from "@/stores/graph-stats.store";

export function Score() {
    const {markets, selections} = GraphStatsStore.useGetScore();

    return (
        <div className={'w-full flex items-center justify-center flex-col'}>
            <div
                className={'relative bg-gradient-to-t from-[#070809] to-[#7F7E80] flex items-center justify-center w-[68rem] rounded-lg h-[5rem] overflow-hidden'}>
                <div
                    className={'text-white text-4xl font-extrabold transform scale-y-120  w-5/12 flex items-center justify-center px-6'}>
                    {''}
                </div>
                <div
                    className={'bg-gradient-to-t from-[#ECEBEC] to-[#CECCCE] text-6xl font-extrabold h-full flex items-center justify-center px-6 pt-2 rounded-sm w-2/12 mb-5 text-[#313237]'}>{markets.marketname}
                </div>
                <div
                    className={'text-white text-4xl font-extrabold transform scale-y-120 r w-5/12 flex items-center justify-center px-6'}>
                    {''}
                </div>
            </div>
            <div className={'bg-gradient-to-r from-[#76080e] to-[#68050e] text-white py-1.5 text-2xl w-[58rem] text-center'}>RESULTADO DEL PARTIDO</div>
            {/*Bet Stats */}
            <BetStats selections={selections}/>
        </div>
    )
}
