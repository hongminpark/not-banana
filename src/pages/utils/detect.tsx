import * as tf from "@tensorflow/tfjs";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";

const baseModelURL = `/model/model.json`;
// const rembgURL = "https://rembg-api-mvfxphc2sa-uc.a.run.app/remove-bg";
const rembgURL = "http://localhost:8000/remove-bg";

export const detectBanana = async (
  image: HTMLImageElement,
  setImage: Dispatch<SetStateAction<string | null>>,
) => {
  const model = await tf.loadGraphModel(baseModelURL);
  let pixels = tf.browser.fromPixels(image);
  pixels = tf.image.resizeBilinear(pixels, [640, 640]);
  let [modelWidth, modelHeight] = model.inputs[0].shape.slice(1, 3);
  const input = tf.tidy(() => {
    return tf.image
      .resizeBilinear(pixels, [modelWidth, modelHeight])
      .div(255.0)
      .expandDims(0);
  });
  model.executeAsync(input).then(async (res) => {
    const [boxes, scores, classes, valid_detections] = res;
    const classes_data = classes.dataSync();
    const valid_detections_data = valid_detections.dataSync()[0];

    tf.dispose(res);

    for (var i = 0; i < valid_detections_data; ++i) {
      if (classes_data[i] === 46) {
        console.log("It's banana");
        // check if class id is banana
        const formData = new FormData();
        const blob = await fetch(image.src).then((response) => response.blob());
        formData.append("file", blob, "image.png");
        await axios
          .post(rembgURL, formData)
          .then((response) => {
            // create an image
            var outputImg = document.createElement("img");
            outputImg.src = response.data;
            document.body.appendChild(outputImg);
          })
          .catch((error) => {
            // Handle the error here
            console.error(error);
          });
        return true;
      }
    }
    console.log("Not banana");
    return false;
  });
};
