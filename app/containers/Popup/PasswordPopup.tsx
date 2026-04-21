import React, { useState } from 'react';
import Popup from './Popup';
import InputField from 'components/inputs/InputField';

const PasswordPopup = ({
  visible,
  closeModal,
  error,
  onSubmit,
  text = '',
}: Props) => {
  const [input, setInput] = useState('');

  const onSubmitMe = () => {
    onSubmit(input);
  };

  return (
    <Popup
      visible={visible}
      closeModal={closeModal}
      title="Enter password"
      firstButtonTitle="Submit"
      secondButtonTitle="Cancel"
      onPressFirstButton={onSubmitMe}
      onPressSecondButton={closeModal}
      text={text}
      Content={
        <InputField value={input} onChangeText={setInput} error={error} />
      }
    />
  );
};

export default React.memo(PasswordPopup);

interface Props {
  visible: boolean;
  closeModal: () => any;
  error: boolean;
  onSubmit: (txt: string) => any;
  text?: string;
}
