import { Theme } from "@emotion/react";
import {
  $BACKGROUND_COLOR_EXTRA_BLACK, $BACKGROUND_COLOR_LIGHT_BLACK,
  $BACKGROUND_COLOR_MEDIUM_BLACK,
  $COLOR_BLACK, $COLOR_GRAY,
  $COLOR_WHITE
} from "styles/variables";

export const lightTheme: Theme = {
  mode: {
    text: $COLOR_BLACK,
    background: $COLOR_WHITE,
    inputBackground: $BACKGROUND_COLOR_EXTRA_BLACK,
    inputColor: $COLOR_WHITE,
    boxBackground: $BACKGROUND_COLOR_LIGHT_BLACK,
  },
};

export const darkTheme: Theme = {
  mode: {
    text: $COLOR_WHITE,
    background: $BACKGROUND_COLOR_MEDIUM_BLACK,
    inputBackground: $BACKGROUND_COLOR_EXTRA_BLACK,
    inputColor: $COLOR_WHITE,
    boxBackground: $BACKGROUND_COLOR_LIGHT_BLACK,
    inputPlaceHolderColor: $COLOR_GRAY,
  },
};