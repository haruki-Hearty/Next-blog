import { BlogList } from "@/types/blog";
import { NextPage } from "next";
import Image from "next/image";
import styles from "./BlogCard.module.scss"

type BlogProps = {
  blog: BlogList;
}

export const BlogCard: NextPage<BlogProps> = (props) => {
  const { blog } = props;
  return (
    <>
      <div className={styles.imgInner}>
        <Image src={blog.thumbnail.url} width={blog.thumbnail.width} height={blog.thumbnail.height} alt={blog.alt} />
      </div>
      <h2 className={styles.title}>{blog.title}</h2>
      <div className={styles.category}>{blog.category.name}</div>
    </>
  );
};
