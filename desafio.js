class Aluno {
  constructor(nome, nota, matriculaAtiva = true) {
    this.nome = nome;
    this.nota = Number(nota);
    this.matriculaAtiva = Boolean(matriculaAtiva);
  }

  toString() {
    return `${this.nome} | Nota: ${this.nota} | ${this.matriculaAtiva ? 'Ativa' : 'Cancelada'}`;
  }
}

class No {
  constructor(elemento) {
    this.elemento = elemento;
    this.proximo = undefined;
  }
}

class ListaLigada {
  constructor(limite = 40) {
    this.head = undefined;
    this.tamanho = 0;
    this.limite = limite;
  }

  temEspaco() {
    return this.tamanho < this.limite;
  }

  adicionarNoFinal(elemento) {
    if (!this.temEspaco()) return false;

    const no = new No(elemento);

    if (!this.head) {
      this.head = no;
    } else {
      let atual = this.head;
      while (atual.proximo) atual = atual.proximo;
      atual.proximo = no;
    }

    this.tamanho++;
    return true;
  }

  inserir(elemento, posicao = this.tamanho) {
    if (!this.temEspaco()) return false;
    if (posicao < 0 || posicao > this.tamanho)
      throw new RangeError("Posição inválida");

    const no = new No(elemento);

    if (posicao === 0) {
      no.proximo = this.head;
      this.head = no;
    } else {
      let anterior = this.buscaNo(posicao - 1);
      no.proximo = anterior.proximo;
      anterior.proximo = no;
    }

    this.tamanho++;
    return true;
  }

  buscaNo(indice) {
    if (indice < 0 || indice >= this.tamanho) return undefined;

    let atual = this.head;
    let contador = 0;

    while (contador < indice) {
      atual = atual.proximo;
      contador++;
    }

    return atual;
  }

  removerNaPosicao(posicao) {
    if (posicao < 0 || posicao >= this.tamanho) return null;

    let removido;

    if (posicao === 0) {
      removido = this.head;
      this.head = this.head.proximo;
    } else {
      const anterior = this.buscaNo(posicao - 1);
      removido = anterior.proximo;
      anterior.proximo = removido.proximo;
    }

    this.tamanho--;
    return removido.elemento;
  }

  indiceDe(condicao) {
    let atual = this.head;
    let indice = 0;

    while (atual) {
      if (condicao(atual.elemento, indice)) return indice;
      atual = atual.proximo;
      indice++;
    }

    return -1;
  }

  removerPorNome(nome) {
    const indice = this.indiceDe(a => a.nome === nome);
    if (indice === -1) return null;
    return this.removerNaPosicao(indice);
  }

  estaVazia() {
    return this.tamanho === 0;
  }

  head() {
    return this.head ? this.head.elemento : null;
  }

  obterTamanho() {
    return this.tamanho;
  }

  paraArray() {
    const lista = [];
    let atual = this.head;

    while (atual) {
      lista.push(atual.elemento);
      atual = atual.proximo;
    }

    return lista;
  }

  carregarDeArray(array) {
    this.head = undefined;
    this.tamanho = 0;

    for (let el of array) {
      if (!this.temEspaco()) break;
      this.adicionarNoFinal(el);
    }
  }

  ordenarPorNota() {
    const arr = this.paraArray();
    arr.sort((a, b) => b.nota - a.nota);
    this.carregarDeArray(arr);
  }

  listarTodos() {
    const arr = this.paraArray();
    if (arr.length === 0) return "Lista vazia";
    return arr.map((a, i) => `${i + 1}. ${a.toString()}`).join("\n");
  }

  listarAtivos() {
    const arr = this.paraArray().filter(a => a.matriculaAtiva);
    if (arr.length === 0) return "Nenhum aluno ativo";
    return arr.map((a, i) => `${i + 1}. ${a.toString()}`).join("\n");
  }
}
