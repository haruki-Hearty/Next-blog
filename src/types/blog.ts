import { MicroCMSListContent, MicroCMSImage, MicroCMSListResponse } from "microcms-js-sdk";


export type Category = {
  name: string;
};

// 特定のキーだけを取得
export type BlogList = Pick<Blog, "title" | "alt" | "thumbnail" | "category">;

export type Blog = {
  title: string;
  alt: string;
  body: string;
  thumbnail: MicroCMSImage;
  category: Category & MicroCMSListContent; //MicroCMSListContentの型定義を&で追加している
} & MicroCMSListResponse<BlogList>;
