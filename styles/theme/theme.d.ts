import '@emotion/react';
import {$BACKGROUND_COLOR_EXTRA_BLACK, $COLOR_WHITE} from "styles/variables";

declare module '@emotion/react' {
  export interface Theme {
    mode: {
      [key: string]: string;
    };
  }
}