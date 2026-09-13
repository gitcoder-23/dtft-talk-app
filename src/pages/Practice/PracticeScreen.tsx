import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Svg, {
  Rect,
  Circle,
  Path,
  G,
  Line,
} from 'react-native-svg';
import { Typography } from '../../constants/fonts';
import { Colors } from '../../constants/color';
import {
  AI_SPEAK_DATA,
} from '../../constants/mockData';
import { AppHeader } from '../../common/AppHeader';
import { getSafeBottomPadding } from '../../utils/safeArea';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
  read?: boolean;
}

const LEVELS = ['Beginner', 'Intermediate', 'Advanced'] as const;

export const PracticeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);

  const [selectedLevel, setSelectedLevel] = useState<string>('Beginner');
  const [messages, setMessages] = useState<ChatMessage[]>(AI_SPEAK_DATA.initialChat as ChatMessage[]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleLevelToggle = () => {
    const nextIdx = (LEVELS.indexOf(selectedLevel as any) + 1) % LEVELS.length;
    setSelectedLevel(LEVELS[nextIdx]);
  };

  const handleStartPractice = (topicName?: string) => {
    const topic = topicName || 'Daily Routine';
    Alert.alert(
      `Start AI Practice: ${topic}`,
      `Level: ${selectedLevel}\n\nOur AI English partner is ready to listen to your voice and guide your conversation!`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Begin Session 🎙️',
          onPress: () => {
            const newAiMsg: ChatMessage = {
              id: Date.now().toString(),
              sender: 'ai',
              text: `Awesome! Let's practice ${topic}. Please speak after the beep or type your answer.`,
              time: '09:42 AM',
            };
            setMessages((prev) => [...prev, newAiMsg]);
            setTimeout(() => {
              scrollViewRef.current?.scrollToEnd({ animated: true });
            }, 200);
          },
        },
      ]
    );
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText.trim(),
      time: '09:42 AM',
      read: true,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 150);

    // AI simulated intelligent reply
    setTimeout(() => {
      const responses = [
        "That's great! Your sentence structure is clear. Can you tell me more about what you do next?",
        "Good pronunciation! Remember to link the words smoothly. What else do you usually enjoy doing?",
        "Well spoken! Try adding an adjective to make your sentence more expressive.",
        "Excellent! That sounds like an interesting routine. How do you finish your evening?",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const aiReply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: randomResponse,
        time: '09:42 AM',
      };

      setMessages((prev) => [...prev, aiReply]);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 200);
    }, 900);
  };

  const handleMicPress = () => {
    if (isRecording) {
      setIsRecording(false);
      Alert.alert('Audio Captured! 🎧', 'AI analyzed your speech: Pronunciation 92%, Fluency Good!');
    } else {
      setIsRecording(true);
      Alert.alert(
        'Listening... 🎙️',
        'Speak your answer clearly into the microphone now.',
        [
          {
            text: 'Stop & Submit',
            onPress: () => {
              setIsRecording(false);
              const voiceMsg: ChatMessage = {
                id: Date.now().toString(),
                sender: 'user',
                text: 'I wake up at seven and drink a glass of water.',
                time: '09:42 AM',
                read: true,
              };
              setMessages((prev) => [...prev, voiceMsg]);
              setTimeout(() => {
                const aiReply: ChatMessage = {
                  id: (Date.now() + 1).toString(),
                  sender: 'ai',
                  text: 'Terrific answer! "I wake up at seven" is natural. What time do you have breakfast?',
                  time: '09:42 AM',
                };
                setMessages((prev) => [...prev, aiReply]);
                scrollViewRef.current?.scrollToEnd({ animated: true });
              }, 800);
            },
          },
        ]
      );
    }
  };

  const handleListenPrompt = () => {
    Alert.alert('Playing Audio 🎧', 'Listening to native audio pronunciation for the current topic...');
  };

  return (
    <KeyboardAvoidingView
      style={styles.safeArea}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* App Header */}
      <AppHeader
        showBack={true}
        onBackPress={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          } else {
            navigation.navigate('HomeTab');
          }
        }}
        hasUnreadNotifications={true}
        onAvatarPress={() => navigation.navigate('ProfileTab')}
      />

      <ScrollView
        ref={scrollViewRef}
        style={styles.container}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: getSafeBottomPadding(insets.bottom, 16) + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Banner: Speak with AI Assistance */}
        <View style={styles.heroBanner}>
          <View style={styles.heroLeftCol}>
            {/* Pill Badge */}
            <View style={styles.heroPillBadge}>
              <Text style={styles.heroPillText}>{AI_SPEAK_DATA.hero.badge}</Text>
            </View>

            {/* Title & Subtitle */}
            <Text style={styles.heroTitle}>{AI_SPEAK_DATA.hero.title}</Text>
            <Text style={styles.heroSubtitle}>{AI_SPEAK_DATA.hero.subtitle}</Text>

            {/* Start Practice CTA Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => handleStartPractice()}
              style={styles.heroCtaBtn}
            >
              <Text style={styles.heroCtaText}>Start Practice</Text>
              <Ionicons name="arrow-forward" size={14} color={Colors.white} style={{ marginLeft: 4 }} />
            </TouchableOpacity>
          </View>

          {/* Right Mascot Artwork: Robot with Headphones & Speech Bubble */}
          <View style={styles.mascotContainer}>
            <Svg width="130" height="150" viewBox="0 0 140 160">
              {/* Botanical leaves / decorative plants behind */}
              <Path d="M 120 145 C 128 120 135 90 125 75 C 115 95 110 125 115 145 Z" fill={Colors.tealLight} />
              <Path d="M 130 145 C 136 128 140 108 135 95 C 128 110 124 130 126 145 Z" fill={Colors.successLight} />
              <Path d="M 10 145 C 18 125 30 105 25 85 C 15 105 10 130 8 145 Z" fill={Colors.amber200} opacity={0.6} />

              {/* Robot Head with Blue Headphones */}
              {/* Head Base */}
              <Rect x="38" y="38" width="64" height="48" rx="20" fill={Colors.white} stroke={Colors.sky150} strokeWidth="2" />
              {/* Face Screen (Black digital display) */}
              <Rect x="44" y="44" width="52" height="34" rx="14" fill={Colors.slate900} />
              {/* Smiling Blue LED Eyes */}
              <Path d="M 52 56 Q 58 50 64 56" stroke={Colors.primary} strokeWidth="3" strokeLinecap="round" fill="none" />
              <Path d="M 76 56 Q 82 50 88 56" stroke={Colors.primary} strokeWidth="3" strokeLinecap="round" fill="none" />
              {/* Cute LED Smile */}
              <Path d="M 64 68 Q 70 74 76 68" stroke={Colors.primary} strokeWidth="2.5" strokeLinecap="round" fill="none" />

              {/* Blue Headphones */}
              <Path d="M 34 56 C 34 26 106 26 106 56" stroke={Colors.primary} strokeWidth="4" fill="none" />
              <Rect x="30" y="46" width="10" height="22" rx="5" fill={Colors.primary} />
              <Rect x="100" y="46" width="10" height="22" rx="5" fill={Colors.primary} />

              {/* Robot Body */}
              <Rect x="46" y="88" width="48" height="42" rx="16" fill={Colors.white} stroke={Colors.sky150} strokeWidth="2" />
              {/* DTFT Colorful Logo on Torso */}
              <Circle cx="64" cy="106" r="4" fill={Colors.primary} />
              <Circle cx="76" cy="106" r="4" fill={Colors.danger} />
              <Circle cx="64" cy="116" r="4" fill={Colors.warning} />
              <Circle cx="76" cy="116" r="4" fill={Colors.success} />

              {/* Robot Waving Hand (Left) */}
              <Path d="M 46 96 C 32 90 28 75 30 70 C 33 68 38 72 44 86" stroke={Colors.white} strokeWidth="8" strokeLinecap="round" />
              <Circle cx="30" cy="70" r="5" fill={Colors.primary} />

              {/* Robot Right Hand */}
              <Path d="M 94 96 C 104 102 110 112 108 120" stroke={Colors.white} strokeWidth="8" strokeLinecap="round" />
              <Circle cx="108" cy="120" r="5" fill={Colors.primary} />

              {/* Speech Bubble: "Hi! Let's practice English together!" */}
              <G transform="translate(68, 4)">
                <Rect x="0" y="0" width="70" height="34" rx="10" fill={Colors.primary} />
                <Path d="M 12 34 L 8 40 L 20 34 Z" fill={Colors.primary} />
              </G>
            </Svg>

            {/* Speech Bubble Overlay Text */}
            <View style={styles.robotBubbleOverlay}>
              <Text style={styles.robotBubbleText}>Hi!</Text>
              <Text style={styles.robotBubbleText}>Let's practice</Text>
              <Text style={styles.robotBubbleText}>English</Text>
              <Text style={styles.robotBubbleText}>together!</Text>
            </View>
          </View>
        </View>

        {/* 4 Feature Cards Row */}
        <View style={styles.featureCardsRow}>
          {AI_SPEAK_DATA.featureCards.map((card) => (
            <TouchableOpacity
              key={card.id}
              activeOpacity={0.8}
              onPress={() => handleStartPractice(card.title)}
              style={styles.featureCard}
            >
              <View style={[styles.featureIconCircle, { backgroundColor: card.color }]}>
                <Ionicons name={card.icon as any} size={18} color={Colors.white} />
              </View>
              <Text style={styles.featureTitle}>{card.title}</Text>
              <Text style={styles.featureSubtitle}>{card.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Section: Today's Practice */}
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionHeaderLeft}>
            <Ionicons name="calendar-outline" size={18} color={Colors.primary} style={{ marginRight: 6 }} />
            <Text style={styles.sectionTitle}>Today's Practice</Text>
          </View>

          {/* Level Dropdown Picker */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleLevelToggle}
            style={styles.levelDropdownBtn}
          >
            <Text style={styles.levelDropdownText}>Level: {selectedLevel}</Text>
            <Ionicons name="chevron-down" size={13} color={Colors.primary} style={{ marginLeft: 3 }} />
          </TouchableOpacity>
        </View>

        {/* Today's Practice Big Card */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => handleStartPractice("Talking About Your Day")}
          style={styles.todaysPracticeCard}
        >
          {/* Left Graphic: Two People Talking with Speech Bubbles */}
          <View style={styles.peopleArtBox}>
            <Svg width="88" height="88" viewBox="0 0 90 90">
              <Rect x="0" y="0" width="90" height="90" rx="14" fill={Colors.mint50} />
              {/* Girl on Left */}
              <Circle cx="26" cy="52" r="14" fill={Colors.amber300} />
              <Path d="M 12 50 C 12 32 38 32 38 50 C 36 42 30 38 26 40 C 20 38 14 42 12 50 Z" fill={Colors.slate800} />
              <Circle cx="26" cy="80" r="18" fill={Colors.pink} />

              {/* Boy on Right */}
              <Circle cx="64" cy="50" r="14" fill={Colors.amber200} />
              <Path d="M 50 48 C 50 32 76 32 76 48 C 72 40 66 36 64 38 C 60 36 52 40 50 48 Z" fill={Colors.slate800} />
              <Circle cx="64" cy="80" r="18" fill={Colors.primary} />

              {/* Speech Bubble in Between */}
              <Rect x="30" y="16" width="30" height="18" rx="6" fill={Colors.primary} />
              <Path d="M 38 34 L 34 39 L 44 34 Z" fill={Colors.primary} />
              {/* Dots in speech bubble */}
              <Circle cx="39" cy="25" r="1.5" fill={Colors.white} />
              <Circle cx="45" cy="25" r="1.5" fill={Colors.white} />
              <Circle cx="51" cy="25" r="1.5" fill={Colors.white} />
            </Svg>
          </View>

          {/* Right Details */}
          <View style={styles.todaysDetailsCol}>
            <View style={styles.todaysBadgeRow}>
              <View style={styles.dailyConvPill}>
                <Text style={styles.dailyConvPillText}>{AI_SPEAK_DATA.todaysPractice.badge}</Text>
              </View>
              <Ionicons name="chevron-forward" size={15} color={Colors.slate400} />
            </View>

            <Text style={styles.todaysTitle}>{AI_SPEAK_DATA.todaysPractice.title}</Text>
            <Text style={styles.todaysDesc}>{AI_SPEAK_DATA.todaysPractice.subtitle}</Text>

            {/* Meta Row & Button */}
            <View style={styles.todaysMetaRow}>
              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={12} color={Colors.slate500} style={{ marginRight: 3 }} />
                <Text style={styles.metaItemText}>{AI_SPEAK_DATA.todaysPractice.duration}</Text>
              </View>

              <View style={styles.metaItem}>
                <Ionicons name="bar-chart-outline" size={12} color={Colors.slate500} style={{ marginRight: 3 }} />
                <Text style={styles.metaItemText}>{selectedLevel}</Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => handleStartPractice("Talking About Your Day")}
                style={styles.startBtnSmall}
              >
                <Text style={styles.startBtnSmallText}>Start Practice</Text>
                <Ionicons name="arrow-forward" size={12} color={Colors.white} style={{ marginLeft: 3 }} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>

        {/* Section: Conversation Practice */}
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionHeaderLeft}>
            <Ionicons name="chatbubbles" size={18} color={Colors.primary} style={{ marginRight: 6 }} />
            <Text style={styles.sectionTitle}>Conversation Practice</Text>
          </View>

          <TouchableOpacity activeOpacity={0.7} onPress={() => Alert.alert('All Topics', 'Viewing all 25+ conversational categories...')}>
            <Text style={styles.viewAllLink}>View All →</Text>
          </TouchableOpacity>
        </View>

        {/* 8 Category Tiles Grid (2 columns x 4 rows) */}
        <View style={styles.topicsGrid}>
          {AI_SPEAK_DATA.conversationTopics.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.78}
              onPress={() => handleStartPractice(item.title)}
              style={styles.topicCard}
            >
              <View style={[styles.topicIconCircle, { backgroundColor: item.bgColor }]}>
                <Ionicons name={item.icon as any} size={18} color={item.color} />
              </View>
              <Text style={styles.topicTitleText}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={14} color={item.color} style={styles.topicChevron} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Section: Live AI English Conversation Simulator */}
        <View style={styles.chatSectionCard}>
          <View style={styles.chatHeaderRow}>
            <View style={styles.chatAvatarCircle}>
              <Svg width="28" height="28" viewBox="0 0 32 32">
                <Circle cx="16" cy="16" r="14" fill={Colors.sky100} />
                <Rect x="8" y="8" width="16" height="12" rx="4" fill={Colors.slate900} />
                <Circle cx="12" cy="13" r="1" fill={Colors.primary} />
                <Circle cx="20" cy="13" r="1" fill={Colors.primary} />
                <Path d="M 6 12 C 6 6 26 6 26 12" stroke={Colors.primary} strokeWidth="1.5" fill="none" />
              </Svg>
            </View>
            <View>
              <Text style={styles.chatBotName}>DTFT AI Partner</Text>
              <Text style={styles.chatBotStatus}>Online • Ready to converse</Text>
            </View>
          </View>

          {/* Chat Messages */}
          <View style={styles.messagesContainer}>
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <View
                  key={msg.id}
                  style={[
                    styles.messageRow,
                    isUser ? styles.userMessageRow : styles.aiMessageRow,
                  ]}
                >
                  {!isUser && (
                    <View style={styles.messageAvatarBox}>
                      <Svg width="22" height="22" viewBox="0 0 24 24">
                        <Circle cx="12" cy="12" r="11" fill={Colors.primaryLight} />
                        <Rect x="6" y="7" width="12" height="9" rx="3" fill={Colors.slate900} />
                        <Circle cx="9" cy="11" r="1" fill={Colors.primary} />
                        <Circle cx="15" cy="11" r="1" fill={Colors.primary} />
                      </Svg>
                    </View>
                  )}

                  <View
                    style={[
                      styles.messageBubble,
                      isUser ? styles.userBubble : styles.aiBubble,
                    ]}
                  >
                    <Text
                      style={[
                        styles.messageText,
                        isUser ? styles.userMessageText : styles.aiMessageText,
                      ]}
                    >
                      {msg.text}
                    </Text>
                    <View style={styles.messageFooterRow}>
                      <Text
                        style={[
                          styles.messageTimeText,
                          isUser ? styles.userTimeText : styles.aiTimeText,
                        ]}
                      >
                        {msg.time}
                      </Text>
                      {isUser && (
                        <Ionicons
                          name="checkmark-done"
                          size={13}
                          color={Colors.whiteAlpha90}
                          style={{ marginLeft: 3 }}
                        />
                      )}
                    </View>
                  </View>
                </View>
              );
            })}
          </View>

          {/* Input Bar */}
          <View style={styles.inputContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleMicPress}
              style={[
                styles.inputMicBtn,
                isRecording && styles.inputMicBtnActive,
              ]}
            >
              <Ionicons
                name={isRecording ? 'radio' : 'mic'}
                size={18}
                color={Colors.white}
              />
            </TouchableOpacity>

            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type or speak your message..."
              placeholderTextColor={Colors.slate400}
              onSubmitEditing={handleSendMessage}
              returnKeyType="send"
            />

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleSendMessage}
              style={styles.inputSendBtn}
            >
              <Ionicons name="send" size={16} color={Colors.white} />
            </TouchableOpacity>
          </View>

          {/* Quick Voice / Audio Action Row */}
          <View style={styles.voiceActionsRow}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleMicPress}
              style={styles.voiceActionItem}
            >
              <Ionicons name="mic-outline" size={14} color={Colors.primary} style={{ marginRight: 4 }} />
              <Text style={styles.voiceActionText}>Tap to speak</Text>
            </TouchableOpacity>

            <View style={styles.voiceDivider} />

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleListenPrompt}
              style={styles.voiceActionItem}
            >
              <Ionicons name="headset-outline" size={14} color={Colors.primary} style={{ marginRight: 4 }} />
              <Text style={styles.voiceActionText}>Listen</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingTop: 8,
  },
  // Hero Banner
  heroBanner: {
    marginHorizontal: 12,
    marginTop: 6,
    borderRadius: 20,
    backgroundColor: Colors.primaryLighter,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.sky150,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  heroLeftCol: {
    flex: 1,
    paddingRight: 6,
  },
  heroPillBadge: {
    backgroundColor: Colors.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3.5,
    borderRadius: 12,
    marginBottom: 6,
  },
  heroPillText: {
    color: Colors.white,
    fontSize: Typography.size.xxs,
    fontWeight: Typography.weight.bold,
  },
  heroTitle: {
    fontSize: Typography.size.md,
    fontWeight: Typography.weight.bold,
    color: Colors.slate900,
    lineHeight: 22,
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: Typography.size.xxs,
    color: Colors.slate600,
    lineHeight: 15,
    marginBottom: 10,
  },
  heroCtaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  heroCtaText: {
    color: Colors.white,
    fontSize: Typography.size.xxs,
    fontWeight: Typography.weight.bold,
  },
  mascotContainer: {
    width: 130,
    height: 150,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  robotBubbleOverlay: {
    position: 'absolute',
    top: 7,
    right: 5,
    alignItems: 'center',
  },
  robotBubbleText: {
    color: Colors.white,
    fontSize: 7.5,
    fontWeight: Typography.weight.bold,
    lineHeight: 8.5,
    textAlign: 'center',
  },
  // 4 Feature Cards Row
  featureCardsRow: {
    flexDirection: 'row',
    marginHorizontal: 12,
    marginTop: 12,
    gap: 8,
  },
  featureCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  featureIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  featureTitle: {
    fontSize: 10,
    fontWeight: Typography.weight.bold,
    color: Colors.slate900,
    textAlign: 'center',
    marginBottom: 2,
  },
  featureSubtitle: {
    fontSize: 8.5,
    color: Colors.slate500,
    textAlign: 'center',
    lineHeight: 11,
  },
  // Section Headers
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 14,
    marginTop: 14,
    marginBottom: 8,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
    color: Colors.slate900,
  },
  levelDropdownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.primaryLight,
  },
  levelDropdownText: {
    fontSize: Typography.size.xxs,
    fontWeight: Typography.weight.bold,
    color: Colors.primary,
  },
  viewAllLink: {
    fontSize: Typography.size.xxs,
    fontWeight: Typography.weight.bold,
    color: Colors.primary,
  },
  // Today's Practice Big Card
  todaysPracticeCard: {
    marginHorizontal: 12,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  peopleArtBox: {
    width: 88,
    height: 88,
    borderRadius: 14,
    overflow: 'hidden',
    marginRight: 10,
  },
  todaysDetailsCol: {
    flex: 1,
  },
  todaysBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  dailyConvPill: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: 8,
  },
  dailyConvPillText: {
    color: Colors.white,
    fontSize: 9,
    fontWeight: Typography.weight.bold,
  },
  todaysTitle: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.bold,
    color: Colors.slate900,
    marginBottom: 2,
  },
  todaysDesc: {
    fontSize: Typography.size.xxs,
    color: Colors.slate600,
    lineHeight: 14,
    marginBottom: 8,
  },
  todaysMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItemText: {
    fontSize: 10,
    color: Colors.slate600,
  },
  startBtnSmall: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4.5,
    borderRadius: 12,
  },
  startBtnSmallText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: Typography.weight.bold,
  },
  // Topics Grid (2 columns)
  topicsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 12,
    gap: 8,
  },
  topicCard: {
    width: '48.5%',
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  topicIconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  topicTitleText: {
    fontSize: Typography.size.xxs,
    fontWeight: Typography.weight.bold,
    color: Colors.slate800,
    flex: 1,
  },
  topicChevron: {
    marginLeft: 4,
  },
  // Interactive Chat Section
  chatSectionCard: {
    marginHorizontal: 12,
    marginTop: 14,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  chatHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    marginBottom: 10,
  },
  chatAvatarCircle: {
    width: 28,
    height: 28,
    marginRight: 8,
  },
  chatBotName: {
    fontSize: Typography.size.xxs,
    fontWeight: Typography.weight.bold,
    color: Colors.slate900,
  },
  chatBotStatus: {
    fontSize: 9,
    color: Colors.success,
  },
  messagesContainer: {
    gap: 10,
    marginBottom: 10,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  aiMessageRow: {
    justifyContent: 'flex-start',
  },
  userMessageRow: {
    justifyContent: 'flex-end',
  },
  messageAvatarBox: {
    marginRight: 6,
    marginBottom: 2,
  },
  messageBubble: {
    maxWidth: '82%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
  },
  aiBubble: {
    backgroundColor: Colors.slate100,
    borderBottomLeftRadius: 2,
  },
  userBubble: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 2,
  },
  messageText: {
    fontSize: Typography.size.xxs,
    lineHeight: 16,
  },
  aiMessageText: {
    color: Colors.slate800,
  },
  userMessageText: {
    color: Colors.white,
  },
  messageFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 3,
  },
  messageTimeText: {
    fontSize: 8.5,
  },
  aiTimeText: {
    color: Colors.slate400,
  },
  userTimeText: {
    color: Colors.whiteAlpha90,
  },
  // Input Bar
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 22,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: 4,
  },
  inputMicBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputMicBtnActive: {
    backgroundColor: Colors.danger,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: Typography.size.xxs,
    color: Colors.slate900,
    height: 36,
  },
  inputSendBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
  },
  voiceActionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  voiceActionText: {
    fontSize: 10,
    fontWeight: Typography.weight.medium,
    color: Colors.primary,
  },
  voiceDivider: {
    width: 1,
    height: 12,
    backgroundColor: Colors.divider,
  },
});

export default PracticeScreen;
