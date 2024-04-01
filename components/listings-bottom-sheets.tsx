import { useMemo, useRef, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";

import Colors from "@/constants/Colors";
import { Listings } from "@/components/listings";

interface ListingsBottomSheetsProps {
  listings: any[];
  category: string;
}

export function ListingsBottomSheets({
  listings,
  category,
}: ListingsBottomSheetsProps) {
  const [refresh, setRefresh] = useState<number>(0);
  const snapPoints = useMemo(() => ["10%", "100%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);

  function onShowMap() {
    bottomSheetRef.current?.collapse();
    setRefresh(refresh + 1);
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      handleIndicatorStyle={{ backgroundColor: Colors.grey }}
      style={styles.sheetContainer}
    >
      <View style={styles.contentContainer}>
        <Listings listings={listings} refresh={refresh} category={category} />

        <View style={styles.absoluteView}>
          <TouchableOpacity onPress={onShowMap} style={styles.btn}>
            <Text style={{ fontFamily: "semibold", color: "#fff" }}>Map</Text>
            <Ionicons
              name="map"
              size={20}
              style={{ marginLeft: 10 }}
              color={"#fff"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  absoluteView: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    alignItems: "center",
  },
  btn: {
    backgroundColor: Colors.dark,
    padding: 14,
    height: 50,
    borderRadius: 30,
    flexDirection: "row",
    marginHorizontal: "auto",
    alignItems: "center",
  },
  sheetContainer: {
    backgroundColor: "#fff",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});
