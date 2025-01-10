import {
  Box,
  Flex,
  Heading,
  Img,
  Tab,
  TabList,
  Tabs,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { blo } from "blo";
import { shortenAddress } from "thirdweb/utils";
import { ProfileMenu } from "./Menu";
import { useState } from "react";
import { NFT_CONTRACTS, type NftContract } from "@/consts/nft_contracts";
import {
  useActiveAccount,
  useReadContract,
} from "thirdweb/react";
import { getContract, toEther } from "thirdweb";
import { client } from "@/consts/client";
import { getOwnedERC721s } from "@/extensions/getOwnedERC721s";
import UnifiedNFTGallery from "./UnifiedNFTGallery"; 
import { MARKETPLACE_CONTRACTS } from "@/consts/marketplace_contract";
import { Link } from "@chakra-ui/next-js";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useGetENSAvatar } from "@/hooks/useGetENSAvatar";
import { useGetENSName } from "@/hooks/useGetENSName";
import { getAllValidListings } from "thirdweb/extensions/marketplace";

type Props = {
  address: string;
};

export function ProfileSection(props: Props) {
  const { address } = props;
  const account = useActiveAccount();
  const isYou = address.toLowerCase() === account?.address.toLowerCase();
  const { data: ensName } = useGetENSName({ address });
  const { data: ensAvatar } = useGetENSAvatar({ ensName });
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [selectedCollection, setSelectedCollection] = useState<NftContract>(NFT_CONTRACTS[0]);

  const contract = getContract({
    address: selectedCollection.address,
    chain: selectedCollection.chain,
    client,
  });

  const { data: ownedNFTs, isLoading: isLoadingOwnedNFTs, refetch: refetchOwnedNFTs } = useReadContract(
    getOwnedERC721s,
    {
        contract,
        owner: address,
        requestPerSec: 50,
        queryOptions: {
            enabled: !!address,
        },
    }
);


  const chain = contract.chain;
  const marketplaceContractAddress = MARKETPLACE_CONTRACTS.find(
    (o) => o.chain.id === chain.id
  )?.address;
  
  if (!marketplaceContractAddress) throw Error("No marketplace contract found");

  const marketplaceContract = getContract({
    address: marketplaceContractAddress,
    chain,
    client,
  });

  const { data: allValidListings, isLoading: isLoadingValidListings } =
    useReadContract(getAllValidListings, {
      contract: marketplaceContract,
      queryOptions: { enabled: !!ownedNFTs?.length },
    });

  const listings = allValidListings?.length
    ? allValidListings.filter(
        (item) =>
          item.assetContractAddress.toLowerCase() ===
            contract.address.toLowerCase() &&
          item.creatorAddress.toLowerCase() === address.toLowerCase()
      )
    : [];

  const columns = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4 });

  return (
    <Box px={{ lg: "50px", base: "20px" }}>
      {/* Profile Header */}
      <Flex direction={{ lg: "row", md: "column", sm: "column" }} gap={5}>
        <Img
          src={ensAvatar ?? blo(address as `0x${string}`)}
          w={{ lg: 150, base: 100 }}
          rounded="8px"
        />
        <Box my="auto">
          <Heading>{ensName ?? "Unnamed"}</Heading>
          <Text color="gray">{shortenAddress(address)}</Text>
        </Box>
      </Flex>

      {/* Profile Menu */}
      <ProfileMenu
        selectedCollection={selectedCollection}
        setSelectedCollection={setSelectedCollection}
      />

      {/* NFT Tabs */}
      <Tabs
        variant="soft-rounded"
        onChange={(index) => setTabIndex(index)}
        isLazy
        defaultIndex={0}
        mt="20px"
      >
        <TabList>
          <Tab>Owned ({ownedNFTs?.length ?? 0})</Tab>
          <Tab>Listings ({listings?.length ?? 0})</Tab>
        </TabList>
      </Tabs>

      {/* Unified Gallery Section for Owned NFTs and Listings */}
      {isLoadingOwnedNFTs ? (
        <Text>Loading...</Text>
      ) : tabIndex === 0 ? (
        <UnifiedNFTGallery 
    ownedNFTs={ownedNFTs ?? []} 
    refetchOwnedNFTs={refetchOwnedNFTs} 
    refetchStakedInfo={() => {}} 
/>

      ) : (
        <Box mt="20px">
          {listings.length > 0 ? (
            listings.map((item, index) => (
              <Box key={index} border="1px solid white" p="10px">
                <Link
                  href={`/collection/${contract.chain.id}/${contract.address}/token/${item.asset.id.toString()}`}
                  color="white"
                >
                  <Text>{item.asset.metadata.name ?? "Unnamed NFT"}</Text>
                  <Text>Price: {toEther(item.pricePerToken)}</Text>
                </Link>
              </Box>
            ))
          ) : (
            <Text>No listings available.</Text>
          )}
        </Box>
      )}
    </Box>
  );
}
