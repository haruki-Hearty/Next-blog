// pages/blog/[id].js
import { client } from "@/libs/client";
import styles from "@/styles/Home.module.scss";
import { BlogDetail } from "@/types/blog";
import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { MicroCMSListContent } from "microcms-js-sdk";

type BlogDetailProps = {
  blog: BlogDetail & MicroCMSListContent;
};

const BlogId: NextPage<BlogDetailProps> = ({ blog }) => {
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

export const getStaticPaths = async () => {
  const data = await client.getList<BlogDetail>({ endpoint: "blog" });

  const paths = data.contents.map((content: BlogDetail & MicroCMSListContent) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

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

  const data = await client.getListDetail<BlogDetail>({ endpoint: "blog", contentId: id });

  return {
    props: {
      blog: data,
    },
  };
};

export default BlogId;
