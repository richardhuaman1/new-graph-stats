import Image from "next/image";

export function Loader() {
    return (
        <div className="flex items-center justify-center h-full w-full">
            <Image
                src="/icons/loader.svg"
                alt="Cargando..."
                width={60}
                height={60}
                priority
            />
        </div>
    );
}