// import { MicroCMSImage } from "microcms-js-sdk";
import { Blog } from "@/types/blog";
import Image from "next/image";
import styles from "./BlogCard.module.scss"
export const BlogCard = (props) => {
  const { blog } = props;
  console.log("ブログデータ", blog);
  return (
    <>
      <div className={styles.imgInner}>
        <Image src={blog.thumbnail.url} width={400} height={300} alt="サンプル" />
      </div>
      <h2 className={styles.title}>{blog.title}</h2>
      <div className={styles.category}>{blog.category.name}</div>
    </>
  );
};
