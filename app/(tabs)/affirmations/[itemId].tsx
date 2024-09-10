import {
  View,
  Text,
  ImageBackground,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import AFFIRMATION_GALLERY from "@/constants/affirmation-gallery";
import AppGradient from "@/components/AppGradient";
import { AntDesign } from "@expo/vector-icons";
import { GalleryPreviewData } from "@/constants/models/AffirmationCategory";

const AffirmationPractice = () => {
  const { itemId } = useLocalSearchParams();
  const [affirmation, setAffirmation] = useState<GalleryPreviewData | null>(
    null
  ); // Задаем правильный тип
  const [sentences, setSentences] = useState<string[]>([]);

  useEffect(() => {
    const affirmationData = AFFIRMATION_GALLERY.flatMap(
      (category) => category.data
    );
    const foundAffirmation = affirmationData.find(
      (affirmation) => affirmation.id === Number(itemId)
    );

    if (foundAffirmation) {
      setAffirmation(foundAffirmation);
      setSentences(foundAffirmation.text.split(".").filter(Boolean));
    }
  }, [itemId]);

  return (
    <View className="flex-1">
      <ImageBackground
        source={affirmation?.image}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient colors={["rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.9)"]}>
          <Pressable onPress={() => router.back()}>
            <AntDesign
              name="leftcircleo"
              size={50}
              color="white"
              className="absolute top-16 left-6 z-10"
            />
          </Pressable>
          <ScrollView className="mt-20" showsHorizontalScrollIndicator={false}>
            <View className="h-full justify-center">
              {sentences.map((sentence, idx) => (
                <Text
                  key={idx}
                  className="text-white font-bold text-3xl text-center"
                >
                  {sentence}.
                </Text>
              ))}
            </View>
          </ScrollView>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default AffirmationPractice;
