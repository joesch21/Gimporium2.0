import type { Chain } from "thirdweb";
import { bsc } from "thirdweb/chains";

export type NftContract = {
  address: string;
  chain: Chain;
  type: "ERC1155" | "ERC721";
  title?: string;
  description?: string;
  thumbnailUrl?: string;
  slug?: string;
};

export const NFT_CONTRACTS: NftContract[] = [
  {
    address: "0x4bA7161d0FAF245c0c8bA83890c121a3D9Fe3AC9",
    chain: bsc,
    title: "99 Billion Gimps",
    thumbnailUrl: "/images/background.png", // Updated to use local image
    type: "ERC721",
  },
  {
    address: "0xF09334a9027b263096b772b0F46D271E90b53F3E",
    chain: bsc,
    title: "Gimp Collection",
    thumbnailUrl: "/images/IMG_7684.png", // Updated to use local image
    type: "ERC721",
  },
];
