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

export type BlogProps = {
  blog: Blog;
};
