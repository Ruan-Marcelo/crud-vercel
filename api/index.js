let certificados = [];

export default function handler(req, res) {

  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { method } = req;

  // GET
  if (method === "GET") {
    return res.status(200).json(certificados);
  }

  // POST
  if (method === "POST") {
    const { nome, instituicao, data, descricao, imagem } = req.body || {};

    if (!nome) {
      return res.status(400).json({ error: "Nome é obrigatório" });
    }

    const novo = {
      id: Date.now(),
      nome,
      instituicao,
      data,
      descricao,
      imagem
    };

    certificados.push(novo);
    return res.status(201).json(novo);
  }

  // PUT
  if (method === "PUT") {
    const { id, nome, instituicao, data, descricao, imagem } = req.body || {};

    certificados = certificados.map(item =>
      item.id === id
        ? { ...item, nome, instituicao, data, descricao, imagem }
        : item
    );

    return res.status(200).json({ message: "Atualizado" });
  }

  // DELETE
  if (method === "DELETE") {
    const { id } = req.body || {};

    certificados = certificados.filter(item => item.id !== id);

    return res.status(200).json({ message: "Deletado" });
  }

  return res.status(405).json({ message: "Método não permitido" });
}