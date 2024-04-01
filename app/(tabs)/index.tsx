import { useMemo, useState } from "react";
import { View } from "react-native";
import { Stack } from "expo-router";

import { ExplorerHeader } from "@/components/explore-header";
import { ListingsMap } from "@/components/listings-map";
import listingsData from "@/assets/data/airbnb-listings.json";
import listingsGeoData from "@/assets/data/airbnb-listings.geo.json";
import { ListingsBottomSheets } from "@/components/listings-bottom-sheets";

export default function ExploreScreen() {
  const [currentCategory, setCurrentCategory] = useState("Tiny homes");

  const items = useMemo(() => listingsData as any, []);

  const onDataChanged = (category: string) => {
    setCurrentCategory(category);
  };

  return (
    <View style={{ flex: 1, marginTop: 150 }}>
      <Stack.Screen
        options={{
          header: () => <ExplorerHeader onCategoryChanged={onDataChanged} />,
        }}
      />

      <ListingsMap listings={listingsGeoData} />
      <ListingsBottomSheets listings={items} category={currentCategory} />
    </View>
  );
}
