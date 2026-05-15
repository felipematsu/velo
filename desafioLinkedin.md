## Minha experiência com o Playwright

Desde o início do ano, quando comecei a trabalhar com Playwright nas automações de testes e também durante o curso AutomatizAi, percebi uma evolução significativa em meu dia a dia.

Havia trabalhado anteriormente com frameworks como Cypress, Nightwatch, Detox, e é notória a diferença entre eles e principalmente as vantagens do Playwright.

### Trace detalhado
O primeiro deles é o trace disponibilizado no Playwright logo após a execução de uma suíte de testes. 
O nível de detalhamento disponível é excelente, permitindo explorar ferramentas de inspeção como a aba network e console (similar ao dos navegadores). 
Encontrar onde um teste falhou com facilidade, indicando a linha na qual ele parou. 
A linha do tempo do teste fica disponível para entender como foi feita a execução ao mover o mouse por cima e por qual motivo o teste parou/falhou.
É possível também expandir a janela do browser a partir de um determinado passo, possibilitando inspecionar o sistema em validação e buscar os elementos naquele determinado estado.

<img width="1354" height="626" alt="image" src="https://github.com/user-attachments/assets/dd1d080e-ba47-4b67-a81c-e013705c52e5" />

### Paralelização nativa
O recurso de paralelização nativa do Playwright é um dos pontos fortes dessa ferramenta. Enquanto outras soluções oferecem esse recurso de forma paga ou com maior complexidade, o Playwright traz isso de forma gratuita e simplificada. Sua utilização permite que todos os testes executem num tempo menor e com maior confiabilidade. Além do recurso de paralelização nativa, é possível combiná-la com os jobs paralelos presentes em uma plataforma de CI/CD como o Github Actions, reduzindo mais ainda o tempo de execução e permitindo que uma suíte maior de testes seja executada.

### Baixíssimos erros de memória
Em comparação com o Cypress, por exemplo, quase nunca tive problemas em relação à memória com o Playwright. Dependendo da aplicação, o Cypress necessitava de configurações específicas para não quebrar durante a execução. Com o Playwright, não cheguei a passar por uma situação similar.

### Implementação única de teste e sua reutilização
Outro recurso que chama a atenção é a forma com a qual você pode tratar uma mesma implementação de teste para diferentes situações. Por exemplo, vamos imaginar que o sistema tenha diferentes tipos de usuário, mas que podem realizar uma mesma ação. Basta implementar o teste em questão dentro de um laço de repetição que possa iterar pelos perfis disponíveis e realizar os respectivos passos com o perfil em questão.

### Utilização de múltiplas abas
Um fator importantíssimo na implementação dos testes utilizando o Playwright é permitir que se utilize múltiplas abas durante a execução. Gosto de utilizar esse recurso principalmente quando há a necessidade de interação com diferentes usuários durante um mesmo teste. Isso reduz tempo de execução do teste, não necessitando que o mesmo browser precise sair de uma conta para entrar em outra.

## Conclusão
Atualmente, esses são os motivos os quais fazem o Playwright ser uma ferramenta diferenciada no dia a dia de meu trabalho. Esses pontos fizeram com que eu pudesse explorar validações mais complexas e com grande eficiência.

## Referências
Disponível em <https://hackmd.io/@fernandopapito/por-que-o-playwright-se-destaca>. Acesso em 14/05/2026.
Disponível em <https://playwright.dev/docs/intro>. Acesso em 14/05/2026.

#AutomatizAi
