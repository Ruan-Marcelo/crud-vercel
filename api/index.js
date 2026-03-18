let items = [];

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
    return res.status(200).json(items);
  }

  // POST
  if (method === "POST") {
    const body = req.body || {};
    const name = body.name;

    if (!name) {
      return res.status(400).json({ error: "Name é obrigatório" });
    }

    const newItem = {
      id: Date.now(),
      name
    };

    items.push(newItem);
    return res.status(201).json(newItem);
  }

  // DELETE
  if (method === "DELETE") {
    const body = req.body || {};
    const id = body.id;

    items = items.filter(item => item.id !== id);

    return res.status(200).json({ message: "Deletado" });
  }

  return res.status(405).json({ message: "Método não permitido" });
}