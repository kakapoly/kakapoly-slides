import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const SidebarMotionContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 100%;
  bottom: 0;
  z-index: 2;
`;

export const MainMotionContainer = styled(motion.div)`
  width: 100vw;
`;
