import { Theme } from "@emotion/react";
import {$COLOR_BLACK, $COLOR_WHITE} from "styles/variables";

export const lightTheme: Theme = {
  mode: {
    text: $COLOR_BLACK,
    background: $COLOR_WHITE,
  },
};

export const darkTheme: Theme = {
  mode: {
    text: $COLOR_WHITE,
    background: $COLOR_BLACK,
  },
};