import { MicroCMSListContent } from "microcms-js-sdk";
import { MicroCMSImage } from "microcms-js-sdk";


export type Category = {
  name: string;
};

export type Thumbnail = {
  url: string;
};

export type Blog = {
  title: string;
  body: string;
  thumbnail: Thumbnail & MicroCMSImage;
  category: Category & MicroCMSListContent; //MicroCMSListContentの型定義を&で追加している
};
