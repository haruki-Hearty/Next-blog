// pages/index.js
import Link from "next/link";
import { client } from "../libs/client";

export default function Home({  }) {
  return (
    <div>
     サンプル
    </div>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
// export const getStaticProps = async () => {
//   const data = await client.get({ endpoint: "blog" });

//   return {
//     props: {
//       blog: data.contents,
//     },
//   };
// };
