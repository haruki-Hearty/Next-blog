// pages/index.js
import Link from "next/link";
import { client } from "../libs/client";
import { GetStaticProps, NextPage } from "next";

//ブログデータの型
type Blog = {
  id: string;
  title: string;
  body: string;
  name: string;
}

//コンポーネントのprops型を定義します。
type HomeProps = {
  blog: Blog[];
}

const Home: NextPage<HomeProps> = ({ blog }) => {
  return (
    <div>
      <ul>
        {blog.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * データをテンプレートに受け渡す部分の処理を記述します
 * export const getStaticProps = async () => { ... }
 * getStaticPropsはNext.jsの関数で、ページコンポーネントからエクスポートされます。
 * asyncキーワードで非同期関数にしており、APIリクエストやデータ取得が含まれる場合に使います。
 * Next.jsでは、この関数が実行されるのはビルド時なので、事前にページが生成されます。これにより、ユーザーがページを訪れた際にすぐに表示できます。
 */
export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  // awaitキーワードを使用することで、APIレスポンスを待ってから次の処理に進むことができます。
  // APIのレスポンスを待ってから次の処理に行くのは、データを取得できてない時に進むとpropsとして返せなくなるから？
  const data = await client.get({ endpoint: "blog" });

  /**
   * 取得したデータをpropsとして返しています。
   * propsはページコンポーネントに渡され、ページの描画に使用されます。
   * blog(propsで使用する名前): data.contentsは、APIから取得したブログデータ（例えば、ブログのタイトルや内容）をblogという名前でpropsに渡しています。
   */
  return {
    props: {
      blog: data.contents,
    },
  };
};

export default Home;
