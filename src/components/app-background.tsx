import ReactPlayer from "react-player";
import {media} from "@/utilities/media";

export function AppBackground() {
    return (
        <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
            <ReactPlayer
                src={media.VIDEO_BACKGROUND}
                playing={true}
                loop={true}
                muted={true}
                width="100%"
                height="100%"
                style={{objectFit: "cover"}}
            />
            {/*<div className="absolute inset-0 bg-black/20"/>*/}
        </div>
    )
}