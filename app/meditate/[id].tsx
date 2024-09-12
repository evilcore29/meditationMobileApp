import { View, Text, ImageBackground, Pressable } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import meditationImages from "@/constants/meditation-images";
import AppGradient from "@/components/AppGradient";
import { router, useLocalSearchParams } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";

const Meditate = () => {
  const { id } = useLocalSearchParams();

  const [seconds, setSeconds] = useState(600);
  const [isMeditating, setMeditating] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (seconds === 0) {
      setMeditating(false);
      return;
    }

    if (isMeditating) {
      timerId = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
    }

    return () => clearTimeout(timerId);
  }, [seconds, isMeditating]);

  const onMeditating = useCallback(() => {
    setMeditating(true);
  }, []);

  const formattedTimeMinutes = String(Math.floor(seconds / 60)).padStart(
    2,
    "0"
  );
  const formattedTimeSeconds = String(seconds % 60).padStart(2, "0");

  return (
    <View className="flex-1">
      <ImageBackground
        source={meditationImages[Number(id) - 1]}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient colors={["transparent", "rgba(0,0,0,0.8)"]}>
          <Pressable
            onPress={() => router.back()}
            className="absolute top-16 left-6 z-10"
          >
            <AntDesign name="leftcircleo" size={50} color="white" />
          </Pressable>

          <View className="flex-1 justify-center">
            <View className="mx-auto bg-neutral-200 rounded-full w-44 h-44 justify-center items-center">
              <Text className="text-4xl text-blue-800 font-rmono">
                {formattedTimeMinutes}:{formattedTimeSeconds}
              </Text>
            </View>
          </View>

          <View>
            <CustomButton onPress={onMeditating} title="Start Meditation" />
          </View>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default Meditate;
