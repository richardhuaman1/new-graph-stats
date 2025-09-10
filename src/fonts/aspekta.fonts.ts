import localFont from 'next/font/local'
const AspektaFont = localFont({
    src: [
        {
            path: './Gobold-Bold.otf',
            style: 'normal'
        },
    ],
    variable: '--font-sans'
})

export default AspektaFont
