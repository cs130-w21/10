import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import EditProfileForm from '../EditProfileForm';

/**
 * @class
 * @classdesc Component to render a popup that contains the [EditProfileForm]{@link EditProfileForm}.
 * @extends React.Component
 * @param {boolean} isOpen      - Boolean that controls whether the popup should be dsplayed or hidden.
 * @param {callback} onDismiss  - A callback that will be called when a user tries to exit the Dialog/Popup.
 */
const EditProfilePopup = ({ isOpen, onDismiss }) => {
  // Every time modal dialog opens/closes, reset the form value state.
  // useEffect(() => {
    // resetFormValues();
  // }, [resetFormValues, isOpen]);

  return (
    <>
    <Dialog
      open={isOpen}
      onClose={onDismiss}
      maxWidth='lg'
    >
      <EditProfileForm onCancel={onDismiss} />
    </Dialog>
    </>
  );
};

export default EditProfilePopup;
