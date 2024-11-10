// pages/blog/[id].js
import { client } from "../../libs/client";
import styles from "../../styles/Home.module.scss";
import { Blog, BlogProps } from "../../types/blog";
import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";

const BlogId: NextPage<BlogProps> = ({ blog }) => {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{blog.title}</h1>
      <p className={styles.publishedAt}>{blog.publishedAt}</p>
      <p>{blog.category && blog.category.name}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${blog.body}`,
        }}
        className={styles.post}
      />
    </main>
  );
};

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog" });

  const paths = data.contents.map((content: Blog) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
type Params = ParsedUrlQuery & {
  id?: string;
};
export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext<Params>
) => {
  const { id } = context.params ?? {};

  // id が string でない場合はエラーハンドリング（例: 404 ページを返す）
  if (typeof id !== "string") {
    return {
      notFound: true,
    };
  }

  const data = await client.get({ endpoint: "blog", contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};

export default BlogId;
