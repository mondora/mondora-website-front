import { primary, black, white, secondary } from "./colors";

export const theme = {
    colors: {
        background: {
            white: white.toString(),
            grey: black.alpha(0.04).toString(),
            black: black.toString()
        },
        borders: {
            grey: black.alpha(0.08).toString()
        },
        primary: primary.toString(),
        secondary: secondary.toString(),
        accent: black.toString()
    },
    spacing: {
        unit: 8
    }
};
