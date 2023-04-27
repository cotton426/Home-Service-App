import { Router } from "express";
import multer from "multer";
import { supabase } from "../utils/supabase.js";

const dataRouter = Router();
const upload = multer({ storage: multer.memoryStorage() });

dataRouter.get("/categories", async (req, res) => {
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .order("category_id");
  return res.json(categories);
});

dataRouter.get("/categories/:id", async (req, res) => {
  const categoryId = req.params.id;
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .eq("category_id", categoryId);

  if (error) {
    // Handle the error
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching data" });
  }

  if (!categories || categories.length === 0) {
    // Handle the case when no data is found for the given categoryId
    return res.status(404).json({ message: "Category not found" });
  }

  return res.json(categories[0]);
});

dataRouter.post("/categories", async (req, res) => {
  const { name } = req.body;
  const { data: categories, error } = await supabase
    .from("categories")
    .insert([{ name: name }]);
  console.log(error?.message);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  return res.json(categories);
});

dataRouter.put("/categories/:id", async (req, res) => {
  const categoryId = req.params.id;
  const { name } = req.body;

  const { data: categories, error } = await supabase
    .from("categories")
    .update([{ name: name }])
    .eq("category_id", categoryId);

  // .order("id", { ascending: false });
  console.log(error?.message);
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.json(categories);
});

dataRouter.delete("/categories/:id", async (req, res) => {
  const categoryId = req.params.id;
  console.log(categoryId);
  const { data: categories, error } = await supabase
    .from("categories")
    .delete()
    .eq("category_id", categoryId);

  // .order("id", { ascending: false });
  console.log(error?.message);
  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.json(categories);
});

dataRouter.get("/services", async (req, res) => {
  const { data, error } = await supabase
    .from("services")
    .select(
      `
  *,
  categories ( name )
`
    )
    .order("category_id", "service_id");
  // Check for errors
  if (error) {
    console.error("Error executing SQL query:", error);
  }
  return res.json(data);
});

dataRouter.post("/services", upload.single("image"), async (req, res) => {
  const decodedFileName = decodeURIComponent(req.file.originalname);
  const { serviceName, category_id, subServiceList } = req.body;

  // Save the image to Supabase Storage
  const file = req.file;
  const bucket = "images/";
  const imagePath = `services-image/${category_id}/${decodedFileName}`;

  const { error: uploadError, data } = await supabase.storage
    .from(bucket)
    .upload(imagePath, file.buffer, {
      contentType: file.mimetype,
    });

  if (uploadError) {
    console.error("Error uploading image:", uploadError);
    return res.status(500).json({ error: uploadError.message });
  }
  const image = `https://okfjffjzsmbiustwgohg.supabase.co/storage/v1/object/public/images/${imagePath}`;

  // Save the service data to the database
  const { data: services, error: insertServiceError } = await supabase
    .from("services")
    .insert([{ name: serviceName, category_id, image }])
    .select("*");

  if (insertServiceError) {
    console.error("Error inserting data:", insertServiceError);
    return res.status(400).json({ error: insertServiceError.message });
  }

  const { service_id } = services[0];
  const subServiceListWithoutNullPrototype = subServiceList.map((subService) =>
    Object.assign({}, { ...subService, service_id })
  );

  const { data: subService, error: insertSubServiceError } = await supabase
    .from("sub_services")
    .insert(subServiceListWithoutNullPrototype)
    .select("*");
  console.log(subService);

  if (insertSubServiceError) {
    console.error("Error inserting data:", insertSubServiceError);
    return res.status(400).json({ error: insertSubServiceError.message });
  }

  return res.json(services);
});

dataRouter.get("/services/:id", async (req, res) => {
  const serviceId = req.params.id;
  const { data: services, error } = await supabase
    .from("sub_services")
    .select(`*,services(*)`)
    .eq("service_id", serviceId);

  if (error) {
    // Handle the error
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching data" });
  }

  if (!services || services.length === 0) {
    // Handle the case when no data is found for the given serviceId
    return res.status(404).json({ message: "service not found" });
  }
  // const service = services[0];
  // service.category_name = service.categories.name;
  // delete service.categories;

  return res.json(services);
});

dataRouter.put("/services/:id", upload.single("image"), async (req, res) => {
  const decodedFileName = decodeURIComponent(req.file?.originalname);
  const serviceId = req.params.id;

  const { name, category_id, subServiceList } = req.body;

  const fieldsToUpdate = {
    name: name,
    category_id: category_id,
  };
  // Save the image to Supabase Storage
  const file = req.file;
  const bucket = "images/";
  const imagePath = `services-image/${decodedFileName}`;
  if (file) {
    const { error: uploadError, data } = await supabase.storage
      .from(bucket)
      .upload(imagePath, file?.buffer, {
        contentType: file?.mimetype,
      });

    if (uploadError) {
      console.error("Error uploading image:", uploadError);
      return res.status(500).json({ error: uploadError.message });
    }

    const image =
      "https://okfjffjzsmbiustwgohg.supabase.co/storage/v1/object/public/images/" +
      imagePath;

    fieldsToUpdate.image = image;
  }

  // table supabase
  const { data: service, error } = await supabase
    .from("services")
    .update(fieldsToUpdate)
    .eq("service_id", serviceId);

  console.log(error);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  console.log(subServiceList);
  const { data: subService, error: subServiceError } = await supabase
    .from("sub_services")
    .upsert(subServiceList, { onConflict: "sub_service_id" });
  return res.json(service);
});

export default dataRouter;
