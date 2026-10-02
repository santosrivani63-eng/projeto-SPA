// Os dados ficam apenas na memória.
    // Se a página for atualizada, eles serão apagados.
    const produtos = [];

    const app = document.querySelector("#app");
    const botoesMenu = document.querySelectorAll("nav button");

    function marcarMenuAtivo(rota) {
      botoesMenu.forEach(botao => {
        botao.classList.toggle("ativo", botao.dataset.rota === rota);
      });
    }

    function irPara(rota) {
      marcarMenuAtivo(rota);

      if (rota === "inicio") mostrarInicio();
      if (rota === "cadastro") mostrarCadastro();
      if (rota === "lista") mostrarLista();
      if (rota === "sobre") mostrarSobre();
    }

    function mostrarInicio() {
      app.innerHTML = `
        <h1>Loja Simples</h1>
        <p>
          Bem-vindo à nossa loja! Aqui você pode cadastrar e visualizar
          os produtos disponivéis.
        </p>

        <p>
          Os produtos cadastrados ficam temporariamente guardados em um 
          array JavaScript enquanto a página estiver aberta.
        </p>

        <div class="contador">
          Produtos cadastrados nesta sessão: <strong>${produtos.length}</strong>
        </div>

        <div class="acoes">
          <button class="botao" id="btnCadastrar">Cadastrar produto</button>
          <button class="botao secundario" id="btnVerProdutos">Ver produtos</button>
        </div>
      `;

      document.querySelector("#btnCadastrar")
        .addEventListener("click", () => irPara("cadastro"));

      document.querySelector("#btnVerProdutos")
        .addEventListener("click", () => irPara("lista"));
    }

    function mostrarCadastro() {
      app.innerHTML = `
        <h1>Cadastrar Produto</h1>

        <form id="formProduto">
          <div class="campo">
            <label for="nome">Nome do Produto</label>
            <input id="nome" type="text" placeholder="Digite o nome do produto" required />
          </div>

          <div class="campo">
            <label for="categoria">Categoria</label>
            <input id="categoria" type="text" placeholder="Digite a categoria" required />
          </div>

          <div class="campo">
            <label for="preco">Preço</label>
            <input id="preco" type="number" step= "0.01"placeholder="Digite o preço do produto" required />
          </div>

          <button class="botao" type="submit">Salvar produto</button>
          <div id="mensagem"></div>
        </form>
      `;

      document.querySelector("#formProduto").addEventListener("submit", function(evento) {
        evento.preventDefault();

        const nome = document.querySelector("#nome").value.trim();
        const categoria = document.querySelector("#categoria").value.trim();
        const preco = document.querySelector("#preco").value;

        produtos.push({
          nome,
          categoria,
          preco,
        });

        document.querySelector("#mensagem").innerHTML =
          `<div class="mensagem">Produto cadastrado com sucesso.</div>`;

        evento.target.reset();
      });
    }

    function mostrarLista() {
      app.innerHTML = `
        <h1>Lista de Produtos</h1>
        <p>Esta tabela é criada dinamicamente pelo JavaScript a partir do array de produtos.</p>
        <div id="conteudoLista"></div>
      `;

      renderizarTabela();
    }

    function renderizarTabela() {
      const conteudo = document.querySelector("#conteudoLista");

      if (produtos.length === 0) {
        conteudo.innerHTML = `
          <div class="vazio">
            Nenhum produto cadastrado ainda.
          </div>
        `;
        return;
      }

      let linhas = "";

      produtos.forEach((produto, indice) => {
        linhas += `
          <tr>
            <td>${produto.nome}</td>
            <td>${produto.categoria}</td>
            <td>${produto.preco}</td>
            <td>
              <button class="excluir" data-indice="${indice}">Excluir</button>
            </td>
          </tr>
        `;
      });

      conteudo.innerHTML = `
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            ${linhas}
          </tbody>
        </table>
      `;

      document.querySelectorAll(".excluir").forEach(botao => {
        botao.addEventListener("click", function() {
          const indice = Number(this.dataset.indice);
          produtos.splice(indice, 1);
          renderizarTabela();
        });
      });
    }

    function mostrarSobre() {
      app.innerHTML = `
        <h1>Sobre o projeto</h1>
        <p>
          Esta é uma Loja Simples desenvolvida como uma Single Page Application.
        </p>
        <p>
          O sistema permite cadastrar produtos e visualizar os produtos cadastrados
          enquanto a página estiver aberta.
          O JavaScript modifica o conteúdo do elemento <strong>#app</strong>.
        </p>
        <p>
          Os dados são armazenados temporariamente em um array JavaScript, 
          sem utilização de banco de dados. 
        </p>
      `;
    }

    botoesMenu.forEach(botao => {
      botao.addEventListener("click", () => {
        irPara(botao.dataset.rota);
      });
    });

    mostrarInicio();