import { Box, SimpleGrid } from "@chakra-ui/react";
import { UnifiedNFTCard } from "./UnifiedNFTCard";

export const UnifiedNFTGallery = ({
    ownedNFTs,
    refetchOwnedNFTs,
    refetchStakedInfo
}: {
    ownedNFTs: any[];
    refetchOwnedNFTs: () => void;
    refetchStakedInfo: () => void;
}) => {
    return (
        <SimpleGrid 
            columns={{ base: 2, sm: 3, md: 4, lg: 5 }} 
            spacing="10px" 
            justifyContent="center"
        >
            {ownedNFTs.map((nft, index) => (
                <UnifiedNFTCard
                    key={index}
                    nft={nft}
                    index={index}
                    refetchOwnedNFTs={refetchOwnedNFTs}
                    refetchStakedInfo={refetchStakedInfo}
                />
            ))}
        </SimpleGrid>
    );
};

export default UnifiedNFTGallery;
