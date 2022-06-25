const CARDS = [
  {
    number: 0x00,
    link: "https://outras.ml/algotypes/prng/",
    name: {
      en: "Pseudo-Random Number Generator",
      pt: "Gerador de Números Pseudoaleatórios",
    },
    algorithm: {
      en: "Algorithms used to generate random number sequences try to overcome the fact that computers are deterministic and predictable devices by generating a stream of evenly distributed numbers whose order is difficult to predict.",
      pt: "Algoritmos usados para gerar sequências de números aleatórios tentam superar o fato de que computadores são dispositivos determinísticos gerando um fluxo de números uniformemente distribuídos cuja ordem é difícil de prever.",
    },
    message: {
      en: "Beginning of a journey. Every outcome is equally likely. But there is method to your madness.",
      pt: "Essa carta simboliza o início de uma jornada. Cada possibilidade é igualmente provável. Mas existe um método para a sua loucura.",
    },
  },
  {
    number: 0x01,
    link: "https://outras.ml/algotypes/fft/",
    name: {
      en: "Fast Fourier Transform",
      pt: "Transformação Rápida de Fourier",
    },
    algorithm: {
      en: "The Fast Fourier Transform is an algorithm used to navigate between two representations of the same information: one that shows when certain things happen and another that expresses how often.",
      pt: "A Transformação Rápida de Fourier é um algoritmo usado para navegar entre duas representações da mesma informação: uma que mostra quando certas coisas acontecem e outra que expressa com que frequência.",
    },
    message: {
      en: "Transformation between two realms. Creativity as material resource. Bring your own practical knowledge, tools and rituals.",
      pt: "De forma mais ampla, esta carta representa uma transformação entre dois universos. Use sua criatividade como um recurso material e crie suas próprias práticas, ferramentas e rituais.",
    },
  },
  {
    number: 0x02,
    link: "https://outras.ml/algotypes/eigenvalue/",
    name: {
      en: "PageRank",
      pt: "PageRank",
    },
    algorithm: {
      en: "PageRank is the link analysis algorithm used by Google to rank pages in search results. It is a way of measuring the relevance of a website by counting the quantity and quality of links that point to it.",
      pt: "PageRank é o algoritmo de análise de links usado pelo Google para classificar as páginas nos resultados de pesquisa. É uma forma de medir a relevância de um website contando a quantidade e a qualidade dos links apontados para ele.",
    },
    message: {
      en: "Inner knowledge and intuition. A way into the divine subconscious mind. Not all silence bears secrets.",
      pt: "No plano humano, esse algoritmo fala do conhecimento interno e intuição. Um caminho para a mente subconsciente divina. Nem todo silêncio contém segredos.",
    },
  },
  {
    number: 0x03,
    link: "https://outras.ml/algotypes/reaction-diffusion/",
    name: {
      en: "Reaction-Diffusion",
      pt: "Reação-Difusão",
    },
    algorithm: {
      en: "The reaction-diffusion algorithm proposed by Alan Turing to model two-component chemical reactions can also be used to describe different dynamic processes found in nature and generate physical and visual patterns that are uniform but not perfectly repeatable.",
      pt: "O algoritmo de reação-difusão proposto por Alan Turing originalmente para descrever reações químicas entre duas substâncias também pode ser usado para modelar outros processos dinâmicos encontrados na natureza e gerar padrões visuais periódicos que não são perfeitamente simétricos ou repetitivos.",
    },
    message: {
      en: "You can have both nature AND nurture in beautiful abundance. Just don't waste your time looking for something that isn't there. Movement doesn't equal progress.",
      pt: "Essa carta mostra que podemos desfrutar da junção entre natureza e cultura. Só não perca seu tempo procurando por algo que não existe. Movimento não é a mesma coisa que progresso.",
    },
  },
  {
    number: 0x04,
    link: "https://outras.ml/algotypes/pruning/",
    name: {
      en: "Alpha-Beta Pruning",
      pt: "Poda Alfa-Beta",
    },
    algorithm: {
      en: "Alpha-Beta Pruning is an algorithm used in computer games to choose the optimal move for a player. It optimizes the process of enumerating all possible moves by removing (pruning) all the moves that are not optimal or won't have an effect on the final outcome of a game.",
      pt: "A Poda Alfa-Beta é um algoritmo usado em programas de jogos para escolher o lance ideal. Ele otimiza o processo de listagem de todos os movimentos possíveis, removendo todos aqueles que não são ideais ou não resultarão no resultado desejado ao final do jogo.",
    },
    message: {
      en: "Consider all your possibilities before clearing up space for new beginnings. Be aware of rules, patterns and time restrictions related to your ventures.",
      pt: "Essa carta pede para você considerar todas as possibilidades de ação antes de investir em recomeços. Esteja ciente das regras, padrões e restrições relacionadas aos seus empreendimentos.",
    },
  },
  {
    number: 0x05,
    link: "https://outras.ml/algotypes/quicksort/",
    name: {
      en: "Quicksort",
      pt: "Quicksort",
    },
    algorithm: {
      en: "Quicksort is a divide-and-conquer algorithm that works by partitioning the elements to be sorted into two sets, and then recursively sorting each of the two subsets.",
      pt: "Quicksort é um algoritmo que funciona recursivamente, dividindo os elementos a serem ordenados em dois conjuntos e, em seguida, organizando separadamente cada um dos dois subconjuntos.",
    },
    message: {
      en: "Material preoccupation with law and order. Don't inflate your ego with righteousness by ignoring social and community matters.",
      pt: "Essa carta simboliza uma preocupação material com regras e ordem. Não polua seu ego com retidão e superioridade, ignorando questões sociais e comunitárias.",
    },
  },
  {
    number: 0x06,
    link: "https://outras.ml/algotypes/gcd/",
    name: {
      en: "Greatest Common Divisor",
      pt: "Máximo Divisor Comum",
    },
    algorithm: {
      en: "An algorithm for calculating the greatest common divisor (GCD) of two numbers was first described by Euclid around 300 BC and is one of the earliest examples of an algorithm: a step-by-step procedure for performing a calculation according to well-defined rules.",
      pt: "Um algoritmo para encontrar o máximo divisor comum (MDC) de dois números foi descrito por Euclides por volta de 300 aC e é um dos primeiros exemplos de uma descrição de um procedimento para realizar um cálculo de acordo com regras bem definidas.",
    },
    message: {
      en: "Choice doesn't have to mean abdication. Synthesize. Figure out a way to integrate both sides, or keep one for later.",
      pt: "Essa carta mostra que uma escolha não significa abdicação. Sintetize. Descubra uma maneira de integrar os dois lados ou guarde um para depois.",
    },
  },
  {
    number: 0x07,
    link: "https://outras.ml/algotypes/breath-depth/",
    name: {
      en: "Maze Search",
      pt: "Travessia de Grafos e Labirintos",
    },
    algorithm: {
      en: "Maze traversal algorithms generally utilize two types of search strategies: one that explores one path at a time, going as far as possible before backtracking, and another where it explores multiple paths at the same time by taking one step at a time in each possible direction.",
      pt: "Algoritmos de travessia utilizam duas estratégias de busca: uma que prioriza a busca por um caminho de cada vez, indo o mais longe possível antes de retroceder, e outra que explora vários caminhos ao mesmo tempo, dando um passo de cada vez em cada direção possível.",
    },
    message: {
      en: "One way to weather the storm is to step on the accelerator. Many decisions and actions are reversible. Don't be afraid of making mistakes and backtracking.",
      pt: "Essa carta indica que uma maneira de enfrentar à tempestade é pisando no acelerador. Muitas decisões e ações são reversíveis. Não tenha medo de cometer erros e retroceder.",
    },
  },
  {
    number: 0x08,
    link: "https://outras.ml/algotypes/splay/",
    name: {
      en: "Splay Trees",
      pt: "Árvore Splay",
    },
    algorithm: {
      en: "Splay Trees are dynamic structures for storing data where frequently accessed elements are even quicker to find during subsequent searches.",
      pt: "As Árvores Splay são estruturas dinâmicas de armanzenamento de dados onde os elementos acessados com frequência são ainda mais fáceis de encontrar.",
    },
    message: {
      en: "Action, reaction, cause and effect. There is a difference between equity and equality. There are many layers to be unpacked and balanced.",
      pt: "Essa carta simboliza processos de ação e reação, causa e efeito. Existe uma diferença entre equidade e igualdade. Existem muitas camadas a serem entendidas e equilibradas.",
    },
  },
  {
    number: 0x09,
    link: "https://outras.ml/algotypes/sha3-512/",
    name: {
      en: "SHA3-512",
      pt: "SHA3-512",
    },
    algorithm: {
      en: 'The SHA3-512 algorithm is a hash function: it transforms messages of arbitrary size into fixed-size "hashes" or "digests" through a one-way transformation that makes it practically impossible to recover the original message.',
      pt: 'O SHA3-512 é um algoritmo de "resumo": transforma mensagens de tamanho arbitrário em "resumos" de tamanho fixo através de uma transformação de mão única tornando impossível a recuperação da mensagem original.',
    },
    message: {
      en: "Some answers come from within. Being alone is not the same as being lonely. It is what it is, but what is it? There might only be room for one. Close the door.",
      pt: "Esse algoritmo indica que algumas respostas vêm de dentro. Solidão não é a mesma coisa que estar sozinha. Pode não haver espaço para maiores quantidades... Feche a porta.",
    },
  },
  {
    number: 0x0a,
    link: "https://outras.ml/algotypes/noise/",
    name: {
      en: "Perlin Noise",
      pt: "Ruído Perlin",
    },
    algorithm: {
      en: "Perlin Noise is a technique used to make computer-generated elements such as fire, smoke or clouds by imitating the controlled random appearance of patterns and textures found in nature.",
      pt: "O Ruído Perlin é uma técnica usada para criar elementos visuais como fogo, fumaça e nuvens imitando a aparência aleatória de elementos e texturas encontrados na natureza.",
    },
    message: {
      en: "Change is fundamental. All bad things end, and so do good things. It feels like you've been here before, but have you really?",
      pt: "Essa carta revela que a mudança é fundamental. Todas as coisas ruins acabam, mas as coisas boas também. Pode até parecer que você já esteve por aqui antes, mas preste atenção nos pequenos detalhes.",
    },
  },
  {
    number: 0x0b,
    link: "https://outras.ml/algotypes/annealing/",
    name: {
      en: "Travelling Salesperson",
      pt: "Caixeiro-Viajante",
    },
    algorithm: {
      en: "Algorithms that solve The Travelling Salesperson Problem either take an undetermined amount of time to find the best solution, or find a good solution within a fixed amount of time, but there is no efficient method that always finds the best possible solution.",
      pt: "Algoritmos que calculam a solução para O Caixeiro Viajante levam um tempo indeterminado para encontrar a melhor solução ou encontram uma boa solução dentro de um período de tempo fixo, mas não existe um método eficiente que sempre encontre a melhor solução possível.",
    },
    message: {
      en: "Self-control, temperance and discipline. Nurture over nature. Eventually all roads go the same way. You might not be able to bruteforce your way out.",
      pt: "Essa carta simboliza autocontrole, moderação e disciplina. Aprenda com a natureza. Eventualmente, todas as estradas levam ao mesmo lugar. Você não deve usar a força bruta para sair dessa.",
    },
  },
  {
    number: 0x0c,
    link: "https://outras.ml/algotypes/curves/",
    name: {
      en: "Hilbert Curves",
      pt: "Curva de Hilbert",
    },
    algorithm: {
      en: "The Hilbert-Curve is an algorithm for representing a multi-dimensional space as a one-dimensional space while preserving locality: points that are close in multi-dimensional space will remain close in one-dimensional space.",
      pt: "A Curva de Hilbert é um algoritmo usado para transformar um espaço multidimensional em um espaço unidimensional preservando localidade: pontos que estão próximos no espaço multidimensional permanecerão próximos no espaço unidimensional.",
    },
    message: {
      en: "Turn, turn, turn. Change direction. Learn to listen for new callings . Things are out of your control for now. Breathe. Take the ride. It's an opportunity to see things from a different perspective.",
      pt: "Essa carta nos apresenta à uma mudança de direção. Aprenda a ouvir novos chamados. As coisas estão fora de seu controle por enquanto. Respire. É uma oportunidade de ver as coisas de uma perspectiva diferente.",
    },
  },
  {
    number: 0x0d,
    link: "https://outras.ml/algotypes/sweep/",
    name: {
      en: "Mark & Sweep",
      pt: "Coletor Mark & Sweep",
    },
    algorithm: {
      en: "The Mark & Sweep algorithm is commonly used for automatic memory management. It's the part of a program that is responsible for cleaning up and releasing memory that is occupied by code that is no longer being used.",
      pt: "O algoritmo Mark & Sweep é usado para fazer gerenciamento automático de memória. É a parte de um programa responsável por limpar e liberar a memória ocupada por código que não está mais sendo usado.",
    },
    message: {
      en: "Everything being pruned away is recycled in the name of fertility. Cut the cords that link you to the past and head into the harvest. But, if you plant ice you're gonna harvest wind.",
      pt: "Esta carta representa novos começos. Tudo que é podado é reciclado em nome da fertilidade. Corte as amarras que te ligam ao passado e desfrute da abundância da colheita.",
    },
  },
  {
    number: 0x0e,
    link: "https://outras.ml/algotypes/exchange/",
    name: {
      en: "Diffie-Hellman Keys",
      pt: "Chaves Diffie-Hellman",
    },
    algorithm: {
      en: "Asymmetric cryptography is based on the idea that the password/key used to encrypt data can be made public, while the password/key used to decrypt data should be kept private. Encryption with a public key can only be undone by decrypting with its private key. The Diffie-Hellman key exchange is a method of creating and securely exchanging these cryptographic keys.",
      pt: "A criptografia assimétrica é baseada na ideia de que a senha usada para criptografar dados pode ser pública, enquanto a senha usada para descriptografar deve permanecer privada. Dados criptografados com uma chave pública só podem ser lidos usando sua chave privada. A troca de chaves Diffie-Hellman é um método seguro de criar e trocar chaves criptográficas em espaços públicos como a internet.",
    },
    message: {
      en: "Be prepared: make sure you have all the pieces before starting to solve the puzzle. It might mean waiting for the moment with patience and moderation.",
      pt: "Essa carta simboliza um tipo de alerta. Esteje preparado: verifique todas as peças antes de começar a montar o quebra-cabeça. Isso pode significar um momento de espera com paciência e moderação.",
    },
  },
  {
    number: 0x0f,
    link: "https://outras.ml/algotypes/compression/",
    name: {
      en: "JPEG Compression",
      pt: "Compressão JPEG",
    },
    algorithm: {
      en: "The JPEG compression algorithm exploits physiological properties of human vision to reduce the size of digital image files by decreasing color information and high-frequency content and progressively transforming, downsampling and compressing sections of an image.",
      pt: "O algoritmo de compressão JPEG explora propriedades fisiológicas da visão humana para diminuir o tamanho de arquivos de imagem. Comprime imagens por partes, diminuindo a informação sobre a intensidade das cores e ignorando conteúdo de alta frequência.",
    },
    message: {
      en: "Bring out your inner fears and desires. Don't be subtle. They aren't as numerous or complicated as you think.",
      pt: "Esta carta pede para você revelar seus medos e desejos internos. Não seja sutil, pois não são tão numerosos ou complicados quanto você pensa.",
    },
  },
  {
    number: 0x10,
    link: "https://outras.ml/algotypes/proof/",
    name: {
      en: "Blockchain Proof-of-Work",
      pt: "Prova de Trabalho em Blockchain",
    },
    algorithm: {
      en: "Proof-of-work (PoW) is a piece of data which is difficult to produce, but easy to verify. It is often generated by random processes with low probability of success, so that a lot of trial and error is required before a valid PoW is generated.",
      pt: "Uma Prova de Trabalho é um processo algorítmico cujo cálculo é difícil de executar, mas cuja validade é fácil de verificar. Muitas vezes, é gerado por processos aleatórios com baixa probabilidade de sucesso, de modo que muitas tentativas são necessárias antes que um número válido seja gerado.",
    },
    message: {
      en: "Uncontrolled energy. Sudden change. Revolution over evolution. Past, present and future are superimposed all of a sudden. Beware of cognitive dissonance.",
      pt: "Essa carta simboliza toda e qualquer energia descontrolada. Mudança repentina. Revolução ao invés de evolução. Passado, presente e futuro se sobrepõem de repente. Cuidado com a dissonância cognitiva.",
    },
  },
  {
    number: 0x11,
    link: "https://outras.ml/algotypes/cordic/",
    name: {
      en: "CORDIC",
      pt: "CORDIC",
    },
    algorithm: {
      en: "CORDIC is a simple and efficient algorithm for computing trigonometric functions, square roots and other mathematical functions that depend on fractions, ratios and irrational numbers.",
      pt: "CORDIC é um algoritmo simples e eficiente para calcular funções trigonométricas, raízes quadradas, logaritmos e outras funções matemáticas que dependem de frações e números irracionais.",
    },
    message: {
      en: "Channel your abilities and resources to transcend the limitations of earthly and material concerns. True power comes from the core.",
      pt: "Essa carta pede concentração. Foque suas habilidades e recursos para transcender as limitações e preocupações materiais e terrestres. O verdadeiro poder vem de dentro.",
    },
  },
  {
    number: 0x12,
    link: "https://outras.ml/algotypes/encoding/",
    name: {
      en: "Viterbi Encoding",
      pt: "Encodificação de Viterbi",
    },
    algorithm: {
      en: "The Viterbi Algorithm uses statistical and probabilistic analysis to reconstruct messages transmitted through noisy channels based on the set of all possible input.",
      pt: "O Algoritmo de Viterbi usa análise estatística e de probabilidade para reconstruir mensagens transmitidas em canais ruidosos.",
    },
    message: {
      en: "Daily routine is just a set up for your dreams. Trust your subconscious and resensitize yourself to the meaning of hidden states.",
      pt: "Esta carta mostra que uma rotina diária pode ser o começo de uma configuração para conquistas maiores. Confie no seu subconsciente e re-sensibilize-se ao significado de estados ocultos.",
    },
  },
  {
    number: 0x13,
    link: "https://outras.ml/algotypes/primality/",
    name: {
      en: "Primality Test",
      pt: "Teste de Primalidade",
    },
    algorithm: {
      en: "Primality test algorithms are capable of speeding up naive trial division by using the fact that all primes greater than 3 are of the form 6k + 1 or 6k - 1.",
      pt: "Os algoritmos de teste de primalidade são capazes de acelerar seus cálculos usando o fato de que todos os números primos maiores que 3 tem a forma 6k + 1 ou 6k - 1.",
    },
    message: {
      en: "Inner essence. Untraditional power centers. Reflected similarities are seen under a different light. Find the natural centers of resonance.",
      pt: "Essa carta revela a existência de um conhecimento interno e poderes não tradicionais. As semelhanças refletidas são vistas sob uma luz diferente. Encontre os centros naturais de ressonância.",
    },
  },
  {
    number: 0x14,
    link: "https://outras.ml/algotypes/convex-hull/",
    name: {
      en: "Convex Hull",
      pt: "Fecho Convexo",
    },
    algorithm: {
      en: "The convex hull algorithm is used to find the smallest convex polygon that can completely circumscribe an object. This is useful in autonomous navigation systems where this simpler shape can more efficiently be used to avoid collisions.",
      pt: "Esse algoritmo é usado para calcular o menor polígono convexo que pode circunscrever completamente um objeto. Essa operação é extremamente útil em sistemas de navegação autônoma porque a forma simples do fecho convexo pode ser usada mais eficientemente para evitar colisões.",
    },
    message: {
      en: "Judiciously gather wisdom from tradition and customs. Be mindful of walls and enclosures. Design your own rituals to strengthen the non-material aspects of your life.",
      pt: "Esse algoritmo simboliza a mistura de sabedorias tradicionais com conhecimentos contemporâneos. Esteja atento a paredes e cercas. Invente seus próprios rituais para fortalecer os aspectos não materiais de sua vida.",
    },
  },
  {
    number: 0x15,
    link: "https://outras.ml/algotypes/integrate/",
    name: {
      en: "PID Controller",
      pt: "Controlador PID",
    },
    algorithm: {
      en: "A proportional-integral-derivative controller (PID controller) is a control loop mechanism that employs feedback to automatically correct and guide autonomous systems.",
      pt: "Um Controlador PID é um mecanismo de controle que emprega feedback para automaticamente corrigir e guiar ações de um sistema autônomo.",
    },
    message: {
      en: "Looking back and walking forward. Searching for resolution and completeness. You'll relax when you realize you're in the right place.",
      pt: "Essa carta pede para você caminhar para frente olhando para trás. Procure resolução e integridade. Você vai relaxar quando perceber que já está no lugar certo.",
    },
  },
];
