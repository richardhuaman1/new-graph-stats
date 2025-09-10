export const FULL_HEIGHT = `100vh`
export const HEADER_HEIGHT = 265
export const FOOTER_HEIGHT = 215

export const sizes = {
    HEADER: `${HEADER_HEIGHT}px`,
    MAIN: `calc(${FULL_HEIGHT} - ${HEADER_HEIGHT + FOOTER_HEIGHT}px)`,
    FOOTER: `${FOOTER_HEIGHT}px`,
}

export const SCORE_TEAM_MAX_LENGTH = 15
export const REQUEST_TIMEOUT = 10000;
export const INTERVAL_REFETCH= 60000