import {PdfProps} from '../../../navigation';
import Pdf from 'react-native-pdf';
import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';

export const PdfViewer = ({
  route: {
    params: {doc},
  },
}: PdfProps) => {
  return (
    <Pdf
      spacing={0}
      source={{
        uri: doc,
        cache: false,
      }}
      style={styles.pdf}
    />
  );
};

const styles = StyleSheet.create({
  pdf: {
    flex:1,
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
  }
});
