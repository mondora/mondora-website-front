import { primary, black, white, secondary, darkGray } from "./colors";

export const theme = {
    colors: {
        background: {
            white: white.toString(),
            grey: black.alpha(0.04).toString(),
            black: black.toString(),
            darkGray: darkGray.toString()
        },
        borders: {
            grey: black.alpha(0.08).toString()
        },
        primary: primary.toString(),
        secondary: secondary.toString(),
        accent: black.toString(),
        text: {
            header: black.toString(),
            primary: black.alpha(0.04).toString(),
            contrast: white.toString()
        }
    },
    size: {
        text: { subtle: "0.8em", mega: "64px" }
    },
    spacing: {
        unit: 8
    }
};
