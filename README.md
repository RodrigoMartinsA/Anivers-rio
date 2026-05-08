# 🎂 Experiência de Aniversário Cinematográfica

Um mini-filme interativo e romântico para celebrar aniversários. Totalmente responsivo, bonito e emocional!

---

## 📋 Estrutura do Projeto

```
├── index.html        # Estrutura HTML (não alterar exceto músicas/textos)
├── style.css         # Estilos e animações
├── script.js         # Lógica JavaScript
└── README.md         # Este arquivo
```

---

## 🎨 COMO CUSTOMIZAR

### 1️⃣ TROCAR A MÚSICA DO YOUTUBE

**Arquivo:** `script.js`

Procure por esta seção (linhas 1-20):

```javascript
const CONFIG = {
    // Música do YouTube - ALTERE AQUI O SEU LINK
    youtubeVideoId: 'dQw4w9WgXcQ', // ← MUDE ESTE VALOR
```

**Como fazer:**

1. Abra um vídeo do YouTube que quer usar
2. Copie o ID da URL (exemplo: `https://www.youtube.com/watch?v=dQw4w9WgXcQ` → ID é `dQw4w9WgXcQ`)
3. Cole o ID dentro das aspas simples, substituindo o atual
4. Salve o arquivo

**Exemplo:**
```javascript
youtubeVideoId: 'jNQXAC9IVRw', // Video popular
```

---

### 2️⃣ TROCAR TEXTOS DA CARTA

**Arquivo:** `script.js`

Procure por esta seção (linhas ~17-20):

```javascript
const CONFIG = {
    // ...
    letterTitle: 'Feliz Aniversário!',
    letterMessage: 'Neste dia especial...',
    letterSignature: 'Com todo meu amor,',
```

**Customize:**

- `letterTitle`: Título principal (ex: "Feliz Aniversário, Maria!")
- `letterMessage`: Mensagem longa (pode ter quebras de linha com `\n`)
- `letterSignature`: Assinatura final (ex: "Com amor, João")

**Exemplo:**
```javascript
letterTitle: 'Feliz Aniversário, Amor! 💕',
letterMessage: 'Este dia é tão especial quanto você.\n\nDurante todos esses anos...',
letterSignature: 'Para sempre seu,\nJoão ❤️',
```

---

### 3️⃣ TROCAR CORES

**Arquivo:** `script.js`

Procure por esta seção (linhas ~25-33):

```javascript
colors: {
    pink: '#FFB6D9',        // Rosa principal
    darkPink: '#FF69B4',    // Rosa escuro
    lightPink: '#FFE4F1',   // Rosa claro
    beige: '#F5E6D3',       // Bege
    gold: '#E6C9A0',        // Ouro suave
    cream: '#FFF8F0',       // Creme
    heartRed: '#FF6B9D',    // Vermelho dos corações
},
```

**Ou via CSS:**

**Arquivo:** `style.css` (primeiras 20 linhas)

```css
:root {
    --primary-pink: #FFB6D9;
    --dark-pink: #FF69B4;
    --light-pink: #FFE4F1;
    --warm-beige: #F5E6D3;
    --soft-gold: #E6C9A0;
    --cream: #FFF8F0;
    --heart-red: #FF6B9D;
}
```

**Sugestões de paletas:**

🌅 **Sunset Quente:**
```
pink: '#FF9A76'
darkPink: '#FF6B6B'
beige: '#FFD4A3'
gold: '#FFA94D'
```

🌙 **Noite Roxa:**
```
pink: '#D4A5FF'
darkPink: '#9D5AFF'
beige: '#E8D5F2'
gold: '#C9B1FF'
```

💙 **Azul Sereno:**
```
pink: '#A8D8FF'
darkPink: '#5BA3FF'
beige: '#E3F2FD'
gold: '#90CAF9'
```

---

### 4️⃣ AJUSTAR DURAÇÕES DAS CENAS

**Arquivo:** `script.js` (linhas ~34-38)

```javascript
sceneTimers: {
    scene1Duration: 15000,      // Duração da Cena 1 (15 segundos)
    transitionDuration: 1200,   // Duração da transição (1.2 segundos)
}
```

**Valores em milissegundos:**
- 1000 = 1 segundo
- 5000 = 5 segundos
- 15000 = 15 segundos

---

### 5️⃣ PERSONALIZAR FONTES

**Arquivo:** `style.css`

Procure por:
```css
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
```

**Sugestões de fontes bonitas:**

```css
/* Romántico elegante */
font-family: 'Georgia', 'Garamond', serif;

/* Moderno suave */
font-family: 'Poppins', 'Quicksand', sans-serif;

/* Artístico */
font-family: 'Brush Script MT', cursive;
```

Para usar fontes do Google Fonts, adicione no `<head>` do HTML:
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
```

E no CSS:
```css
body {
    font-family: 'Playfair Display', serif;
}
```

---

## 🎬 COMO FUNCIONA CADA CENA

### 🎉 **CENA 1 - Animação Inicial (15s)**

- Fade in suave
- Mesa, bolo rosa, pessoas batendo parabéns
- Velas piscando
- Balões flutuando
- Partículas brilhantes
- Música do YouTube (se permitir autoplay)
- Transição suave para Cena 2

**Customizáveis em:** `startScene1()` e funções de desenho no `script.js`

---

### 🎁 **CENA 2 - Presente Interativo**

- Caixa de presente rosa com laço
- **Desktop:** Arrastar com mouse
- **Mobile:** Deslizar o dedo
- Ao abrir: Partículas mágicas saem
- Transição suave para Cena 3

**Customizáveis em:** `startScene2()` no `script.js`

---

### 💌 **CENA 3 - Carta Romântica**

- Carta elegante com textura
- Animação de aparecimento suave
- Corações flutuando
- Textos personalizáveis
- Fundo desfocado delicado

**Customizáveis em:** CONFIG no `script.js` e `.letter-paper` no `style.css`

---

## 📱 RESPONSIVIDADE

Está 100% responsivo para:

- 📱 iPhone, iPad, Android
- 💻 Desktops e laptops
- 🖥️ Tablets

As animações se adaptam automaticamente ao tamanho da tela.

---

## ⌨️ DICAS DE DESENVOLVIMENTO

### Debug Mode

Pressione **ESC** para pular para a próxima cena (durante desenvolvimento)

### Ver Console

Abra o F12 do navegador e vá em **Console** para ver logs amigáveis:

```
🎂 Experiência de Aniversário Carregada!
```

### Modificar Duração das Cenas

Altere `scene1Duration` em `script.js` para testar mais rápido:

```javascript
scene1Duration: 3000, // Apenas 3 segundos para testes
```

---

## 🎨 SUGESTÕES CRIATIVAS

### Adicionar Fotos

Quero adicionar suporte a fotos? Envie um Pull Request ou customize manualmente adicionando:

```javascript
// Na Cena 3, dentro de startScene3()
const photo = new Image();
photo.src = 'seu-arquivo.jpg';
// ... código para desenhar a foto
```

### Diferentes Temas

- **Tema Azul (Mar):** Use tons de azul e verde
- **Tema Quente (Fogo):** Use vermelho, laranja, amarelo
- **Tema Roxo (Noite):** Use roxo, lilás, prata

### Som/Efeitos Adicionais

Adicione sons de efeitos (sem autoplay):

```javascript
const sound = new Audio('som.mp3');
sound.play(); // Depois de um clique do usuário
```

---

## 🐛 PROBLEMAS COMUNS

### Música não toca no celular

**Solução:** Toque no botão "🎵 Toque para iniciar a experiência" que aparecerá

### Canvas fica borrado em alta DPI

**Solução:** Já está otimizado automaticamente! Se precisar, altere em `resizeCanvas()`:

```javascript
canvas.width = window.innerWidth * window.devicePixelRatio;
```

### Animações muito rápidas/lentas

Altere os tempos em `CONFIG.sceneTimers` no `script.js`

---

## 📄 LICENÇA

Este projeto é livre para usar, modificar e compartilhar. Use com muito ❤️!

---

## 💡 IDEIAS FUTURAS

- [ ] Adicionar mais cenas interativas
- [ ] Suporte a fotos personalizadas
- [ ] Modo escuro
- [ ] Múltiplos idiomas
- [ ] Efeitos sonoros
- [ ] Compartilhamento em redes sociais

---

## 🎯 CHECKLIST PARA USAR

- [ ] Trocar URL do YouTube em `script.js`
- [ ] Editar título, mensagem e assinatura da carta em `script.js`
- [ ] (Opcional) Personalizar cores em `script.js` ou `style.css`
- [ ] (Opcional) Ajustar durações das cenas
- [ ] Abrir `index.html` no navegador
- [ ] Testar em desktop e mobile
- [ ] 🎉 Compartilhar a experiência!

---

## 📞 SUPORTE

Se encontrar algum problema:

1. Verifique se todos os arquivos estão na mesma pasta
2. Abra o navegador e pressione F12 para ver erros
3. Teste em outro navegador (Chrome, Firefox, Safari)

---

**Feito com ❤️ para tornar aniversários mais especiais**

*Versão 1.0 - Maio 2026*
