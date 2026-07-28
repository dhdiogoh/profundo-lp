# Profundo — a jornada que o site conta

**Profundo by Sushi Ruy Barbosa** não é só um restaurante que serve comida japonesa com brasa e Amazônia — é uma experiência de mergulho, e o site foi construído pra ser sentido assim: você desce de seção em seção como quem desce da superfície até o fundo do mar, e sobe no fim levado pela correnteza de volta à luz.

Cada seção do site corresponde a uma profundidade diferente dessa descida. As ilustrações de animais marinhos que acompanham o scroll — polvo, camarão, ostra, lagosta, lula, siri, cavalo-marinho, estrela-do-mar, água-viva, baleia, peixe — não são decoração aleatória: o traço e a paleta remetem diretamente ao estampado do uniforme da equipe (o lenço azul com conchas, estrelas-do-mar e corais que os chefs usam no balcão), trazendo pro digital a mesma identidade visual que o cliente encontra na loja física.

---

## 🫧 A superfície — Preloader

Antes de qualquer coisa, uma água-viva pulsa sozinha sobre um fundo claro, com o rótulo **"Mergulhando"**. É o momento de suspensão — o convés do barco antes do salto. O scroll fica travado aqui: ninguém desce antes da hora. Quando o vídeo do Hero e as fontes terminam de carregar (com um mínimo de 2s de palco e um teto de segurança de 6s pra conexões ruins), a água-viva sobe e sai de cena, e a superfície se abre.

## 🌊 Hero — o mergulho

Um vídeo em loop contínuo (com crossfade entre dois players pra nunca repetir o corte) mostra a água como ela é vista de baixo pra cima: raios de luz atravessando o azul profundo, rochedos ao fundo. É aqui que o nome ganha corpo — **PROFUNDO**, com a assinatura do chef logo abaixo, como se estivesse gravada na própria água.

## 🪸 Sobre — o manifesto

**"15 anos criando tendências."** Esta é a seção da história — texto à esquerda, um carrossel de fotos reais do salão e da fachada à direita, passando sozinho a cada 5 segundos (mas parando assim que alguém interage, ou passa o mouse por cima, ou a seção sai da tela). No meio da leitura, uma estrela-do-mar nasce pequena ao lado do título e, conforme o scroll avança, ela cresce, brilha e migra pro fundo da tela — um selo que atravessa a página junto com quem lê, carregando o brasão da casa mar adentro.

## 🔥 Momento Tipográfico — água e fogo

Uma seção inteira que existe só pra uma frase se formar palavra por palavra, presa na tela enquanto o scroll avança por trás dela: **"Nasce entre água e fogo."** — com "água" acendendo em ciano e "fogo" em brasa laranja no instante certo. Bolhas sobem devagar ao fundo, um peixe e um cavalo-marinho nadam nas bordas. É a tese do restaurante dita em uma linha: a técnica japonesa (água, precisão, corte) encontrando a brasa amazônica (fogo, fumaça, ingrediente).

## 🦪 Assinatura Culinária — "Japão. Amazônia. Brasa."

O prato entra em cena. Um carrossel real de fotos de cozinha — ostras maçaricadas, pratos sendo finalizados no balcão, coquetelaria autoral — ao lado do convite pra ver o cardápio completo (que abre num modal com o cardápio ao vivo, sem sair da página). Polvo, camarão, ostra e estrela-do-mar nadam como marca-d'água atrás do texto, os mesmos bichos que inspiram o print do uniforme de quem prepara a comida ali dentro.

## 🍽️ Menus — "Escolha sua profundidade."

Quatro cartões, quatro formas de mergulhar: o executivo do almoço, o "Entre Marés" do early dinner, o à la carte "Menu Profundo" e o balcão de sushi. O nome do menu do meio não é acaso — **Entre Marés** é literalmente a seção que fica entre o almoço e o jantar cheio, a maré que muda.

## 💡 Atmosfera — "Cada canto, pensado para o encantamento."

O salão principal ocupa o lado esquerdo em uma foto só, alta, com leve parallax no scroll. Do lado direito, um segundo carrossel alterna entre dois "detalhes" — a mesa posta e o jogo de luz azul sobre a poltrona, onde os peixes suspensos no teto (a instalação autoral da casa) projetam sombra. É a seção mais silenciosa do site: quase não tem texto, porque o ambiente fala sozinho.

## 🌊 Divisor de onda

Uma onda de SVG desliza em loop infinito e suave, um tentáculo de polvo balança sozinho na quina — a transição física entre o escuro do restaurante à noite e o claro da seção seguinte. A página muda de maré aqui.

## 📍 Localização & Reserva

De volta à superfície, literalmente: a fachada real do Profundo, letreiro acesso à noite, e o caminho pra chegar até lá — endereço, estacionamento, e o botão de reserva.

## 🐋 Footer — o mar continua depois que a página acaba

O rodapé é o único lugar do site onde os bichos não são estáticos: uma baleia atravessa a tela lentamente da direita pra esquerda, dois peixes brancos seguem o mesmo sentido logo acima e abaixo dela, uma água-viva balança flutuando no canto. E no meio de todos eles, **um peixe azul nada sozinho na direção contrária** — da esquerda pra direita, contra a corrente de todo o resto.

Não é um bug de direção. É a assinatura do rodapé: enquanto o cardume inteiro segue a corrente, tem sempre um peixe indo pro outro lado — do jeito que um restaurante que junta sushi, brasa e Amazônia também vai contra a receita óbvia do que "devia" ser. O Profundo nada contra a maré. O site só deixou isso literal.

---

## Sobre esta versão

Site construído em **React + Vite**, com **GSAP/ScrollTrigger** para as animações de scroll, **Lenis** para o scroll suave, **Tailwind** para o design system, e um carrossel/lightbox compartilhados (`Carousel.jsx`, `Lightbox.jsx`) reaproveitados em todas as seções com fotos reais do restaurante. Imagens otimizadas em WebP + JPEG responsivo via `scripts/optimize-images.mjs` (Sharp), preparado para deploy na Vercel via `vercel.json`.
