import BodyLarge from 'components/typography/BodyLarge';
import BodyMedium from 'components/typography/BodyMedium';
import { Colors } from 'constants/styles/Colors';
import { PADDING_HORIZONTAL, AN } from 'constants/styles/appStyles';
import TileWrapper from 'hoc/TileWrapper';
import useStyles from 'hooks/styles/useStyles';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { TOPICS } from 'screens/arena/CreateArenaRoomScreen/CreateArenaRoomScreen';
import { Topic } from 'store/types/dataSliceTypes';

const iconSize = AN(36);

const TopicsList = ({ onSelectTopic, selectedTopic }: Props) => {
  const { styles, colors } = useStyles(createStyles);

  const renderItem = ({ item }: TopicListItem) => {
    const isSelected = item.name === selectedTopic;

    const onPressTopic = () => {
      onSelectTopic(item.name);
    };

    return (
      <View>
        <TileWrapper
          onPress={onPressTopic}
          style={{
            ...styles.topic,
            borderColor: isSelected ? colors.brand400 : colors.tileBackground,
          }}>
          {item.icon}
        </TileWrapper>
        <BodyMedium
          onPress={onPressTopic}
          text={item.name}
          color={isSelected ? 'brand500' : undefined}
          style={styles.tileName}
        />
      </View>
    );
  };

  return (
    <>
      <BodyLarge text="Select topic" style={styles.title} />
      <FlatList
        horizontal
        data={TOPICS}
        renderItem={renderItem}
        style={styles.list}
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

const createStyles = (colors: Colors) =>
  StyleSheet.create({
    list: {
      marginVertical: AN(20),
      maxHeight: AN(100),
    },
    topic: {
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: AN(7),
      aspectRatio: 1,
      width: iconSize * 2,
      borderWidth: 1,
    },
    tileName: { textAlign: 'center', marginTop: AN(6) },
    title: { marginLeft: PADDING_HORIZONTAL, marginTop: AN(20) },
  });

export default React.memo(TopicsList);

interface TopicListItem {
  item: { name: Topic; icon: JSX.Element };
}

interface Props {
  onSelectTopic: (topic: Topic) => any;
  selectedTopic: Topic;
}
