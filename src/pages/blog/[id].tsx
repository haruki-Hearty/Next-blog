// pages/blog/[id].js
import { client } from "@/libs/client";
import styles from "@/styles/Blog-details.module.scss";
import { Blog } from "@/types/blog";
import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { MicroCMSListContent } from "microcms-js-sdk";
import Image from "next/image";

type BlogDetailProps = {
  blog: Blog & MicroCMSListContent;
};
const BlogId: NextPage<BlogDetailProps> = ({ blog }) => {
  const date = blog.publishedAt? new Date(blog.publishedAt).toLocaleDateString() : "";
  
  return (
    <main className={styles.main}>
      <div className={styles.imgInner}>
        <Image
          src={blog.thumbnail.url}
          width={blog.thumbnail.width}
          height={blog.thumbnail.height}
          alt={blog.alt}
        />
      </div>
      <h1 className={styles.title}>{blog.title}</h1>
      <p className={styles.publishedAt}>{date}</p>
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
  const data = await client.getList<Blog>({ endpoint: "blog" });

  const paths = data.contents.map(
    (content: Blog & MicroCMSListContent) => `/blog/${content.id}`
  );
  //fallback: 'blocking' キャッシュがまだ作られていないときはSSRを行う
  return { paths, fallback: "blocking" };
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

  const data = await client.getListDetail<Blog>({
    endpoint: "blog",
    contentId: id,
  });

  return {
    props: {
      blog: data,
    },
    // revalidate: 60, // 60秒で再生成
  };
};

export default BlogId;
