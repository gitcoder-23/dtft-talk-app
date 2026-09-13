import { NavigatorScreenParams } from '@react-navigation/native';

export type BottomTabParamList = {
  HomeTab: undefined;
  NotesTab: undefined;
  PracticeTab: undefined;
  ProgressTab: undefined;
  ProfileTab: undefined;
};

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  MainTabs: NavigatorScreenParams<BottomTabParamList> | undefined;
  CourseDetail: { courseId?: string } | undefined;
};
