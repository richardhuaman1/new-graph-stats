import {Score} from "@/components/header/score";
import {Logo} from "@/components/logo";
import { forwardRef } from "react";
import {BorderedLogo} from "@/components/BorderedLogo";

export const Header = forwardRef<HTMLDivElement>((props, ref) => {
    return (
        <div className={'h-full'}>
            <div className={'relative w-full'}>
                <div className={'flex items-center justify-center h-full'}>
                    <div ref={ref}>
                        <Score/>
                    </div>
                </div>
                {/*Logo*/}
                <div className={'absolute -top-2 right-0'}>
                    <BorderedLogo/>
                </div>
            </div>
        </div>
    )
})

Header.displayName = 'Header'