import axios from "axios";
const token = process.env.API_TOKEN;

export default async (req, res) => {
  const { uploadId } = req.body;
  try {
    const res2 = await axios({
      method: "get",
      url: "https://api.imagga.com/v2/tags",
      headers: {
        Authorization: `Basic ${token}`,
      },
      params: {
        image_upload_id: "i13157ed057acd48865cee4131kAl7Bg",
      },
    });
    res.json(res2.data);
  } catch (e) {
    console.error("err", e);
  }
};
