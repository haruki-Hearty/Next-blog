import { MicroCMSListContent,MicroCMSImage } from "microcms-js-sdk";

export type Category = {
  name: string;
};

export type Blog = {
  title: string;
  body: string;
  alt: string;
  thumbnail: MicroCMSImage;
  category: Category & MicroCMSListContent; //MicroCMSListContentの型定義を&で追加している
};
