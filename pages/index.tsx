// pages/index.js
import Link from "next/link";
import { client } from "../libs/client";
import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { BlogPropsArry, BlogProps} from "./types/blog";

/**
 * ジェネリクスを使ってpropsに型を指定
 * NextPage<BlogPropsArry>
 */
const Home: NextPage<BlogPropsArry> = ({ blog }) => {
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

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps: GetStaticProps = async () => {
  const data = await client.get({ endpoint: "blog" });

  return {
    props: {
      blog: data.contents,
    },
  };
};

export default Home;
