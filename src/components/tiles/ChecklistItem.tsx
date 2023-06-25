import MyIcon from 'assets/icons/MyIcon';
import BodyMedium from 'components/typography/BodyMedium';
import { Colors } from 'constants/styles/Colors';
import { AN } from 'constants/styles/appStyles';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const ChecklistItem = ({ title, checked }: Props) => {
  const { styles } = useStyles(createStyles);

  return (
    <View style={styles.container}>
      <BodyMedium text={title + '   '} />
      <MyIcon
        name={checked ? 'check' : 'x'}
        color={checked ? 'success500' : 'danger500'}
      />
    </View>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: AN(5),
    },
  });

export default ChecklistItem;

interface Props {
  title: string;
  checked: boolean;
}
