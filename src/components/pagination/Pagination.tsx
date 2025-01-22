import { NextPage } from "next";
import { Fragment } from "react";
import { range } from "@/utils/range";
import Link from "next/link";
import styles from "./Pagination.module.scss";

type PaginationProps = {
  totalCount: number;
  limit: number;
  currentPage: number;
};

export const Pagination = ({
  totalCount,
  limit,
  currentPage,
}: PaginationProps) => {
  //全部で何ページのページネーションにするかの計算
  const totalPages = Math.ceil(totalCount / limit);

  // ページネーションの長さ　一旦propsではなくココに記述
  const maxNumLength = 7;
  // 表示数の半分
  const halfMaxNumLength = Math.floor(maxNumLength / 2);

  // 左側に省略記号を出す条件,半分を超えたページから表示
  const hasLeftEllipsis =
    totalPages > maxNumLength &&
    maxNumLength >= 7 &&
    currentPage > halfMaxNumLength;

  //右の省略記号は最終ページから表示数の半分を引いたページまで表示
  const hasRightEllipsis =
    totalPages > maxNumLength &&
    maxNumLength >= 7 &&
    currentPage < totalPages - halfMaxNumLength;

  const paginationNumbers = () => {
    // ページ数がmaxNumLength以下の場合は全て表示する
    if (totalPages <= maxNumLength) {
      return range(1, totalPages);
    }
    // < 1 2 3 4 5 … 10 > のように省略記号が右のみの場合
    if (!hasLeftEllipsis && hasRightEllipsis) {
      //例: maxNumLength = 7, totalPages = 10 の場合 → [1, 2, 3, 4, 5, 10]
      return [...range(1, maxNumLength - 2), totalPages];
    }
    // < 1 … 6 7 8 9 10 > のように省略記号が左のみの場合
    if (hasLeftEllipsis && !hasRightEllipsis) {
      //最初の1と最後のtotalPagesは固定、Math.round(maxNumLength / 2) は maxNumLength を2で割って四捨五入した値です。
      return [
        1,
        ...range(totalPages - Math.round(maxNumLength / 2), totalPages),
      ];
    }
    // < 1 … 5 6 7 … 10 > のように省略記号が両方の場合
    const startNum = currentPage - (halfMaxNumLength - 2); // 最初のページと省略記号を除いたページ数
    const endNum = currentPage + (halfMaxNumLength - 2); // 最後のページと省略記号を除いたページ数
    return [1, ...range(startNum, endNum), totalPages];
  };

  const numbers = paginationNumbers();
  console.log(numbers, "left:" + hasLeftEllipsis, "right:" + hasRightEllipsis);
  return (
    <>
      <ul className={styles.pagination}>
        {numbers.map((number) => {
          return (
            <Fragment key={number}>
              {hasRightEllipsis && number === totalPages && <li>...</li>}
              <li>
                <Link
                  href={`/page/${number}`}
                  className={`${styles.paginationPage} ${
                    number === currentPage ? styles.active : ""
                  }`}
                >
                  {number}
                </Link>
              </li>
              {hasLeftEllipsis && number === 1 && <li>...</li>}
            </Fragment>
          );
        })}
      </ul>
    </>
  );
};
