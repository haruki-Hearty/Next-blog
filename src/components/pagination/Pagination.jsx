import { useRouter } from "next/router";
import Link from "next/link";
import { BLOG_LIMIT } from "@/constants/blogLimit";
import styles from "./Pagination.module.scss";

export const Pagination = ({ totalCount }) => {
  //1ページに何枚表示するか
  const PER_PAGE = BLOG_LIMIT;

  // 現在のページ番号を取得
  const router = useRouter();
  const currentPage = parseInt(router.query.pageNum || "1", 10);

  const range = (start, end) =>
    /**
     * スプレッド構文で展開し、未定義の要素を埋める。
     */
    [...Array(end - start + 1)].map((_, i) => start + i);
  return (
    <ul className={styles.pageList}>
      <li>
        <Link href={currentPage > 1 ? `/page/${currentPage - 1}` : "#"} className={currentPage === 1 ? styles.disabled : ""}>
          前へ
        </Link>
      </li>
      {range(1, Math.ceil(totalCount / PER_PAGE)).map((number) => (
        <li
          className={currentPage === number ? styles.currentStyle : ""}
          key={number}
        >
          <Link href={`/page/${number}`}>{number}</Link>
        </li>
      ))}
      <li>
        <Link href={currentPage >= 1 ? `/page/${currentPage + 1}` : "#"} className={currentPage === (totalCount / PER_PAGE) ? styles.disabled : ""}>次へ</Link>
      </li>
    </ul>
  );
};
