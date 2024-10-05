"use client";

import { NFT_CONTRACTS } from "@/consts/nft_contracts";
import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Image,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";

export default function Home() {
  // Log the contracts to check if data is loading correctly
  console.log("NFT_CONTRACTS:", NFT_CONTRACTS);

  // Add an effect to see when the component is rendered
  useEffect(() => {
    NFT_CONTRACTS.forEach((contract, index) => {
      console.log(`Contract #${index + 1}:`, contract);
      console.log("Title:", contract.title);
      console.log("Thumbnail URL:", contract.thumbnailUrl);
    });
  }, []);

  return (
    <Flex>
      <Box mt="24px" m="auto">
        <Flex direction="column" gap="4">
          <Heading ml="20px" mt="40px">
            Trending collections
          </Heading>
          <Flex
            direction="row"
            wrap="wrap"
            mt="20px"
            gap="5"
            justifyContent="space-evenly"
          >
            {/* Render the list of NFT contracts */}
            {NFT_CONTRACTS.map((item) => {
              // Log each item's values
              console.log(`Rendering contract: ${item.title} at address: ${item.address}`);
              console.log(`Image URL: ${item.thumbnailUrl}`);

              return (
                <Link
                  _hover={{ textDecoration: "none" }}
                  w={300}
                  h={400}
                  key={item.address}
                  href={`/collection/${item.chain.id.toString()}/${item.address}`}
                >
                  {/* Use standard <img> tag to test if image paths are valid */}
                  <img
                    src={item.thumbnailUrl}
                    alt={`Thumbnail for ${item.title}`}
                    style={{ width: "100%", height: "auto" }}
                    onError={() =>
                      console.error(`Error loading image for: ${item.title}`)
                    }
                  />
                  <Text fontSize="large" mt="10px">
                    {item.title}
                  </Text>
                </Link>
              );
            })}
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}
