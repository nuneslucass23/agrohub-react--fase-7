import { useEffect, useState } from "react";

const ENDERECO_VAZIO = { cep: "", rua: "", numero: "", bairro: "", cidade: "", uf: "" };

const MENSAGENS = {
  buscando: "Buscando endereço...",
  naoEncontrado: "CEP não encontrado. Confira os números.",
  erro: "Não foi possível buscar o CEP agora. Preencha o endereço manualmente.",
};

export default function EnderecoCep({ prefixo, onEnderecoChange }) {
  const [endereco, setEndereco] = useState(ENDERECO_VAZIO);

  // Avisa a página que usa o componente sempre que o endereço muda,
  // para ela poder salvar o endereço junto com o resto do formulário.
  useEffect(() => {
    onEnderecoChange?.(endereco);
  }, [endereco, onEnderecoChange]);
  const [status, setStatus] = useState("");

  const buscarCep = async (cep) => {
    setStatus("buscando");
    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const dados = await resposta.json();

      if (dados.erro) {
        setStatus("naoEncontrado");
        return;
      }

      setEndereco((atual) => ({
        ...atual,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        uf: dados.uf,
      }));
      setStatus("");
    } catch {
      setStatus("erro");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEndereco((atual) => ({ ...atual, [name]: value }));

    if (name === "cep") {
      const numeros = value.replace(/\D/g, "");
      if (numeros.length === 8) {
        buscarCep(numeros);
      } else {
        setStatus("");
      }
    }
  };

  const campo = (name, label, col, erro, extra = {}) => (
    <div className={col}>
      <label className="form-label fw-bold" htmlFor={`${prefixo}-${name}`}>
        {label}
      </label>
      <input
        className="form-control ah-form-control"
        id={`${prefixo}-${name}`}
        name={name}
        value={endereco[name]}
        onChange={handleChange}
        required
        {...extra}
      />
      <div className="invalid-feedback">{erro}</div>
    </div>
  );

  return (
    <>
      {campo("cep", "CEP", "col-md-4", "Informe o CEP.", {
        inputMode: "numeric",
        maxLength: 9,
        placeholder: "00000-000",
      })}
      {campo("rua", "Rua", "col-md-8", "Informe a rua.")}
      {campo("numero", "Número", "col-md-3", "Informe o número.")}
      {campo("bairro", "Bairro", "col-md-4", "Informe o bairro.")}
      {campo("cidade", "Cidade", "col-md-3", "Informe a cidade.")}
      {campo("uf", "UF", "col-md-2", "Informe a UF.", { maxLength: 2 })}
      {status && (
        <div className="col-12">
          <p className="ah-text-muted mb-0" role="status">
            {MENSAGENS[status]}
          </p>
        </div>
      )}
    </>
  );
}