import {
  ButtonGroup,
  Box,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Center,
  Flex,
  Text,
} from "@chakra-ui/react";
import ReactHowler from "react-howler";
import { useState, useEffect, useRef } from "react";
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
} from "react-icons/md";
import { useStoreActions } from "easy-peasy";
import { formatTime } from "../lib/formatters";

const Player = ({ songs, activeSong }) => {
  const [playing, setPlaying] = useState(true);
  const [index, setIndex] = useState(() =>
    songs.findIndex((song) => song.id === activeSong.id)
  );
  const [isSeeking, setIsSeeking] = useState(false);
  const [seek, setSeek] = useState(0.0);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [duration, setDuration] = useState(0.0);
  const soundRef = useRef(null);
  const setActiveSong = useStoreActions((state: any) => state.changeActiveSong);
  const repeatRef = useRef(repeat);

  useEffect(() => {
    let timerId;

    if (playing && !isSeeking) {
      const f = () => {
        setSeek(soundRef.current.seek());
        timerId = requestAnimationFrame(f);
      };

      timerId = requestAnimationFrame(f);
      return () => cancelAnimationFrame(timerId);
    }
    cancelAnimationFrame(timerId);
  }, [playing, isSeeking]);

  useEffect(() => {
    repeatRef.current = repeat;
  }, [repeat]);

  useEffect(() => {
    setActiveSong(songs[index]);
  }, [index, setActiveSong, songs]);

  const setPlayState = (value) => {
    setPlaying(value);
  };

  const onShuffle = () => {
    setShuffle((state) => !state);
  };

  const onRepeat = () => {
    setRepeat((state) => !state);
  };

  const prevSong = () => {
    setIndex((state) => {
      return state ? state - 1 : state.length - 1;
    });
  };

  const nextSong = () => {
    setIndex((state) => {
      if (shuffle) {
        const next = Math.floor(Math.random() * songs.length);

        if (next === state) {
          return nextSong();
        }
        return next as number;
      }
      return state === songs.length - 1 ? 0 : state + 1;
    });
  };

  const onEnd = () => {
    if (repeatRef.current) {
      soundRef.current.seek(0);
      setSeek(0);
    } else {
      nextSong();
    }
  };

  const onLoad = () => {
    const songDuration = soundRef.current.duration();
    setDuration(songDuration);
  };

  const onSeek = (e) => {
    setSeek(parseFloat(e[0]));
    soundRef.current.seek(parseFloat(e[0]));
  };

  return (
    <Box>
      <Box>
        <ReactHowler
          ref={soundRef}
          playing={playing}
          src={activeSong?.url}
          onLoad={onLoad}
          onEnd={onEnd}
        />
      </Box>
      <Center color="gray.600">
        <ButtonGroup>
          <IconButton
            outline="none"
            variant="link"
            aria-label="Shuffle"
            color={shuffle ? "white" : "gray.600"}
            fontSize="25px"
            onClick={onShuffle}
            icon={<MdShuffle />}
          />
          <IconButton
            outline="none"
            color="white"
            variant="link"
            aria-label="skip previous"
            onClick={prevSong}
            fontSize="25px"
            icon={<MdSkipPrevious />}
          />
          {playing ? (
            <IconButton
              outline="none"
              variant="link"
              color="white"
              aria-label="pause"
              fontSize="25px"
              onClick={() => setPlayState(false)}
              icon={<MdOutlinePauseCircleFilled />}
            />
          ) : (
            <IconButton
              outline="none"
              color="white"
              variant="link"
              aria-label="play"
              fontSize="25px"
              onClick={() => setPlayState(true)}
              icon={<MdOutlinePlayCircleFilled />}
            />
          )}
          <IconButton
            outline="none"
            variant="link"
            color="white"
            aria-label="Skip next"
            onClick={nextSong}
            fontSize="25px"
            icon={<MdSkipNext />}
          />
          <IconButton
            outline="none"
            variant="link"
            aria-label="Repeat"
            color={repeat ? "white" : "gray.600"}
            onClick={onRepeat}
            fontSize="25px"
            icon={<MdOutlineRepeat />}
          />
        </ButtonGroup>
      </Center>
      <Box color="gray.600">
        <Flex justify="center" align="center">
          <Box width="10%">
            <Center>
              <Text fontSize="xs">{formatTime(seek)}</Text>
            </Center>
          </Box>
          <Box width="80%">
            <RangeSlider
              aria-label={["min", "max"]}
              step={0.1}
              max={duration ? (duration.toFixed(2) as unknown as number) : 0}
              onChange={onSeek}
              value={[seek]}
              onChangeStart={() => setIsSeeking(true)}
              onChangeEnd={() => setIsSeeking(false)}
              min={0}
              id="player-range"
            >
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="gray.600" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width="10%">
            <Center>
              <Text fontSize="xs">{formatTime(duration)}</Text>
            </Center>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Player;
