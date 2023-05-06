import UserAvatar from 'components/icons/UserAvatar';
import BodyMedium from 'components/typography/BodyMedium';
import BodySmall from 'components/typography/BodySmall/BodySmall';
import { Colors } from 'constants/styles/Colors';
import { AN, BORDER_RADIUS, SCREEN_WIDTH } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import TileWrapper from 'hoc/TileWrapper';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { StyleSheet } from 'react-native';
import { FlatList, View } from 'react-native';
import { useAppSelector } from 'store/index';
import { UserData } from 'store/types/authSliceTypes';

const QuestionScreen = () => {
  const { colors, styles } = useStyles(createStyles);
  const { questions, onQuestion, score, activeRoom } = useAppSelector(
    state => state.game,
  );

  const renderUser = ({ item }: { item: UserData }) => (
    <View
      style={{
        borderRadius: BORDER_RADIUS,
        alignItems: 'center',
        borderColor: colors.tileBackground,
        borderWidth: AN(1),
        padding: AN(10),
        justifyContent: 'center',
      }}>
      <UserAvatar size={AN(20)} avatar={item.avatar} />
      <BodySmall text={item.firstName} style={{ marginTop: AN(2) }} />
      <BodySmall text={String(score[item.id])} />
    </View>
  );

  return (
    <ScreenWrapper>
      <FlatList
        data={activeRoom.users}
        renderItem={renderUser}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id + 'player'}
        contentContainerStyle={{
          minWidth: SCREEN_WIDTH,
          flexGrow: 1,
          justifyContent: 'space-evenly',
          height: AN(70),
        }}
      />
      <TileWrapper>
        <BodyMedium text={questions[onQuestion]?.question} />
      </TileWrapper>
    </ScreenWrapper>
  );
};

const createStyles = (colors: Colors) => StyleSheet.create({});

export default QuestionScreen;
