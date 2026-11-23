// Cole aqui o link publico do video da Fase 7 (YouTube) quando ele for publicado.
export const PHASE_7_VIDEO_URL = "";

export function getPublicVideoUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

export const previousPitches = [
  {
    phase: 6,
    title: "Telas, UML e favoritos",
    description: "Identidade visual, diagrama de classes e favoritos da ONG.",
    url: "https://youtu.be/F3RnE1fJM8A",
  },
];
