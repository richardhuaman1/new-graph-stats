import {media} from "@/utilities/media";
import Image from "next/image";

export function BorderedLogo() {
    return <Image src={media.LOGO_BORDERED} alt="Logo" className="object-contain" width={120} height={120}/>
}