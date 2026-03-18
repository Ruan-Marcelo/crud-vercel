export default function handler(req, res) {

  // ✅ LIBERA CORS (ESSENCIAL)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ RESOLVE PREFLIGHT (muito importante)
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
    const { name } = req.body;
    const newItem = { id: Date.now(), name };
    items.push(newItem);
    return res.status(201).json(newItem);
  }

  // PUT
  if (method === "PUT") {
    const { id, name } = req.body;
    items = items.map(item =>
      item.id === id ? { ...item, name } : item
    );
    return res.status(200).json({ message: "Atualizado" });
  }

  // DELETE
  if (method === "DELETE") {
    const { id } = req.body;
    items = items.filter(item => item.id !== id);
    return res.status(200).json({ message: "Deletado" });
  }

  return res.status(405).json({ message: "Método não permitido" });
}