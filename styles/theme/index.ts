import { Theme } from "@emotion/react";
import {
  $BACKGROUND_COLOR_BLACK,
  $BACKGROUND_COLOR_EXTRA_BLACK,
  $BACKGROUND_COLOR_EXTRA_WHITE,
  $BACKGROUND_COLOR_LIGHT_BLACK,
  $BACKGROUND_COLOR_LIGHT_BLACK_HOVER,
  $BACKGROUND_COLOR_MEDIUM_BLACK, $BACKGROUND_COLOR_MEDIUM_WHITE,
  $BACKGROUND_COLOR_WHITE,
  $COLOR_BLACK,
  $COLOR_GRAY, $COLOR_MAIN,
  $COLOR_WHITE
} from "styles/variables";

export const lightTheme: Theme = {
  mode: {
    text: $COLOR_BLACK,
    background: $BACKGROUND_COLOR_EXTRA_WHITE,
    inputBackground: $BACKGROUND_COLOR_WHITE,
    inputColor: $BACKGROUND_COLOR_EXTRA_BLACK,
    boxBackground: $BACKGROUND_COLOR_LIGHT_BLACK,
    inputPlaceHolderColor: $COLOR_GRAY,
    whiteButtonBackground: $BACKGROUND_COLOR_EXTRA_WHITE,
    whiteButtonBorder: `solid 1px rgba(0, 0, 0, 0.06)`,
    whiteButtonHover: $BACKGROUND_COLOR_WHITE,
    headerBackground: $BACKGROUND_COLOR_EXTRA_WHITE,
    headerBorder: `solid 1px rgba(0, 0, 0, 0.06)`,
    mobileMenuBackground: $BACKGROUND_COLOR_EXTRA_WHITE,
    mobileMenuHeaderBackground: $BACKGROUND_COLOR_WHITE,
    mobileMenuHeaderBorder: `solid 1px rgba(0, 0, 0, 0.06)`,
    mobileMenuUlBackground: $BACKGROUND_COLOR_WHITE,
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
    whiteButtonBackground: $BACKGROUND_COLOR_LIGHT_BLACK,
    whiteButtonBorder: "none",
    whiteButtonHover: $BACKGROUND_COLOR_LIGHT_BLACK_HOVER,
    headerBackground: $BACKGROUND_COLOR_BLACK,
    headerBorder: `none`,
    mobileMenuBackground: $BACKGROUND_COLOR_MEDIUM_BLACK,
    mobileMenuHeaderBackground: $BACKGROUND_COLOR_EXTRA_BLACK,
    mobileMenuHeaderBorder: `none`,
    mobileMenuUlBackground: $BACKGROUND_COLOR_BLACK,
  },
};