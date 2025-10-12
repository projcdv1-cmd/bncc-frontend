import { BaseColors } from '@/constants/theme';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ConfirmationScreenProps {
  theme: any;
  disciplinaName: string;
  isSubmitting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ConfirmationScreen({ 
  theme, 
  disciplinaName, 
  isSubmitting, 
  onCancel, 
  onConfirm 
}: ConfirmationScreenProps) {
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Finalizar Questionário</Text>
      </View>
      
      <View style={styles.confirmationContainer}>
        <Text style={styles.confirmationTitle}>Deseja finalizar o questionário de {disciplinaName}?</Text>

        <View style={styles.confirmationButtons}>
          <TouchableOpacity 
            style={[
              styles.confirmButton, 
              styles.cancelButton,
              isSubmitting && styles.disabledButton
            ]} 
            onPress={onCancel}
            disabled={isSubmitting}
          >
            <Text style={[
              styles.cancelButtonText,
              isSubmitting && styles.disabledText
            ]}>
              Voltar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.confirmButton, 
              styles.finishConfirmButton,
              isSubmitting && styles.disabledButton
            ]} 
            onPress={onConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <View style={styles.buttonLoadingContainer}>
                <ActivityIndicator size="small" color="white" />
                <Text style={styles.buttonLoadingText}>Enviando...</Text>
              </View>
            ) : (
              <Text style={styles.finishConfirmButtonText}>Finalizar</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
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
  confirmationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  confirmationTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  confirmationButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  confirmButton: {
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
  cancelButton: {
    backgroundColor: BaseColors.gray[200],
    borderWidth: 1,
    borderColor: BaseColors.gray[300],
  },
  cancelButtonText: {
    color: BaseColors.gray[700],
    fontSize: 16,
    fontWeight: '600',
  },
  finishConfirmButton: {
    backgroundColor: theme.primary,
    borderWidth: 2,
    borderColor: theme.primary,
  },
  finishConfirmButtonText: {
    color: BaseColors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  disabledButton: {
    backgroundColor: BaseColors.gray[300],
    borderColor: BaseColors.gray[300],
    opacity: 0.6,
  },
  disabledText: {
    color: BaseColors.gray[500],
  },
  buttonLoadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonLoadingText: {
    color: BaseColors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});