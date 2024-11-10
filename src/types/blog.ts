/**
 * なぜblog.tsを作ったか
 * 他のファイルでも同じ型を使い回せるよう
 * 他のファイルで管理すると使用する場所から見えにくくなる？
 * command クリックでファイルに飛べる
 */

// type Blogの中でcategory.nameに型定義ができなかった
export type Category = {
  name: string;
};

export type Blog = {
  id: string;
  title: string;
  body: string;
  publishedAt: string;
  category: Category;
};

// ブログ詳細ページの時はBlog型
export type BlogProps = {
  blog: Blog;
};

// ブログ一覧を取得するときにはBlog型の配列にする必要がある
export type BlogPropsArry = {
  blog: Blog[];
};
