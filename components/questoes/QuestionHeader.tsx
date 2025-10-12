import { BaseColors } from '@/constants/theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface QuestionHeaderProps {
  theme: any;
  disciplinaEmoji: string;
  disciplinaName: string;
  currentQuestionIndex: number;
  totalQuestions: number;
}

export function QuestionHeader({ 
  theme, 
  disciplinaEmoji, 
  disciplinaName, 
  currentQuestionIndex, 
  totalQuestions 
}: QuestionHeaderProps) {
  const styles = createStyles(theme);

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{disciplinaEmoji} {disciplinaName}</Text>
      <Text style={styles.counter}>
        Questão {currentQuestionIndex + 1} de {totalQuestions}
      </Text>
    </View>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  header: {
    backgroundColor: theme.primary,
    padding: 20,
    paddingTop: 50,
    shadowColor: BaseColors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: BaseColors.white,
    textAlign: 'center',
  },
  counter: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginTop: 5,
  },
});