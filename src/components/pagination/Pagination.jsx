import { useRouter } from "next/router";
import Link from "next/link";
import { BLOG_LIMIT } from "@/constants/blogLimit";
import styles from "./Pagination.module.scss";

export const Pagination = ({ totalCount, limit }) => {
  //全部で何ページのページネーションにするかの計算
  const totalPages = Math.ceil(totalCount / limit);
  // 現在のページ番号を取得
  const router = useRouter();
  /**
   * ||の代わりに??を使うことで、undefinedまたはnullの場合のみデフォルト値を適用できます。
   * ??は、0や空文字列（""）を「有効な値」として扱うため、意図しないデフォルト値の適用を防ぎます。
   */
  const currentPage = Number(router.query.pageNum ?? 1);

  const getPageNumbers = () => {
    const pageNumbers = [];
    //現在のページを中心に表示する範囲
    const range = 2;

    for (let i = 1; i <= totalPages; i++) {
      if (
        //最初のページ
        i === 1 ||
        // 最後のページ
        i === totalPages ||
        // 現在のページの前後範囲 
        (i >= currentPage - range && i <= currentPage + range)
      ) {
        //ページ番号 i を配列に追加します。
        pageNumbers.push(i);
        // 配列の最後の要素が null ではないことを確認します。これにより、連続して null を追加するのを防ぎます。
      } else if (pageNumbers[pageNumbers.length - 1] !== null) {
        // 表示しない部分に null を挿入します。
        pageNumbers.push(null);
      }
    }
    return pageNumbers;
  };

  return (
    <nav>
      <ul className={styles.pagination}>
        <li>
          <Link
            disabled={currentPage === 1}
            href={currentPage > 1 ? `/page/${currentPage - 1}` : "#"}
            className={`${styles.paginationButton} ${
              currentPage === 1 ? styles.disabled : ""
            }`}
          >
            前へ
          </Link>
        </li>

        {getPageNumbers().map((page, index) =>
          page === null ? (
            <span key={index} className={styles.paginationEllipsis}>
              ...
            </span>
          ) : (
            <li key={index}>
              <Link
                href={`/page/${page}`}
                className={`${styles.paginationPage} ${
                  page === currentPage ? styles.active : ""
                }`}
              >
                {page}
              </Link>
            </li>
          )
        )}

        <li>
          <Link
            disabled={currentPage === totalPages}
            href={currentPage >= 1 ? `/page/${currentPage + 1}` : "#"}
            className={`${styles.paginationButton} ${
              currentPage === totalPages ? styles.disabled : ""
            }`}
          >
            次へ
          </Link>
        </li>
      </ul>
    </nav>
  );
};
// export const Pagination = ({ totalCount }) => {
//   //1ページに何枚表示するか
//   const PER_PAGE = BLOG_LIMIT;

//   // 現在のページ番号を取得
//   const router = useRouter();
//   const currentPage = parseInt(router.query.pageNum || "1", 10);

//   const range = (start, end) =>
//     /**
//      * スプレッド構文で展開し、未定義の要素を埋める。
//      */
//     [...Array(end - start + 1)].map((_, i) => start + i);
//   return (
//     <ul className={styles.pageList}>
//       <li>
//         <Link href={currentPage > 1 ? `/page/${currentPage - 1}` : "#"} className={currentPage === 1 ? styles.disabled : ""}>
//           前へ
//         </Link>
//       </li>
//       {range(1, Math.ceil(totalCount / PER_PAGE)).map((number) => (
//         <li
//           className={currentPage === number ? styles.currentStyle : ""}
//           key={number}
//         >
//           <Link href={`/page/${number}`}>{number}</Link>
//         </li>
//       ))}
//       <li>
//         <Link href={currentPage >= 1 ? `/page/${currentPage + 1}` : "#"} className={currentPage === (totalCount / PER_PAGE) ? styles.disabled : ""}>次へ</Link>
//       </li>
//     </ul>
//   );
// };
