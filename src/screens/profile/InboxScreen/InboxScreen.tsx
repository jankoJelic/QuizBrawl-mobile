import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ClearButton from 'components/buttons/ClearButton';
import NavHeader from 'components/layout/NavHeader';
import { Colors } from 'constants/styles/Colors';
import { AN } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import useStyles from 'hooks/styles/useStyles';
import { MainStackParamsList } from 'navigation/MainStackParamsList';
import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import API from 'services/api';
import { useAppSelector } from 'store/index';
import { Message } from 'store/types/dataSliceTypes';
import MessageTile from './components/MessageTile';

const InboxScreen: React.FC<
  NativeStackScreenProps<MainStackParamsList, 'Inbox'>
> = ({ navigation }) => {
  const { styles, colors } = useStyles(createStyles);
  const { inbox } = useAppSelector(state => state.data.userData);

  const [pagination, setPagination] = useState(10);

  const renderMessage = ({ item }: { item: Message }) => (
    <MessageTile message={item} />
  );

  const onPressLoadMore = () => {
    setPagination(prevState => prevState + 10);
  };

  return (
    <ScreenWrapper fullWidth>
      <NavHeader title="Inbox" style={{ marginBottom: AN(20) }} />
      {!!inbox?.length ? (
        <FlatList
          data={inbox.slice(0, pagination)}
          renderItem={renderMessage}
          keyExtractor={(item, index) => item.senderId + String(index)}
          ListFooterComponent={
            <ClearButton
              title="Load more"
              onPress={onPressLoadMore}
              style={{ marginTop: AN(30) }}
            />
          }
          contentContainerStyle={{ flexGrow: 1, paddingBottom: AN(100) }}
        />
      ) : (
        <View></View>
      )}
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) => StyleSheet.create({});

export default InboxScreen;
