import {Logo} from "@/components/logo";
import {TrapezoidBox} from "@/components/trapezoid-box";
import {StringUtils} from "@/utilities/string";

export function Footer() {
    return (
        <div className="h-full">
            <div className="h-full w-full flex items-end justify-center">
                <div className="w-[70%] flex items-stretch justify-start h-full gap-2">
                    {/* Logo */}
                    <div className="flex-none flex items-center h-full">
                        <Logo />
                    </div>
                    {/* Comments */}
                    <div className="flex items-center justify-center flex-col">
                        <TrapezoidBox variant={'red'} className={'py-2 w-full ml-6 flex items-center justify-center'}>
                            <p className={'line-clamp-1 flex font-bold text-2xl'}>{StringUtils.truncate('JUAN RODRIGUEZ')}</p>
                        </TrapezoidBox>
                        <TrapezoidBox variant={'white'} className={'flex items-center justify-center'}>
                            <div
                                className={'flex items-center justify-center '}>
                                <p className={'line-clamp-2 font-bold text-2xl'}>Lorem Ipsum
                                    is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                                    been the
                                    some
                                    industry's standard dummy text ever since the 1500s, when an unknown printer
                                    took.</p>
                                <div className={'w-xs h-full'}></div>
                            </div>
                        </TrapezoidBox>
                    </div>
                </div>
                {/* Nations League */}
                <div className="w-[30%] flex items-end justify-end flex-col">
                    <div className="flex items-center justify-start flex-col overflow-hidden w-full max-w-[400px]">
                        <div
                            className={'bg-[#FF0000] w-[85%] py-2 items-center justify-center flex font-bold text-2xl text-white text-center px-4'}>
                            <p className={'line-clamp-1'}>Vuelta</p>
                        </div>
                        <div
                            className={'w-full bg-white flex items-center justify-center py-2.5 font-bold text-2xl text-center px-6'}>
                            <p className={'line-clamp-1'}>Liga de Campeones</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}