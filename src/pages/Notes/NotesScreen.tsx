import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Rect, Path, Circle } from "react-native-svg";
import { Typography } from "../../constants/fonts";
import { ALL_NOTES, NoteItem } from "../../constants/mockData";
import { AppHeader } from "../../common/AppHeader";
import { CategoryPill } from "../../common/CategoryPill";
import { NoteCard } from "../../common/NoteCard";

const CATEGORY_TABS = [
  { id: "all", label: "All Notes", icon: "document-text", color: "#0084FF" },
  { id: "Grammar", label: "Grammar", icon: "book", color: "#E53935" },
  { id: "Vocabulary", label: "Vocabulary", icon: "text", color: "#F57C00" },
  {
    id: "Conversation",
    label: "Conversation",
    icon: "chatbubbles",
    color: "#00897B",
  },
  { id: "Speaking", label: "Speaking", icon: "mic", color: "#8E24AA" },
  { id: "Listening", label: "Listening", icon: "headset", color: "#00838F" },
] as const;

export const NotesScreen: React.FC = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");

  const filteredNotes = ALL_NOTES.filter((note) => {
    const matchesTab = selectedTab === "all" || note.category === selectedTab;
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleNotePress = (note: NoteItem) => {
    Alert.alert(
      note.title,
      `Category: ${note.category}\nPages: ${note.pages}\nFile Size: ${note.fileSize}\n\nWould you like to open or download this note?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Download PDF",
          onPress: () =>
            Alert.alert(
              "Downloading",
              `${note.title}.pdf is downloading for offline access.`,
            ),
        },
        {
          text: "Read Now",
          onPress: () =>
            Alert.alert("Opening Reader", `Loading ${note.title}...`),
        },
      ],
    );
  };

  const handleDownloadAll = () => {
    Alert.alert(
      "Download All Notes",
      "Download all 24 study notes (approx 45.2 MB) for offline study?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Download All",
          onPress: () =>
            Alert.alert(
              "Downloading All",
              "All study materials will be saved offline.",
            ),
        },
      ],
    );
  };

  return (
    <View style={styles.safeArea}>
      {/* App Header with Back chevron */}
      <AppHeader
        showBack={true}
        onBackPress={() => navigation.goBack()}
        hasUnreadNotifications={true}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Banner: My Notes */}
        <View style={styles.heroBanner}>
          <View style={styles.heroLeftContent}>
            <View style={styles.heroIconBox}>
              <Ionicons name="document-text" size={24} color="#FFFFFF" />
            </View>
            <Text style={styles.heroTitle}>My Notes</Text>
            <Text style={styles.heroSubtitle}>
              Your study materials, anytime, anywhere.
            </Text>
            <Text style={styles.heroTags}>
              Notes • PDFs • Grammar • Practice
            </Text>
          </View>

          {/* Right Textbooks Artwork */}
          <View style={styles.heroArtBox}>
            <Svg width="120" height="110" viewBox="0 0 130 120">
              {/* Stack of books */}
              <Rect
                x="20"
                y="70"
                width="80"
                height="12"
                rx="2"
                fill="#00C853"
              />
              <Rect
                x="15"
                y="82"
                width="90"
                height="12"
                rx="2"
                fill="#FF3B30"
              />
              <Rect
                x="10"
                y="94"
                width="100"
                height="12"
                rx="2"
                fill="#FFB300"
              />
              {/* Notepad with quote */}
              <Rect
                x="55"
                y="16"
                width="65"
                height="70"
                rx="4"
                fill="#FFFFFF"
                stroke="#CBD5E1"
                strokeWidth="1"
              />
              <Rect
                x="55"
                y="16"
                width="65"
                height="10"
                rx="2"
                fill="#0084FF"
              />
              <Path
                d="M 62 38 L 110 38 M 62 48 L 105 48 M 62 58 L 95 58"
                stroke="#94A3B8"
                strokeWidth="1.5"
              />
              <Circle cx="108" cy="72" r="6" fill="#FEF9E7" />
              <Path
                d="M 105 72 Q 108 76 111 72"
                stroke="#FF9800"
                strokeWidth="1.5"
                fill="none"
              />
              {/* Pencil Cup */}
              <Rect
                x="98"
                y="55"
                width="18"
                height="24"
                rx="3"
                fill="#0084FF"
              />
              <Path
                d="M 103 40 L 103 55 M 109 36 L 109 55"
                stroke="#FFC107"
                strokeWidth="2.5"
              />
            </Svg>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#94A3B8"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search notes, topics..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={18} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>

        {/* Filter Tabs Scroll */}
        <View style={styles.filterSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScroll}
          >
            {CATEGORY_TABS.map((tab) => (
              <CategoryPill
                key={tab.id}
                label={tab.label}
                isActive={selectedTab === tab.id}
                onPress={() => setSelectedTab(tab.id)}
                icon={tab.icon as any}
                accentColor={tab.color}
              />
            ))}
          </ScrollView>
        </View>

        {/* Section Header: All Notes (24) & Latest First */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleLeft}>
            <Ionicons name="file-tray-full" size={20} color="#0084FF" />
            <Text style={styles.sectionTitleText}>
              All Notes ({filteredNotes.length})
            </Text>
          </View>
          <TouchableOpacity
            style={styles.sortDropdownBtn}
            onPress={() =>
              setSortOrder(sortOrder === "latest" ? "oldest" : "latest")
            }
          >
            <Text style={styles.sortDropdownText}>
              {sortOrder === "latest" ? "Latest First ▾" : "Oldest First ▴"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Notes List */}
        <View style={styles.notesListContainer}>
          {filteredNotes.map((note) => (
            <NoteCard key={note.id} note={note} onPress={handleNotePress} />
          ))}
        </View>

        {/* Sticky Download All Tip Banner */}
        <View style={styles.downloadTipCard}>
          <View style={styles.tipLeft}>
            <Ionicons name="bulb-outline" size={22} color="#0084FF" />
            <Text style={styles.tipText}>
              Tip: Download notes for offline study anytime!
            </Text>
          </View>
          <TouchableOpacity
            style={styles.downloadAllBtn}
            activeOpacity={0.8}
            onPress={handleDownloadAll}
          >
            <Ionicons
              name="download-outline"
              size={16}
              color="#FFFFFF"
              style={{ marginRight: 4 }}
            />
            <Text style={styles.downloadAllText}>Download All</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    paddingBottom: 24,
  },
  heroBanner: {
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 20,
    backgroundColor: "#E6F4FE",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderWidth: 1,
    borderColor: "#C7E8FD",
  },
  heroLeftContent: {
    flex: 1,
  },
  heroIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#0084FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  heroTitle: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.extraBold,
    color: "#005CE6",
    marginBottom: 2,
  },
  heroSubtitle: {
    fontSize: Typography.size.xs,
    color: "#334155",
    fontWeight: Typography.weight.medium,
    lineHeight: 16,
  },
  heroTags: {
    fontSize: Typography.size.xxs,
    color: "#0084FF",
    fontWeight: Typography.weight.bold,
    marginTop: 6,
  },
  heroArtBox: {
    width: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 46,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: Typography.size.sm,
    color: "#0F172A",
  },
  filterSection: {
    marginTop: 14,
  },
  filterScroll: {
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 18,
    marginBottom: 10,
  },
  sectionTitleLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sectionTitleText: {
    fontSize: Typography.size.md,
    fontWeight: Typography.weight.bold,
    color: "#0F172A",
  },
  sortDropdownBtn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  sortDropdownText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.semiBold,
    color: "#64748B",
  },
  notesListContainer: {
    paddingHorizontal: 16,
  },
  downloadTipCard: {
    marginHorizontal: 16,
    marginTop: 10,
    backgroundColor: "#EBF5FF",
    borderRadius: 14,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },
  tipLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginRight: 8,
  },
  tipText: {
    fontSize: Typography.size.xxs,
    color: "#005CE6",
    fontWeight: Typography.weight.medium,
    lineHeight: 14,
  },
  downloadAllBtn: {
    backgroundColor: "#0084FF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  downloadAllText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
    color: "#FFFFFF",
  },
});

export default NotesScreen;
