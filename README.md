```
# 🖥️ z/OS Storage Simulator — OMEGAMON Style

Simulador educacional de comportamento de memória do IBM z/OS inspirado no painel **OMEGAMON II for z/OS Storage Summary** e consoles clássicos MVS.

O objetivo é demonstrar, de forma visual e interativa, como o sistema reage ao longo do tempo sob diferentes níveis de carga — desde ociosidade até colapso por falta de storage.

---

## 🎯 Objetivos do Projeto

- Simular o consumo de memória real e auxiliar do z/OS
- Demonstrar comportamento de paging e swapping
- Exibir áreas comuns (CSA/ECSA/SQA/ESQA)
- Mostrar maiores consumidores de memória
- Simular mensagens reais do sistema em situação crítica
- Recriar a estética de terminais 3270
- Servir como ferramenta didática para cursos e apresentações

---

## 🧠 Arquitetura do Simulador

- **HTML** → estrutura da interface
- **CSS** → estilo terminal verde-sobre-preto
- **JavaScript** → geração das métricas e gráficos
- **Chart.js** → visualização temporal
- Simulação baseada em um ciclo operacional de 7 dias

Estados simulados:

1. Idle (ociosidade)
2. Normal
3. Heavy load
4. Excessive load
5. Chaos / system breakdown

---

## 📊 Métricas Simuladas

As métricas reproduzem dados típicos coletados por ferramentas como OMEGAMON, RMF e comandos do operador.

---

### 🧱 Real Storage

Memória física instalada no CPC.

**Indicadores:**

- Total
- Em uso
- Disponível
- Frames livres

📌 Importância:

Base para toda a operação do sistema. Baixa disponibilidade provoca paging excessivo e degradação severa.

📥 Como obter no sistema real:
```

D M=STOR

```
ou via RMF Monitor III.

---

### 💾 Auxiliary Storage (Paging Space)

Espaço em disco usado para armazenar páginas não residentes na memória.

**Indicadores:**

- Total
- Alocado
- Livre
- Percentual de uso

📥 Comando:
```

D ASM

```
---

### 🔄 Paging Activity

Mostra a movimentação de páginas entre disco e memória.

**Indicadores:**

- Page-in por segundo
- Page-out por segundo
- Swaps
- Paging delay

📌 Altos valores indicam pressão de memória.

📥 Fonte real:

- RMF Monitor III
- SMF Type 71
- OMEGAMON

---

### 🧩 Common Storage Areas

Áreas compartilhadas entre todos os address spaces.

#### 🔻 Below 16M

Área histórica ainda usada por componentes antigos.

📌 Saturação pode causar abends S878/S80A.

---

#### 🔷 CSA — Common Storage Area

Compartilhada entre todos os processos.

---

#### 🔷 ECSA — Extended CSA

Versão expandida acima da linha de 16 MB.

---

#### 🔷 SQA / ESQA

Usadas por estruturas internas do kernel e control blocks.

📥 Comando real:
```

D VIRTSTOR,CSA

```
---

### 🏆 Top Virtual Storage Users

Lista dos address spaces com maior consumo.

📥 Visualização real:

- SDSF (painel DA)
- RMF Monitor III
- OMEGAMON

---

### ⚡ Métricas Modernas (z/Architecture)

O simulador também considera conceitos atuais:

- Storage 64-bit
- Memory Objects
- Large Frames
- Pageable vs Fixed Storage
- Hiperspaces
- Dataspaces

Essas métricas são essenciais em ambientes modernos como IBM z17.

---

## 💥 Mensagens de Erro Simuladas

O sistema exibe mensagens plausíveis do z/OS durante degradação:

- IRA200E — Auxiliary storage shortage
- IRA201E — Real storage exhausted
- IEA995I — Symptom dump initiated
- IEF403I — System quiet

---

## 🔐 Quem Pode Obter Esses Dados no Mundo Real?

### 👨‍💻 Perfis com acesso típico

#### Operadores (z/OS Console)

- DISPLAY commands
- Monitoramento básico

---

#### System Programmers

Acesso completo a:

- RMF
- SMF
- OMEGAMON
- IPCS
- Control blocks

---

#### Performance Analysts

- Análise histórica
- Capacity planning
- Tuning de WLM

---

#### Ferramentas Automatizadas

- OMEGAMON
- z/OSMF Resource Monitoring
- IBM Tivoli Monitoring

---

## 🧪 Possíveis Usos Educacionais

- Treinamento de operadores
- Introdução ao z/OS
- Demonstrações acadêmicas
- Palestras técnicas
- Simulações de incidentes
- Estudos de capacity planning

---

## 🚀 Como Executar

1. Baixe os arquivos:
```

index.html
 styles.css
 simulator.js

```
2. Abra o arquivo HTML em qualquer navegador moderno.

Não é necessário servidor.

---

## 🎨 Inspiração Visual

- Terminais IBM 3270
- Consoles MVS clássicos
- OMEGAMON Enhanced 3270 UI
- Centros de operação mainframe

---

## 👨‍🏫 Sobre o Bellacosa Mainframe

Projeto educacional dedicado à disseminação do conhecimento sobre tecnologia IBM Mainframe.

### 🌐 LinkedIn — Bellacosa Mainframe

Conteúdos sobre:

- z/OS
- COBOL
- CICS
- DB2
- Performance
- Segurança
- Arquitetura
- História da computação corporativa

👉 https://www.linkedin.com/in/bellacosa

---

### ☕ Newsletter — Um Café no Bellacosa Mainframe

Insights semanais sobre o universo mainframe com linguagem acessível e profundidade técnica.

---

### 🧵 Comunidade COBOL is Live

Iniciativa voltada à revitalização e valorização do COBOL no mercado atual.

---

## 🏁 Aviso

Este projeto é um simulador educacional e não representa dados reais de um sistema z/OS em produção.

---

💚 Feito com paixão pela plataforma mais resiliente da história da computação — IBM Mainframe.
```
