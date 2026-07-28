/*
 * Fotos reais do Profundo, geradas por scripts/optimize-images.mjs a partir de
 * public/images/sections/<pasta>/*.{jpg,jpeg} (originais crus, não servidos).
 * width/height vêm do manifest.json gerado pelo script — usados como
 * atributos explícitos <img> pra evitar layout shift.
 */
const BASE = '/images/sections/optimized';

function makePhoto({ folder, slug, widths, width, height, alt, caption, objectPosition }) {
  const largest = widths[widths.length - 1];
  // A versão "full" (maior largura) fica de fora do srcSet da miniatura de
  // propósito: ela só é referenciada por `full`/`fullWebp`, carregados pelo
  // Lightbox sob demanda — assim a home nunca busca a versão em alta
  // resolução antes do usuário pedir pra expandir a foto.
  const thumbWidths = widths.length > 1 ? widths.slice(0, -1) : widths;
  const webpSrcSet = thumbWidths.map((w) => `${BASE}/${folder}/${slug}-w${w}.webp ${w}w`).join(', ');
  const jpgSrcSet = thumbWidths.map((w) => `${BASE}/${folder}/${slug}-w${w}.jpg ${w}w`).join(', ');
  const thumbLargest = thumbWidths[thumbWidths.length - 1];
  return {
    id: `${folder}/${slug}`,
    alt,
    caption,
    objectPosition,
    width,
    height,
    src: `${BASE}/${folder}/${slug}-w${thumbLargest}.jpg`,
    webpSrcSet,
    jpgSrcSet,
    full: `${BASE}/${folder}/${slug}-w${largest}.jpg`,
    fullWebp: `${BASE}/${folder}/${slug}-w${largest}.webp`,
  };
}

export const CULINARIA_PHOTOS = [
  makePhoto({ folder: 'cardapio', slug: 'img-8137', widths: [480, 800, 1200, 1600, 2000], width: 2048, height: 1365, alt: 'Chefs finalizando pratos no balcão do sushi bar' }),
  makePhoto({ folder: 'cardapio', slug: 'img-8141', widths: [480, 800, 1200, 1600, 2000], width: 2048, height: 1365, alt: 'Preparo autoral no balcão do Profundo' }),
  makePhoto({ folder: 'cardapio', slug: 'img-8143', widths: [480, 800, 1200, 1600, 2000], width: 2048, height: 1365, alt: 'Detalhe da montagem de um prato assinatura' }),
  makePhoto({ folder: 'cardapio', slug: 'img-1936', widths: [480, 800, 1200, 1600, 2000], width: 6000, height: 3368, alt: 'Chama sobre ostras em preparo na cozinha' }),
  makePhoto({ folder: 'cardapio', slug: 'img-8226', widths: [480, 800, 1200, 1600, 2000], width: 6000, height: 3368, alt: 'Prato de alta gastronomia do cardápio do Profundo' }),
  makePhoto({ folder: 'cardapio', slug: 'img-8285', widths: [480, 800, 1200, 1600, 1707], width: 1707, height: 2560, alt: 'Criação autoral que une técnica japonesa e brasa' }),
  makePhoto({ folder: 'cardapio', slug: 'img-8531', widths: [480, 800, 1200, 1600, 2000], width: 6000, height: 3368, alt: 'Prato finalizado pronto para servir' }),
  makePhoto({ folder: 'drinks', slug: 'img-1341', widths: [480, 800, 1150], width: 1150, height: 2048, alt: 'Taças de coquetelaria autoral no bar do Profundo', objectPosition: 'center 70%' }),
];

export const SOBRE_PHOTOS = [
  makePhoto({ folder: 'fachada-e-local', slug: 'img-8264', widths: [480, 800, 1200, 1600, 1707], width: 1707, height: 2560, alt: 'Letreiro Profundo iluminado na entrada do restaurante' }),
  makePhoto({ folder: 'detalhes', slug: 'img-0749', widths: [480, 800, 1179], width: 1179, height: 2096, alt: 'Instalação de peixes suspensos no teto do salão' }),
  makePhoto({ folder: 'fachada-e-local', slug: 'img-8237', widths: [480, 800, 1200, 1600, 1707], width: 1707, height: 2560, alt: 'Letreiro Profundo refletido na parede do salão' }),
  makePhoto({ folder: 'detalhes', slug: 'img-8274', widths: [480, 800, 1150], width: 1150, height: 2048, alt: 'Garçom estendendo guardanapo bordado Profundo sobre a mesa' }),
  makePhoto({ folder: 'fachada-e-local', slug: 'img-8265', widths: [480, 800, 1200, 1600, 1707], width: 1707, height: 2560, alt: 'Fachada externa do Profundo à noite, com toldos e área externa' }),
];

export const ATMOSFERA_PHOTOS = [
  makePhoto({ folder: 'fachada-e-local', slug: 'img-8200', widths: [480, 800, 1200, 1600, 1951], width: 1951, height: 1300, alt: 'Vista ampla do salão principal do Profundo', caption: 'Salão principal' }),
];

export const ATMOSFERA_DETAIL_PHOTOS = [
  makePhoto({ folder: 'detalhes', slug: 'img-8273', widths: [480, 800, 1200, 1600, 1707], width: 1707, height: 2560, alt: 'Mesa posta na varanda com cartão de drink autoral', caption: 'Detalhe · mesa' }),
  makePhoto({ folder: 'detalhes', slug: 'img-8291', widths: [480, 800, 1150], width: 1150, height: 2048, alt: 'Jogo de luzes azuis sobre a poltrona e os peixes do teto', caption: 'Detalhe · luz' }),
];

export const LOCALIZACAO_PHOTOS = [
  makePhoto({ folder: 'fachada-e-local', slug: 'img-8262', widths: [480, 800, 1200, 1600, 1707], width: 1707, height: 2560, alt: 'Fachada do Profundo à noite, com letreiro iluminado' }),
];
