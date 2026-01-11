
export interface FrameConfig {
  frameCount: number;
  baseUrl: string;
}

export interface OverlayStep {
  title: string;
  subtitle?: string;
  alignment: 'left' | 'right' | 'center';
  startScroll: number; // Percent 0-1
  endScroll: number;   // Percent 0-1
}
