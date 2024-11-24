"use client";

import { NFT_CONTRACTS } from "@/consts/nft_contracts";
import { Link } from "@chakra-ui/next-js";
import { Box, Flex, Heading, Text, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import styles from "../styles/Navbar.module.css"; // Import the CSS module for styling
import Head from "next/head"; // Import Head for metadata management

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Simulate loading effect
  useEffect(() => {
    const loadImages = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(loadImages);
  }, []);

  if (loading) {
    return (
      <Box className="loading-overlay">
        <Spinner size="xl" className="spinner" />
      </Box>
    );
  }

  // Map button styles based on title keywords
  const buttonStyleMap: { [key: string]: string } = {
    "99 Billion": "gold",
    "Gimp Collection": "purple",
  };

  return (
    <>
      <Head>
        <title>The Gimp!</title>
        <link rel="icon" href="/favicon.ico" /> {}
      </Head>

      <Flex justifyContent="center" alignItems="center" minHeight="100vh" bg="#121212">
        <Box mt="24px" m="auto" textAlign="center">
          <Flex direction="column" gap="4" alignItems="center">
            <Heading mt="60px" mb="40px" color="#ffffff">
              The Gimp!
            </Heading>

            <Flex
              direction="row"
              wrap="wrap"
              gap="20px"
              justifyContent="center"
              alignItems="center"
            >
              {/* Render the list of NFT contracts */}
              {NFT_CONTRACTS.map((item, index) => {
                // Determine button style based on title or index fallback
                const buttonStyle =
                  item.title && buttonStyleMap[item.title]
                    ? buttonStyleMap[item.title]
                    : index % 2 === 0
                    ? "green"
                    : "red";

                return (
                  <Link
                    _hover={{ textDecoration: "none" }}
                    w={300}
                    h={400}
                    key={item.address}
                    href={`/collection/${item.chain.id.toString()}/${item.address}`}
                  >
                    <div className={styles.frameContainer}>
                      {/* Render Thumbnail or Placeholder */}
                      {item.thumbnailUrl ? (
                        <img
                          src={item.thumbnailUrl}
                          alt={`Thumbnail for ${item.title ?? "NFT Collection"}`}
                          className={styles.nftThumbnail}
                          onError={() =>
                            console.error(`Error loading image for: ${item.title}`)
                          }
                        />
                      ) : (
                        <div className={styles.placeholderImage}>
                          <Text>No Image Available</Text>
                        </div>
                      )}
                      <Text fontSize="large" mt="10px" className={styles.nftTitle}>
                        {item.title || "Untitled Collection"}
                      </Text>
                    </div>
                    {/* Render Button with Dynamic Styles and Text */}
                    <div className={styles.buttonFrame}>
                      <button
                        className={`${styles.jazzedButton} ${styles[buttonStyle]}`}
                      >
                        {`Explore ${item.title ?? "NFT Collection"}`}
                      </button>
                    </div>
                  </Link>
                );
              })}
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}
