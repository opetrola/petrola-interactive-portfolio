import { IconButton } from '@chakra-ui/button';
import { useDisclosure } from '@chakra-ui/hooks';
import { Center, Text, VStack, Box } from '@chakra-ui/layout';
import { Fade, SlideFade } from '@chakra-ui/transition';
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillFacebook,
  AiOutlineWhatsApp,
  AiFillTwitterCircle,
} from 'react-icons/ai';
import { TiArrowBack } from 'react-icons/ti';
import Icon from '@chakra-ui/icon';
import { useEffect, useState } from 'react';
import { useColorModeValue, useColorMode } from '@chakra-ui/color-mode';
import { useRouter } from 'next/router';

const COLORS = [
  '#9B5DE5',
  '#F15BB5',
  '#FEE440',
  '#00BBF9',
  '#00F5D4',
  '#1a202c',
];

export function Docker() {
  const { onClose, onOpen } = useDisclosure();
  const [scroll, setScroll] = useState(0);
  const [showDock, setShowDock] = useState(true);
  const [dockColor, setDockColor] = useState(
    COLORS[Math.floor(Math.random() * (5 - 0) + 0)]
  );

  const router = useRouter();
  const { colorMode } = useColorMode();

  useEffect(() => {
    let timer: any = null;

    const handleScroll = () => {
      setScroll(window.scrollY);
      let OldScroll;

      if (scroll != OldScroll) {
        OldScroll = scroll;
        setShowDock(false);
      } else {
        setShowDock(true);
      }

      clearInterval(timer);
      timer = setInterval(() => {
        setShowDock(true);
      }, 500);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setDockColor(COLORS[Math.floor(Math.random() * (5 - 0) + 0)]);
    }, 10000);
  }, [dockColor]);

  return (
    <Center
      position="fixed"
      h="100vh"
      display={router.asPath !== '/' ? 'flex' : 'none'}
      onMouseEnter={() => onOpen()}
      onMouseLeave={() => onClose()}
      zIndex={999}
      _before={{
        content: '""',
        width: '8rem',
        height: 'full',
        left: 0,
        position: 'absolute',
        pointerEvents: 'none',
        backgroundImage:
          colorMode === 'dark'
            ? `linear-gradient(to left,  rgba(26, 32, 44, 0),  rgba(26, 32, 44, 1) 50%)`
            : `linear-gradient(to left,  rgba(255,255,255, 0),  rgba(255,255,255, 1) 50%)`,
      }}
    >
      <Fade in={showDock}>
        <Box
          w={40}
          position="absolute"
          top="8rem"
          right="-12rem"
          lineHeight={1}
        >
          <Icon
            transform="rotate(-30deg)"
            ml={-10}
            mb={-3}
            fontSize={50}
            as={TiArrowBack}
          />
          <Text fontSize={30} fontWeight="extrabold">
            My <br />
            Social{' '}
            <span
              style={{
                color: dockColor,
              }}
            >
              Medias!
            </span>
          </Text>
        </Box>
      </Fade>

      <VStack
        py={4}
        px={2}
        alignItems="flex-end"
        spacing={4}
        justifyContent="space-between"
      >
        <IconButton
          variant="ghost"
          size="lg"
          aria-label="first-doc"
          color="twitter.400"
          icon={<AiFillTwitterCircle size={60} />}
        />

        <IconButton
          variant="ghost"
          size="lg"
          aria-label="first-doc"
          icon={<AiFillFacebook size={60} />}
        />

        <a
          target="_blank"
          href="https://api.whatsapp.com/send?phone=5561999381264&text=Hello%20I%20am%20a%20Recruiter!"
        >
          <IconButton
            variant="ghost"
            size="lg"
            aria-label="first-doc"
            color="whatsapp.400"
            icon={<AiOutlineWhatsApp size={60} />}
          />
        </a>

        <a target="_blank" href="https://github.com/P37R0L4">
          <IconButton
            variant="ghost"
            size="lg"
            aria-label="first-doc"
            icon={<AiFillGithub size={60} />}
          />
        </a>

        <a
          target="_blank"
          href="https://www.linkedin.com/in/lucas-henrique-novais-de-araujo-petrola-559262123/"
        >
          <IconButton
            variant="ghost"
            size="lg"
            aria-label="first-doc"
            color="linkedin.600"
            icon={<AiFillLinkedin size={60} />}
          />
        </a>
      </VStack>
    </Center>
  );
}
