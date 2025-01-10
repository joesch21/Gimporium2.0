import type { Chain } from "thirdweb";
import { getContract } from "thirdweb";
import { bsc } from "thirdweb/chains";
import { client } from "../consts/client";
import { stakingABI } from "./abi/Staking_contract_abi";

export type NftContract = {
  address: string;
  chain: Chain;
  type: "ERC1155" | "ERC721";
  title?: string;
  description?: string;
  thumbnailUrl?: string;
  slug?: string;
};

// ✅ NFT Contracts List (No Change Here)
export const NFT_CONTRACTS: NftContract[] = [
  {
    address: "0x4bA7161d0FAF245c0c8bA83890c121a3D9Fe3AC9",
    chain: bsc,
    title: "99 Billion Gimps - 245 GIMP NFT's",
    thumbnailUrl: "/images/background.png", 
    type: "ERC721",
  },
];

// ✅ Exporting Individual NFT Contract
export const NFT_CONTRACT = getContract({
    client: client,
    chain: bsc,
    address: "0x4bA7161d0FAF245c0c8bA83890c121a3D9Fe3AC9"
});

// ✅ Exporting Staking Contract
export const STAKING_CONTRACT = getContract({
    client: client,
    chain: bsc,
    address: "0x250965c2D14856CCe89406eF5F2f4f7e17453aB1", 
    abi: stakingABI
});

// ✅ Exporting Reward Token Contract (Optional)
export const REWARD_TOKEN_CONTRACT = getContract({
    client: client,
    chain: bsc,
    address: "0x092aC429b9c3450c9909433eB0662c3b7c13cF9A"
});
