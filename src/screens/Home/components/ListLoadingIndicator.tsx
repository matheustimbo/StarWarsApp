import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import colors from '../../../utils/colors';

// import { Container } from './styles';

const ListLoadingIndicator: React.FC<{loadingPeople: Boolean}> = ({
  loadingPeople,
}) => {
  if (loadingPeople) {
    return (
      <View style={styles.loadingIndicator}>
        <ActivityIndicator color={colors.white} size="large" />
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
  },
});

export default ListLoadingIndicator;
