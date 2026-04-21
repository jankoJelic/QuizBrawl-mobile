import MyIcon from 'assets/icons/MyIcon';
import BodyLarge from 'components/typography/BodyLarge';
import BodyMedium from 'components/typography/BodyMedium';
import { AN } from 'constants/styles/appStyles';
import ScreenWrapper from 'hoc/ScreenWrapper';
import React from 'react';
import { ScrollView } from 'react-native';
import Modal from 'react-native-modal';

const SectionTitle = ({ text = '' }) => (
  <BodyLarge
    weight="bold"
    text={text}
    color="brand500"
    style={{ marginTop: AN(20) }}
  />
);
const SectionText = ({ text = '' }) => <BodyMedium text={text} />;

const TermsOfUse = ({ visible, close }: Props) => {
  return (
    <Modal isVisible={visible} coverScreen>
      <ScreenWrapper style={{ paddingTop: AN(70) }}>
        <MyIcon
          name="arrow-left"
          color="mainTextColor"
          size={AN(30)}
          onPress={close}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: AN(40) }}>
          <SectionTitle text="Quiz Clash Terms and Conditions" />
          <SectionText text='These terms and conditions ("Terms") govern your use of the Quiz Clash mobile game ("Game"). By installing, accessing, or using the Game, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use the Game.' />

          <SectionTitle text="1. Ownership and License" />
          <SectionText text="1.1 Ownership: The Game is the intellectual property of the creators of Quiz Clash." />
          <SectionText text="1.2 License: The creators of Quiz Clash grant you a limited, non-exclusive, non-transferable, and revocable license to use the Game for personal, non-commercial purposes, subject to these Terms. You may not sublicense, sell, modify, or distribute the Game without explicit written permission from the creators of Quiz Clash." />

          <SectionTitle text="2. Eligibility" />
          <SectionText text="2.1 Age Restrictions: You must be at least 13 years old to use the Game. If you are under 18 years old, you confirm that you have obtained parental consent to use the Game." />

          <SectionTitle text="3. User Conduct" />
          <SectionText
            text="3.1 Prohibited Actions: You agree not to engage in any of the following activities while using the Game:
a) Violating any applicable laws or regulations.
b) Interfering with or disrupting the Game's functionality.
c) Uploading, transmitting, or distributing any content that is unlawful, harmful, defamatory, obscene, or otherwise objectionable.
d) Impersonating any person or entity or falsely representing your affiliation with any person or entity.
e) Attempting to gain unauthorized access to the Game's servers or other users' accounts."
          />

          <SectionTitle text="4. User Content" />
          <SectionText text="4.1 User-generated Content: You may have the option to submit or create user-generated content within the Game. By doing so, you grant the creators of Quiz Clash a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, adapt, publish, translate, distribute, and display such content for the purposes of operating and promoting the Game." />

          <SectionTitle text="5. Limitations of Liability" />
          <SectionText
            text={`5.1 Disclaimer: The Game is provided on an "as is" and "as available" basis. The creators of Quiz Clash make no representations or warranties, whether express or implied, regarding the Game's reliability, availability, or suitability for your purposes. You use the Game at your own risk.`}
          />
          <SectionText text="5.2 Limitation of Liability: In no event shall the creators of Quiz Clash be liable for any indirect, consequential, incidental, punitive, or special damages arising out of or in connection with the use of the Game, even if advised of the possibility of such damages." />

          <SectionTitle text="6. Modifications and Termination" />
          <SectionText text="6.1 Modification: The creators of Quiz Clash reserve the right to modify or discontinue the Game, temporarily or permanently, with or without notice. You agree that the creators of Quiz Clash shall not be liable to you or any third party for any modification, suspension, or termination of the Game." />
          <SectionText text="6.2 Termination: The creators of Quiz Clash may terminate your access to the Game at any time for any reason without prior notice." />

          <SectionTitle text="7. Governing Law and Jurisdiction" />
          <SectionText text="7.1 Governing Law: These Terms shall be governed by and construed in accordance with the laws of Croatia." />
          <SectionText text="7.2 Jurisdiction: Any disputes arising out of or relating to these Terms shall be subject to the exclusive jurisdiction of the courts located in [Your Country/State]." />
        </ScrollView>
      </ScreenWrapper>
    </Modal>
  );
};

export default TermsOfUse;

interface Props {
  visible: boolean;
  close: () => any;
}
