import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { client } from "@/libs/client";
import { BlogList } from "@/types/blog";
import { MicroCMSListResponse } from "microcms-js-sdk";
import styles from "@/styles/Home.module.scss";
import Link from "next/link";
import { BlogCard } from "@/components/blogcard/BlogCard";
import { Pagination } from "@/components/pagination/Pagination";
import { ParsedUrlQuery } from "querystring";
import { BLOG_LIMIT } from "@/constants/blogLimit";

type HomeProps = {
  blog: MicroCMSListResponse<BlogList>;
  limit: number;
  //MicroCMSListResponsをtotalCountでも使用したかったが、getStaticPropsでエラーが出た
  totalCount: number;
};


const Home: NextPage<HomeProps> = ({ blog, totalCount, limit }) => {
  return (
    <div>
      <h1>ブログ一覧</h1>
      <ul className={styles.blogLists}>
        {blog.contents.map((blog) => (
          <li className={styles.blogList} key={blog.id}>
            <Link href={`/blog/${blog.id}`}>
              <BlogCard blog={blog} />
            </Link>
          </li>
        ))}
      </ul>
      <Pagination totalCount={totalCount} limit={limit}/>
    </div>
  );
};
type Params = {
  pageNum: string;
} & ParsedUrlQuery;

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  /**
   * ビルド時に事前に生成するページのパスを配列で指定します。
   * 現在は空の配列が指定されており、事前生成されるページはありません。
   * fallback: 'blocking' キャッシュがまだ作られていないときはSSRを行う
   */
 // 総ページ数を計算してパスを生成
 const totalCount = await client.getList<BlogList>({
  endpoint: "blog",
  queries: { fields: "id" },
}).then((res) => res.totalCount);

const totalPages = Math.ceil(totalCount / BLOG_LIMIT);

const paths = Array.from({ length: totalPages }, (_, i) => ({
  params: { pageNum: String(i + 1) },
}));
  return { paths: [], fallback: "blocking" };
};

/**
 * paramsからページ番号を取得します。
 * ページ番号を基にデータの取得開始位置(offset)を計算します。
 */
export const getStaticProps: GetStaticProps<HomeProps> = async ({ params }) => {
  // ルートのパラメータpageNumを取得します。例えば、URLが/page/1の場合、pageNumは1になります。offsetで使用している paramsが無い時はどんな時？
  const pageNum = Number(params?.pageNum);
   // ページ番号が無効（数字でない、1未満）の場合は404
   if (isNaN(pageNum) || pageNum < 1) {
    return { notFound: true };
  }

  // 総ページ数を取得（ブログ全体の件数が必要）
  const totalCount = await client.getList<BlogList>({
    endpoint: "blog",
    queries: { fields: "id" },
  }).then((res) => res.totalCount);

  const totalPages = Math.ceil(totalCount / BLOG_LIMIT);

  // ページ番号が範囲外の場合は404
  if (pageNum > totalPages) {
    return { notFound: true };
  }
  //offsetのデフォルトは０なので、pageNumから−１をしている
  const offset = (pageNum - 1) * BLOG_LIMIT;
  const data = await client.getList<BlogList>({
    endpoint: "blog",
    queries: {
      fields: "id,title,thumbnail,alt,category",
      limit: BLOG_LIMIT,
      offset,
    },
  });
  return {
    props: {
      blog: data,
      totalCount: data.totalCount,
      limit: BLOG_LIMIT,
    },
  };
};

export default Home;
