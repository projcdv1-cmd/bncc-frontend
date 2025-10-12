import { BaseColors } from '@/constants/theme';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface NavigationButtonsProps {
  theme: any;
  currentQuestionIndex: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function NavigationButtons({ 
  theme, 
  currentQuestionIndex, 
  totalQuestions, 
  onPrevious, 
  onNext 
}: NavigationButtonsProps) {
  const styles = createStyles(theme);
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  return (
    <View style={styles.navigationContainer}>
      <TouchableOpacity
        style={[
          styles.navButton, 
          styles.prevButton,
          isFirstQuestion && styles.disabledButton
        ]}
        onPress={onPrevious}
        disabled={isFirstQuestion}
      >
        <Text style={[
          styles.navButtonText,
          styles.prevButtonText,
          isFirstQuestion && styles.disabledText
        ]}>
          Anterior
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.navButton, styles.nextButton]}
        onPress={onNext}
      >
        <Text style={[styles.navButtonText, styles.nextButtonText]}>
          {isLastQuestion ? 'Finalizar' : 'Próxima'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  navigationContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 15,
    backgroundColor: theme.surface,
    borderTopWidth: 1,
    borderTopColor: BaseColors.gray[200],
    shadowColor: BaseColors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  navButton: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: BaseColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  prevButton: {
    backgroundColor: BaseColors.gray[600],
    borderWidth: 2,
    borderColor: BaseColors.gray[600],
  },
  nextButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.primary,
  },
  disabledButton: {
    backgroundColor: BaseColors.gray[300],
    borderColor: BaseColors.gray[300],
    opacity: 0.6,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  prevButtonText: {
    color: BaseColors.white,
  },
  nextButtonText: {
    color: theme.primary,
  },
  disabledText: {
    color: BaseColors.gray[500],
  },
});