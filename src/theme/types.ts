// src/theme/types.ts
export interface ColorShade {
    main: string;
    light: string;
    dark: string;
    contrast: string;
  }
  
  export interface TextColors {
    primary: string;
    secondary: string;
    disabled: string;
    hint: string;
  }
  
  export interface Background {
    default: string;
    paper: string;
    dark: string;
  }
  
  export interface ThemeColors {
    primary: ColorShade;
    secondary: ColorShade;
    background: Background;
    text: TextColors;
    error: Omit<ColorShade, 'contrast'>;
    warning: Omit<ColorShade, 'contrast'>;
    success: Omit<ColorShade, 'contrast'>;
    grey: {
      [key: number]: string;
    };
  }
  
  export interface Typography {
    fontSize: number;
    fontWeight: string | number;
    lineHeight: number;
    textTransform?: string;
  }
  
  export interface ThemeTypography {
    h1: Typography;
    h2: Typography;
    h3: Typography;
    body1: Typography;
    body2: Typography;
    caption: Typography;
    button: Typography;
  }
  
  export interface ThemeSpacing {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  }
  
  export interface Theme {
    colors: ThemeColors;
    typography: ThemeTypography;
    spacing: ThemeSpacing;
  }