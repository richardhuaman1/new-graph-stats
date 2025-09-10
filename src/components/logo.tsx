import {TrapezoidBox} from "@/components/trapezoid-box";
import {media} from "@/utilities/media";
import Image from "next/image";

export function Logo() {
    return (
        <TrapezoidBox className={'px-3 h-full'}>
            <Image src={media.LOGO} alt="Logo" className="object-contain" width={110} height={110}/>
        </TrapezoidBox>
    );
}