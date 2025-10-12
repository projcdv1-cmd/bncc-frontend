import { BaseColors } from '@/constants/theme';
import { UserAnswer } from '@/services/answersService';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SummaryScreenProps {
  theme: any;
  disciplinaName: string;
  sessionAnswers: { [key: string]: UserAnswer };
  totalQuestions: number;
  onFinish: () => void;
}

export function SummaryScreen({ 
  theme, 
  disciplinaName, 
  sessionAnswers, 
  totalQuestions, 
  onFinish 
}: SummaryScreenProps) {
  const styles = createStyles(theme);
  
  const correctAnswers = Object.values(sessionAnswers).filter(
    answer => answer.gabarito === answer.resposta_dada
  ).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Resumo - {disciplinaName}</Text>
      </View>
      
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryScore}>
          {correctAnswers} de {totalQuestions} questões corretas
        </Text>
        <Text style={styles.summaryPercentage}>
          {Math.round((correctAnswers / totalQuestions) * 100)}% de acertos
        </Text>
      </View>

      <View style={styles.tableContainer}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.tableCell, styles.tableCellHeader]}>Questão</Text>
          <Text style={[styles.tableCell, styles.tableCellHeader]}>Resposta</Text>
          <Text style={[styles.tableCell, styles.tableCellHeader]}>Gabarito</Text>
          <Text style={[styles.tableCell, styles.tableCellHeader]}>Resultado</Text>
        </View>

        <ScrollView style={styles.tableScroll}>
          {Object.entries(sessionAnswers).map(([questionKey, answer], index) => {
            const isCorrect = answer.gabarito === answer.resposta_dada;
            return (
              <View key={questionKey} style={styles.tableRow}>
                <Text style={styles.tableCell}>{index + 1}</Text>
                <Text style={styles.tableCell}>{answer.resposta_dada}</Text>
                <Text style={styles.tableCell}>{answer.gabarito}</Text>
                <Text style={[
                  styles.tableCell,
                  styles.resultCell,
                  isCorrect ? styles.correct : styles.incorrect
                ]}>
                  {isCorrect ? '✓' : '✗'}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.finishButton} onPress={onFinish}>
        <Text style={styles.finishButtonText}>Finalizar</Text>
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (theme: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
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
  summaryContainer: {
    backgroundColor: theme.surface,
    margin: 20,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: BaseColors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
    borderTopWidth: 4,
    borderTopColor: theme.primary,
  },
  summaryScore: {
    fontSize: 18,
    color: theme.primary,
    fontWeight: '600',
    marginBottom: 5,
  },
  summaryPercentage: {
    fontSize: 16,
    color: theme.textSecondary,
  },
  tableContainer: {
    flex: 1,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tableHeader: {
    backgroundColor: '#f8f9fa',
  },
  tableCell: {
    flex: 1,
    padding: 15,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
  tableCellHeader: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
  tableScroll: {
    maxHeight: 300,
  },
  resultCell: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  correct: {
    color: '#34C759',
    fontWeight: 'bold',
  },
  incorrect: {
    color: '#FF3B30',
    fontWeight: 'bold',
  },
  finishButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.primary,
    margin: 20,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: BaseColors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  finishButtonText: {
    color: theme.primary,
    fontSize: 18,
    fontWeight: '700',
  },
});