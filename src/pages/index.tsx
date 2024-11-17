// pages/index.js
import Link from "next/link";
import { client } from "@/libs/client";
import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { Blog } from "@/types/blog";
import { MicroCMSListResponse } from "microcms-js-sdk";
import { BlogCard } from "@/components/blogcard/BlogCard";
import styles from "@/styles/Home.module.scss";

type HomeProps = {
  blog: MicroCMSListResponse<Blog>;
};

/**
 * ジェネリクスを使ってpropsに型を指定
 * NextPage<BlogPropsArry>
 */
const Home: NextPage<HomeProps> = ({ blog }) => {
  return (
    <div>
      <ul className={styles.blogLists}>
        {blog.contents.map((blog) => (
          <li className={styles.blogList} key={blog.id}>
            <Link href={`/blog/${blog.id}`}>
              <BlogCard blog={blog} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const data = await client.getList<Blog>({ endpoint: "blog" });
  return {
    props: {
      blog: data,
    },
  };
};

export default Home;
