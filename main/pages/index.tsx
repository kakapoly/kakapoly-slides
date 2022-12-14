import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useForm } from "react-hook-form";

import useCurrentUserQuery from "@/queries/useCurrentUserQuery";
import useSignUpMutation from "@/queries/useSignUpMutation";
import { css } from "@emotion/react";
import useCreateDeckMutation from "@/queries/useCreateDeckMutation";
import useLogInMutation from "@/queries/useLogInMutation";
import useListDeckQuery from "@/queries/useListDeckQuery";
import Link from "next/link";
import useSignOut from "@/hooks/useSignOut";

const Home: NextPage = () => {
  const signInForm =
    useForm<{
      email: string;
      password: string;
    }>();

  const signUpForm =
    useForm<{
      email: string;
      password: string;
    }>();

  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useCurrentUserQuery();
  const { data: decks } = useListDeckQuery();

  const { mutate: logIn } = useLogInMutation();
  const { mutate: signUp } = useSignUpMutation();
  const { mutate: createDeck } = useCreateDeckMutation();

  const signOut = useSignOut();

  const handleSignUp = (email: string, password: string) => {
    signUp({
      email,
      password,
    });
  };

  const handleSignOut = () => {
    signOut();
  };

  const handleLogIn = (email: string, password: string) => {
    logIn({
      email,
      password,
    });
  };

  const handleCreateNewDeckCardClick = async () => {
    createDeck({
      title: "",
    });
  };

  return (
    <Container paddingY={8}>
      <Head>
        <title>Kakapoly Slides</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Heading variant={"1"}>Welcome to Kakapoly Sides!</Heading>

        <br />

        <br />

        {!isCurrentUserLoading &&
          true &&
          (currentUser ? (
            <>
              <Heading variant={"2"}>Authentication</Heading>
              <br />
              <div>
                <dl>
                  <VStack align={"left"} gap={4}>
                    <Box>
                      <dt>ID</dt>
                      <dd>{currentUser.id}</dd>
                    </Box>
                    <Box>
                      <dt>Email</dt>
                      <dd>{currentUser.email}</dd>
                    </Box>
                  </VStack>
                </dl>
                <Box mt={4}>
                  <Button onClick={handleSignOut}>Sign out</Button>
                </Box>
              </div>
            </>
          ) : (
            <div>
              <HStack align="left" gap={4}>
                <div>
                  <Heading>Log in</Heading>
                  <form
                    css={css`
                      margin-top: 16px;
                    `}
                  >
                    <VStack align={"left"} gap={0}>
                      <Box>
                        <FormLabel>Email address</FormLabel>
                        <Input type="email" {...signInForm.register("email")} />
                      </Box>
                      <Box>
                        <FormLabel>Password</FormLabel>
                        <Input
                          type="password"
                          {...signInForm.register("password")}
                        />
                      </Box>
                    </VStack>
                    <Box mt={4}>
                      <HStack>
                        <Button
                          type="submit"
                          onClick={signInForm.handleSubmit(
                            ({ email, password }) => {
                              handleLogIn(email, password);
                            }
                          )}
                        >
                          Log in
                        </Button>
                      </HStack>
                    </Box>
                  </form>
                </div>
                <div>
                  <Heading>Sign up</Heading>
                  <form
                    css={css`
                      margin-top: 16px;
                    `}
                  >
                    <VStack align={"left"} gap={0}>
                      <Box>
                        <FormLabel>Email address</FormLabel>
                        <Input type="email" {...signUpForm.register("email")} />
                      </Box>
                      <Box>
                        <FormLabel>Password</FormLabel>
                        <Input
                          type="password"
                          {...signUpForm.register("password")}
                        />
                      </Box>
                    </VStack>
                    <Box mt={4}>
                      <HStack>
                        <Button
                          type="submit"
                          onClick={signUpForm.handleSubmit(
                            ({ email, password }) => {
                              handleSignUp(email, password);
                            }
                          )}
                        >
                          Sign up
                        </Button>
                      </HStack>
                    </Box>
                  </form>
                </div>
              </HStack>
            </div>
          ))}
        <br />

        <br />

        {currentUser && (
          <>
            <Heading variant={"2"}>Decks</Heading>

            <br />

            <div>
              <Button onClick={handleCreateNewDeckCardClick}>
                Create new slide deck
              </Button>
            </div>

            <VStack align={"stretch"} marginTop={4}>
              {decks?.map((deck) => {
                return (
                  <Link key={deck.id} href={`decks/${deck.id}`}>
                    <a>
                      <Box
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                        p="6"
                      >
                        {deck.title ? deck.title : "Untitled"}
                      </Box>
                    </a>
                  </Link>
                );
              })}
            </VStack>
          </>
        )}
      </main>
    </Container>
  );
};

export default Home;
