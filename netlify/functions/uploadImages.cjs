const axios = require("axios");
const FormData = require("form-data");
const busboy = require("busboy");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  const parseMultipartForm = (event) => {
    return new Promise((resolve, reject) => {
      const buffers = {};
      const fileInfo = {};

      const bb = busboy({ headers: event.headers });

      bb.on("file", (fieldname, file, info) => {
        fileInfo[fieldname] = info;
        const chunks = [];

        file.on("data", (data) => chunks.push(data));
        file.on("end", () => {
          buffers[fieldname] = Buffer.concat(chunks);
        });
      });

      bb.on("finish", () => resolve({ files: buffers, fileInfo }));
      bb.on("error", (error) => reject(error));

      bb.end(Buffer.from(event.body, "base64"));
    });
  };

  try {
    const { files, fileInfo } = await parseMultipartForm(event);

    if (!files.image) {
      throw new Error("No image file found");
    }

    const formData = new FormData();
    formData.append("image", files.image, {
      filename: fileInfo.image.filename,
      contentType: fileInfo.image.mimeType,
    });

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${process.env.VITE_IMGBB_API_KEY}`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Accept: "application/json",
        },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      }
    );

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        id: response.data.data.id,
        url: response.data.data.url,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        error: "Error uploading image",
        details: error.message,
      }),
    };
  }
};
