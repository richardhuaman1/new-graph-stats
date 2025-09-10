import {media} from "@/utilities/media";
import Image from "next/image";

export function TV() {
    return (
        <div className="relative mx-auto rounded-4xl border-4 border-[#FFF500] overflow-hidden max-w-[33rem] w-full">
            <Image
                src={media.TV_BACKGROUND}
                alt="TV"
                width={1920}
                height={1080}
                className="block rounded-4xl w-full h-auto"
                priority
            />
        </div>
    )
}