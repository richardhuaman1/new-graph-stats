import type { Metadata } from 'next'
import AspektaFont from '@/fonts/aspekta.fonts'
import '../taildwind.global.css'
import { FULL_HEIGHT } from '@/config'
import { Providers } from "@/components/providers";
import { AppBackground } from "@/components/app-background";


export const metadata: Metadata = {
    title: 'Apuesta total',
    description: 'Web Graph Stats'
}

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang='es'>
            <body className={`${AspektaFont.className} antialiased`}>
            <Providers>
                    <div
                        style={{ minHeight: `${FULL_HEIGHT}` }}
                        className='relative flex items-center justify-center flex-col'
                    >
                            <AppBackground />
                            {children}
                    </div>
            </Providers>
            </body>
        </html>
    )
}
