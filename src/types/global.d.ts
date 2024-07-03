export {};
declare global {
  type CustomPath2D = {
    path2D: Path2D;
    rgba: RGBA;
    colorPaletteIndex: number;
  };

  type RGBA = {
    r: number;
    g: number;
    b: number;
    a: number;
  };
}
