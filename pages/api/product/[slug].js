import auth from "../../../middleware/auth";
import db from "../../../utils/db";
import Products from "../../../models/Product";
db.connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProduct(req, res);
      break;
    case "PUT":
      await updateProduct(req, res);
      break;
    case "DELETE":
      await deleteProduct(req, res);
      break;
  }
};

const getProduct = async (req, res) => {
  try {
    const { slug } = req.query;

    const product = await Products.findOne({ slug: slug });
    if (!product)
      return res.status(400).json({ err: "This product does not exist." });

    res.json({ product });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid." });

    const { id } = req.query;
    const {
      title,
      description,
      slug,
      meta,
      content,
      category,
      images,
    } = req.body;

    if (
      !title ||
      !price ||
      !meta ||
      !slug ||
      !description ||
      !content ||
      category === "all" ||
      images.length === 0
    )
      return res.status(400).json({ err: "Please add all the fields." });

    await Products.findOneAndUpdate(
      { _id: id },
      {
        title: title.toLowerCase(),
        description,
        meta,
        slug,
        content,
        category,
        images,
      }
    );

    res.json({ msg: "Success! Updated a product" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const result = await auth(req, res);

    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid." });

    const { id } = req.query;

    await Products.findByIdAndDelete(id);
    res.json({ msg: "Deleted a product." });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
