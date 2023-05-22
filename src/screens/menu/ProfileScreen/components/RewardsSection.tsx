import BodyLarge from 'components/typography/BodyLarge';
import BodyMedium from 'components/typography/BodyMedium';
import React from 'react';
import { FlatList } from 'react-native';
import { Reward } from 'store/types/authSliceTypes';

const RewardsSection = ({ rewards }: Props) => {
  const renderItem = ({ item }) => <></>;
  return (
    <>
      <BodyMedium text="Rewards" />
      {!!rewards?.length ? (
        <FlatList data={rewards} renderItem={renderItem} />
      ) : (
        <BodyLarge text="No rewards won" />
      )}
    </>
  );
};

export default RewardsSection;

interface Props {
  rewards: Reward[];
}
