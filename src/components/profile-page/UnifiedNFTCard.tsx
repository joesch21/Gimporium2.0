import { client } from "@/consts/client";
import { MediaRenderer } from "thirdweb/react";
import { Box, Text, Button } from "@chakra-ui/react";

// Props type definition
type UnifiedNFTCardProps = {
    nft: any;
    index: number;
    refetchOwnedNFTs: () => void;
    refetchStakedInfo: () => void;
};

const resolveIPFSLink = (link: string) => {
    if (!link) return "";
    return link.startsWith("ipfs://")
        ? link.replace("ipfs://", "https://ipfs.io/ipfs/")
        : link;
};

export const UnifiedNFTCard = ({ nft, index, refetchOwnedNFTs, refetchStakedInfo }: UnifiedNFTCardProps) => {
    const imageUrl = resolveIPFSLink(nft.metadata?.image ?? "");

    return (
        <Box
            key={index}
            p="10px"
            borderRadius="10px"
            border="1px solid white"
            maxW="200px"
            boxShadow="lg"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
        >
            {imageUrl ? (
                <MediaRenderer
                    client={client}
                    src={imageUrl}
                    style={{
                        borderRadius: "10px",
                        height: "150px",
                        width: "150px",
                    }}
                />
            ) : (
                <Text color="red">Error loading image</Text>
            )}
            <Text mt="5px" fontSize="lg" fontWeight="bold">
                Token ID: {nft.id.toString()}
            </Text>
            <Text mt="2px" color="gray.400">
                {nft.metadata?.name || "Unnamed NFT"}
            </Text>

            {/* Link to external staking site */}
            <Button
                as="a"
                href="https://gcc-staking.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    border: "none",
                    backgroundColor: "#4CAF50",
                    color: "#fff",
                    padding: "8px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    width: "100%",
                    fontSize: "14px",
                    textAlign: "center"
                }}
            >
                Stake NFT
            </Button>
        </Box>
    );
};

export default UnifiedNFTCard;
