import axios from "axios";
const token = process.env.API_TOKEN;
import { liquorTypes } from "../../lib/data";

export default async (req, res) => {
  console.log(req.body);
  //   const { uploadFileImage } = req.body;
  //   try {
  //     const res2 = await axios({
  //       method: "post",
  //       url: "https://api.imagga.com/v2/uploads",
  //       headers: {
  //         Authorization: `Basic ${token}`,
  //       },
  //       params: {
  //         image: uploadFileImage,
  //       },
  //     });
  //     console.log(res2.data);
  //     res.json(res2.data.result.upload_id);
  //   } catch (e) {
  //     console.error("err", e);
  //   }
};
