import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import BackButton from "./components/backButton";
import Slider from "./components/slider";
("../../node_modules/@types/estree/index.d");

const Banana: NextPage = () => {
  const router = useRouter();
  const { banana } = router.query;
  const bananaObject = JSON.parse(banana);
  const MIN_SIZE = 0;
  const DEFAULT_SIZE = 100;
  const MAX_WIDTH = 200;
  const [imgSize, setImgSize] = useState<number>(DEFAULT_SIZE);
  const onChangeSlider = (value: number) => {
    const size = ((MAX_WIDTH - MIN_SIZE) * value) / 100;
    setImgSize(size);
  };

  return (
    <>
      <Head>
        <title>not banana</title>
        <meta name="description" content="Banana Detector" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-black py-16">
        <BackButton />
        <div className="align-left flex w-full flex-row px-6">
          <span className="pr-4 text-2xl font-light text-white">size</span>
          <Slider onChangeSlider={onChangeSlider} />
        </div>
        <div>
          <img
            className="absolute bottom-0 left-0 right-0 top-0 m-auto h-auto object-contain "
            style={{ width: `${imgSize}px` }}
            src={bananaObject.image_url}
          />
        </div>
      </main>
    </>
  );
};

export default Banana;
