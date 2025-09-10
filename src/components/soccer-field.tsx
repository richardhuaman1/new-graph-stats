import {media} from "@/utilities/media";
import Image from "next/image";

export function SoccerField() {
    return (
        <Image
            src={media.SOCCER_FIELD}
            alt="Soccer Field"
            fill
            className="object-fill -ml-8"
            priority
        />
    )
}