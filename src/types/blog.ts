import { MicroCMSListContent,MicroCMSImage } from "microcms-js-sdk";

export type Category = {
  name: string;
};

export type BlogList = {
  title: string;
  alt: string;
  thumbnail: MicroCMSImage;
  category: Category & MicroCMSListContent; //MicroCMSListContentの型定義を&で追加している
};
export type BlogDetail = {
  body?: string;
} & BlogList;
